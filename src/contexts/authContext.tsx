import { createContext, useCallback, useContext, FC, useState } from 'react';

import { IUser } from 'models/IUser';

interface IUserSignIn {
  email: string;
  password: string;
}

export interface IActions {
  login: (user: IUserSignIn) => Promise<boolean>;
  createUser: (user: IUser) => Promise<boolean>;
  updateUser: (data: any) => Promise<boolean>;
  logout: () => Promise<void>;
}

export interface IAuthState {
  user?: IUser;
}

export const AuthContext = createContext<{
  state: IAuthState;
  actions: IActions;
}>({
  state: {
    user: undefined,
  },
  actions: {
    createUser: () => Promise.reject(),
    login: () => Promise.reject(),
    logout: () => Promise.reject(),
    updateUser: () => Promise.reject(),
  },
});

const AuthContextProvider: FC = ({ children }) => {
  const [user] = useState();

  const login = useCallback(() => Promise.reject(), []);

  const updateUser = useCallback(() => Promise.reject(), []);

  const createUser = useCallback(() => Promise.reject(), []);

  const logout = useCallback(() => Promise.reject(), []);

  const actions: IActions = {
    login,
    createUser,
    logout,
    updateUser,
  };
  const state: IAuthState = {
    user,
  };

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IActions & IAuthState => {
  const { state, actions } = useContext(AuthContext);
  return Object.assign(actions, state);
};

export { useAuth };

export default AuthContextProvider;
