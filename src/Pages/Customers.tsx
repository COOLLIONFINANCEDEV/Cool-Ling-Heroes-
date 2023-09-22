import { Box, Container } from '@mui/material';
import {
  ArrowTrendingUpIcon,
  UserIcon,
  EyeDropperIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/solid';
import { formatNumberWithLeadingZero } from '../Helpers/FormatMoney';
import BlocTitle from '../Containers/BlocTitle';
import { CustomersSearch } from '../Components/CustomerSeach';
import { selectLogin } from '../Toolkit/Login/LoginSlice';
import { useSelector } from 'react-redux';
import Roles from '../Seeds/Roles';
import React, { useContext } from 'react';
import ApiSession from '../Service/ApiSession';
import CustomersTable from '../Containers/CustomersTable';
import { CustomersContext } from '../Context/CustomersContext';
import CardGroupes from '../Containers/CardGroupes';
const Customers = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState([]);
  const [card, setCard] = React.useState([
    {
      title: 'Admin',
      value: formatNumberWithLeadingZero(),
      Icon: <UserIcon />,
      color: 'primary.main',
      state: Loader,
    },
    {
      title: 'Customers',
      value: formatNumberWithLeadingZero(),
      Icon: <ArrowTrendingUpIcon />,
      color: 'warning.main',
      state: Loader,
    },
    {
      title: 'Moderators',
      value: formatNumberWithLeadingZero(),
      Icon: <EyeDropperIcon />,
      color: 'info.main',
      state: Loader,
    },
    {
      title: 'Advisor',
      value: formatNumberWithLeadingZero(),
      Icon: <MicrophoneIcon />,
      color: 'error.main',
      state: Loader,
    },
  ]);
  const { user } = useSelector(selectLogin);

  React.useEffect(() => {
    if (information?.length >= 1) {
      setCard([
        {
          title: 'Admin',
          value: formatNumberWithLeadingZero(
            information.filter((item: any) => item.role === Roles.admin).length
          ),
          Icon: <UserIcon />,
          color: 'primary.main',
          state: Loader,
        },
        {
          title: 'Customers',
          value: formatNumberWithLeadingZero(
            information.filter((item: any) => item.role === Roles.donor).length
          ),
          Icon: <ArrowTrendingUpIcon />,
          color: 'warning.main',
          state: Loader,
        },
        {
          title: 'Moderators',
          value: formatNumberWithLeadingZero(
            information.filter((item: any) => item.role === Roles.applicant)
              .length
          ),
          Icon: <EyeDropperIcon />,
          color: 'info.main',
          state: Loader,
        },
        // {
        //   title: "Advisor",
        //   value: formatNumberWithLeadingZero(
        //     information.filter((item: any) => item.role === Roles.advisor)
        //       .length
        //   ),
        //   Icon: <MicrophoneIcon />,
        //   color: "error.main",
        //   state: Loader,
        // },
      ]);
    }
  }, [Loader, information]);

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 4,
      }}>
      <CustomersContext.Provider
        value={{
          state: Loader,
          handle: setLoader,
          information: setInformation,
        }}>
        <GetData />
        <Container maxWidth='xl'>
          <BlocTitle
            title={'Manage users'}
            disabled={user.role !== Roles.donor}
          />
          <CardGroupes CardItemInfo={card} />
          <CustomersSearch />
          <CustomersTable information={information} />
        </Container>
      </CustomersContext.Provider>
    </Box>
  );
};

const GetData = () => {
  const CustomersContextValue = useContext(CustomersContext);
  const state = CustomersContextValue ? CustomersContextValue.state : false;
  const handleLoader = CustomersContextValue
    ? CustomersContextValue.handle
    : false;
  const handleInformation = CustomersContextValue
    ? CustomersContextValue.information
    : false;

  const handleGetInformation = React.useCallback(async () => {
    const response = await ApiSession.user.list();
    if (!response.error && handleInformation) handleInformation(response.data);
    if (handleLoader) handleLoader(false);
  }, [handleInformation, handleLoader]);

  React.useEffect(() => {
    if (state) {
      handleGetInformation();
    }
  }, [handleGetInformation, state]);
  return <></>;
};

export default Customers;
