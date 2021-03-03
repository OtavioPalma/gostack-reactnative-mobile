import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { getValidationErrors } from '../../utils/getValidationErrors';
import {
  Container,
  CreateAccount,
  CreateAccountText,
  ForgotPassword,
  ForgotPasswordText,
  Title,
} from './styles';

interface FormData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const ref = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: FormData) => {
      try {
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        Alert.alert('Erro ao acessar conta', 'Credenciais inválidas');
      }
    },
    [signIn],
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Image source={logo} />

          <View>
            <Title>Entre com sua conta</Title>
          </View>

          <Form onSubmit={handleSignIn} ref={ref}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
            />
            <Input
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              textContentType="newPassword"
              onSubmitEditing={() => ref.current?.submitForm()}
            />

            <View>
              <Button onPress={() => ref.current?.submitForm()}>Entrar</Button>
            </View>
          </Form>

          <ForgotPassword activeOpacity={0.9}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </KeyboardAvoidingView>

      <CreateAccount
        activeOpacity={0.9}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar Conta</CreateAccountText>
      </CreateAccount>
    </ScrollView>
  );
};
