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
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Container, GoBack, GoBackText, Title } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const ref = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: FormData) => {
      try {
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha deve ter ao menos 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        // await Api.post('/users', data);

        Alert.alert('Cadastro realizado!', 'Você já pode acessar sua conta');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        Alert.alert('Erro ao criar conta', 'Dados inválidos');
      }
    },
    [navigation],
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
            <Title>Crie sua conta</Title>
          </View>

          <Form onSubmit={handleSignUp} ref={ref}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
            />
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
              textContentType="newPassword"
              onSubmitEditing={() => ref.current?.submitForm()}
            />

            <View>
              <Button onPress={() => ref.current?.submitForm()}>
                Cadastrar
              </Button>
            </View>
          </Form>
        </Container>
      </KeyboardAvoidingView>

      <GoBack activeOpacity={0.9} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <GoBackText>Voltar para o acesso</GoBackText>
      </GoBack>
    </ScrollView>
  );
};
