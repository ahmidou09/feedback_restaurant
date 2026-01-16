import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    font-size: ${({ theme }) => theme.typography.body.size};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.h1.weight};
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 { font-size: ${({ theme }) => theme.typography.h1.size}; }
  h2 { font-size: ${({ theme }) => theme.typography.h2.size}; }
  h3 { font-size: ${({ theme }) => theme.typography.h3.size}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    outline: none;
  }

  /* Custom Scrollbar for better UX */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary}; // Use secondary color or a lighter shade
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

export default GlobalStyles;
