import React from 'react';
import styled from 'styled-components';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ProblemName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-transform: capitalize;
`;

const ProblemsSummary = ({ data }) => {
  return (
    <Card style={{ flex: 1 }}>
      <Title>Top Problems</Title>
      {data && data.length > 0 ? (
        <List>
          {data.map((item) => (
            <ListItem key={item._id}>
              <ProblemName>{item._id}</ProblemName>
              <Badge type="warning">{item.count}</Badge>
            </ListItem>
          ))}
        </List>
      ) : (
        <p style={{ color: '#999' }}>No problems reported yet.</p>
      )}
    </Card>
  );
};

export default ProblemsSummary;
