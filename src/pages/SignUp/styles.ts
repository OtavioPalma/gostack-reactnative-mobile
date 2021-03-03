import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'NotoSansJP-Medium';
  margin: 64px 0 24px;
`;

export const GoBack = styled.TouchableOpacity`
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;

  padding: 16px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GoBackText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'NotoSansJP-Regular';
  margin-left: 16px;
`;
