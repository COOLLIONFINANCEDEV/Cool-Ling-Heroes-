export const LENDERKEY = () => {
  return {
    head: [
      "id",
      "amount",
      "month",
      "interet",
      "Status",
      "Maturity date",
      "Total Return",
      "Action",
    ],
    body: [
      "id",
      "amount",
      "month",
      "interet",
      "Status",
      "Maturity date",
      "Total Return",
      "Action",
    ],
  };
};

export const ADMINKEY = () => {
  return {
    head: [
      "id",
      "user number",
      "amount",
      "month",
      "interet",
      "Status",
      "Maturity date",
      "Total Return",
      "Action",
    ],
    body: [
      "id",
      "user number",
      "amount",
      "month",
      "interet",
      "Status",
      "Maturity date",
      "Total Return",
      "Action",
    ],
  };
};

export const CUSTOMERSKEY = () => {
  return {
    head: ["id", "name", "phone", "email", "role", "Status", "Action"],
    body: ["id", "name", "phone", "email", "role", "Status", "Action"],
  };
};

export const MATURITYKEY = () => {
  return {
    head: [
      "id",
      "user number",
      "refunded",
      "Amount",
      "Total Return",
      "Maturity Date",
    ],
    body: [
      "id",
      "user number",
      "refunded",
      "Amount",
      "Total Return",
      "Maturity Date",
    ],
  };
};
