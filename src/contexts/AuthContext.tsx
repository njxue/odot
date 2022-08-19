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
  currUser: User | undefined;
  register: (email: string, password: string, username: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function useAuth(): AuthContextType | undefined {
  return useContext(AuthContext);
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currUser, setCurrUser] = useState<User | undefined>();
  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(undefined);
      }
    });
    return unsubscribe;
  }, []);
  const value: AuthContextType = { currUser, register, login };
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
