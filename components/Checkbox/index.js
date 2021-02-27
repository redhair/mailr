import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from '../Typography';

const Wrapper = styled.div`
  position: relative;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;

  & input[type='checkbox'] {
    box-sizing: border-box;
    padding: 0;
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  input[type='checkbox']:checked + label {
    & span {
      &:first-child {
        background: ${(props) => props.theme.secondaryColor};
        border-color: ${(props) => props.theme.secondaryColor};
        animation: wave 0.4s ease;

        & svg {
          stroke-dashoffset: 0;
        }

        &:before {
          transform: scale(3.5);
          opacity: 0;
          transition: all 0.6s ease;
        }
      }
    }
  }

  @keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }

  & label {
    margin: auto;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;

    & span {
      display: inline-block;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);

      &:first-child {
        position: relative;
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border-radius: 3px;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid #9098a9;
        transition: all 0.2s ease;

        & svg {
          position: absolute;
          top: 3px;
          left: 2px;
          fill: none;
          stroke: #ffffff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }

        &:before {
          content: '';
          width: 100%;
          height: 100%;
          background: ${(props) => props.theme.secondaryColor};
          display: block;
          transform: scale(0);
          opacity: 1;
          border-radius: 50%;
        }
      }

      &:last-child {
        padding-left: 8px;
      }
    }

    &:hover span:first-child {
      border-color: ${(props) => props.theme.secondaryColor};
    }
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  withStrikethrough: PropTypes.bool,
  onChecked: PropTypes.func,
};

function Checkbox({ checked, name, label, withStrikethrough, onChecked }) {
  return (
    <Wrapper>
      <input checked={checked} id={name} name={name} type="checkbox" onChange={onChecked} />
      <label htmlFor={name}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <Text style={withStrikethrough ? { textDecoration: 'line-through' } : {}}>{label}</Text>
      </label>
    </Wrapper>
  );
}

export default Checkbox;
