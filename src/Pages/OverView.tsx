import {
  GiftIcon,
  GlobeAmericasIcon,
  ScaleIcon,
} from '@heroicons/react/24/solid';
import StarsIcon from '@mui/icons-material/Stars';
import { Box, Container } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { CustomersSearch } from '../Components/CustomerSeach';
import Investments from '../Components/Investments/Investments';
import CreateModal from '../Components/Modal/CreateModal';
import BlocTitle from '../Containers/BlocTitle';
import CardGroupes from '../Containers/CardGroupes';
import OverViewTable from '../Containers/OverViewTable';
import { OverViewContext } from '../Context/OverViewContext';
import { formatNumberWithLeadingZero } from '../Helpers/FormatMoney';
import { GivenFoodsSeed } from '../Seeds/ApiTest';
import Roles from '../Seeds/Roles';
import { selectLogin } from '../Toolkit/Login/LoginSlice';
const OverView = () => {
  const [Loader, setLoader] = React.useState(true);
  const [investState, setInvestState] = React.useState(false);
  const [information, setInformation] = React.useState<typeof GivenFoodsSeed>(
    []
  );
  const [card, setCard] = React.useState([
    {
      title: 'Quantity of product given/received (Kg)',
      value: 0,
      Icon: <ScaleIcon />,
      color: 'warning.main',
      state: Loader,
    },
    {
      title: 'Environmental impact (Kg of CO2 avoided)',
      value: 0,
      Icon: <GlobeAmericasIcon />,
      color: 'info.main',
      state: Loader,
    },
    {
      title: 'Beneficiaries of your donations',
      value: 0,
      Icon: <GiftIcon />,
      color: 'error.main',
      state: Loader,
    },
    {
      title: 'Donator Level',
      value: 'bronze',
      Icon: <StarsIcon />,
      color: 'primary.main',
      state: Loader,
    },
  ]);
  const { user } = useSelector(selectLogin);
  const title = {
    [Roles.donor]: 'Your donations',
    [Roles.applicant]: 'Donations received',
    [Roles.admin]: 'Stock',
  };

  const donateAction = () => alert('donate');

  const wishAction = () => alert('make a wish');

  const handleActionButton =
    user.role === Roles.donor ? donateAction : wishAction;

  React.useEffect(() => {
    if (information?.[0]?.KPIs) {
      console.log(information?.[0]);
      const KPIs = information?.[0].KPIs;

      if (user.role === Roles.donor)
        setCard([
          {
            title: 'Quantity of product given (Kg)',
            value: KPIs.quantityOfProductGiven,
            Icon: <ScaleIcon />,
            color: 'warning.main',
            state: Loader,
          },
          {
            title: 'Environmental impact (Kg of CO2 avoided)',
            value: KPIs.environmentalImpact,
            Icon: <GlobeAmericasIcon />,
            color: 'info.main',
            state: Loader,
          },
          {
            title: 'Beneficiaries of your donations',
            value: KPIs.numberOfBeneficiaries,
            Icon: <GiftIcon />,
            color: 'error.main',
            state: Loader,
          },
          {
            title: 'Donator Level',
            value: KPIs.donatorLevel,
            Icon: <StarsIcon />,
            color: 'primary.main',
            state: Loader,
          },
        ]);
      else if (user.role === Roles.applicant)
        setCard([
          {
            title: 'Quantity of product received (Kg)',
            value: KPIs.quantityOfProductGiven,
            Icon: <ScaleIcon />,
            color: 'warning.main',
            state: Loader,
          },
          {
            title: 'Environmental impact (Kg of CO2 avoided)',
            value: KPIs.environmentalImpact,
            Icon: <GlobeAmericasIcon />,
            color: 'info.main',
            state: Loader,
          },
          {
            title: 'Number of wish',
            value: KPIs.numberOfWish,
            Icon: <GiftIcon />,
            color: 'error.main',
            state: Loader,
          },
          {
            title: 'Wish granted',
            value: KPIs.wishGranted,
            Icon: <StarsIcon />,
            color: 'primary.main',
            state: Loader,
          },
        ]);
      else
        setCard([
          {
            title: 'Stock (Kg)',
            value: KPIs.stock,
            Icon: <ScaleIcon />,
            color: 'warning.main',
            state: Loader,
          },
          {
            title: 'Environmental impact (Kg of CO2 avoided)',
            value: KPIs.environmentalImpact,
            Icon: <GlobeAmericasIcon />,
            color: 'info.main',
            state: Loader,
          },
          {
            title: 'Beneficiaries of your donations',
            value: KPIs.numberOfBeneficiaries,
            Icon: <GiftIcon />,
            color: 'error.main',
            state: Loader,
          },
          {
            title: 'Quantity devlivered (Kg)',
            value: KPIs.quantityOfProductDelivered,
            Icon: <StarsIcon />,
            color: 'primary.main',
            state: Loader,
          },
        ]);
    }
  }, [Loader, information, user.role]);

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
      }}>
      <OverViewContext.Provider
        value={{
          state: Loader,
          handle: setLoader,
          information: setInformation,
        }}>
        <GetData />
        <Container maxWidth='xl'>
          <BlocTitle
            title={''}
            buttonContent={user.role === Roles.donor ? 'Donate' : 'Make a wish'}
            disabled={user.role === Roles.admin}
            handleClick={handleActionButton}
          />
          <CardGroupes CardItemInfo={card} />
          <BlocTitle title={''} disabled={true} />
          <BlocTitle title={title[user.role]} disabled={true} />
          <CustomersSearch />
          <OverViewTable information={information} />
        </Container>
        {investState && (
          <CreateModal
            makeOpen
            ModalContent={Investments}
            closeButton
            closeButtonFunc={() => setInvestState(false)}
            style={{ borderRadius: '0px' }}
          />
        )}
      </OverViewContext.Provider>
    </Box>
  );
};

const GetData = () => {
  const { user } = useSelector(selectLogin);
  const OverViewContextValue = useContext(OverViewContext);
  const state = OverViewContextValue ? OverViewContextValue.state : false;
  const handleLoader = OverViewContextValue
    ? OverViewContextValue.handle
    : false;
  const handleInformation = OverViewContextValue
    ? OverViewContextValue.information
    : false;

  const handleGetInformation = React.useCallback(async () => {
    // Seeds
    const response = await Promise.resolve({
      data: GivenFoodsSeed,
      error: false,
    });

    // Prod
    // const response = await ApiSession.invest.list(user.id);
    if (!response.error && handleInformation) handleInformation(response.data);
    if (handleLoader) handleLoader(false);
  }, [handleInformation, handleLoader, user.id]);

  React.useEffect(() => {
    if (state) {
      handleGetInformation();
    }
  }, [handleGetInformation, state]);
  return <></>;
};

export default OverView;
