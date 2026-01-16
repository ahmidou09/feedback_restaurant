import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background-color: white;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: white;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dangerDark};
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.small.size};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.body.size};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  
  /* Apply variant styles */
  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary}

  /* Apply size styles */
  ${({ $size }) => sizeStyles[$size] || sizeStyles.md}

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: 2px;
  }
`;

export const Button = ({ children, variant = 'primary', size = 'md', fullWidth = false, ...props }) => {
  return (
    <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};
