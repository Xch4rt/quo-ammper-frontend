export interface Transaction {
    id: string;
    created_at: string;
    type: 'INFLOW' | 'OUTFLOW';
    amount: number;
    status: 'PENDING' | 'COMPLETED';
    description: string;
    value_date: string;
    currency: string;
  }