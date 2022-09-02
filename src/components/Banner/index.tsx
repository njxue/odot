import useAuth from "../../contexts/AuthContext";
import buttonStyles from "../../styles/Button.module.css";
import bannerStyles from "../../styles/Banner.module.css";

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
        <h1>Todo-List</h1>
        <button className={buttonStyles.logoutBtn} onClick={handleClick}>
          log out
        </button>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
