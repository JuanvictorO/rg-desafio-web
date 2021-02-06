import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../shared/services/api';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  login: string;
  senha: string;
}

interface User {
  id: number;
  nome: string;
  login: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Recipes:token');
    const user = localStorage.getItem('@Recipes:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ login, senha }) => {
    const response = await api.post('sessions', {
      login,
      senha,
    });

    const params = response.data;

    const { token } = params;
    const { id, nome } = params.user;

    const user: User = {
      id,
      login,
      nome,
    };

    localStorage.setItem('@Recipes:token', token);
    localStorage.setItem('@Recipes:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Recipes:token');
    localStorage.removeItem('@Recipes:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
        token: data.token,
        // eslint-disable-next-line prettier/prettier
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
