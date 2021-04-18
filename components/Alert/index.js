import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Typography';

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  border-radius: 4px;
  text-align: left;
  box-sizing: border-box;
  font-size: 14px;
  margin: 10px 0;
  background: ${(props) => {
    switch (props.type) {
      case 'info':
        return `${props.theme.lightPrimaryColor}`;
      case 'success':
        return `${props.theme.lightSecondaryColor}`;
      case 'warning':
        return `${props.theme.lightWarningColor}`;
      case 'danger':
        return `${props.theme.lightDangerColor}`;
      default:
        return 'lightgrey';
    }
  }};

  & span {
    color: ${(props) => props.theme.black};
  }
`;

export default function Alert({ type, children, style }) {
  function getIcon(type) {
    switch (type) {
      case 'info':
        return <i className="fas fa-info-circle" />;
      case 'success':
        return <i className="fas fa-check-circle" />;
      case 'danger':
        return <i className="fas fa-exclamation-triangle" />;
      case 'warning':
        return <i className="fas fa-exclamation-circle" />;
      default:
        return <i className="fas fa-info-circle" />;
    }
  }

  return (
    <Wrapper type={type} style={style}>
      <Text style={{ marginRight: '15px' }}>{getIcon(type)}</Text>
      <Text>{children || 'Unknown Error: Try again later.'}</Text>
    </Wrapper>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};
