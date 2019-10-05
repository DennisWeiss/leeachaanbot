import React from 'react'
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  ListItemIcon
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar/AppBar'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {translate} from 'react-translate'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import StarIcon from '@material-ui/icons/Star'
import SettingsIcon from '@material-ui/icons/Settings'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRobot} from '@fortawesome/free-solid-svg-icons'
import PointsLeaderboard from './leaderboards/PointsLeaderboard'
import DonationLeaderboard from './leaderboards/DonationLeaderboard'
import BitsLeaderboard from './leaderboards/BitsLeaderboard'
import LoginButton from './Login/LoginButton'
import UserLoggedInfo from './Login/UserLoggedInfo'
import {hasAdministrationRights} from '../helper/helper'
import BotSettingsPage from './Administration/BotSettingsPage'
import InsufficientPermission from './InsufficientPermissions'
import LoggedInAsAdministrator from './LoggedInAsAdministrator'
import CustomCommandsPage from './Administration/CustomCommandsPage'
import './Page.scss'


const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    zIndex: 4
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    textColor: 'white',
    zIndex: 5
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    padding: 10
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  multiListItemIcon: {
    minWidth: 0
  }
}))

const Page = ({t, selectPage, selectedPage, loggedInUser}) => {

  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <span style={{marginRight: 10}}><img src='leea-emote-128.png' width={32}/></span>
          <h3 className='appTitle'>LeeaChaanBot Dashboard</h3>
          {!loggedInUser && <LoginButton/>}
          {loggedInUser && <UserLoggedInfo loggedInUser={loggedInUser}/>}
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <CssBaseline/>

        <nav className={classes.drawer}>
          <Drawer
            open
            variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div>
              <div className={classes.toolbar}/>
              <List subheader={t('LEADERBOARDS')}>
                <ListItem button key='POINTS_LEADERBOARD' onClick={() => selectPage('POINTS_LEADERBOARD')}>
                  <ListItemIcon className={classes.multiListItemIcon}><StarIcon/></ListItemIcon>
                  <ListItemText primary={t('POINTS_LEADERBOARD')}/>
                </ListItem>
                <ListItem button key='DONATION_LEADERBOARD' onClick={() => selectPage('DONATION_LEADERBOARD')}>
                  <ListItemIcon className={classes.multiListItemIcon}><AttachMoneyIcon/></ListItemIcon>
                  <ListItemText primary={t('DONATION_LEADERBOARD')}/>
                </ListItem>
                <ListItem button key='BITS_LEADERBOARD' onClick={() => selectPage('BITS_LEADERBOARD')}>
                  <ListItemIcon className={classes.multiListItemIcon}>
                    <svg className="tw-icon__svg" width="24px" height="24px" version="1.1" viewBox="0 0 20 20" x="0px"
                         y="0px">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 12l7-10 7 10-7 6-7-6zm2.678-.338L10 5.487l4.322 6.173-.85.728L10 11l-3.473 1.39-.849-.729z"></path>
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary={t('BITS_LEADERBOARD')}/>
                </ListItem>
              </List>
              <Divider/>
              <List subheader={t('ADMINISTRATION')}>
                <ListItem button key='BOT_SETTINGS' onClick={() => selectPage('BOT_SETTINGS')}>
                  <ListItemIcon className={classes.multiListItemIcon}>
                    <span style={{marginRight: 5}}><FontAwesomeIcon icon={faRobot}/></span>
                  </ListItemIcon>
                  <ListItemText primary={t('BOT_SETTINGS')}/>
                </ListItem>
                <ListItem button key='CUSTOM_COMMANDS' onClick={() => selectPage('CUSTOM_COMMANDS')}>
                  <ListItemIcon className={classes.multiListItemIcon}><SettingsIcon/></ListItemIcon>
                  <ListItemText primary={t('CUSTOM_COMMANDS')}/>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          {
            selectedPage === 'POINTS_LEADERBOARD' && <PointsLeaderboard/>
          }
          {
            selectedPage === 'DONATION_LEADERBOARD' && <DonationLeaderboard/>
          }
          {
            selectedPage === 'BITS_LEADERBOARD' && <BitsLeaderboard/>
          }
          {
            selectedPage === 'BOT_SETTINGS' && loggedInUser && hasAdministrationRights(loggedInUser.id) && <BotSettingsPage/>
          }
          {
            selectedPage === 'BOT_SETTINGS' && loggedInUser && !hasAdministrationRights(loggedInUser.id) && <InsufficientPermission/>
          }
          {
            selectedPage === 'BOT_SETTINGS' && !loggedInUser  && <LoggedInAsAdministrator/>
          }
          {
            selectedPage === 'CUSTOM_COMMANDS' && loggedInUser && hasAdministrationRights(loggedInUser.id) && <CustomCommandsPage/>
          }
          {
            selectedPage === 'CUSTOM_COMMANDS' && loggedInUser && !hasAdministrationRights(loggedInUser.id) && <InsufficientPermission/>
          }
          {
            selectedPage === 'CUSTOM_COMMANDS' && !loggedInUser  && <LoggedInAsAdministrator/>
          }
        </main>
      </div>
    </>
  )
}

export default translate('Page')(Page)