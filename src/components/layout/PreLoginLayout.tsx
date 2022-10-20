import React from "react";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import styles from "../../styles/PreLogin.module.css";
import GreetingCard from "../Login/GreetingCard";

interface PreLoginLayoutProps {
  greetingComponent: React.ReactNode;
  formComponent: React.ReactNode;
}

const PreLoginLayout: React.FC<PreLoginLayoutProps> = (props) => {
  const { width } = useWindowDimensions();
  const { greetingComponent, formComponent } = props;
  return (
    <div className={styles.container}>
      <div>{greetingComponent}</div>
      <div>{formComponent}</div>
    </div>
  );
};

export default PreLoginLayout;
