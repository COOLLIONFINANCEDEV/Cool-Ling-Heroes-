import { Box, Container } from "@mui/material";
import {
  ArrowTrendingUpIcon,
  UserIcon,
  EyeDropperIcon,
  ArrowTopRightOnSquareIcon ,
  ShoppingCartIcon,
  ExclamationTriangleIcon ,
  FolderPlusIcon ,
  BellIcon ,
  TruckIcon ,
  UserGroupIcon ,
} from "@heroicons/react/24/solid";
import { formatNumberWithLeadingZero } from "../Helpers/FormatMoney";
import BlocTitle from "../Containers/BlocTitle";
import { CustomersSearch } from "../Components/CustomerSeach";
import { selectLogin } from "../Toolkit/Login/LoginSlice";
import { useSelector } from "react-redux";
import Roles from "../Seeds/Roles";
import React, { useContext } from "react";
import CustomersTable from "../Containers/CustomersTable";
import { CustomersContext } from "../Context/CustomersContext";
import CardGroupes from "../Containers/CardGroupes";
import ProductsTable from "../Containers/ProductsTable";

interface Product {
  id: number;
  name: string;
  exp: number;
  status: number;
  quantite: number;
  donnateur: string;
  quantiterest: number;
  stockAlert: number;
}


const OverViewDash = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState<Product[]>([]); 
  const [products, setProducts] = React.useState<Product[]>([]);

  const { user } = useSelector(selectLogin);
  const [card, setCard] = React.useState([
    {
      title: "Stock",
      value: formatNumberWithLeadingZero(),
      Icon: <ShoppingCartIcon />,
      color: "primary.main",
      state: Loader,
      backgroundColor: "#FFF7CD"
    },
    {
      title: "Donors",
      value: formatNumberWithLeadingZero(),
      Icon: <FolderPlusIcon  />,
      color: "warning.main",
      state: Loader,
      backgroundColor: "#FFF7CD"
    },
    {
      title: "Beneficiary",
      value: formatNumberWithLeadingZero(),
      Icon: <UserGroupIcon  />,
      color: "info.main",
      state: Loader,
      backgroundColor: "#D0F2FF"
    },
    {
      title: "Disturbed",
      value: formatNumberWithLeadingZero(),
      Icon: <TruckIcon />,
      color: "error.main",
      state: Loader,
      backgroundColor: "#D0F2FF"
      
    },
  ]);

  React.useEffect(() => {
    if (Loader) {
      const simulatedProducts: Product[] = [
        { id: 1, name: "Sac de riz", exp: 1, status: 0, quantite: 20,quantiterest: 9, stockAlert:8, donnateur:" ong soure d'affrique" },
        { id: 2, name: "Carton de bonnet rouge", exp: 2, status: 1, quantite: 15, quantiterest: 3, stockAlert:4,donnateur:"gun agouero" },
        { id: 3, name: "1 carton de patate", exp: 3, status: 0, quantite: 18, quantiterest: 1, stockAlert:5, donnateur:"M koffi jean" },
        { id: 4, name: "2 carton de pomme de terre", exp: 4, status: 0, quantite: 19, quantiterest: 13, stockAlert:6, donnateur:"didier drogba" },
      ];

      setProducts(simulatedProducts);
      setLoader(false);
    }
  }, [Loader]);
  React.useEffect(() => {
    if (information?.length <= 1) {
      setCard([
        {
          title: " Stock",
          value: "1430",
          Icon: <ShoppingCartIcon />,
          color: "primary.main",
          state: Loader,
          backgroundColor: "#FFF7CD"
        },
        {
          title: "Donors",
          value: "14",
          Icon: <FolderPlusIcon />,
          color: "error.main",
          state: Loader,
          backgroundColor: "#FFE7D9"
        },
        {
          title: "Beneficiary",
          value: "150",
          Icon: <UserGroupIcon />,
          color: "info.main",
          state: Loader,
          backgroundColor: "#D1E9FC"
        },
        {
          title: "Disturbed",
          value:"1293",
          Icon: <TruckIcon />,
          color: "warning.main",
          state: Loader,
          backgroundColor: "#D0F2FF"
        },
      ]);
    }
  }, [Loader, information]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <BlocTitle
          title={"Products"}
          disabled={user.role !== Roles.lender}
        />
         <CardGroupes CardItemInfo={card} />
        <CustomersSearch />
        <ProductsTable information={products} /> 
      </Container>
    </Box>
  );
};

export default OverViewDash;
