import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.table`
  color: ${(props) => props.theme.textColor};
  border-collapse: collapse;
  width: 100%;
  font-family: ${(props) => props.theme.bodyFont};
`;
const Row = styled.tr`
  /* &:nth-child(even) {
    background: ${(props) => props.theme.backgroundColor};
  }

  &:nth-child(odd) {
    background: ${(props) => props.theme.blackBlueGrey};
  } */
  color: ${(props) => props.theme.blackBlueGrey};
  background: ${(props) => props.theme.backgroundColor};
`;
const Head = styled.thead`
  & ${Row} {
    background: ${(props) => props.theme.backgroundColor};
  }
`;
const Header = styled.th`
  height: 56px;
  padding: 0px 20px;
  text-align: left;
  padding-bottom: 24px;
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};
`;
const Body = styled.tbody``;

const Column = styled.td`
  padding: 20px;
  color: ${(props) => props.theme.textColor};
`;

function Table({ rows, headers, sortable, ...rest }) {
  const [sort, setSort] = useState({ order: null, key: null });
  function handleHeaderClick(idx) {
    if (!sortable) return;
    let key = Object.keys(rows[0]).filter((key) => key !== 'id' && key !== 'onRowClick')[idx];
    let order = sort.order < 0 ? 1 : -1;
    setSort({ order, key });
  }

  return (
    <Wrapper {...rest}>
      <Head>
        <Row>
          {headers.map((header, i) => (
            <Header sortable={sortable} key={`${header}_${i}`} align="left" onClick={() => handleHeaderClick(i)}>
              {header}
            </Header>
          ))}
        </Row>
      </Head>
      <Body>
        {rows
          .sort((a, b) => {
            if (a[sort.key] > b[sort.key]) return sort.order;
            if (a[sort.key] < b[sort.key]) return -1 * sort.order;
            return 0;
          })
          .map((row) => {
            return (
              <Row key={row.id} onClick={row.onRowClick}>
                {Object.keys(row)
                  .filter((key) => key !== 'id' && key !== 'onRowClick')
                  .map((column, i) => {
                    return <Column key={`Row_${row.id}_Column_${i}`}>{row[column]}</Column>;
                  })}
              </Row>
            );
          })}
      </Body>
    </Wrapper>
  );
}

Table.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      onRowClick: PropTypes.func,
    })
  ).isRequired,
  headers: PropTypes.array,
  sortable: PropTypes.bool,
};

export default Table;
