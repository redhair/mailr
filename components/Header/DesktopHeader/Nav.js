import styled from 'styled-components';

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  align-self: stretch;

  & span {
    font-size: 18px;
  }

  & a {
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    color: #334150;
    font-family: 'Rubik', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 18px;
    margin: 0 40px;
    text-decoration: none;
    border-bottom: 4px solid transparent;

    &:hover {
      border-color: ${(props) => props.theme.secondaryColor};
    }
  }

  & a + a {
    margin-left: 0;
  }

  @media (max-width: ${(props) => props.theme.md}) {
    display: none;
  }
`;

export default Nav;