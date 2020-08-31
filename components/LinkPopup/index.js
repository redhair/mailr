import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../Typography';
import { Row } from '../Grid';
import Input from '../Input';
import Button from '../Button';

const CopyButton = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding: 13px 30px;
  font-size: 23px;
  position: relative;
  outline: 0;
  border-color: #eee;
`;

const CopyInput = styled.input`
  background: #eee;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 15px 30px;
  border: 0;
  outline: 0;
  width: 100%;
  font-family: ${(props) => props.theme.bodyFont};
  font-size: 24px;
`;

const CopyText = styled(Text)`
  color: ${(props) => props.theme.primaryColor};
  font-size: 14px;
  position: absolute;
  top: ${(props) => (props.show ? '-23px' : '-15px')};
  left: 14px;
  opacity: ${(props) => (props.show ? 100 : 0)};

  transition: opacity 0.1s cubic-bezier(0.3, 0, 0.45, 1), top 0.15s cubic-bezier(0.3, 0, 0.45, 1);
`;

LinkPopup.propTypes = {};

function LinkPopup(props) {
  const [showCopyText, setShowCopyText] = useState(false);

  const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div>
      <Heading level={2}>Here's your Link!</Heading>
      <Text>Put this link in your bio, description, or anywhere you want people to join your mailing list!</Text>
      <Row style={{ marginTop: '25px' }}>
        <CopyInput
          readOnly
          autoFocus
          onFocus={(event) => event.target.select()}
          value={'https://mailr.link/' + props.link}
        />
        <CopyButton
          level="outline"
          onClick={() => {
            setShowCopyText(true);
            copyToClipboard('https://mailr.link/' + props.link);
          }}
        >
          <CopyText show={showCopyText}>Copied!</CopyText>
          <i className="far fa-clipboard"></i>
        </CopyButton>
      </Row>
    </div>
  );
}

export default LinkPopup;
