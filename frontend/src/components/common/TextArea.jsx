import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.small.size};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledTextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.paper};
  font-size: ${({ theme }) => theme.typography.body.size};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.primary)};
    box-shadow: 0 0 0 3px ${({ theme, $error }) => ($error ? `${theme.colors.danger}33` : `${theme.colors.primary}33`)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`;

export const TextArea = ({ label, error, ...props }) => {
  return (
    <TextAreaWrapper>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <StyledTextArea $error={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </TextAreaWrapper>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
};
