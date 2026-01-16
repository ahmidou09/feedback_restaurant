import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from './Button';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 90%; // Mobile first width
  max-width: ${({ $maxWidth }) => $maxWidth || '500px'};
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.2s ease-out;
  position: relative;
`;

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.h3.size};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`;

const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background}; // Slight differentiation
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const Modal = ({ isOpen, onClose, title, children, footer, maxWidth }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer 
        $maxWidth={maxWidth} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <Header>
          <h3>{title}</h3>
          <CloseButton onClick={onClose} aria-label="Close modal">&times;</CloseButton>
        </Header>
        <Content>{children}</Content>
        {footer && <Footer>{footer}</Footer>}
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  maxWidth: PropTypes.string,
};
