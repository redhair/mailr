import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.header`
  ${(props) =>
    props.isFixed &&
    `
    position: fixed;
    left: 0;
    width: 100%;
    top: 0;
    z-index: 10;
    box-sizing: border-box;
  `};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 52px;
  margin-bottom: 16px;
  z-index: 100;
  /* position: relative; */
  box-shadow: '0px 16px 7px -10px rgba(200, 203, 216, 0.26)';
  /* border-bottom: 2px solid #eceef4; */
  align-items: center;

  @media (min-width: ${(props) => props.theme.xs}) {
    background: ${(props) => props.theme.backgroundColor};
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    background: ${(props) => props.theme.backgroundColor};
    padding: 16px 16px;
  }
`;

export default Wrapper;
