import React from 'react';
import { Image } from 'react-native';
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Container, Title } from './styles';

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />

      <Title>Entre com sua conta</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => console.log('object')}>Entrar</Button>
    </Container>
  );
};
