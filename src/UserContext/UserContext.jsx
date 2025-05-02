import { createContext, useContext, useState, useEffect } from "react";
import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage(import.meta.env.VITE_ENCRYPT_KEY, {
  storageType: "localStorage",
});

// Create User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = encryptStorage.getItem("user");
    return savedUser ? savedUser : null;
  });

  // Save user data to encrypted storage whenever it updates
  useEffect(() => {
    if (user) {
      encryptStorage.setItem("user", user);
    } else {
      encryptStorage.removeItem("user");
    }
  }, [user]);

  // Login Function (Stores user data)
  const login = (userData) => {
    setUser(userData);
  };

  // Logout Function (Clears user data)
  const logout = () => {
    setUser(null);
  };

  // Update User Data
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use User Context
export const useUser = () => {
  return useContext(UserContext);
};
