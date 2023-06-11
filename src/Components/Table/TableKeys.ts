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
      "Project Name",
      "Validate",
      "Amount Requested",
      "Company Name",
      "Project Country",
      "Action",
    ],
    body: [
      "id",
      "projectTitle",
      "Validate",
      "amountRequested",
      "companyName",
      "country",
      "Action",
    ],
  };
};
