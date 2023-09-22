import {
  Avatar,
  Card,
  CardContent,
  Skeleton,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export interface CARD {
  title: string;
  value: string | number;
  Icon: any;
  color: string;
  state?: boolean;
}

const CardCustomze: React.FC<CARD> = ({ title, value, Icon, color, state }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '70%' }}>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={3}
          height={'100%'}>
          <Stack
            spacing={1}
            justifyContent={'space-between'}
            sx={{ height: '100%' }}>
            <Typography
              color='text.secondary'
              variant='overline'
              textTransform={'capitalize'}>
              {' '}
              {title}
            </Typography>
            {!state ? (
              <Typography variant='h5'>{value}</Typography>
            ) : (
              <Skeleton variant='rectangular' width={'90px'} height={'30px'} />
            )}
          </Stack>
          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56,
            }}>
            <SvgIcon>{Icon}</SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardCustomze;
