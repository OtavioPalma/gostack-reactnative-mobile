import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../../hooks/useAuth';
import {
  BackButton,
  Container,
  Header,
  HeaderTitle,
  UserAvatar,
} from './styles';

interface RouteParams {
  providerId: string;
}

export const CreateAppointment: React.FC = () => {
  const { providerId } = useRoute().params as RouteParams;
  const { signOut, user } = useAuth();
  const { goBack } = useNavigation();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  );
};
