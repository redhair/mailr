import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  font-family: ${(props) => props.theme.bodyFont};
  font-weight: 500;
  font-size: 16px;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  /* text-transform: uppercase; */
  display: inline-block;
  outline: 0;
  padding: ${(props) => props.theme.buttonPadding};
  border-radius: 50px;
  border: 1px solid transparent;
  margin: 10px 0;
  box-shadow: ${(props) => props.theme.buttonShadow};
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, background 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:disabled {
    /* background: rgba(87, 197, 155, 0.66); */
    color: #f3f3f3;

    /*color: #8898aa;*/
    border-color: auto;
    box-shadow: none;
    cursor: default;
    cursor: not-allowed;
  }

  &:hover {
    text-decoration: none;
  }

  &:active {
    box-shadow: ${(props) => props.theme.buttonShadowDepressed};
  }

  &:focus {
    /*outline: 0;*/
  }

  & + & {
    margin-left: 15px;
  }

  ${(props) => {
    if (props.level === 'primary') {
      return `
        color: rgb(242, 242, 242);
        background: ${props.theme.primaryColor};

        &:active {
          background: darken(${props.theme.primaryColor}, 5%);
        }
      `;
    } else if (props.level === 'secondary') {
      return `  
        color: rgb(242, 242, 242);
        background: ${props.theme.secondaryColor};

        &:active {
          background: darken(${props.theme.secondaryColor}, 5%);
        }

        &:disabled {
          background: rgba(87, 197, 155, 0.66);
          color: #f3f3f3;
          border-color: auto;
          box-shadow: none;
          cursor: default;
          cursor: not-allowed;
        }
      `;
    } else if (props.level === 'danger') {
      return `
        color: rgb(242, 242, 242);
        background: ${props.theme.dangerColor};

        &:active {
          background: darken(${props.theme.dangerColor}, 5%);
        }
      `;
    } else if (props.level === 'outline') {
      return `
        color: #505050;
        background: transparent;
        border: 1px solid #d2dce0;
        box-shadow: none;

        &:active {
          box-shadow: none;
        }
      `;
    } else if (props.level === 'link') {
      return `
        background: transparent;
        margin: 0;
        text-align: left;
        border: none;
        box-shadow: none;
        color: #21242a;
        font-weight: bold;
        -webkit-text-decoration: none;
        text-decoration: none;
        padding: 20px 0;

        &:active {
          box-shadow: none;
        }
      `;
    }
  }}
`;

export default function Button({ level, children, fullWidth, ...rest }) {
  return (
    <ButtonWrapper level={level} fullWidth={fullWidth} {...rest}>
      {children}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  level: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
};
