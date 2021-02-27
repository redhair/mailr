import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../components/Typography';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Column, Row } from '../../components/Grid';
import InputField from '../../components/InputField';
import LoadingBlock from '../../components/LoadingBlock';
import Alert from '../../components/Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { UserContext } from '../../components/UserProvider';
import { Line } from 'react-chartjs-2';
import Select from '../../components/Select';
import theme from '../../theme';
import { getSubscriberCounts, lastXDays } from '../../lib/utils';

Analytics.propTypes = {};

function Analytics(props) {
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [timeInterval, setTimeInterval] = useState({ labels: [], data: [] });
  const [dayOffset, setDayOffset] = useState(7);
  const { user } = useContext(UserContext);
  let result = [];

  useEffect(() => {
    if (user) {
      setSubscribers(user.subscribers);
    }
  }, [user]);

  useEffect(() => {
    // calculate time interval when either subscribers or day offset changes
    let freqs = getSubscriberCounts(subscribers, dayOffset);
    let dateLookback = lastXDays(dayOffset);
    console.log({ freqs, dateLookback });

    // merge freqs and week on week.name
    for (let j = 0; j < dateLookback.length; j++) {
      /// 29, 28, 27, etc...
      if (freqs[dateLookback[j].number]) {
        result.push({ ...freqs[dateLookback[j].number], number: dateLookback[j].number });
      } else {
        result.push({ count: 0, name: dateLookback[j].name, number: dateLookback[j].number });
      }
    }

    console.log({ result });

    setTimeInterval({
      labels: result.map((r) => {
        if (dayOffset === 7) {
          return r.name;
        } else {
          return r.number;
        }
      }),
      data: result.map((r) => {
        return r.count;
      }),
    });
  }, [dayOffset, subscribers]);

  const data = {
    labels: timeInterval.labels.reverse(),
    datasets: [
      {
        label: 'Subscribers',
        data: timeInterval.data.reverse(),
        fill: true,
        backgroundColor: '#c9e6ff',
        borderColor: theme.primaryColor,
      },
    ],
  };

  return (
    <Row justify="flex-start" align="flex-start" style={{ height: '100vh' }}>
      <Column xs={12} justify="flex-start" align="flex-start">
        <Row justify="flex-start" align="flex-start">
          <Column xs={12} justify="flex-start" align="flex-start">
            <Heading level={2}>Stats</Heading>
          </Column>
        </Row>
        <Row justify="flex-start" align="flex-start">
          <Column xs={7}></Column>
          <Column xs={5}>
            <Select
              onItemClick={(item) => {
                if (item.value === '7') {
                  setDayOffset(7);
                } else if (item.value === '28') {
                  setDayOffset(28);
                } else if (item.value === 'all') {
                  //get days between today and the account's age
                }
              }}
              items={[
                { name: '7 days', value: '7' },
                { name: '28 days', value: '28' },
                { name: 'All Time', value: 'all' },
              ]}
              name="timeframe"
              hideLabel
              placeholder="Timeframe"
              label="Timeframe"
            />
          </Column>
        </Row>
        <Row justify="flex-start" align="flex-start">
          <Column xs={12} justify="flex-start" align="flex-start">
            <Heading level={3} style={{ margin: '12px 0 24px' }}>
              Subscribers
            </Heading>
            <Line
              data={data}
              options={{
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        min: 0,
                        stepSize: 1,
                      },
                    },
                  ],
                },
              }}
            />
          </Column>
        </Row>
      </Column>
    </Row>
  );
}

export default Analytics;
