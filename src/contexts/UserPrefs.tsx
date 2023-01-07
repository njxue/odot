import React, { createContext, useContext, useEffect, useState } from "react";
import { SORT_ORDER } from "../helpers/tasks-sort";

function getInitialSortOrder(): SORT_ORDER {
  let orderString: string | null = localStorage.getItem("order");
  if (orderString == null) {
    return SORT_ORDER.DATE_ADDED;
  } else {
    return orderString as SORT_ORDER;
  }
}

interface UserPrefsType {
  sortOrder: SORT_ORDER;
  setSortOrder: (order: SORT_ORDER) => void;
}

const UserPrefsContext = createContext<UserPrefsType | undefined>(undefined);

export const UserPrefsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortOrder, setSortOrder] = useState<SORT_ORDER>(getInitialSortOrder);
 
  useEffect(() => {
    localStorage.setItem("order", sortOrder);
  }, [sortOrder]);

  const value = { sortOrder, setSortOrder };

  return (
    <UserPrefsContext.Provider value={value}>
      {children}
    </UserPrefsContext.Provider>
  );
};

export default function useUserPrefs(): UserPrefsType {
  const userPrefsContext = useContext(UserPrefsContext);

  if (userPrefsContext === undefined) {
    throw new Error("Error with UserPrefsContext");
  }
  return userPrefsContext;
}
