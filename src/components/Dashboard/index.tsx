import { AddModule } from "./AddModule";

interface Props {}

export const Dashboard: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Welcome back!</h1>
      <AddModule />
    </div>
  );
};
