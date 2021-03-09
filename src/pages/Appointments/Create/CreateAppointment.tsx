import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../../hooks/useAuth';
import { Provider } from '../../../models/provider';
import { Api } from '../../../services/Api';
import {
  BackButton,
  Calendar,
  CalendarTitle,
  Container,
  DateContainer,
  DateText,
  Header,
  HeaderTitle,
  Hour,
  HourText,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  ProvidersList,
  ProvidersListContainer,
  Schedule,
  ScheduleTitle,
  Section,
  SectionBody,
  SectionTitle,
  UserAvatar,
} from './styles';

interface RouteParams {
  providerId: string;
}

interface DayAvaialability {
  hour: number;
  available: boolean;
}

export const CreateAppointment: React.FC = () => {
  const { providerId } = useRoute().params as RouteParams;

  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [dayAvailability, setDayAvailability] = useState<DayAvaialability[]>(
    [],
  );

  const { user } = useAuth();
  const { goBack } = useNavigation();

  const handleDateChange = useCallback((event: Event, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  useEffect(() => {
    Api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    Api.get<DayAvaialability[]>(
      `/providers/${selectedProvider}/day-availability`,
      {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      },
    ).then(response => {
      setDayAvailability(response.data);
    });
  }, [selectedDate, selectedProvider]);

  const formattedDate = useMemo(() => {
    return format(selectedDate, "EEEE, dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvailability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ScrollView>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={selectedProvider === provider.id}
                onPress={() => setSelectedProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />

                <ProviderName selected={selectedProvider === provider.id}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <CalendarTitle>Escolha uma data</CalendarTitle>

          <OpenDatePickerButton onPress={() => setShowDatePicker(true)}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={selectedDate}
              onChange={handleDateChange}
            />
          )}

          <DateContainer>
            <DateText>{formattedDate}</DateText>
          </DateContainer>
        </Calendar>

        <Schedule>
          <ScheduleTitle>Escolha um horário</ScheduleTitle>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionBody>
              {morningAvailability.map(({ formattedHour, available, hour }) => (
                <Hour
                  key={formattedHour}
                  available={available}
                  onPress={() => setSelectedHour(hour)}
                  selected={selectedHour === hour}
                >
                  <HourText selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionBody>
              {afternoonAvailability.map(
                ({ formattedHour, available, hour }) => (
                  <Hour
                    enabled={available}
                    key={formattedHour}
                    available={available}
                    onPress={() => setSelectedHour(hour)}
                    selected={selectedHour === hour}
                  >
                    <HourText selected={selectedHour === hour}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionBody>
          </Section>
        </Schedule>
      </ScrollView>
    </Container>
  );
};
