import useAuth from "../../contexts/AuthContext";
import bannerStyles from "../../styles/Banner.module.css";
import { Icon, Image, Tooltip } from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";

interface BannerProps {
  children?: React.ReactNode;
}

export const Banner: React.FC<BannerProps> = (props: BannerProps) => {
  const logout = useAuth().logout;

  function handleClick(): void {
    logout();
  }
  return (
    <div>
      <div className={bannerStyles.banner}>
        <Image src={require("../../assets/logo.png")} w="150px" />
        <Tooltip label="Logout">
          <span>
            <Icon
              as={AiOutlineLogout}
              color="white"
              cursor="pointer"
              boxSize="50px"
              onClick={handleClick}
            />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};
