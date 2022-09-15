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
import AutomatedTasks from "./AutomatedTasks";
import ITask from "../../interface/ITask";
import addAutoTask from "../../helpers/addAutoTask";
import { getAutosRef, getTodoRef } from "../../helpers/refs";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const { todoId, isOpen, onClose } = props;

  const currUser: User = useAuth().getCurrUser();
  const autosRef = getAutosRef(currUser.uid, todoId);

  const [freq, setFreq] = useState<TimeInterval>(TimeInterval.DAY);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autos, setAutos] = useState<ITask[] | undefined>();
  const intervals: TimeInterval[] = [
    TimeInterval.DAY,
    TimeInterval.WEEK,
    TimeInterval.MONTH,
    TimeInterval.SECONDS,
  ];

  useEffect(() => {
    onValue(autosRef, (snapshot) => {
      const value = snapshot.val();
      const tmp: ITask[] = [];
      for (const key in value) {
        const task = value[key];
        tmp.push({ id: key, ...task });
      }
      setAutos(tmp);
    });
  }, []);

  function addAutomaticTask(e: React.FormEvent): void {
    e.preventDefault();
    const taskName = inputRef.current?.value;

    if (taskName == undefined) {
      // error
      return;
    }
    addAutoTask(currUser, todoId, taskName, freq);
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: number = parseInt(e.target.value);

    setFreq(intervals[value]);
  }

  return autos == undefined ? (
    <div>loading......</div>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ModalHeader>Configure</ModalHeader>
          <Divider />
          <div>Automatic Additions:</div>
          <AutomatedTasks tasks={autos} todoId={props.todoId} />
          <form className={formStyles.form} onSubmit={addAutomaticTask}>
            <input ref={inputRef} type="text" placeholder="Foo" />
            <select name="updateFreq" onChange={handleChange}>
              <option value="0">Day</option>
              <option value="1">Week</option>
              <option value="2">Month</option>
              <option value="3">5 seconds</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
