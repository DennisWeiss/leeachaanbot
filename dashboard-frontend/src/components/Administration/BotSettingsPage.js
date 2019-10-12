import React from 'react'
import {Button, Paper, Tabs, Tab, Grid, IconButton, Snackbar} from '@material-ui/core'
import {Input, InputNumber, Select} from 'antd'
import {translate} from 'react-translate'
import TabPanel from '../util/TabPanel'
import './BotSettingsPage.scss'
import {fetchSecuredConfig, updateSecuredConfig} from '../../requests/requests'
import CloseIcon from '@material-ui/icons/Close'


const objEqual = (a, b) => {
  for (const obj of [a, b]) {
    for (const key of Object.keys(obj)) {
      if (typeof a[key] === 'object') {
        if (typeof b[key] === 'object') {
          if (!objEqual(a[key], b[key])) {
            return false
          }
        } else {
          return false
        }
      } else {
        if (a[key] !== b[key]) {
          return false
        }
      }
    }
  }
  return true
}


class BotSettingsPage extends React.Component {

  state = {
    selectedTab: 0,
    config: {},
    initialConfig: {},
    snackbarOpen: false
  }

  componentDidMount() {
    fetchSecuredConfig(this.props.accessToken)
      .then(res => {
        if (res.data) {
          this.setState({
            config: {...res.data},
            initialConfig: {...res.data}
          })
        }
      })
  }

  handleTabChange(event, selectedTab) {
    this.setState({selectedTab})
  }

  changeFieldValue = field => event => {
    const config = {...this.state.config}
    config[field] = event.target.value
    this.setState({config})
  }

  changeCurrencyFieldValue = field => event => {
    const config = {...this.state.config}
    const currency = {...config.currency}
    currency[field] = event.target.value
    config.currency = currency
    this.setState({config}, () => console.log(this.state))
  }

  changeCurrencyFieldValueNumber = field => value => {
    const config = {...this.state.config}
    const currency = {...config.currency}
    currency[field] = value
    config.currency = currency
    this.setState({config})
  }

  changeExcludedUsers(users) {
    const config = {...this.state.config}
    config.excludedUsers = users
    this.setState({config})
  }

  saveChanges() {
    updateSecuredConfig(this.state.config, this.props.accessToken)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            snackbarOpen: true,
            config: res.data,
            initialConfig: res.data
          })
        }
      })
  }

  handleSnackbarClose() {
    this.setState({snackbarOpen: false})
  }

  render() {
    const {t} = this.props

    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose.bind(this)}
          message={<span>{t('SAVED_CHANGES_SUCCESSFULLY')}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackbarClose.bind(this)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Paper className='botSettingsPagePaper'>
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleTabChange.bind(this)}
          >
            <Tab label={t('GENERAL')}/>
            <Tab label={t('CURRENCY')}/>
            <Tab label={t('USERS')}/>
          </Tabs>
          <TabPanel value={this.state.selectedTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {t('CLIENT_ID')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.clientId} onChange={this.changeFieldValue('clientId').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('CLIENT_SECRET')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.clientSecret}
                       onChange={this.changeFieldValue('clientSecret').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('ACCESS_TOKEN')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.accessToken}
                       onChange={this.changeFieldValue('accessToken').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('REFRESH_TOKEN')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.refreshToken}
                       onChange={this.changeFieldValue('refreshToken').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('BROADCASTER_CHANNEL_NAME')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.broadcasterChannelName}
                       onChange={this.changeFieldValue('broadcasterChannelName').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('BOT_USERNAME')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.botUsername}
                       onChange={this.changeFieldValue('botUsername').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('BOT_OAUTH_PASSWORD')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.botOAuthPassword}
                       onChange={this.changeFieldValue('botOAuthPassword').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('DONATION_CURRENCY')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.donationCurrency}
                       onChange={this.changeFieldValue('donationCurrency').bind(this)}/>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={this.state.selectedTab} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {t('CURRENCY_NAME_SINGULAR')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.currency && this.state.config.currency.nameSingular}
                       onChange={this.changeCurrencyFieldValue('nameSingular').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('CURRENCY_NAME_PLURAL')}
              </Grid>
              <Grid item xs={6}>
                <Input value={this.state.config.currency && this.state.config.currency.namePlural}
                       onChange={this.changeCurrencyFieldValue('namePlural').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('ITERATION_CYCLE')}
              </Grid>
              <Grid item xs={6}>
                <InputNumber min={1} value={this.state.config.currency && this.state.config.currency.iterationCycleInMs}
                             onChange={this.changeCurrencyFieldValueNumber('iterationCycleInMs').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('POINTS_PER_VIEW_ITERATION')}
              </Grid>
              <Grid item xs={6}>
                <InputNumber min={1}
                             value={this.state.config.currency && this.state.config.currency.pointsPerViewIteration}
                             onChange={this.changeCurrencyFieldValueNumber('pointsPerViewIteration').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('FOLLOWER_MULTIPLIER')}
              </Grid>
              <Grid item xs={6}>
                <InputNumber min={1} value={this.state.config.currency && this.state.config.currency.followerMultiplier}
                             onChange={this.changeCurrencyFieldValueNumber('followerMultiplier').bind(this)}/>
              </Grid>
              <Grid item xs={6}>
                {t('SUBSCRIBER_MULTIPLIER')}
              </Grid>
              <Grid item xs={6}>
                <InputNumber min={1}
                             value={this.state.config.currency && this.state.config.currency.subscriberMultiplier}
                             onChange={this.changeCurrencyFieldValueNumber('subscriberMultiplier').bind(this)}/>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={this.state.selectedTab} index={2}>
            <div>
              {t('EXCLUDED_USERS')}
            </div>
            <Select
              mode='tags'
              style={{width: '100%', margin: '6px 0'}}
              placeholder={t('EXCLUDED_USERS')}
              onChange={this.changeExcludedUsers.bind(this)}
              tokenSeparators={[',', ' ']}
              value={this.state.config.excludedUsers}
            />
          </TabPanel>
        </Paper>
        <Paper className='botSettingsPageSaveButtonPaper'>
            <Button
              color='primary'
              variant='contained'
              className='botSettingsSaveButton'
              disabled={objEqual(this.state.config, this.state.initialConfig)}
              onClick={this.saveChanges.bind(this)}
            >
              {t('SAVE_CHANGES')}
            </Button>
        </Paper>
      </>
    )
  }
}

export default translate('BotSettingsPage')(BotSettingsPage)