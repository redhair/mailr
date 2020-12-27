import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Heading, Text } from '../../components/Typography';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Row } from '../../components/Grid';
import { useSession, signin } from 'next-auth/client';
import LoadingBlock from '../../components/LoadingBlock';
import { UserContext } from '../../components/UserProvider';

Subscribers.propTypes = {};

const PaginationButton = styled(Button)`
  color: ${(props) => (props.active ? props.theme.primaryColor : 'auto')};
  background: ${(props) => (props.active ? '#e9edf0' : 'auto')};
  padding: 12px 16px;
  margin: 0px;
  margin-top: 16px;
  margin-bottom: 16px;

  &:hover {
    background: #e9edf0;
  }

  & + & {
    margin-left: 5px;
  }
`;
const MainHeading = styled(Heading)`
  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 1em;
  }
`;
function Subscribers(props) {
  const { user } = useContext(UserContext);
  const [fetching, setFetching] = useState();
  const [page, setPage] = useState(0);
  const subscribersPerPage = 10;

  useEffect(() => {});

  if (user) {
    return (
      <>
        <Head>
          <title>Subscribers</title>
        </Head>
        <MainHeading level={1}>Subscribers</MainHeading>
        {user && user.subscribers.length > 0 && !fetching ? (
          <>
            <Row justify="flex-end">
              <Button
                level="primary"
                onClick={() => {
                  const items = user.subscribers.filter((s) => s.email);
                  const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
                  const header = ['email'];
                  let csv = items.map((row) =>
                    header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
                  );
                  csv.unshift(header.join(','));
                  csv = csv.join('\r\n');

                  let csvContent = 'data:text/csv;charset=utf-8,' + csv;
                  let encodedUri = encodeURI(csvContent);
                  var link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', 'mailr_export.csv');
                  document.body.appendChild(link);

                  link.click();
                }}
              >
                Export
              </Button>
            </Row>
            <Table
              rows={
                user &&
                user.subscribers
                  .filter((s) => s.email)
                  .map((s) => {
                    return { id: s._id, email: s.email, firstName: s.firstName, lastName: s.lastName };
                  })
                  .slice(page * subscribersPerPage, page * subscribersPerPage + subscribersPerPage)
              }
              headers={['Email', 'First Name', 'Last Name']}
            />
            <>
              {[...Array(Math.ceil(user.subscribers.filter((s) => s.email).length / subscribersPerPage)).keys()].map(
                (num, i) => (
                  <PaginationButton key={i} active={page === num} level="link" onClick={() => setPage(num)}>
                    {num + 1}
                  </PaginationButton>
                )
              )}
            </>
          </>
        ) : fetching ? (
          <LoadingBlock />
        ) : (
          <>
            <Heading level={4}>No Subscribers, yet.</Heading>
            <Text>Share your link around and when someone subscribes you will see them here!</Text>
          </>
        )}
      </>
    );
  } else {
    return (
      <div style={{ height: '80vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoadingBlock />
      </div>
    );
  }
}

export default Subscribers;
