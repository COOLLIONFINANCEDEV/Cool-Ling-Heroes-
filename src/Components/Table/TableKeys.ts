export const LENDERKEY = () => {
  return {
    head: [
      "id",
      "Investment amount",
      "Investment term",
      "Status",
      "Maturity date",
      "Base APY",
      "Total Return",
      "Action",
    ],
    body: [
      "id",
      "Investment amount",
      "Investment term",
      "Status",
      "Maturity date",
      "Base APY",
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
