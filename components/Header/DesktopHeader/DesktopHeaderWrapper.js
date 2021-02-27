import styled from 'styled-components';
import { Container } from '../../Grid';

const DesktopHeaderWrapper = styled(Container)`
  width: 100%;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    /* color: black; */
    transition: all 120ms ease-in-out;

    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    display: flex;
  }

  &::after {
    content: '';
    position: absolute;
    width: 1px;
    background: linear-gradient(180deg, rgba(39, 58, 85, 0), #273a55 50.65%, rgba(39, 58, 85, 0));
    top: 0;
    bottom: 0;
    right: -1px;
  }
`;

export default DesktopHeaderWrapper;
