import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading } from '../Typography';

function randomLoadingMessage() {
  let lines = ['Loading...'];

  return lines[Math.round(Math.random() * (lines.length - 1))];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const Circles = styled.div`
  width: auto;
  text-align: center;

  & > div {
    width: ${(props) => (props.small ? '8px' : '16px')};
    height: ${(props) => (props.small ? '8px' : '16px')};
    margin: ${(props) => (props.small ? '0 4px' : '0 8px')};
    background-color: ${(props) => (props.color ? props.color : props.theme.textColor)};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: scaleUpDown 1.5s infinite ease-in-out both;
    animation: scaleUpDown 1.5s infinite ease-in-out both;
  }

  & .circle1 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  & .circle2 {
    -webkit-animation-delay: -0.15s;
    animation-delay: -0.15s;
  }

  @-webkit-keyframes scaleUpDown {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes scaleUpDown {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

const Message = styled(Heading)`
  margin-top: 20px;
  color: ${(props) => (props.color ? props.color : props.theme.textColor)};
`;

const LoadingBlock = ({ quiet, color, small, ...rest }) => (
  <Wrapper {...rest}>
    <Circles color={color} small={small}>
      <div className="circle1" />
      <div className="circle2" />
      <div className="circle3" />
    </Circles>
    {!quiet && (
      <Message level={3} color={color}>
        {randomLoadingMessage()}
      </Message>
    )}
  </Wrapper>
);

LoadingBlock.propTypes = {
  quiet: PropTypes.bool,
  color: PropTypes.string,
  small: PropTypes.bool,
};

export default LoadingBlock;
