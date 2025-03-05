

interface KPIProps {
  incomes?: number;
  expenses?: number;
  balance?: number;
}

export default function KPIWidget({ incomes, expenses, balance }: KPIProps) {
  return (
    <div style={{ /* ... */ }}>
      <h2>Resumen Financiero</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>Ingresos</h3>
          <p style={{ fontSize: '1.5rem', color: '#38a169' }}>
            {incomes?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </p>
        </div>
        <div>
          <h3>Egresos</h3>
          <p style={{ fontSize: '1.5rem', color: '#e53e3e' }}>
            {expenses?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </p>
        </div>
        <div>
          <h3>Balance</h3>
          <p style={{ 
            fontSize: '1.5rem', 
            color: (balance || 0) >= 0 ? '#38a169' : '#e53e3e' 
          }}>
            {balance?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </p>
        </div>
      </div>
    </div>
  );
}