import { createContext, useState } from 'react';

const UserContext = createContext({
  token: null,
  setToken: () => {},
});

const UserProvider = ({ children }) => {
  const [token, setToken] = useState();

  const value = {
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
