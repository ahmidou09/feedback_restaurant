import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { QRCodeCanvas } from 'qrcode.react';
import { getTables, createTable } from '../services/adminService';
import Spinner from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  padding-bottom: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
`;

const FormContainer = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  align-items: flex-end;
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const TableCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TableNumber = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

const QRContainer = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 15px;
`;

const AdminTablesPage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTableNumber.trim()) return;

    setCreateLoading(true);
    setError(null);

    try {
      const newTable = await createTable({ number: newTableNumber });
      setTables([...tables, newTable]);
      setNewTableNumber('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const downloadQR = (tableNumber) => {
    const canvas = document.getElementById(`qr-${tableNumber}`);
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `table-${tableNumber}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (loading) return <Spinner />;

  return (
    <PageContainer>
      <Helmet>
        <title>Manage Tables</title>
      </Helmet>

      <Header>
        <Title>Manage Tables</Title>
        <Button onClick={() => navigate('/admin/dashboard')} variant="secondary">
          Back to Dashboard
        </Button>
      </Header>

      <FormContainer onSubmit={handleCreate}>
        <FormGroup>
          <Label htmlFor="tableNumber">Add New Table Number</Label>
          <Input
            id="tableNumber"
            type="text"
            value={newTableNumber}
            onChange={(e) => setNewTableNumber(e.target.value)}
            placeholder="e.g. 10, 12A, Patio-1"
          />
        </FormGroup>
        <Button disabled={createLoading} type="submit">
          {createLoading ? 'Adding...' : 'Add Table'}
        </Button>
      </FormContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TablesGrid>
        {tables.map((table) => (
          <TableCard key={table._id}>
            <TableNumber>Table {table.number}</TableNumber>
            <QRContainer>
              <QRCodeCanvas
                id={`qr-${table.number}`}
                value={table.qrCodeUrl}
                size={150}
                level={'H'}
                includeMargin={true}
              />
            </QRContainer>
            <Button size="sm" onClick={() => downloadQR(table.number)}>
              Download QR
            </Button>
          </TableCard>
        ))}
      </TablesGrid>
    </PageContainer>
  );
};

export default AdminTablesPage;
