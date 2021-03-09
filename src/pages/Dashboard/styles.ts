import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'NotoSansJP-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'NotoSansJP-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
