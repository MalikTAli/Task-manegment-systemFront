import { createContext, useContext, useState } from "react";

const FilterAndSearchContext = createContext();

export const FilterAndSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <FilterAndSearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
      }}
    >
      {children}
    </FilterAndSearchContext.Provider>
  );
};

export const useFilterAndSearch = () => useContext(FilterAndSearchContext);
