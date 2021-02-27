import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import { Row } from '../Grid';
import { Text } from '../Typography';

const QTY_BLOCK_WIDTH = 10;

const Wrapper = styled.div`
  width: 100%;
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 50px;
  width: 100%;
  position: relative;

  & .input-range__slider {
    appearance: none;
    background: ${(props) => props.theme.inputRangeSliderBackground};
    border: ${(props) => props.theme.inputRangeSliderBorder};
    border-radius: 100%;
    cursor: pointer;
    display: block;
    height: 25px;
    margin-left: -12.5px;
    margin-top: -17px;
    outline: none;
    position: absolute;
    top: 50%;
    transition: ${(props) => props.theme.inputRangeSliderTransition};
    width: 25px;
    box-shadow: 0px 4px 7.6px 0.4px rgba(20, 75, 157, 0.24);

    &:active {
      transform: ${(props) => props.theme.inputRangeSliderActiveTransform};
    }

    &:focus {
      box-shadow: 0 0 0
        ${(props) =>
          `${props.theme.inputRangeSliderFocusBoxShadowRadius} ${props.theme.inputRangeSliderFocusBoxShadowColor}`};
    }

    .input-range--disabled & {
      background: ${(props) => props.theme.inputRangeSliderDisabledBackground};
      border: ${(props) => props.theme.inputRangeSliderDisabledBorder};
      box-shadow: none;
      transform: none;
    }
  }

  & .input-range__slider-container {
    transition: ${(props) => props.theme.inputRangeSliderContainerTransition};

    &:hover .range-tooltip,
    &:active .range-tooltip {
      /*display: block !important;*/
    }
  }

  & .input-range__label {
    color: ${(props) => props.theme.inputRangeLabelColor};
    font-family: ${(props) => props.theme.inputRangeFontFamily};
    font-weight: bold;
    font-size: ${(props) => props.theme.inputRangeLabelFontSize};
    transform: translateZ(0);
    white-space: nowrap;
  }

  & .input-range__label--min,
  & .input-range__label--max {
    display: none;
    bottom: -55px;
    position: absolute;
    color: ${(props) => props.theme.textColor};
    border-style: solid;
    border-width: 1px;
    border-color: rgb(217, 226, 229);
    border-radius: 4px;
    background: ${(props) => props.theme.backgroundColor};
    width: 80px;
    height: 44px;
    justify-content: center;
    align-items: center;
  }

  & .input-range__label--min {
    left: 0;
  }

  & .input-range__label--max {
    right: 0;
  }

  & .input-range__label--value {
    position: absolute;
    top: ${(props) => props.theme.inputRangeLabelValuePositionTop};

    & .range-tooltip {
      display: none;
      position: absolute;
      top: -75px;
      left: -45px;
      background: ${(props) => props.theme.backgroundColor};
      color: ${(props) => props.theme.textColor};
      box-shadow: 0px 4px 7.6px 0.4px rgba(20, 75, 157, 0.24);
      border-radius: 4px;
      padding: 10px 20px;
    }
  }

  & .input-range__label-container {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: relative;

    .input-range__label--max & {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  & .input-range__track {
    background: ${(props) => props.theme.inputRangeTrackBackground};
    border-radius: 4px;
    cursor: pointer;
    display: block;
    height: 7px;
    position: relative;
    transition: ${(props) => props.theme.inputRangeTrackTransition};

    .input-range--disabled & {
      background: ${(props) => props.theme.inputRangeTrackDisabledBackground};
    }
  }

  & .input-range__track--background {
    left: 0;
    margin-top: -0.5 * ${(props) => props.theme.inputRangeTrackHeight};
    position: absolute;
    right: 0;
    top: 50%;
  }

  & .input-range__track--active {
    background: ${(props) => props.theme.inputRangeTrackActiveBackground};
  }

  & .input-range {
    height: 25px;
    position: relative;
    width: 100%;
  }
`;

const Distribution = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  width: ${() => `calc(100% - ${QTY_BLOCK_WIDTH}px)`};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const QuantityBlock = styled.div`
  height: ${(props) => `${props.height * 15}px`};
  max-height: 65px;
  width: ${() => `${QTY_BLOCK_WIDTH}px`};
  background: #e1e7eb;
  position: absolute;
  left: ${(props) => `${props.offset}%`};
`;

const Tooltip = styled.div`
  color: ${(props) => props.theme.textColor};

  border-style: solid;
  border-width: 1px;
  border-color: rgb(217, 226, 229);
  border-radius: 4px;
  background: ${(props) => props.theme.backgroundColor};
  width: 80px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

Range.propTypes = {
  items: function (props, propName) {
    const val = props[propName];
    if (!Array.isArray(val)) {
      return new Error(`${propName} must be an array`);
    }
    if (val.length === 0 || val.length === 1) {
      return new Error(`${propName} must have at least two elements`);
    }
    let sorted = val.sort((a, b) => a - b);
    let min = sorted[0];
    let max = sorted[sorted.length - 1];
    if (max <= min) {
      return new Error(`${propName} must have at least two elements of different values`);
    }
    val.forEach(function (elem) {
      if (typeof elem !== 'number') {
        return new Error(`${propName} must only contain numbers`);
      }
    });
  },
  name: PropTypes.string.isRequired,
  onRangeChange: PropTypes.func,
  defaultMax: PropTypes.number,
  defaultMin: PropTypes.number,
  defaultValue: PropTypes.number,
  withDistribution: PropTypes.bool,
  withSingleValue: PropTypes.bool,
  step: PropTypes.number,
};

function Range({
  items,
  onRangeChange,
  withDistribution,
  withSingleValue,
  defaultValue,
  defaultMin,
  defaultMax,
  step,
  ...rest
}) {
  let sorted = items.sort((a, b) => a - b);
  const hi = sorted[sorted.length - 1];
  const lo = sorted[0];
  const totalDistance = hi - lo;
  const [value, setValue] = useState(
    withSingleValue
      ? defaultValue
      : {
          min: defaultMin ? defaultMin : lo,
          max: defaultMax ? defaultMax : hi,
        }
  );

  let freqs = {};
  for (let i = 0; i < sorted.length; i++)
    if (freqs[sorted[i]]) freqs[sorted[i]]++;
    else freqs[sorted[i]] = 1;

  return (
    <Wrapper {...rest}>
      <RangeContainer>
        <>
          {withDistribution && (
            <Distribution>
              {sorted
                .filter((el, i, a) => i === a.indexOf(el))
                .map((item, i) => {
                  const offset = item - lo;
                  const percentageOffset = (offset / totalDistance) * 100;
                  const height = freqs[item];

                  return (
                    <QuantityBlock
                      key={`QtyBlock_${i}__${percentageOffset}`}
                      offset={percentageOffset}
                      height={height}
                    />
                  );
                })}
            </Distribution>
          )}

          <InputRange
            step={step || 5}
            maxValue={hi}
            minValue={lo}
            formatLabel={(value) => {
              return <div className="range-tooltip">{value}</div>;
            }}
            value={value}
            onChange={(value) => {
              setValue(value);
              onRangeChange(value);
            }}
            onChangeComplete={onRangeChange}
          />
        </>
      </RangeContainer>
      <Row justify="space-between" style={{ marginTop: '25px' }}>
        <>
          {withSingleValue ? (
            <></>
          ) : (
            <>
              <Tooltip>
                <Text>{value.min}</Text>
              </Tooltip>
              <Tooltip>
                <Text>{value.max}</Text>
              </Tooltip>
            </>
          )}
        </>
      </Row>
    </Wrapper>
  );
}

export default Range;
