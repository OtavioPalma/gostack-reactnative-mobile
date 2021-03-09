import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { AuthContextData, AuthState } from '../models/auth';
import { Api } from '../services/Api';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        Api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await Api.post<AuthState>('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    Api.defaults.headers.authorization = `Bearer ${token}`;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    setData({} as AuthState);
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
