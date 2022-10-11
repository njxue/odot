import styles from "../../styles/Button.module.css";

const AddButton: React.FC<{}> = () => {
  return (
    <button type="submit" className={`${styles.btn} ${styles.addBtn}`}>Add</button>
  );
};

export default AddButton;
