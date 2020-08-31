import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header1 = styled.h1`
  font-size: 48px;
  font-family: ${(props) => props.theme.headerFont};
  margin: 0;
  margin-bottom: 10px;
`;
const Header2 = styled.h2`
  font-size: 36px;
  font-family: ${(props) => props.theme.headerFont};
  margin: 0;
  margin-bottom: 10px;
`;
const Header3 = styled.h3`
  font-size: 28px;
  font-family: ${(props) => props.theme.headerFont};
  margin: 0;
  margin-bottom: 10px;
`;
const Header4 = styled.h4`
  font-size: 22px;
  font-family: ${(props) => props.theme.headerFont};
  margin: 0;
  margin-bottom: 5px;
`;
const Header5 = styled.h5`
  font-size: 16px;
  font-family: ${(props) => props.theme.headerFont};
  margin: 0;
  margin-bottom: 5px;
`;

const BodyText = styled.span`
  font-family: ${(props) => props.theme.bodyFont};
  font-size: ${(props) => (props.type === 'normal' ? '20px' : '16px')};
  line-height: ${(props) => (props.type === 'normal' ? '36px' : '24px')};
`;

function Heading({ level, children, ...rest }) {
  switch (level) {
    case 1:
      return <Header1 {...rest}>{children}</Header1>;
    case 2:
      return <Header2 {...rest}>{children}</Header2>;
    case 3:
      return <Header3 {...rest}>{children}</Header3>;
    case 4:
      return <Header4 {...rest}>{children}</Header4>;
    case 5:
      return <Header5 {...rest}>{children}</Header5>;
    default:
      return null;
  }
}

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node.isRequired,
};

function Text({ type, children, ...rest }) {
  return (
    <BodyText type={type} {...rest}>
      {children}
    </BodyText>
  );
}

Text.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Heading, Text };
