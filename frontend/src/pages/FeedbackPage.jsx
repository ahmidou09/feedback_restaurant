import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import FeedbackQuestion from '../components/feedback/FeedbackQuestion';
import RatingStars from '../components/common/RatingStars';
import ProblemSelector from '../components/feedback/ProblemSelector';
import { Button } from '../components/common/Button';
import { TextArea } from '../components/common/TextArea';
import Spinner from '../components/common/LoadingSpinner';
import { submitFeedback } from '../services/feedbackService';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const RestaurantName = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TableInfo = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => `${theme.colors.danger}20`};
  border: 1px solid ${({ theme }) => `${theme.colors.danger}40`};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const RecommendContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const FeedbackPage = () => {
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();

  const [ratings, setRatings] = useState({
    overall: 0,
    food: 0,
    service: 0,
    cleanliness: 0,
  });
  const [problems, setProblems] = useState([]);
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    
    // Validation
    if (!ratings.overall || !ratings.food || !ratings.service || !ratings.cleanliness || !recommend) {
      setError('Please answer all required questions.');
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    try {
      await submitFeedback({
        restaurantId,
        tableId,
        ratings,
        problems,
        comment,
        recommend,
      });
      navigate('/thank-you');
    } catch (err) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Helmet>
        <title>Provide Feedback</title>
      </Helmet>

      <Header>
        <RestaurantName>Restaurant Feedback</RestaurantName>
        <TableInfo>Table #{tableId}</TableInfo>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FeedbackQuestion title="How was your overall experience?" required>
        <RatingStars
          value={ratings.overall}
          onChange={(val) => handleRatingChange('overall', val)}
        />
      </FeedbackQuestion>

      <FeedbackQuestion title="How was the food quality?" required>
        <RatingStars
          value={ratings.food}
          onChange={(val) => handleRatingChange('food', val)}
        />
      </FeedbackQuestion>

      <FeedbackQuestion title="How was the service?" required>
        <RatingStars
          value={ratings.service}
          onChange={(val) => handleRatingChange('service', val)}
        />
      </FeedbackQuestion>

      <FeedbackQuestion title="How was the cleanliness?" required>
        <RatingStars
          value={ratings.cleanliness}
          onChange={(val) => handleRatingChange('cleanliness', val)}
        />
      </FeedbackQuestion>

      <FeedbackQuestion title="Did you face any problems?">
        <ProblemSelector
          selectedProblems={problems}
          onChange={setProblems}
        />
      </FeedbackQuestion>

      <FeedbackQuestion title="Any other comments? (Optional)">
        <TextArea
          placeholder="Tell us more..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={250}
        />
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>
          {comment.length}/250
        </div>
      </FeedbackQuestion>

      <FeedbackQuestion title="Would you recommend us?" required>
        <RecommendContainer>
          {['Yes', 'Maybe', 'No'].map(option => (
            <Button
              key={option}
              variant={recommend === option ? 'primary' : 'secondary'}
              onClick={() => setRecommend(option)}
              style={{ flex: 1 }}
            >
              {option}
            </Button>
          ))}
        </RecommendContainer>
      </FeedbackQuestion>

      <ButtonContainer>
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleSubmit} 
          disabled={loading}
          size="lg"
        >
          {loading ? <Spinner /> : 'Submit Feedback'}
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
};

export default FeedbackPage;
