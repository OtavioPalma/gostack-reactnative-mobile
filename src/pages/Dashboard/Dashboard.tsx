import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>

      <Button onPress={signOut}>Sair!</Button>
    </View>
  );
};
