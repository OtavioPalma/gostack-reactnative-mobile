import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Container, GoBack, GoBackText, Title } from './styles';

export const SignUp: React.FC = () => {
  const navigation = useNavigation();

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

          <Input name="name" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => console.log('object')}>Cadastrar</Button>
        </Container>
      </KeyboardAvoidingView>

      <GoBack activeOpacity={0.9} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <GoBackText>Voltar para o acesso</GoBackText>
      </GoBack>
    </ScrollView>
  );
};
