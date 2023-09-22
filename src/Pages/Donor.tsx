import {
  ArrowTrendingUpIcon,
  FolderPlusIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';
import { Box, Container } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import BlocTitle from '../Containers/BlocTitle';
import CardGroupes from '../Containers/CardGroupes';
import DonateursTable from '../Containers/DonateursTable';
import { CustomersContext } from '../Context/CustomersContext';
import { formatNumberWithLeadingZero } from '../Helpers/FormatMoney';
import Roles from '../Seeds/Roles';
import ApiSession from '../Service/ApiSession';
import { selectLogin } from '../Toolkit/Login/LoginSlice';

interface Donateur {
  id: number;
  name: string;
  phone: string;
  status: number;
  adresse: string;
  email: string;
  frequenceDon: string;
}

const Donateurs = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState([]);
  const [donateurs, setDonateurs] = React.useState<Donateur[]>([]);

  const [card, setCard] = React.useState([
    {
      title: 'Total donation',
      value: 0,
      Icon: <ShoppingCartIcon />,
      color: 'primary.main',
      state: Loader,
      backgroundColor: '#FFF7CD',
    },
    {
      title: 'Donors',
      value: 0,
      Icon: <FolderPlusIcon />,
      color: 'success.main',
      state: Loader,
      backgroundColor: '#FFF7CD',
    },
    {
      title: 'Donation rate',
      value: '0%',
      Icon: <ArrowTrendingUpIcon />,
      color: 'info.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'Active donors',
      value: 0,
      Icon: <FolderPlusIcon />,
      color: 'warning.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
  ]);
  const { user } = useSelector(selectLogin);

  React.useEffect(() => {
    if (information?.length <= 1) {
      setCard([
        {
          title: 'Total donation',
          value: '23',
          Icon: <ShoppingCartIcon />,
          color: 'primary.main',
          state: Loader,
          backgroundColor: '#FFF7CD',
        },
        {
          title: 'Donors',
          value: '14',
          Icon: <FolderPlusIcon />,
          color: 'success.main',
          state: Loader,
          backgroundColor: '#FFF7CD',
        },
        {
          title: 'Donation rate',
          value: '150%',
          Icon: <ArrowTrendingUpIcon />,
          color: 'info.main',
          state: Loader,
          backgroundColor: '#D0F2FF',
        },
        {
          title: 'Active donors',
          value: '12',
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
          name: "Ong sourire d'afrique",
          phone: '+1 323 3333 324',
          status: 0,
          adresse: 'New york',
          email: 'ongsouredarfique@gmail.com',
          frequenceDon: 'chaque 2 semain',
        },
        {
          id: 2,
          name: 'cun agouro',
          phone: '+1 003 4448 349',
          status: 1,
          adresse: 'Canada',
          email: 'cunagouro@gmail.com',
          frequenceDon: 'chaque mois',
        },
        {
          id: 3,
          name: 'Didier drogba',
          phone: '+225 987 3333',
          status: 1,
          adresse: "Cote d'ivoir",
          email: 'didierdrgaba@gmail.com',
          frequenceDon: 'chauqe 3 mois',
        },
        {
          id: 4,
          name: 'Jean koffi',
          phone: '+225 323 5678',
          status: 0,
          adresse: "Cote d'ivoire",
          email: 'jeankoffie@gmail.com',
          frequenceDon: 'chaque 21 jours',
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
          <BlocTitle title={'Donors'} disabled={user.role !== Roles.donor} />
          <CardGroupes CardItemInfo={card} />
          <DonateursTable information={donateurs} />
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

export default Donateurs;
