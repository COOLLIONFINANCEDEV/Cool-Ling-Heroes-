import { Box, Container } from "@mui/material";
import {
  ArrowTrendingUpIcon,
  UserIcon,
  EyeDropperIcon,
  MicrophoneIcon,
  ShoppingCartIcon,
  TruckIcon,
  FolderPlusIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import { formatNumberWithLeadingZero } from "../Helpers/FormatMoney";
import BlocTitle from "../Containers/BlocTitle";
import { CustomersSearch } from "../Components/CustomerSeach";
import { selectLogin } from "../Toolkit/Login/LoginSlice";
import { useSelector } from "react-redux";
import Roles from "../Seeds/Roles";
import React, { useContext } from "react";
import ApiSession from "../Service/ApiSession";
import CustomersTable from "../Containers/CustomersTable";
import { CustomersContext } from "../Context/CustomersContext";
import CardGroupes from "../Containers/CardGroupes";
import DonateursTable from "../Containers/DonateursTable";
import BenefiaiciareTable from "../Containers/BeneficiaireTable";

interface Donateur {
  id: number;
  name: string;
  phone: string;
  status: number;
  adresse: string;
  email: string;
}

const Beneficiaire = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState([]);
  const [beneficaire, setBeneficiaire] = React.useState<Donateur[]>([]);

  const [card, setCard] = React.useState([
    {
      title: "Produits en stock",
      value: formatNumberWithLeadingZero(),
      Icon: <ShoppingCartIcon />,
      color: "primary.main",
      state: Loader,
      backgroundColor: "#FFF7CD"
    },
    {
      title: "Donatteurs",
      value: formatNumberWithLeadingZero(),
      Icon: <FolderPlusIcon />,
      color: "warning.main",
      state: Loader,
      backgroundColor: "#FFF7CD"
    },
    {
      title: "Beneficiaire",
      value: formatNumberWithLeadingZero(),
      Icon: <UserGroupIcon />,
      color: "info.main",
      state: Loader,
      backgroundColor: "#D0F2FF"
    },
    {
      title: "Distrubié",
      value: formatNumberWithLeadingZero(),
      Icon: <TruckIcon />,
      color: "error.main",
      state: Loader,
      backgroundColor: "#D0F2FF"
    },
  ]);
  const { user } = useSelector(selectLogin);

  React.useEffect(() => {
    if (information?.length <= 1) {
      setCard([

        {
          title: "beneficiary",
          value: "14",
          Icon: <UserGroupIcon />,
          color: "warning.main",
          state: Loader,
          backgroundColor: "#D0F2FF"
        },
        {
          title: "New membership",
          value: "15",
          Icon: <UserGroupIcon />,
          color: "success.main",
          state: Loader,
          backgroundColor: "#FFF7CD"
        },
        {
          title: "beneficiary delivered",
          value:"12",
          Icon: <TruckIcon />,
          color: "error.main",
          state: Loader,
          backgroundColor: "#D0F2FF"
        },
      ]);
    }
  }, [Loader, information]);

  React.useEffect(() => {
    if (Loader) {
      const simulatedProducts: Donateur[] = [
        { id: 1, name: "unicef Afrika", phone: "+1 323 3333 324", status: 0, adresse: "New york", email:"ongsouredarfique@gmail.com" },
        { id: 2, name: "Ong le monde", phone: "+1 003 4448 349", status: 1, adresse: "Canada", email:"cunagouro@gmail.com"},
        { id: 3, name: "Ong benevole", phone: "+225 987 3333", status: 1,  adresse: "Cote d'ivoir", email:"didierdrgaba@gmail.com" },
        { id: 4, name: "ong france", phone: "+225 323 5678", status: 0,  adresse: "Cote d'ivoire", email:"jeankoffie@gmail.com" },
      ];

      setBeneficiaire(simulatedProducts);
      setLoader(false);
    }
  }, [Loader]);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <CustomersContext.Provider
        value={{
          state: Loader,
          handle: setLoader,
          information: setInformation,
        }}
      >
        <GetData />
        <Container maxWidth="xl">
          <BlocTitle
            title={"Beneficiary"}
            disabled={user.role !== Roles.lender}
          />
          <CardGroupes CardItemInfo={card} />
          <BenefiaiciareTable information={beneficaire} />
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

export default Beneficiaire;
