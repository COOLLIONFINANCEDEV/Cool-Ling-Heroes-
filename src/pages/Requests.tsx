import { Box, Container } from '@mui/material';
import {
  ArrowTrendingUpIcon,
  UserIcon,
  EyeDropperIcon,
  MicrophoneIcon,
  ShoppingCartIcon,
  TruckIcon,
  FolderPlusIcon,
  UserGroupIcon,
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
import DonateursTable from '../Containers/DonateursTable';
import RequestsTable from '../Containers/ResquestTable';

interface Donateur {
  id: number;
  beneficiaire: string;
  quantityRequest: string;
  status: string;
  requestDate: string;
}

const Requests = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState([]);
  const [donateurs, setDonateurs] = React.useState<Donateur[]>([]);

  const [card, setCard] = React.useState([
    {
      title: 'Produits en stock',
      value: formatNumberWithLeadingZero(),
      Icon: <ShoppingCartIcon />,
      color: 'primary.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'Donatteurs',
      value: formatNumberWithLeadingZero(),
      Icon: <FolderPlusIcon />,
      color: 'warning.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'Beneficiaire',
      value: formatNumberWithLeadingZero(),
      Icon: <UserGroupIcon />,
      color: 'info.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'Distrubié',
      value: formatNumberWithLeadingZero(),
      Icon: <TruckIcon />,
      color: 'error.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
  ]);
  const { user } = useSelector(selectLogin);

  React.useEffect(() => {
    if (information?.length <= 1) {
      setCard([
        {
          title: ' Total requests',
          value: '2329',
          Icon: <ShoppingCartIcon />,
          color: 'primary.main',
          state: Loader,
          backgroundColor: '#FFF7CD',
        },
        {
          title: 'Request approvals',
          value: '1240',
          Icon: <FolderPlusIcon />,
          color: 'success.main',
          state: Loader,
          backgroundColor: '#FFF7CD',
        },
        {
          title: 'Request rejections',
          value: '150',
          Icon: <ArrowTrendingUpIcon />,
          color: 'info.main',
          state: Loader,
          backgroundColor: '#D1E9FC',
        },
        {
          title: 'Treatment delays',
          value: '12h',
          Icon: <FolderPlusIcon />,
          color: 'warning.main',
          state: Loader,
          backgroundColor: '#D0F2FF',
        },
      ]);
    }
  }, [Loader, information]);

  React.useEffect(() => {
    if (Loader) {
      const simulatedProducts: Donateur[] = [
        {
          id: 1,
          beneficiaire: "Ong sourire d'afrique",
          quantityRequest: '10',
          status: 'Delivered',
          requestDate: '2023-20-10',
        },
        {
          id: 2,
          beneficiaire: 'cun agouro',
          quantityRequest: '13',
          status: 'Cancel',
          requestDate: '2023-10-09',
        },
        {
          id: 3,
          beneficiaire: 'Didier drogba',
          quantityRequest: '3',
          status: 'Delivered',
          requestDate: '2023-15-06',
        },
        {
          id: 4,
          beneficiaire: 'Jean koffi',
          quantityRequest: '15',
          status: 'in progress',
          requestDate: '2023-24-10',
        },
      ];

      setDonateurs(simulatedProducts);
      setLoader(false);
    }
  }, [Loader]);
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
          <BlocTitle title={'Requests'} disabled={user.role !== Roles.donor} />
          <CardGroupes CardItemInfo={card} />
          <RequestsTable information={donateurs} />
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

export default Requests;
