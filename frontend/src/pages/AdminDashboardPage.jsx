import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { getStats, getFeedback, getAnalytics } from '../services/adminService';
import StatsCard from '../components/admin/StatsCard';
import FilterBar from '../components/admin/FilterBar';
import FeedbackItem from '../components/admin/FeedbackItem';
import ProblemsSummary from '../components/admin/ProblemsSummary';
import TableProblemHeatmap from '../components/admin/TableProblemHeatmap';
import Spinner from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { logout } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const PageContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LogoButton = styled(Link)`
  display: block;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 50px; /* Adjust size as needed */
    width: auto;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const AnalyticsGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2.size};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  background: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    rating: '',
    problem: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, analyticsData, feedbackData] = await Promise.all([
        getStats(),
        getAnalytics(),
        getFeedback(filters),
      ]);
      setStats(statsData);
      setAnalytics(analyticsData);
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Handle error (maybe redirect to login if 401)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading && !stats) {
    return (
      <PageContainer>
        <Spinner />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Header>
        <LogoButton to="/">
          <img src={logo} alt="Resto Logo" />
        </LogoButton>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => navigate('/admin/tables')} variant="secondary">
            Manage Tables
          </Button>
          <Button onClick={handleLogout} variant="danger">Logout</Button>
        </div>
      </Header>

      {stats && (
        <StatsGrid>
          <StatsCard label="Total Feedback" value={stats.overview.totalFeedback} />
          <StatsCard label="Avg Overall" value={stats.overview.avgOverall?.toFixed(1) || '-'} />
          <StatsCard label="Avg Food" value={stats.overview.avgFood?.toFixed(1) || '-'} />
          <StatsCard label="Avg Service" value={stats.overview.avgService?.toFixed(1) || '-'} />
        </StatsGrid>
      )}

      {analytics && (
        <>
          <SectionTitle>Problem Analytics</SectionTitle>
          <AnalyticsGrid>
            <ProblemsSummary data={analytics.problemsByType} />
            <TableProblemHeatmap data={analytics.problemsByTable} />
          </AnalyticsGrid>
        </>
      )}

      <SectionTitle>Recent Feedback</SectionTitle>
      <FilterBar filters={filters} onFilterChange={setFilters} />

      <FeedbackList>
        {feedback.length > 0 ? (
          feedback.map(item => (
            <FeedbackItem key={item._id} feedback={item} />
          ))
        ) : (
          <EmptyState>No feedback found matching filters.</EmptyState>
        )}
      </FeedbackList>
    </PageContainer>
  );
};

export default AdminDashboardPage;
