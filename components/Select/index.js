import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../Typography';
import { Row } from '../Grid';
import styled from 'styled-components';

const visuallyHiddenStyles = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
};

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  font-family: ${(props) => props.theme.bodyFont};
`;

const Wrapper = styled.div`
  position: relative;
  margin: 5px 0;
  box-sizing: border-box;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: ${(props) => (props.dropdownVisible ? '0px' : '4px')};
  border-bottom-left-radius: ${(props) => (props.dropdownVisible ? '0px' : '4px')};
  background-color: ${(props) => props.theme.backgroundColor}; /*rgb(241, 244, 246);*/
  border: 1px solid #d2dce0;
  width: 100%;
  outline: 0;
  font-size: 16px;
  /* font-weight: 700; */
  padding: 15px 20px;
  font-family: ${(props) => props.theme.bodyFont};

  &::placeholder {
    color: #828282;
  }

  & + .error-message {
    padding-left: 5px;
    margin: 0;
    color: ${(props) => props.theme.dangerColor};
    font-size: 14px;
    font-weight: 700;
    font-family: ${(props) => props.theme.bodyFont};
    width: 100%;
    text-align: left;

    &::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: '\f06a'+ ' ';
      color: ${(props) => props.theme.textColor};
      background: ${(props) => props.theme.textColor};
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 53px;
  margin: 0 -1px;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 16px 7px -10px rgba(200, 203, 216, 0.26);
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #d2dce0;
  background: ${(props) => props.theme.backgroundColor};

  display: ${(props) => (props.dropdownVisible ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
`;

const Item = styled.div`
  padding: 16px 20px;
  background: ${(props) => props.theme.backgroundColor};
  text-align: left;
  font-family: ${(props) => props.theme.bodyFont};
  color: ${(props) => props.theme.textColor};

  & + & {
    border-top: 1px solid #d2dce0;
  }

  ${(props) =>
    !props.disabled
      ? `
          cursor: pointer;

          &:hover {
            color: ${(props) => props.theme.primaryColor} !important;
          }
        `
      : `
          color: grey; 
          cursor: default;
        `};
`;

function Select({ items, name, placeholder, label, hideLabel, onItemClick, ...rest }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const filteredItems = items;

  return (
    <>
      <Label style={hideLabel ? visuallyHiddenStyles : { textTransform: 'capitalize' }} htmlFor={name}>
        {label}
      </Label>
      <Wrapper
        {...rest}
        dropdownVisible={dropdownVisible}
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        <Row justify="space-between">
          <Text>{items[selectedIdx].name}</Text>
          <Text>
            <i className="fas fa-chevron-down"></i>
          </Text>
        </Row>

        <Dropdown dropdownVisible={dropdownVisible}>
          {filteredItems.length > 0 ? (
            filteredItems.map((i, idx) => (
              <Item
                key={i.value + '_' + idx}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownVisible(false);
                  setSelectedIdx(idx);
                  onItemClick(i);
                }}
              >
                {i.name}
              </Item>
            ))
          ) : (
            <Item disabled={true}>No results found</Item>
          )}
        </Dropdown>
      </Wrapper>
    </>
  );
}

Select.propTypes = {
  items: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export default Select;
