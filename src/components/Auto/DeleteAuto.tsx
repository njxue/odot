import { DeleteIcon } from "@chakra-ui/icons";
export const DeleteAuto: React.FC<{ handleDelete: () => void }> = (props) => {
  const { handleDelete } = props;
  return <DeleteIcon onClick={handleDelete} cursor="pointer" color="gray" />;
};
