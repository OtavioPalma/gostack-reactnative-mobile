import React from 'react';
import { Image } from 'react-native';
import logo from '../../assets/logo.png';
import { Container, Title } from './styles';

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />

      <Title>Entre com sua conta</Title>
    </Container>
  );
};
