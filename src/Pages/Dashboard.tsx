import React from "react";
import { Layout } from "../Containers/layout";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Dashboard;
