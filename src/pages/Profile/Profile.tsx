import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../models/auth';
import { Api } from '../../services/Api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Avatar, AvatarButton, BackButton, Container, Title } from './styles';

interface FormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const Profile: React.FC = () => {
  const ref = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  const { user, updateUser } = useAuth();

  const handleAvatarChange = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      async response => {
        if (response.errorCode) {
          Alert.alert('Erro ao acessar fotos do dispositivo');
        } else {
          const data = new FormData();

          data.append('avatar', {
            type: 'image/png',
            uri: response.uri,
            name: `${user.id}.jpg`,
          });

          const updatedUser = await Api.patch<User>('/users/avatar', data);

          Alert.alert('Avatar atualizado!');

          updateUser(updatedUser.data);
        }
      },
    );
  }, [updateUser, user]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (password: string) => password.length > 0,
            then: Yup.string().min(6, 'Nova senha deve ter ao menos 6 dígitos'),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (password: string) => password.length > 0,
              then: Yup.string().min(
                6,
                'Confirmação de senha deve ter ao menos 6 dígitos',
              ),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha deve ser igual a nova senha',
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password && {
            old_password,
            password,
            password_confirmation,
          }),
        };

        const updatedUser = await Api.put<User>('/profile', formData);

        updateUser(updatedUser.data);

        Alert.alert(
          'Perfil atualizado!',
          'Informações do perfil atualizadas com sucesso!',
        );

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao atualizar perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente',
        );
      }
    },
    [goBack, updateUser],
  );

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 24,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <AvatarButton onPress={handleAvatarChange}>
            <Avatar source={{ uri: user.avatar_url }} />
          </AvatarButton>

          <View>
            <Title>Meu Perfil</Title>
          </View>

          <Form
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
            ref={ref}
          >
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
              containerStyle={{ marginTop: 16 }}
              secureTextEntry
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              textContentType="newPassword"
            />

            <Input
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Nova Senha"
              textContentType="newPassword"
            />

            <Input
              secureTextEntry
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar nova senha"
              textContentType="newPassword"
              onSubmitEditing={() => ref.current?.submitForm()}
            />

            <View>
              <Button onPress={() => ref.current?.submitForm()}>Salvar</Button>
            </View>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
