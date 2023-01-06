import useAuth from "../../contexts/AuthContext";
import bannerStyles from "../../styles/Banner.module.css";
import { HStack, Icon, Image, Tooltip } from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { GlobalSettings } from "./GlobalSettings";

export const Banner: React.FC<{}> = () => {
  const logout = useAuth().logout;

  function handleClick(): void {
    logout();
  }
  return (
    <div className={bannerStyles.banner}>
      <Image src={require("../../assets/logo.png")} pointerEvents="none" />
      <HStack alignItems="center">
        <GlobalSettings />
        <Icon as={AiOutlineLogout} onClick={handleClick} boxSize="lg" />
      </HStack>
    </div>
  );
};
