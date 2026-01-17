import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.png';
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
  padding: 20px;
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-top: 40px; /* Space for the absolute button */
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 159, 28, 0.1);
  border: 1px solid #ff9f1c;
  color: #ff9f1c;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  z-index: 10;

  &:hover {
    background: #ff9f1c;
    color: #121212;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 159, 28, 0.3);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const RestaurantName = styled.h1`
  font-size: 1.8rem;
  color: #ff9f1c;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
`;

const TableInfo = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 5px 15px;
  border-radius: 12px;
  display: inline-block;
  margin-top: 5px;
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

      <HeaderContainer>
        <BackButton onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Menu
        </BackButton>
        <Logo src={logo} alt="Aji Naklou Logo" />
        <RestaurantName>Votre Avis Compte</RestaurantName>
        <TableInfo>Table #{tableId}</TableInfo>
      </HeaderContainer>

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
