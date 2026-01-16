import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const typeStyles = {
  success: css`
    background-color: ${({ theme }) => `${theme.colors.success}20`};
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => `${theme.colors.success}40`};
  `,
  warning: css`
    background-color: ${({ theme }) => `${theme.colors.warning}20`};
    color: ${({ theme }) => theme.colors.warning};
    border: 1px solid ${({ theme }) => `${theme.colors.warning}40`};
  `,
  danger: css`
    background-color: ${({ theme }) => `${theme.colors.danger}20`};
    color: ${({ theme }) => theme.colors.danger};
    border: 1px solid ${({ theme }) => `${theme.colors.danger}40`};
  `,
  info: css`
    background-color: ${({ theme }) => `${theme.colors.primary}20`};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
  `,
  neutral: css`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
  `,
};

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;

  ${({ $type }) => typeStyles[$type] || typeStyles.neutral}
`;

export const Badge = ({ children, type = 'neutral', ...props }) => {
  return (
    <StyledBadge $type={type} {...props}>
      {children}
    </StyledBadge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'danger', 'info', 'neutral']),
};
