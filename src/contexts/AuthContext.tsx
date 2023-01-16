import { createContext, useContext, useState, useEffect } from "react";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Unsubscribe,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextType {
  getCurrUser: () => User;
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  isLoggedIn: boolean | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function useAuth(): AuthContextType {
  const authContext = useContext(AuthContext);
  if (authContext == undefined) {
    throw new Error("TODO ERROR");
  }
  return authContext;
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);
  const value: AuthContextType = {
    getCurrUser,
    register,
    login,
    isLoggedIn,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function register(email: string, password: string): Promise<any> {
  return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    sendEmailVerification(cred.user).then(() => console.log("email sent!"));
  });
}

function login(email: string, password: string): Promise<any> {
  return signInWithEmailAndPassword(auth, email, password);
}

function logout(): Promise<any> {
  return signOut(auth).catch((err) => console.log(err));
}

function getCurrUser(): User {
  if (auth.currentUser == null) {
    throw new Error("Not logged in!");
  }
  return auth.currentUser;
}
