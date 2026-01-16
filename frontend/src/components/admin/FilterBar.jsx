import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Select name="rating" value={filters.rating || ''} onChange={handleChange}>
        <option value="">All Ratings</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </Select>

      <Select name="problem" value={filters.problem || ''} onChange={handleChange}>
        <option value="">All Problems</option>
        <option value="Slow service">Slow service</option>
        <option value="Food quality">Food quality</option>
        <option value="Cold food">Cold food</option>
        <option value="Staff behavior">Staff behavior</option>
        <option value="Cleanliness">Cleanliness</option>
        <option value="Noise">Noise</option>
        <option value="Price">Price</option>
        <option value="Other">Other</option>
        <option value="No problem">No problem</option>
      </Select>
    </Container>
  );
};

export default FilterBar;
