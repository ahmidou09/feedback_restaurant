import React from 'react';
import styled from 'styled-components';
import { FaStar, FaExclamationCircle } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 15px;
  border-left: 5px solid ${props => (props.$rating >= 4 ? '#28a745' : props.$rating >= 3 ? '#ffc107' : '#dc3545')};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TableInfo = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
`;

const DateText = styled.div`
  color: #999;
  font-size: 0.85rem;
`;

const RatingsRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  color: #555;
  font-size: 0.9rem;
`;

const RatingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StarIcon = styled(FaStar)`
  color: #ffc107;
`;

const ProblemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const ProblemTag = styled.span`
  background-color: #ffeeba;
  color: #856404;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Comment = styled.p`
  color: #444;
  font-style: italic;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
`;

const FeedbackItem = ({ feedback }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card $rating={feedback.ratings.overall}>
      <Header>
        <TableInfo>Table #{feedback.table?.number || '?'}</TableInfo>
        <DateText>{formatDate(feedback.createdAt)}</DateText>
      </Header>

      <RatingsRow>
        <RatingItem>
          <StarIcon /> <strong>{feedback.ratings.overall}</strong> Overall
        </RatingItem>
        <RatingItem>Food: {feedback.ratings.food}</RatingItem>
        <RatingItem>Service: {feedback.ratings.service}</RatingItem>
        <RatingItem>Cleanliness: {feedback.ratings.cleanliness}</RatingItem>
      </RatingsRow>

      {feedback.problems && feedback.problems.length > 0 && (
        <ProblemsContainer>
          {feedback.problems.map((prob, index) => (
            <ProblemTag key={index}>
              <FaExclamationCircle /> {prob}
            </ProblemTag>
          ))}
        </ProblemsContainer>
      )}

      {feedback.comment && <Comment>"{feedback.comment}"</Comment>}
    </Card>
  );
};

export default FeedbackItem;
