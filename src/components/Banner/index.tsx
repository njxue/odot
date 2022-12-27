import useAuth from "../../contexts/AuthContext";
import bannerStyles from "../../styles/Banner.module.css";
import { Icon, Image, Tooltip } from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";


export const Banner: React.FC<{}> = () => {
  const logout = useAuth().logout;

  function handleClick(): void {
    logout();
  }
  return (
    <div className={bannerStyles.banner}>
      <Image src={require("../../assets/logo.png")} />
      <Tooltip label="Logout">
        <span>
          <Icon as={AiOutlineLogout} onClick={handleClick} />
        </span>
      </Tooltip>
    </div>
  );
};
