import React from 'react'
import {Paper, Tabs, Tab, Grid} from '@material-ui/core'
import {Input, InputNumber} from 'antd'
import {translate} from 'react-translate'
import TabPanel from '../util/TabPanel'
import './BotSettingsPage.scss'


class BotSettingsPage extends React.Component {

  state = {
    selectedTab: 0
  }

  handleTabChange(event, selectedTab) {
    console.log(selectedTab)
    this.setState({selectedTab})
  }

  render() {
    const {t} = this.props

    return (
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
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('CLIENT_SECRET')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('ACCESS_TOKEN')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('REFRESH_TOKEN')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('BROADCASTER_CHANNEL_NAME')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('BOT_USERNAME')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('BOT_OAUTH_PASSWORD')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('DONATION_CURRENCY')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {t('CURRENCY_NAME_SINGULAR')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('CURRENCY_NAME_PLURAL')}
            </Grid>
            <Grid item xs={6}>
              <Input/>
            </Grid>
            <Grid item xs={6}>
              {t('ITERATION_CYCLE')}
            </Grid>
            <Grid item xs={6}>
              <InputNumber min={1}/>
            </Grid>
            <Grid item xs={6}>
              {t('POINTS_PER_VIEW_ITERATION')}
            </Grid>
            <Grid item xs={6}>
              <InputNumber min={1}/>
            </Grid>
            <Grid item xs={6}>
              {t('FOLLOWER_MULTIPLIER')}
            </Grid>
            <Grid item xs={6}>
              <InputNumber min={1}/>
            </Grid>
            <Grid item xs={6}>
              {t('SUBSCRIBER_MULTIPLIER')}
            </Grid>
            <Grid item xs={6}>
              <InputNumber min={1}/>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={2}>
        </TabPanel>
      </Paper>
    )
  }
}

export default translate('BotSettingsPage')(BotSettingsPage)