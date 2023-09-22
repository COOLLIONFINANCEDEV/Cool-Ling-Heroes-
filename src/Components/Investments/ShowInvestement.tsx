import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { ReactNode } from 'react';
import FormatMoney from '../../Helpers/FormatMoney';
import FormatDate from '../../Helpers/FormatDate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../Toolkit/Login/LoginSlice';
import Roles from '../../Seeds/Roles';

interface INVESTMENTINFORMATION {
  interetInformation: any;
}

const ShowInvestment: React.FC<INVESTMENTINFORMATION> = ({
  interetInformation,
}) => {
  const amountWithPercentage =
    interetInformation.amount + interetInformation?.gain;
  const amountInteret = amountWithPercentage - interetInformation.amount;
  const { user } = useSelector(selectLogin);
  return (
    <Box mt={4}>
      <Typography
        variant='h5'
        fontWeight={500}
        sx={{
          mb: 2,
          fontSize: '1.9rem',
          width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 100px)' },
          minWidth: { xs: '90vw !important', sm: '50vw !important' },
          p: { xs: '10px 10px 0px 10px', sm: '50px 50px 0px 50px' },
        }}
        textTransform={'capitalize'}>
        all the information about this investment
      </Typography>
      <Paper
        elevation={1}
        sx={{
          width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 100px)' },
          minHeight: '50vh',
          p: { xs: '10px', sm: '10px 50px 50px 50px' },
        }}>
        {user.role !== Roles.donor && (
          <Box>
            <Typography variant='h5' fontWeight={500} fontSize={'1.5rem'}>
              User information
            </Typography>
            <Divider sx={{ fontWeight: 500, mb: 1 }} />
            <List sx={{ mb: 5 }}>
              <Row
                title='Name'
                value={interetInformation?.User.full_name ?? ''}
              />
              <Row title='Email' value={interetInformation?.User.email} />{' '}
              <Row
                title='User phone number'
                value={interetInformation.User.phone_number}
              />
              <Row
                title='Created at'
                value={FormatDate(interetInformation.User.created_at)}
              />
            </List>
          </Box>
        )}
        <Box>
          <Typography variant='h5' fontWeight={500} fontSize={'1.5rem'}>
            Investment details
          </Typography>
          <Divider sx={{ fontWeight: 500, mb: 1 }} />
          <List>
            <Row
              title='Investment term'
              value={interetInformation?.term + ' months'}
            />
            <Row
              title='Investment amount'
              value={interetInformation?.amount + ' $'}
            />{' '}
            <Row
              title='Investment Status'
              value={
                <Chip
                  label={interetInformation.status}
                  variant='outlined'
                  color={
                    interetInformation.status.toLowerCase() === 'pending'
                      ? 'info'
                      : interetInformation.status.toLowerCase() === 'confirmed'
                      ? 'success'
                      : 'warning'
                  }
                />
              }
            />
            <Row
              title='Maturity date'
              value={
                interetInformation.accepted ? (
                  FormatDate(interetInformation.date_of_refund)
                ) : (
                  <Chip label={'pending'} color='warning' variant='outlined' />
                )
              }
            />
            <Row
              title='Investment proof'
              value={
                <Button
                  variant='contained'
                  color='info'
                  component='a' // Use "component" instead of "LinkComponent"
                  href={`https://api.investKori.com${interetInformation.proof}`} // Make sure to use backticks (`) for template literals
                  target='_blank'
                  rel='noopener noreferrer' // Add rel attribute for security purposes
                  sx={{ borderRadius: '5px' }}>
                  {user.role === Roles.donor
                    ? 'View your receipt'
                    : 'View this receipt'}
                </Button>
              }
            />
            <Row
              title='Created at'
              value={FormatDate(interetInformation.created_at)}
            />
            <Row
              title='Accepted at'
              value={
                interetInformation.accepted ? (
                  FormatDate(interetInformation.accepted_at)
                ) : (
                  <Chip label={'pending'} variant='outlined' color='warning' />
                )
              }
            />
            <Row
              title='Refunded'
              value={
                interetInformation.refunded ? (
                  <Chip
                    label={'completed'}
                    variant='outlined'
                    color='success'
                  />
                ) : (
                  <Chip label={'pending'} variant='outlined' color='warning' />
                )
              }
            />
            <Row
              title='Investment interet'
              value={
                (interetInformation?.gain / interetInformation.amount) * 100 +
                  ' $' ?? 0
              }
            />
            <Row title='Earnings' value={FormatMoney(amountInteret) + ' $'} />
          </List>
          <Row
            title='Total Return'
            value={FormatMoney(amountWithPercentage) + ' $'}
            dark
          />
          {interetInformation.ChangeRequest.length >= 1 && (
            <>
              <Divider sx={{ fontWeight: 500, mb: 5 }} />
              <Typography
                variant='h5'
                fontWeight={500}
                fontSize={'1.5rem'}
                mt={1}>
                withdrawal request
              </Typography>
            </>
          )}

          <Divider sx={{ fontWeight: 500 }} />
          {interetInformation.ChangeRequest?.map((item: any, key: number) => {
            return (
              <Accordion key={item.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'>
                  <Typography>request {item?.id}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Row title='Request amount' value={item?.amount + ' $'} />
                  <Row
                    title='amount receivable'
                    value={item?.amount_to_refund + ' $'}
                  />
                  <Row
                    title='Request status'
                    value={
                      !item?.treated ? (
                        <Chip
                          label={'pending'}
                          variant='outlined'
                          color='info'
                        />
                      ) : (
                        <Chip
                          label={'completed'}
                          variant='outlined'
                          color='success'
                        />
                      )
                    }
                  />
                  <Row
                    title='Refund proof'
                    value={
                      <Button
                        variant='contained'
                        color='info'
                        component='a' // Use "component" instead of "LinkComponent"
                        href={`https://api.investKori.com${item.refund_proof}`} // Make sure to use backticks (`) for template literals
                        target='_blank'
                        rel='noopener noreferrer' // Add rel attribute for security purposes
                        sx={{ borderRadius: '5px' }}
                        disabled={!item.treated}>
                        {user.role === Roles.donor
                          ? ' View your receipt'
                          : ' View this receipt'}
                      </Button>
                    }
                  />
                  <Row title='Created at' value={FormatDate(item.created_at)} />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

interface ROW {
  title: string;
  value: string | ReactNode;
  dark?: boolean;
}
export const Row: React.FC<ROW> = ({ title, value, dark = false }) => {
  return (
    <ListItem sx={{ width: '100%' }}>
      <Stack
        sx={{ width: '100%' }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography
          sx={{
            fontWeight: dark ? 800 : 'inital',
            fontSize: dark ? '1.6rem' : 'intial',
          }}>
          {title}
        </Typography>
        {typeof value === 'string' ? (
          <Typography
            sx={{
              fontWeight: dark ? 800 : 'inital',
              fontSize: dark ? '1.6rem' : 'intial',
            }}>
            {value}
          </Typography>
        ) : (
          value
        )}
      </Stack>
    </ListItem>
  );
};
export default ShowInvestment;
