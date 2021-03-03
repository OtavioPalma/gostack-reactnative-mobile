import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 18px;
  font-family: 'NotoSansJP-Medium';

  padding-top: 0;
  padding-bottom: 0;
`;

export const Icon = styled(FeatherIcon)`
  margin: auto 16px auto 0;
`;
