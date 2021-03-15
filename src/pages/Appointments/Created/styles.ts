import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'NotoSansJP-Medium';
  font-size: 32px;
  line-height: 36px;

  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  font-family: 'NotoSansJP-Regular';
  font-size: 18px;
  line-height: 20px;

  margin-top: 16px;
  text-align: center;
`;

export const Button = styled(RectButton)`
  height: 50px;
  margin-top: 24px;
  padding: 12px 24px;
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
