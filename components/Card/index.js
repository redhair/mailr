import styled from 'styled-components';

const Card = styled.div`
  & ul {
    list-style: none;
    padding: 0;
    list-style-position: outside;
  }

  & li {
    font-size: 20px;
    margin-bottom: 10px;
    list-style-position: inside;
    padding-left: 25px;

    & i {
      margin-left: -25px;
    }
  }

  padding: 40px;
  margin-bottom: 25px;
  position: relative;
  background: ${(props) => props.theme.backgroundColor};
  /* width: 100%; */
  min-width: 100%;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${(props) => props.theme.primaryColor};
  box-shadow: 0px 3px 49px 0px rgba(24, 38, 107, 0.16);
  box-sizing: border-box;

  @media (min-width: ${(props) => props.theme.xs}) {
    padding: 20px;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 40px;
  }
`;

export default Card;
