import React from 'react';
import styled from 'styled-components';
import { Card } from '../common/Card';

const Value = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.h2.weight};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.small.size};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatsCard = ({ label, value }) => {
  return (
    <Card style={{ flex: 1, minWidth: '200px', textAlign: 'center' }}>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Card>
  );
};

export default StatsCard;
