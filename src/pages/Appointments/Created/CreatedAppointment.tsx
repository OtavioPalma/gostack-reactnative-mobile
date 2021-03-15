import { useNavigation, useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Button, ButtonText, Container, Description, Title } from './styles';

interface RouteParams {
  date: number;
}

export const CreatedAppointment: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleSubmit = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm 'horas'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento Concluído</Title>

      <Description>{formattedDate}</Description>

      <Button onPress={handleSubmit}>
        <ButtonText>Ok</ButtonText>
      </Button>
    </Container>
  );
};
