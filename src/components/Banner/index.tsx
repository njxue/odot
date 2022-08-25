import useAuth from "../../contexts/AuthContext";

interface BannerProps {
  children?: React.ReactNode;
}

export const Banner: React.FC<BannerProps> = (props: BannerProps) => {
  const logout = useAuth().logout;

  function handleClick(): void {
    logout();
  }
  return (
    <>
      <button onClick={handleClick}>log out</button>
      <div>{props.children}</div>
    </>
  );
};
