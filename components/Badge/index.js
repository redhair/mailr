import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf(['primary', 'danger', 'warning', 'secondary', 'success']),
};

const Wrapper = styled.div`
  padding: 0px 8px;
  color: white;
  border-radius: 50px;
  background: ${(props) =>
    props.level === 'primary'
      ? props.theme.primaryColor
      : props.level === 'danger'
      ? props.theme.dangerColor
      : props.level === 'success'
      ? props.theme.successColor
      : props.level === 'warning'
      ? props.theme.warningColor
      : props.level === 'secondary'
      ? props.theme.secondaryColor
      : 'lightgrey'};
`;

function Badge({ level, children }) {
  return <Wrapper level={level}>{children}</Wrapper>;
}

export default Badge;
