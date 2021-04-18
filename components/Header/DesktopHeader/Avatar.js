import styled from 'styled-components';
import Button from '../../Button';
import { Text } from '../../Typography';
import Link from 'next/link';

const AvatarImage = styled.img`
  width: 30px;
  border-radius: 100%;
  margin-left: 10px;
`;

const Greeting = styled(Text)`
  color: #5498ff;
`;

const AvatarButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  /* background: ${(props) => {
    return `linear-gradient(90deg, ${props.theme.primaryColor}, #4c9fff)`;
  }}; */
  background: ${(props) => props.theme.darkBlackBlue};
  box-shadow: none;

  &:hover {
    background: #5599ff66;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    padding: 6px 12px;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    padding: 6px 30px;
  }
`;

function Avatar({ user, onClick }) {
  return (
    <AvatarButton level="primary" onClick={onClick}>
      <Greeting style={{ fontWeight: '700' }}>{!!user.name ? `Hi, ${user.name}!` : 'Account'}</Greeting>
      <AvatarImage src={(!!user && user.image) || '/default_user.png'} alt="Profile Avatar" />
    </AvatarButton>
  );
}

export default Avatar;
