import { DatabaseReference, push } from "firebase/database";

function getDatabaseKey(ref: DatabaseReference): string {
  const key = push(ref).key;
  if (!key) {
    throw Error;
  }
  return key;
}

export default getDatabaseKey;
