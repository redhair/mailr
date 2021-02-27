import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 72px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.theme.backgroundColor};
  /* border-bottom: 1px solid #eceef4; */
  justify-items: flex-start;

  & a {
    color: #21242a;
    font-weight: bold;
    text-decoration: none;
    padding: 20px 0;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    padding: 0px;
    width: 100%;
    top: 160px;
    left: 0;
    right: 0;
    height: auto;
    display: flex;
    flex-direction: row;

    & button,
    & i {
      display: none;
    }

    & a {
      color: #21242a;
      font-weight: bold;
      text-decoration: none;
      padding: 10px;
    }
  }

  @media (min-width: ${(props) => props.theme.md}) {
    /* padding: 20px 50px; */
    /* width: 150px; */

    & span {
      display: inline;
    }

    & a {
      color: #21242a;
      font-weight: bold;
      text-decoration: none;
      padding: 20px;
    }
  }
`;

export default Nav;
