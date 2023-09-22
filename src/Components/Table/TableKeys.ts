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

export const ANNOUCEMENTKEYS = () => {
  return {
    head: ["id", "Title", "Status", "Created At", "Update At", "Action"],
    body: ["id", "Title", "Status", "Created At", "Update At", "Action"],
  };
};

export const CUSTOMPPRODUCTKEYS = () => {
  return {
    head: [ "name","quantity delivered","quantity remaining","stock alert", "pereption time","donors","Status", "Action"],
    body: ["id", "name",  "exp", "Status", "Action"],
  };
};

export const DONATEURSKEY = () => {
  return {
    head: ["id", "name", "phone", "email", "adresse", "donation Frequency", "Status", "Action"],
    body: ["id", "name", "phone", "email", "adresse","donation Frequency", "Status", "Action"],
  };
};

export const BENEFICIAIRESKEY = () => {
  return {
    head: ["id", "name", "phone", "email", "adresse", "Status", "Action"],
    body: ["id", "name", "phone", "email", "adresse", "Status", "Action"],
  };
};



export const CUSTOMREQUESTKEYS = () => {
  return {
    head: ["id", "beneficiary", "quantity request", "request date", "Status", "Action"],
    body: ["id", "name", "phone", "email", "adresse", "Status", "Action"],
  };
};