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
    const token = localStorage.getItem('@Ponteflix:token');
    const user = localStorage.getItem('@Ponteflix:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ login, senha }) => {
    const response = await api.post('sessions', {
      login,
      senha,
    });

    const params = response.data[0];

    const { id, nome, token } = params;

    const user: User = {
      id,
      login,
      nome,
    };

    localStorage.setItem('@Ponteflix:token', token);
    localStorage.setItem('@Ponteflix:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Ponteflix:token');
    localStorage.removeItem('@Ponteflix:user');

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
