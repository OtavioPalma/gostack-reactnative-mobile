import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 64px;
`;

export const AvatarButton = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 186px;
  height: 186px;

  border-radius: 98px;
  margin-top: -20px;

  align-self: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 24px;

  color: #f4ede8;
  font-family: 'NotoSansJP-Medium';
  margin: 24px 0 24px;
`;
