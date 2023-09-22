import React from 'react';
import CreateRowData from '../Helpers/CreateRowData';
import {
  ADMIN_KEY,
  APPLICANT_KEY,
  DONOR_KEY,
} from '../Components/Table/TableKeys';
import { Box, Skeleton, Chip } from '@mui/material';
import { OverViewContext } from '../Context/OverViewContext';
import Action from '../Components/Table/Action';
import FormatMoney from '../Helpers/FormatMoney';
import FormatDate from '../Helpers/FormatDate';
import { useSelector } from 'react-redux';
import { selectLogin } from '../Toolkit/Login/LoginSlice';
import Roles from '../Seeds/Roles';
import TableCustomze from '../Components/Table/TableCustomze';
import { GivenFoodsSeed } from '../Seeds/ApiTest';

interface TABLECUSTOMZE {
  information: any;
}

const OverViewTable: React.FC<TABLECUSTOMZE> = ({
  information,
}: {
  information: typeof GivenFoodsSeed;
}) => {
  const { user } = useSelector(selectLogin);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const OverViewContextValue = React.useContext(OverViewContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createSkeletonGroupe = (key: ReturnType<typeof DONOR_KEY>) =>
    key.head.map((item) => (
      <Skeleton width={'100%'} height={'50px'} animation='wave' key={item} />
    ));
  let skeletonGroupe = createSkeletonGroupe(DONOR_KEY());
  let headKeys = DONOR_KEY().head;
  let bodyKey = DONOR_KEY().body;

  if (user.role === Roles.admin) {
    skeletonGroupe = createSkeletonGroupe(ADMIN_KEY());
    headKeys = ADMIN_KEY().head;
    bodyKey = ADMIN_KEY().body;
  }

  if (user.role === Roles.applicant) {
    skeletonGroupe = createSkeletonGroupe(APPLICANT_KEY());
    headKeys = APPLICANT_KEY().head;
    bodyKey = APPLICANT_KEY().body;
  }

  const CreateData = new CreateRowData(bodyKey);
  const LoaderContent = CreateData.create(skeletonGroupe);

  React.useEffect(() => {
    if (information?.[0]?.foods.data) {
      const foods = information?.[0].foods.data;

      const data: any = [];
      if (user.role === Roles.donor) {
        for (const item of foods)
          data.push(
            CreateData.create([
              item.id,
              item.name,
              item.quantity,
              item.delivery_date,
            ])
          );
      } else if (user.role === Roles.applicant) {
        for (const item of foods)
          data.push(
            CreateData.create([
              item.id,
              item.name,
              item.quantity,
              item.received_date,
              item.expiry_date,
            ])
          );
      } else {
        for (const item of foods)
          data.push(
            CreateData.create([
              item.id,
              item.name,
              item.quantity,
              item.donor.name,
              item.delivery_date,
              item.expiry_date,
            ])
          );
      }
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (OverViewContextValue?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OverViewContextValue?.state]);

  return (
    <Box mt={2}>
      <TableCustomze headKey={headKeys} rows={rows} />
    </Box>
  );
};

export default OverViewTable;
