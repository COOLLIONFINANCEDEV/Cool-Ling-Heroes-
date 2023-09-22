import {
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon,
  TruckIcon,
} from '@heroicons/react/24/solid';
import { Box, Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomersSearch } from '../Components/CustomerSeach';
import BlocTitle from '../Containers/BlocTitle';
import CardGroupes from '../Containers/CardGroupes';
import ProductsTable from '../Containers/ProductsTable';
import { formatNumberWithLeadingZero } from '../Helpers/FormatMoney';
import Roles from '../Seeds/Roles';
import { selectLogin } from '../Toolkit/Login/LoginSlice';

export interface Product {
  id: number;
  name: string;
  quantity_delivered: number;
  quantity_remaining: number;
  stock_alert: number;
  expired_date: string;
  donors: string;
  status: boolean;
}

const Products = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState<Product[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);

  const { user } = useSelector(selectLogin);
  const [card, setCard] = React.useState([
    {
      title: 'Stock',
      value: formatNumberWithLeadingZero(),
      Icon: <ShoppingCartIcon />,
      color: 'primary.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'Expired',
      value: formatNumberWithLeadingZero(),
      Icon: <ExclamationTriangleIcon />,
      color: 'warning.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'Top products',
      value: formatNumberWithLeadingZero(),
      Icon: <ArrowTopRightOnSquareIcon />,
      color: 'info.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
    {
      title: 'delivered',
      value: formatNumberWithLeadingZero(),
      Icon: <TruckIcon />,
      color: 'error.main',
      state: Loader,
      backgroundColor: '#D0F2FF',
    },
  ]);

  React.useEffect(() => {
    if (Loader) {
      const simulatedProducts: Product[] = [
        {
          id: 1,
          name: 'Sac de riz',
          quantity_delivered: 20,
          quantity_remaining: 9,
          stock_alert: 8,
          expired_date: '2025/04/02',
          donors: "ong soure d'affrique",
          status: true,
        },
        {
          id: 2,
          name: 'Carton de bonnet rouge',
          quantity_delivered: 15,
          quantity_remaining: 3,
          stock_alert: 4,
          expired_date: '2025/04/02',
          donors: 'gun agouero',
          status: false,
        },
      ];

      setProducts(simulatedProducts);
      setLoader(false);
    }
  }, [Loader]);
  React.useEffect(() => {
    if (information?.length <= 1) {
      setCard([
        {
          title: ' Stock',
          value: '23',
          Icon: <ShoppingCartIcon />,
          color: 'primary.main',
          state: Loader,
          backgroundColor: '#FFF7CD',
        },
        {
          title: 'Expired',
          value: '14',
          Icon: <ExclamationTriangleIcon />,
          color: 'error.main',
          state: Loader,
          backgroundColor: '#FFE7D9',
        },
        {
          title: 'Top Products',
          value: '150',
          Icon: <ArrowTopRightOnSquareIcon />,
          color: 'info.main',
          state: Loader,
          backgroundColor: '#D1E9FC',
        },
        {
          title: 'delivered',
          value: '12',
          Icon: <TruckIcon />,
          color: 'warning.main',
          state: Loader,
          backgroundColor: '#D0F2FF',
        },
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
      <Container maxWidth='xl'>
        <BlocTitle title={'Products'} disabled={user.role !== Roles.donor} />
        <CardGroupes CardItemInfo={card} />
        <CustomersSearch />
        <ProductsTable information={products} />
      </Container>
    </Box>
  );
};

export default Products;
