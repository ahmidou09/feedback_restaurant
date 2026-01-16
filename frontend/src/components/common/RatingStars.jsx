import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const StarContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const StarIcon = styled(FaStar)`
  cursor: pointer;
  color: ${props => (props.$active ? '#ffc107' : '#e4e5e9')};
  font-size: 2rem;
  transition: color 0.2s;

  &:hover {
    color: #ffc107;
  }
`;

const RatingStars = ({ value, onChange, readOnly = false }) => {
  const [hover, setHover] = useState(null);

  return (
    <StarContainer>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              style={{ display: 'none' }}
              onClick={() => !readOnly && onChange(ratingValue)}
            />
            <StarIcon
              $active={ratingValue <= (hover || value)}
              onMouseEnter={() => !readOnly && setHover(ratingValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
            />
          </label>
        );
      })}
    </StarContainer>
  );
};

export default RatingStars;
