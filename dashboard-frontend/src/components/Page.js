import React from 'react'
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  IconButton,
  Divider,
  ListItemIcon,
  Hidden
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
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
import BotSettingsPage from './Administration/BotSettingsPage'
import InsufficientPermission from './InsufficientPermissions'
import LoggedInAsAdministrator from './LoggedInAsAdministrator'
import CustomCommandsPage from './Administration/CustomCommandsPage'
import PermissionsContext from '../context/PermissionsContext'
import './Page.scss'
import LanguageSelector from './util/LanguageSelector'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'


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
    marginRight: 5,
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

const Page = ({t, accessToken, selectPage, selectedPage, loggedInUser, locale, changeLocale}) => {

  const classes = useStyles()
  const theme = useTheme()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer =
    <div>
      <div className={classes.toolbar}/>
      <List subheader={t('LEADERBOARDS')}>
        <Link to='/points-leaderboard'>
          <ListItem button key='POINTS_LEADERBOARD' onClick={() => selectPage('POINTS_LEADERBOARD')}>
            <ListItemIcon className={classes.multiListItemIcon}><StarIcon/></ListItemIcon>
            <ListItemText primary={t('POINTS_LEADERBOARD')}/>
          </ListItem>
        </Link>
        <Link to='/donation-leaderboard'>
          <ListItem button key='DONATION_LEADERBOARD' onClick={() => selectPage('DONATION_LEADERBOARD')}>
            <ListItemIcon className={classes.multiListItemIcon}><AttachMoneyIcon/></ListItemIcon>
            <ListItemText primary={t('DONATION_LEADERBOARD')}/>
          </ListItem>
        </Link>
        <Link to='/bits-leaderboard'>
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
        </Link>
      </List>
      <Divider/>
      <List subheader={t('ADMINISTRATION')}>
        <Link to='/bot-settings'>
          <ListItem button key='BOT_SETTINGS' onClick={() => selectPage('BOT_SETTINGS')}>
            <ListItemIcon className={classes.multiListItemIcon}>
              <span style={{marginRight: 5}}><FontAwesomeIcon icon={faRobot}/></span>
            </ListItemIcon>
            <ListItemText primary={t('BOT_SETTINGS')}/>
          </ListItem>
        </Link>
        <Link to='/custom-commands'>
          <ListItem button key='CUSTOM_COMMANDS' onClick={() => selectPage('CUSTOM_COMMANDS')}>
            <ListItemIcon className={classes.multiListItemIcon}><SettingsIcon/></ListItemIcon>
            <ListItemText primary={t('CUSTOM_COMMANDS')}/>
          </ListItem>
        </Link>
      </List>
    </div>

  return (
    <BrowserRouter basename='/leeachaanbot'>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit'>
            <MenuIcon onClick={handleDrawerToggle}/>
          </IconButton>
          <span style={{marginRight: 10}}><img src='leea-emote-128.png' width={32}/></span>
          <h3 className='appTitle'>{t('TITLE')}</h3>
          <div className='languageSelectorDiv'>
            <LanguageSelector locale={locale} changeLocale={changeLocale}/>
          </div>
          {!loggedInUser && <LoginButton/>}
          {loggedInUser && <UserLoggedInfo loggedInUser={loggedInUser}/>}
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <CssBaseline/>

        <nav className={classes.drawer}>
          <Hidden smUp implementation='css'>
            <Drawer
              // container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              open
              variant='permanent'
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <PermissionsContext.Consumer>
            {hasAdministrationRights => <Switch>
              <Route path='/' exact>
                <PointsLeaderboard/>
              </Route>
              <Route path='/points-leaderboard'>
                <PointsLeaderboard/>
              </Route>
              <Route path='/donation-leaderboard'>
                <DonationLeaderboard/>
              </Route>
              <Route path='/bits-leaderboard'>
                <BitsLeaderboard/>
              </Route>
              <Route path='/bot-settings'>
                {
                  loggedInUser && hasAdministrationRights && <BotSettingsPage accessToken={accessToken}/>
                }
                {
                  loggedInUser && !hasAdministrationRights && <InsufficientPermission/>
                }
                {
                  !loggedInUser && <LoggedInAsAdministrator/>
                }
              </Route>
              <Route path='/custom-commands'>
                {
                  loggedInUser && hasAdministrationRights && <CustomCommandsPage/>
                }
                {
                  loggedInUser && !hasAdministrationRights && <InsufficientPermission/>
                }
                {
                  !loggedInUser && <LoggedInAsAdministrator/>
                }
              </Route>
            </Switch>
            }
          </PermissionsContext.Consumer>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default translate('Page')(Page)