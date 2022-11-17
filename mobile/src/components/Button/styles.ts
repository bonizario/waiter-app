import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? '#999999' : '#d73035;')};
  border-radius: 48px;
  padding: 14px 24px;
`;
