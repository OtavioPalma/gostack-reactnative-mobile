import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { Provider } from '../../models/provider';
import { Api } from '../../services/Api';
import {
  Avatar,
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  ProviderAvatar,
  ProviderContainer,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,
  ProvidersList,
  ProvidersListTitle,
  UserName,
} from './styles';

export const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    Api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

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

      <ProvidersList
        contentContainerStyle={{ paddingBottom: 36 }}
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() =>
              navigate(`CreateAppointment`, { providerId: provider.id })
            }
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />

                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />

                <ProviderMetaText>08:00 às 18:00</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />

      <Button onPress={signOut}>Sair!</Button>
    </Container>
  );
};
