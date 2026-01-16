import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const MainLayout = () => {
  return (
    <LayoutContainer>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;
