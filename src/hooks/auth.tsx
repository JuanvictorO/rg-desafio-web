import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../shared/services/api';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Ponteflix:token');
    const user = localStorage.getItem('@Ponteflix:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, _password }) => {
    /*
    // Commented use fake login
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user }: AuthState = response.data;
    */

    const token = '12345678910';

    const user = {
      id: 1,
      name: 'Matheus de Castro',
      email,
    };

    localStorage.setItem('@Ponteflix:token', token);
    localStorage.setItem('@Ponteflix:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Ponteflix:token');
    localStorage.removeItem('@Ponteflix:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
