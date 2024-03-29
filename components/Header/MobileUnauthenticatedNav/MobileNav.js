import styled from 'styled-components';
import { Row } from '../../Grid';

const MobileNav = styled(Row)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & a,
  & button {
    width: auto;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    justify-content: flex-start;
    color: ${(props) => props.theme.textColor};
    font-family: 'Rubik', sans-serif;
    font-weight: 900;
    margin: 16px 10px !important;
    border-radius: 0;
    padding: 0;
    /* text-transform: uppercase; */
    font-size: 18px;
    text-decoration: none;
    border-bottom: 4px solid transparent;

    &:hover {
      color: ${(props) => props.theme.secondaryColor};
    }
  }
`;

export default MobileNav;
