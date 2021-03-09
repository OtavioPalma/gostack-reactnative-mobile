import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Provider } from '../../../models/provider';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'NotoSansJP-Regular';
  font-size: 20px;
  line-height: 24px;
  margin-left: 16px;
`;

export const BackButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-size: 16px;
  line-height: 22px;

  font-family: 'NotoSansJP-Medium';
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const CalendarTitle = styled.Text`
  font-family: 'NotoSansJP-Medium';
  color: #f4ede8;
  font-size: 24px;
  line-height: 28px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  margin: 0 24px;
  background: #ff9000;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'NotoSansJP-Medium';
  font-size: 16px;
  line-height: 20px;

  color: #232129;
`;

export const DateContainer = styled.View`
  padding: 12px;
  height: 46px;
  margin: 12px 24px 0;
  border-radius: 10px;
  background: #3e3b47;

  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  color: #f4ede8;
  font-family: 'NotoSansJP-Medium';
  font-size: 16px;
  line-height: 18px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const ScheduleTitle = styled.Text`
  font-family: 'NotoSansJP-Medium';
  color: #f4ede8;
  font-size: 24px;
  line-height: 28px;
  margin: 0 24px 24px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  line-height: 22px;
  color: #999591;
  font-family: 'NotoSansJP-Regular';

  margin: 0 24px 12px;
`;

export const SectionBody = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  border-radius: 10px;
  margin-right: 8px;

  background: ${props => (props.selected ? '#ff9900' : '#3e3b47')};
  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'NotoSansJP-Medium';
  font-size: 16px;
  line-height: 18px;
`;

export const ButtonContainer = styled(RectButton)`
  height: 50px;
  margin: 0 24px 24px;
  border-radius: 10px;

  background: #ff9000;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: 'NotoSansJP-Medium';
  font-size: 18px;
  line-height: 22px;

  color: #232129;
`;
