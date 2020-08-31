import styled from 'styled-components';

const Hamburger = styled.div`
  display: none;
  width: 25px;
  height: 3px;
  background-color: #bbbcdd;
  background-clip: padding-box;
  border-bottom: 7px solid transparent;
  cursor: pointer;

  &:before {
    width: 25px;
    height: 3px;
    top: -7px;
    content: ' ';
    position: absolute;
    background-color: #bbbcdd;
    background-clip: padding-box;
    border-bottom: 7px solid transparent;
  }

  &:after {
    width: 25px;
    height: 3px;
    top: 7px;
    content: ' ';
    position: absolute;
    background-color: #bbbcdd;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    display: flex;
  }

  @media (min-width: ${(props) => props.theme.xl}) {
    display: none;
  }
`;

export default Hamburger;
