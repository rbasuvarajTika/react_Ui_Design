import { createContext, useState } from 'react';

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [users, setUsers] = useState([]);

  const setUsersData = (data) => {
    console.log("Setting users data in context:", data);

    setUsers(data);
  };

  return (
    <AdminContext.Provider value={{ selectedUserData, setSelectedUserData, users, setUsersData }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
