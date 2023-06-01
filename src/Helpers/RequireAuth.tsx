import React from "react";

type Props = {
  allowedRole: string;
  children: React.ComponentType;
};

const RequireAuth: React.FC<Props> = ({ allowedRole, children }) => {
  return <div>RequireAuth</div>;
};

export default RequireAuth;
