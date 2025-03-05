/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Transaction } from "../types/Transaction"; // Define tus tipos

export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  const [sortField, setSortField] = useState<keyof Transaction>('value_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'ALL' | 'INFLOW' | 'OUTFLOW'>('ALL');

  const sortedTransactions = [...transactions]
    .filter(t => filterType === 'ALL' || t.type === filterType)
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h3>Transacciones</h3>
        <select 
          onChange={(e) => setFilterType(e.target.value as any)}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          <option value="ALL">Todas</option>
          <option value="INFLOW">Ingresos</option>
          <option value="OUTFLOW">Egresos</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', cursor: 'pointer' }} onClick={() => handleSort('value_date')}>
                Fecha {sortField === 'value_date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Descripción</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', cursor: 'pointer' }} onClick={() => handleSort('amount')}>
                Monto {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Estado</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem' }}>
                  {new Date(transaction.value_date).toLocaleDateString('es-MX')}
                </td>
                <td style={{ padding: '0.75rem' }}>{transaction.description}</td>
                <td style={{ 
                  padding: '0.75rem',
                  color: transaction.type === 'OUTFLOW' ? '#e53e3e' : '#38a169'
                }}>
                  {formatCurrency(transaction.amount)}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: transaction.status === 'PENDING' ? '#f6e05e' : '#c6f6d5',
                    color: transaction.status === 'PENDING' ? '#744210' : '#22543d'
                  }}>
                    {transaction.status === 'PENDING' ? 'Pendiente' : 'Completado'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {transaction.type === 'OUTFLOW' ? 'Egreso' : 'Ingreso'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}