import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #333;
`;

const TableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TableItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${props => props.$intensity > 5 ? '#f8d7da' : props.$intensity > 2 ? '#fff3cd' : '#f8f9fa'};
  border-radius: 8px;
  color: ${props => props.$intensity > 5 ? '#721c24' : props.$intensity > 2 ? '#856404' : '#333'};
`;

const TableNumber = styled.span`
  font-weight: 600;
`;

const ProblemCount = styled.span`
  font-weight: 700;
`;

const TableProblemHeatmap = ({ data }) => {
  return (
    <Container>
      <Title>Problem Hotspots (By Table)</Title>
      {data && data.length > 0 ? (
        <TableList>
          {data.map((item) => (
            <TableItem key={item.tableNumber} $intensity={item.problemCount}>
              <TableNumber>Table #{item.tableNumber}</TableNumber>
              <ProblemCount>{item.problemCount} issues</ProblemCount>
            </TableItem>
          ))}
        </TableList>
      ) : (
        <p style={{ color: '#999' }}>No table data available.</p>
      )}
    </Container>
  );
};

export default TableProblemHeatmap;
