import React from "react";
import styles from "../../styles/PreLogin.module.css";
import GreetingCard from "../Login/GreetingCard";

const PreLoginLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default PreLoginLayout;
