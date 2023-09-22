import React from 'react';
import { Layout } from '../Containers/layout';
import { Outlet } from 'react-router-dom';
import { SpeedDial } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectLogin } from '../Toolkit/Login/LoginSlice';
import Roles from '../Seeds/Roles';
import Redirect from '../Helpers/Redirect';
import routes from '../Router/routes';

const Dashboard = () => {
  const { user } = useSelector(selectLogin);
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      {user.role === Roles.donor && (
        <Redirect link={routes.contact} target>
          <SpeedDial
            ariaLabel={'speedDial WhatsApp'}
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<WhatsApp />}></SpeedDial>
        </Redirect>
      )}
    </>
  );
};

export default Dashboard;
