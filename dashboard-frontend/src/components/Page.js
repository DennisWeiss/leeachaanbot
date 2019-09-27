import React from 'react'
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Divider, ListItemIcon
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar/AppBar'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {translate} from 'react-translate'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'


const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  multiListItemIcon: {
    minWidth: 0
  }
}))

const Page = ({t}) => {

  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <span style={{marginRight: 10}}><img src='leea-emote-128.png' width={32}/></span>
          <h3>LeeaChaanBot Dashboard</h3>
        </Toolbar>
      </AppBar>
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
              <ListItem button key='test'>
                <ListItemText primary={t('POINTS_LEADERBOARD')}/>
              </ListItem>
              <ListItem button key='test'>
                <ListItemIcon className={classes.multiListItemIcon}><AttachMoneyIcon/></ListItemIcon>
                <ListItemText primary={t('DONATION_LEADERBOARD')}/>
              </ListItem>
              <ListItem button key='test'>
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
          </div>
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  )
}

export default translate('Page')(Page)