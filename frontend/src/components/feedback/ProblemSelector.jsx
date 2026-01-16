import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Chip = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => (props.$selected ? '#007bff' : '#ced4da')};
  background-color: ${props => (props.$selected ? '#e7f1ff' : '#fff')};
  color: ${props => (props.$selected ? '#007bff' : '#495057')};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => (props.$selected ? '#d0e2ff' : '#f8f9fa')};
  }
`;

const PROBLEMS = [
  'Slow service',
  'Food quality',
  'Cold food',
  'Staff behavior',
  'Cleanliness',
  'Noise',
  'Price',
  'Other'
];

const ProblemSelector = ({ selectedProblems, onChange }) => {
  const toggleProblem = (problem) => {
    if (selectedProblems.includes(problem)) {
      onChange(selectedProblems.filter(p => p !== problem));
    } else {
      onChange([...selectedProblems, problem]);
    }
  };

  const handleNoProblem = () => {
     if (selectedProblems.includes('No problem')) {
         onChange([]);
     } else {
         onChange(['No problem']);
     }
  };

  return (
    <Container>
      <Chip
        $selected={selectedProblems.includes('No problem')}
        onClick={handleNoProblem}
      >
        No problem
      </Chip>
      {PROBLEMS.map(problem => (
        <Chip
          key={problem}
          $selected={selectedProblems.includes(problem)}
          onClick={() => {
              if (selectedProblems.includes('No problem')) {
                  // If "No problem" was selected, clear it and select this one
                  onChange([problem]);
              } else {
                  toggleProblem(problem);
              }
          }}
        >
          {problem}
        </Chip>
      ))}
    </Container>
  );
};

export default ProblemSelector;
