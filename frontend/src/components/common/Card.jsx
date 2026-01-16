import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme, $padding }) => $padding || theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${({ $hoverable, theme }) =>
    $hoverable &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;

export const Card = ({ children, padding, hoverable = false, ...props }) => {
  return (
    <CardContainer $padding={padding} $hoverable={hoverable} {...props}>
      {children}
    </CardContainer>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
  hoverable: PropTypes.bool,
};
