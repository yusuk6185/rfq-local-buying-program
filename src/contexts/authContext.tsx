import {
  createContext,
  useCallback,
  useContext,
  FC,
  useState,
  useEffect,
} from 'react';

import jwtDecode from 'jwt-decode';
import realRequest from 'utils/realRequest';

import { IUser } from 'models/IUser';

export interface IActions {
  login: (Email: string, Password: string) => Promise<boolean>;
  createUser: (user: any) => Promise<any>;
  updateUser: (data: any) => Promise<boolean>;
  logout: () => void;
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
    logout: () => {},
    updateUser: () => Promise.reject(),
  },
});

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  useEffect(() => {
    const tempRefreshToken = localStorage.getItem('refreshToken');
    if (tempRefreshToken) {
      setRefreshToken(tempRefreshToken);
    }
    const tempToken = localStorage.getItem('token');
    if (tempToken) {
      setToken(tempToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token, refreshToken]);

  const login = useCallback(async (Email: string, Password: string) => {
    const response = await realRequest.post('/api/auth/login', {
      Email,
      Password,
    });
    localStorage.setItem('token', response.data?.tokens?.accessToken);
    setToken(response.data?.tokens?.accessToken);

    localStorage.setItem('refreshToken', response.data?.tokens?.refreshToken);
    setRefreshToken(response.data?.tokens?.refreshToken);
    return true;
  }, []);

  const updateUser = useCallback(() => Promise.reject(), []);

  const createUser = useCallback(
    async (userValue: any) => {
      await realRequest.post('/api/auth/signup', userValue);
      return login(userValue.Email, userValue.Password);
    },
    [login],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(undefined);
    setRefreshToken(undefined);
    setUser(undefined);
  }, []);

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
