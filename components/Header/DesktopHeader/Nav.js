import styled from 'styled-components';
import Button from '../../Button';

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  & button + button {
    margin-left: 32px !important;
  }

  /* & span {
    font-size: 18px;
  } */

  & a {
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    color: ${(props) => props.theme.textColor};
    /* font-family: 'Rubik', sans-serif; */
    /* font-weight: 900; */
    /* text-transform: uppercase; */
    /* font-size: 18px; */
    margin-right: 40px;
    /* text-decoration: none; */
    /* border-bottom: 4px solid transparent; */

    /* &:hover {
      border-color: ${(props) => props.theme.secondaryColor};
    } */
  }

  & a + a {
    margin-left: 0;
  }

  @media (max-width: ${(props) => props.theme.md}) {
    display: none;
  }
`;

export default Nav;
