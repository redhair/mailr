import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../Typography';
import { Row, Column } from '../../Grid';
import { UserContext } from '../../UserProvider';
import Button from '../../Button';

AccountInfo.propTypes = {};

const Gradient = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 24px;
  background: ${(props) => {
    return `linear-gradient(90deg, ${props.theme.primaryColor}, #4c9fff)`;
  }};
  border-radius: 8px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 24px;
`;

const CopyInput = styled.input`
  background: ${(props) => props.theme.black};
  border-radius: 50px;
  padding: 15px 30px;
  border: 0;
  outline: 0;
  width: 100%;
  font-family: ${(props) => props.theme.bodyFont};
  font-size: 24px;
  color: ${(props) => props.theme.textColor};

  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 12px;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    font-size: 18px;
  }
`;

const Wrapper = styled.div`
  & button {
    color: #5498ff !important;
  }
`;

function AccountInfo() {
  const { user } = useContext(UserContext);

  return (
    <Wrapper>
      <Heading style={{ marginBottom: '18px' }} level={3}>
        Account
      </Heading>
      <Gradient>
        {!!user && <Avatar src={user.image} alt="Avatar" />}
        <Row>
          <Column xs={6}>{!!user && <Text>Subscribers: {user.subscribers.length}</Text>}</Column>
          <Column xs={6}>{!!user && <Text>Plan: {user.plan}</Text>}</Column>
        </Row>
      </Gradient>
      <Row style={{ marginTop: '25px' }}>
        {!!user && (
          <>
            <CopyInput
              readOnly
              autoFocus
              onFocus={(event) => event.target.select()}
              value={'https://mailr.link/' + user.link}
            />
          </>
        )}
      </Row>
      <Row style={{ marginTop: '12px' }} justify="space-between">
        <Button level="link">
          <i class="fas fa-copy" style={{ marginRight: '8px' }}></i>Copy Link
        </Button>
        <Button level="link">
          <i class="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>Logout
        </Button>
      </Row>
    </Wrapper>
  );
}

export default AccountInfo;
