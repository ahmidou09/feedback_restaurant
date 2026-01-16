import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 20px;
`;

const Icon = styled(FaCheckCircle)`
  color: #28a745;
  font-size: 4rem;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const HomeLink = styled(Link)`
  color: #007bff;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const ThankYouPage = () => {
  return (
    <Container>
      <Icon />
      <Title>Thank You!</Title>
      <Message>We appreciate your feedback. It helps us improve our service.</Message>
      {/* <HomeLink to="/">Back to Home</HomeLink> */}
    </Container>
  );
};

export default ThankYouPage;
