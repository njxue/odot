import {
  createContext,
  useContext,
  useState,
  useEffect,
  ContextType,
} from "react";
import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Unsubscribe,
} from "firebase/auth";
import { auth, ref } from "../config/firebase";

interface AuthContextType {
  getCurrUser: () => User;
  register: (email: string, password: string, username: string) => Promise<any>;
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
  const [currUser, setCurrUser] = useState<User | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
        setIsLoggedIn(true);
      } else {
        setCurrUser(undefined);
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);
  const value: AuthContextType = { getCurrUser, register, login, isLoggedIn, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function register(
  email: string,
  password: string,
  username: string
): Promise<any> {
  return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    updateProfile(cred.user, {
      displayName: username,
    });
  });
}

function login(email: string, password: string): Promise<any> {
  return signInWithEmailAndPassword(auth, email, password);
}

function logout(): Promise<any> {
  return signOut(auth).then((err) => console.log(err));
}

function getCurrUser(): User {
  if (auth.currentUser == null) {
    throw new Error("Not logged in!")
  }
  return auth.currentUser;
}