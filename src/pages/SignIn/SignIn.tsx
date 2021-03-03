import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import {
  Container,
  CreateAccount,
  CreateAccountText,
  ForgotPassword,
  ForgotPasswordText,
  Title,
} from './styles';

export const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />

            <View>
              <Title>Entre com sua conta</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => console.log('object')}>Entrar</Button>

            <ForgotPassword
              activeOpacity={0.9}
              onPress={() => console.log('object')}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount activeOpacity={0.9} onPress={() => console.log('object')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar Conta</CreateAccountText>
      </CreateAccount>
    </>
  );
};
