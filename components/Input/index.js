import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'formik';

const Wrapper = styled.div`
  width: 100%;

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
    }
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  font-family: ${(props) => props.theme.bodyFont};
  color: ${(props) => props.theme.textColor};
`;

const Input = styled(Field)`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 5px 0;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.inputBorderRadius};
  background: ${(props) => props.theme.backgroundColor};
  border: 1px solid #d2dce0;
  width: 100%;
  outline: 0;
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 700;
  font-family: ${(props) => props.theme.bodyFont};
  color: ${(props) => props.theme.textColor};

  &::placeholder {
    color: #747e90;
  }

  &:disabled {
    background: #f1f4f6;
    cursor: default;

    &::placeholder {
      background: darken($secondary-color, 10%);
      color: #8898aa !important;
      cursor: default;
      text-decoration: line-through;
    }
  }
`;

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

InputWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

function InputWrapper({ name, label, type, hideLabel, placeholder, style }) {
  return (
    <Wrapper style={style}>
      <Label style={hideLabel ? visuallyHiddenStyles : { textTransform: 'capitalize' }} htmlFor={name}>
        {label}
      </Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </Wrapper>
  );
}

export default InputWrapper;
