import React from 'react';

import {
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  TextField,
  ListItemText,
  Typography,
  Stack,
  CircularProgress,
  Badge,
  Container,
  Box,
  useTheme,
  styled,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from '../Toolkit/Login/LoginSlice';
import Roles from '../Seeds/Roles';
import { io } from 'socket.io-client';
import { Send } from '@mui/icons-material';
import { format, isSameDay } from 'date-fns';

const classes = {
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    minHeight: '78vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    maxHeight: '100%',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  messageArea: {
    height: 'calc(78vh - 50px)',
    overflow: 'hidden',
    overflowY: 'scroll',
    padding: '0 10px',
  },
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Messenger = () => {
  const UserInformation = useSelector(selectLogin);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const [userList, setUserList] = React.useState<null | any[]>(null);
  const [userSelectForExchange, setUserSelectForExchange] = React.useState<
    null | number
  >(null);
  const [userConversation, setUserConversation] = React.useState<
    null | [{ align: 'left' | 'right'; content: string; date: Date }]
  >(
    UserInformation.user.role === Roles.donor
      ? [
          {
            align: 'left',
            content: 'hello',
            date: new Date(),
          },
        ]
      : null
  );
  const [message, setMessage] = React.useState<string>('');
  const [userId, setUserId] = React.useState(0);
  const [socket, setSocket] = React.useState<any>(null);

  React.useEffect(() => {
    const skt = io('https://api.investkori.com', {
      auth: {
        role: UserInformation.user.role,
        userID: UserInformation.user.id,
        username: UserInformation.user.email,
      },
    });
    setSocket(skt);
  }, [
    UserInformation.user.email,
    UserInformation.user.id,
    UserInformation.user.role,
  ]);

  const handleSubmit = React.useCallback(
    (e: any) => {
      e.preventDefault();
      if (message.length >= 1 && socket) {
        console.log(
          userSelectForExchange,
          UserInformation.user.role !== Roles.donor
        );
        socket.emit('private message', {
          content: message,
          to:
            UserInformation.user.role !== Roles.donor
              ? userSelectForExchange
              : userId,
        });

        setUserConversation((state) => {
          const newValue = state;
          newValue?.push({
            align: 'right',
            content: message,
            date: new Date(),
          });
          return newValue;
        });
        setMessage('');
      }
    },
    [UserInformation.user.role, message, socket, userId, userSelectForExchange]
  );

  const handleFilter = () => {};

  React.useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('session', (sessionData: any) => {
        const { sessionID, userID } = sessionData;
        setUserId(userID);
        if (UserInformation.user.role === Roles.donor) {
          setUserSelectForExchange(userID);
        }
        console.log('session information', sessionData);
      });

      socket.on(
        'users',
        (users: {
          lobby: [
            {
              userId: number;
              username: string;
              connected: boolean;
              message: [];
            }
          ];
        }) => {
          console.log('la liste de tous les users en attentes', users);
          if (users) {
            setUserList(users.lobby.filter((item) => item.connected));
          }
        }
      );

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }, [UserInformation.user.role, socket, userConversation]);

  React.useEffect(() => {
    if (socket) {
      socket.on(
        'private message',
        (message: {
          content: string;
          from: string;
          to: string;
          date: number;
        }) => {
          console.log('reception de message', message);
          setUserConversation((item: any) => {
            const newValue: any = [...item];
            newValue?.push({
              align: 'left',
              content: message.content,
              date: new Date(message.date),
            });
            return newValue;
          });
        }
      );
    }
  }, [socket]);

  React.useEffect(() => {
    if (UserInformation.user.role !== Roles.donor && userSelectForExchange) {
      setUserConversation([
        { align: 'left', content: 'hello', date: new Date() },
      ]);
    }
  }, [UserInformation.user.role, userSelectForExchange]);

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: '2vh',
      }}>
      <Container maxWidth='lg'>
        <Grid container component={Paper} sx={classes.chatSection}>
          {/* User List Section, only for the admin */}
          {UserInformation.user.role !== Roles.donor && (
            <Grid item xs={3.8} sx={classes.borderRight500}>
              {/* User Filter */}
              <Grid item xs={12} style={{ padding: '10px', height: '70px' }}>
                <TextField
                  id='outlined-basic-email'
                  label='Recherche'
                  variant='outlined'
                  fullWidth
                  onChange={handleFilter}
                  sx={{ height: '100%' }}
                />
              </Grid>
              <Divider />

              {/* user List */}
              {userList && (
                <List
                  sx={{
                    height: 'calc(78vh - 90px)',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                    mt: 1,
                  }}>
                  {userList.map((item, key) => (
                    <ListItem
                      button
                      key={key}
                      selected={userSelectForExchange === item.userID}
                      onClick={() => {
                        setUserSelectForExchange(item.userID);
                      }}>
                      <ListItemIcon>
                        <StyledBadge
                          overlap='circular'
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          variant='dot'>
                          <Avatar alt={item.username} />
                        </StyledBadge>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          fontSize={'0.8rem'}
                          sx={{ wordWrap: 'break-word' }}>
                          {item.username}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}

              {/* userLoader */}
              {userList === null && (
                <Stack
                  sx={{ width: '100%', height: '100%' }}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <CircularProgress color='inherit' />
                </Stack>
              )}
            </Grid>
          )}

          {/* Chat section */}
          <Grid
            item
            xs={UserInformation.user.role !== Roles.donor ? 8.2 : 12}
            sx={{
              height: '100%',
              minHeight: '78vh',
              overflow: 'hidden',
              backgroundImage: `url(${'/Assets/Imgs/chatBackground.svg'})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}>
            {/* conversation part for chat features */}
            {userConversation && (
              <>
                <List sx={classes.messageArea}>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12} rowGap={2}>
                        {userConversation.map((item, key) => (
                          <MessengerItems {...item} key={key} />
                        ))}
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
                <Divider />
                <Box
                  sx={{
                    padding: '10px 0',
                    width: '100%',
                    background: 'white',
                    m: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  component={'form'}
                  onSubmit={(e) => handleSubmit(e)}>
                  <TextField
                    id='outlined-basic-email'
                    placeholder='Message...'
                    sx={{ width: 'calc(98%)' }}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    focused
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='start'>
                          <IconButton type='submit'>
                            <Send color='primary' />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </>
            )}

            {/* for Notice the user is not choose any user for chat */}
            {!userSelectForExchange &&
              UserInformation.user.role !== Roles.donor && (
                <Stack
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ height: '100%', minHeight: '78vh' }}>
                  <Typography
                    color={'info'}
                    sx={{ background: 'white', p: 2, borderRadius: '10px' }}
                    fontSize={'1.2rem'}
                    fontWeight={780}>
                    Aucune conversation sélectionnée pour le moment.
                  </Typography>
                </Stack>
              )}

            {/* The Loader when the user choose a user, he load for get all previous conversation */}
            {!userConversation && userSelectForExchange && (
              <Stack
                sx={{ width: '100%', height: '100%', minHeight: '78vh' }}
                justifyContent={'center'}
                alignItems={'center'}>
                <CircularProgress color='inherit' />
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

interface MESSENGERITEMS {
  content: string;
  date: Date;
  align: 'left' | 'right';
}

const MessengerItems: React.FC<MESSENGERITEMS> = ({ align, content, date }) => {
  const { palette } = useTheme();
  return (
    <ListItemText
      sx={{
        display: 'flex',
        justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
      }}>
      <Typography
        sx={{
          background:
            align === 'left' ? palette.secondary.dark : palette.primary.main,
          color: align === 'left' ? 'initial' : palette.secondary.main,
          padding: '8px 10px',
          width: 'max-content',
          borderRadius:
            align === 'left' ? '0px 10px 10px 10px' : '10px 10px 0px 10px',
          position: 'relative',
          margin: 0,
        }}>
        {content}
      </Typography>
      <Typography
        component={'span'}
        fontSize={'0.7rem'}
        fontStyle={'italic'}
        m={0}
        p={0}
        sx={{
          padding: '5px',
          mt: 2,
          background: 'white',
          borderRadius: '5px',
        }}>
        {isSameDay(new Date(), new Date(date))
          ? format(new Date(date), 'H:m')
          : format(new Date(date), 'MM/dd/yyyy')}
      </Typography>
    </ListItemText>
  );
};

export default Messenger;
