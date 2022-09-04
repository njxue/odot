import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { child, onValue, push, ref, update } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import React, { useEffect, useRef, useState } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: String;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const isOpen: boolean = props.isOpen;
  const onClose: () => void = props.onClose;
  const currUser: User = useAuth().getCurrUser();
  const todoRef = ref(db, `users/${currUser.uid}/todos/${props.todoId}`);
  const autosRef = child(todoRef, "autos");
  const [freq, setFreq] = useState<TimeInterval>(TimeInterval.DAY);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    onValue(autosRef, (snapshot) => {
      const value = snapshot.val();
      console.log(value);
    });
  }, []);
  
  function addAutomaticTask(e: React.FormEvent): void {
    e.preventDefault();
    const taskName = inputRef.current?.value;
    const nextUpdateTime: Date = calculateNextUpdateTime(freq);
    let autoKey = push(autosRef).key;
    if (autoKey == null) {
      // error
    } else {
      const autoRef = child(autosRef, autoKey);
      update(autoRef, {
        name: taskName,
        nextUpdate: nextUpdateTime,
        freq: freq,
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: number = parseInt(e.target.value);
    const intervals: TimeInterval[] = [
      TimeInterval.DAY,
      TimeInterval.WEEK,
      TimeInterval.MONTH,
    ];
    setFreq(intervals[value]);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ModalHeader>Configure</ModalHeader>
          <Divider />
          <div>Automatic Additions:</div>
          <form className={formStyles.form} onSubmit={addAutomaticTask}>
            <input ref={inputRef} type="text" placeholder="Foo" />
            <select name="updateFreq" onChange={handleChange}>
              <option value="0">Day</option>
              <option value="1">Week</option>
              <option value="2">Month</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
