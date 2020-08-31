import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 72px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-right: 1px solid #ccc;
  justify-items: flex-start;

  & a {
    color: #21242a;
    font-weight: bold;
    text-decoration: none;
    padding: 20px 0;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    padding: 20px 25px;
    width: auto;

    & span {
      display: none;
    }
  }

  @media (min-width: ${(props) => props.theme.md}) {
    padding: 20px 50px;
    width: 150px;

    & span {
      display: inline;
    }
  }
`;

export default Nav;
