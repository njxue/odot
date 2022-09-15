import React from "react";

function resetInputField(inputRef: React.RefObject<HTMLInputElement>) {
  if (!inputRef || !inputRef.current) {
    throw Error;
  }
  inputRef.current.value = "";
}

export default resetInputField;
