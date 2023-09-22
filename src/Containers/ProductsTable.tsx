import React from 'react';
import CreateRowData from '../Helpers/CreateRowData';
import {
  CUSTOMPPRODUCTKEYS,
} from '../Components/Table/TableKeys';
import { Box, Skeleton, Chip } from '@mui/material';
import TableCustomze from '../Components/Table/TableCustomze';
import { CustomersContext } from '../Context/CustomersContext';
import '../styles/Products/blink.css';
import { Product } from '../Pages/Products';
interface TABLECUSTOMZE {
  information: any;
}

const ProductsTable: React.FC<TABLECUSTOMZE> = ({ information }) => {
  const CreateData = new CreateRowData(CUSTOMPPRODUCTKEYS().body);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const CustomersContextValues = React.useContext(CustomersContext);
  const skeletonGroupe = CUSTOMPPRODUCTKEYS().head.map((item) => (
    <Skeleton width={'100%'} height={'50px'} animation='wave' />
  ));

  const LoaderContent = CreateData.create(skeletonGroupe);

  React.useEffect(() => {
    if (CustomersContextValues?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CustomersContextValues?.state]);

  React.useEffect(() => {
    if (information) {
      const data: any = [];
      information.forEach((item: Product) => {
        data.push(
          CreateData.create([
            item.name,
            item.quantity_delivered,
            <Chip
              label={
                item.quantity_remaining < item.stock_alert
                  ? item.quantity_remaining
                  : item.quantity_remaining
              }
              color={item.quantity_remaining < item.stock_alert ? 'error' : 'success'}
              variant='outlined'
              className={item.quantity_remaining < item.stock_alert ? 'blinking' : ''}
            />,
            item.stock_alert,
            item.expired_date,
            item.donors,
            <Chip
              label={item.status ? 'active' : 'disable'}
              variant='outlined'
              color={item.status ? 'success' : 'error'}
            />
          ])
        );
      });
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (CustomersContextValues?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CustomersContextValues?.state]);

  return (
    <Box mt={4}>
      <TableCustomze headKey={CUSTOMPPRODUCTKEYS().head} rows={rows} />
    </Box>
  );
};

export default ProductsTable;
