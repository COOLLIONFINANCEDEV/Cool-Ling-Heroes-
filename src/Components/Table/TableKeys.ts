export const DONOR_KEY = () => {
  return {
    head: ['id', 'name', 'quantity (kg)', 'delivery date'],
    body: ['id', 'name', 'quantity', 'delivery_date'],
  };
};

export const APPLICANT_KEY = () => {
  return {
    head: ['id', 'name', 'quantity (kg)', 'received date', 'expiry date'],
    body: ['id', 'name', 'quantity', 'received_date', 'expiry_date'],
  };
};

export const ADMIN_KEY = () => {
  return {
    head: [
      'id',
      'name',
      'quantity (kg)',
      'donor',
      'delivery date',
      'expiry date',
    ],
    body: ['id', 'name', 'quantity', 'donor', 'delivery_date', 'expiry_date'],
  };
};

export const CUSTOMERSKEY = () => {
  return {
    head: ['id', 'name', 'phone', 'email', 'role', 'Status', 'Action'],
    body: ['id', 'name', 'phone', 'email', 'role', 'Status', 'Action'],
  };
};

export const MATURITYKEY = () => {
  return {
    head: [
      'id',
      'user number',
      'refunded',
      'Amount',
      'Total Return',
      'Maturity Date',
    ],
    body: [
      'id',
      'user number',
      'refunded',
      'Amount',
      'Total Return',
      'Maturity Date',
    ],
  };
};

export const ANNOUCEMENTKEYS = () => {
  return {
    head: ['id', 'Title', 'Status', 'Created At', 'Update At', 'Action'],
    body: ['id', 'Title', 'Status', 'Created At', 'Update At', 'Action'],
  };
};
