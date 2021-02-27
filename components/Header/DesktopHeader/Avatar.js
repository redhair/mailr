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
      <Greeting style={{ fontWeight: '700' }}>Hi, {!!user.name && user.name}!</Greeting>
      <AvatarImage
        src={'https://avatars.githubusercontent.com/u/38800293?s=460&u=5d923acd138af28b0fa742b967b0da33a48f4434&v=4'}
        alt="Profile Avatar"
      />
    </AvatarButton>
  );
}

export default Avatar;
