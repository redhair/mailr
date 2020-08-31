import styled from 'styled-components';

const DesktopHeaderWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
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
`;

export default DesktopHeaderWrapper;
