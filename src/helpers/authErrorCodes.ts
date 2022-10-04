const emailErrorCodes: {[key:string]: string } = {
  "auth/invalid-email": "Email format is invalid",
  "auth/user-not-found": "Account with this email does not exist",
};

const passwordErrorCodes: {[key:string]: string } = {
  "auth/wrong-password": "Password is incorrect",
};

export { emailErrorCodes, passwordErrorCodes };
