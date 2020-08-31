import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  width: 100%;
  max-width: 300px;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  color: ${(props) => (props.active ? props.theme.primaryColor : '#8898aa')};
  border-color: ${(props) => (props.active ? props.theme.primaryColor : 'transparent')};

  &:hover {
    text-decoration: none;
  }

  &:active,
  &:focus {
    color: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.primaryColor};
  }
`;

const TabWrapper = ({ title, active, onClick, index }) => (
  <Tab onClick={() => onClick(index)} index={index} active={active}>
    {title}
  </Tab>
);

TabWrapper.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default TabWrapper;
