import React, { createContext, useContext, useEffect, useState } from "react";
import { SortMetric, SortOrder } from "../helpers/tasks-sort";

function getInitialSortMetric(): SortMetric {
  let metricString: string | null = localStorage.getItem("metric");
  if (metricString == null) {
    return SortMetric.DATE_ADDED;
  } else {
    return metricString as SortMetric;
  }
}

function getInitialSortOrder(): SortOrder {
  let orderString: string | null = localStorage.getItem("order");
  if (orderString == null) {
    return SortOrder.DSC;
  } else {
    return orderString as SortOrder;
  }
}

interface UserPrefsType {
  sortMetric: SortMetric;
  setSortMetric: (metric: SortMetric) => void;
  sortOrder: SortOrder;
  setSortOrder: (metric: SortOrder) => void;
}

const UserPrefsContext = createContext<UserPrefsType | undefined>(undefined);

export const UserPrefsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortMetric, setSortMetric] =
    useState<SortMetric>(getInitialSortMetric);
  const [sortOrder, setSortOrder] = useState<SortOrder>(getInitialSortOrder);

  useEffect(() => {
    localStorage.setItem("metric", sortMetric);
  }, [sortMetric]);

  useEffect(() => {
    localStorage.setItem("order", sortOrder);
  }, [sortOrder]);

  const value = { sortMetric, setSortMetric, sortOrder, setSortOrder };

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
