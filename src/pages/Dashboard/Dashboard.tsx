import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text } from 'react-native';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import {
  Avatar,
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserName,
} from './styles';

export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => navigate('Profile')}>
          <Avatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <Text>Dashboard</Text>

      <Button onPress={signOut}>Sair!</Button>
    </Container>
  );
};
