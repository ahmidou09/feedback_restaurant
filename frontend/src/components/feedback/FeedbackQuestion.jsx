import React from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  margin-bottom: 24px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #333;
  font-weight: 600;
`;

const FeedbackQuestion = ({ title, children, required = false }) => {
  return (
    <QuestionContainer>
      <Title>
        {title} {required && <span style={{ color: 'red' }}>*</span>}
      </Title>
      {children}
    </QuestionContainer>
  );
};

export default FeedbackQuestion;
