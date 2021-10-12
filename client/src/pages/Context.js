import { createContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext({
  token: null,
  setToken: () => {},
});

const UserProvider = ({ children }) => {
  const [token, setToken] = useState();

  const value = useMemo(() => ({
    token,
    setToken,
  }));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
