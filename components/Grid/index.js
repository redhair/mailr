import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
  width: auto;

  @media only screen and (min-width: ${(props) => props.theme.xs}) {
    max-width: ${(props) => props.theme.gridXsWidth};
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.gutterXs};
  }
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    max-width: ${(props) => props.theme.gridSmWidth};
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.gutterSm};
  }
  @media only screen and (min-width: ${(props) => props.theme.md}) {
    max-width: ${(props) => props.theme.gridMdWidth};
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.gutterMd};
  }
  @media only screen and (min-width: ${(props) => props.theme.lg}) {
    max-width: ${(props) => props.theme.gridLgWidth};
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.gutterLg};
  }
  @media only screen and (min-width: ${(props) => props.theme.xl}) {
    width: 100%;
    max-width: ${(props) => props.theme.gridXlWidth};
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.gutterXl};
  }
  @media only screen and (min-width: ${(props) => props.theme.xxl}) {
    max-width: ${(props) => props.theme.gridXxlWidth};
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.gutterXxl};
  }
`;

Container.propTypes = {};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? props.align : 'center')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  box-sizing: border-box;
  width: 100%;
  padding: 0 4px;

  @media (min-width: ${(props) => props.theme.xs}) {
    display: ${(props) => (props.xs === 0 ? 'none' : 'flex')};
    max-width: ${(props) => (props.xs ? getColumnWidth(props.xs) : 'none')};
    flex: ${(props) => (props.xs ? `0 0 ${props.xs && getColumnWidth(props.xs)}` : 'none')};
  }
  @media (min-width: ${(props) => props.theme.sm}) {
    display: ${(props) => (props.sm === 0 ? 'none' : 'flex')};
    max-width: ${(props) => (props.sm ? getColumnWidth(props.sm) : '')};
    flex: ${(props) => (props.sm ? `0 0 ${props.sm && getColumnWidth(props.sm)}` : '')};
  }
  @media (min-width: ${(props) => props.theme.md}) {
    display: ${(props) => (props.md === 0 ? 'none' : 'flex')};
    max-width: ${(props) => (props.md ? getColumnWidth(props.md) : '')};
    flex: ${(props) => (props.md ? `0 0 ${props.md && getColumnWidth(props.md)}` : '')};
  }
  @media (min-width: ${(props) => props.theme.lg}) {
    display: ${(props) => (props.lg === 0 ? 'none' : 'flex')};
    max-width: ${(props) => (props.lg ? getColumnWidth(props.lg) : '')};
    flex: ${(props) => (props.lg ? `0 0 ${props.lg && getColumnWidth(props.lg)}` : '')};
  }
  @media (min-width: ${(props) => props.theme.xl}) {
    display: ${(props) => (props.xl === 0 ? 'none' : 'flex')};
    max-width: ${(props) => (props.xl ? getColumnWidth(props.xl) : '')};
    flex: ${(props) => (props.xl ? `0 0 ${props.xl && getColumnWidth(props.xl)}` : '')};
  }
  @media (min-width: ${(props) => props.theme.xxl}) {
    display: ${(props) => (props.xxl === 0 ? 'none' : 'flex')};
    max-width: ${(props) => (props.xxl ? getColumnWidth(props.xxl) : '')};
    flex: ${(props) => (props.xxl ? `0 0 ${props.xl && getColumnWidth(props.xxl)}` : '')};
  }
`;

Column.propTypes = {
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  xl: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  xxl: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  align: PropTypes.string,
  justify: PropTypes.string,
};

const Row = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.canWrap ? 'wrap' : 'nowrap')};
  align-items: ${(props) => (props.align ? props.align : 'center')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  width: 100%;
  box-sizing: border-box;

  &.no-gutters {
    margin-right: 0;
    margin-left: 0;

    & > ${Column} {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

Row.propTypes = {
  canWrap: PropTypes.bool,
  align: PropTypes.string,
  justify: PropTypes.string,
};

function getColumnWidth(size) {
  return Number.isInteger(size) ? `${100 / (12 / size)}%` : 'auto';
}

export { Container, Row, Column };
