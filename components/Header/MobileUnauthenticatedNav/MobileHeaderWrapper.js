import styled from 'styled-components';
import { Row } from '../../Grid';

const MobileHeaderWrapper = styled(Row)`
  z-index: 9;

  a {
    text-decoration: none;
    color: black;
    transition: all 120ms ease-in-out;

    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    display: flex;
    h1 {
      font-size: 24px;
    }
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    h1 {
      font-size: 36px;
    }
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    display: none;
  }
`;

export default MobileHeaderWrapper;
