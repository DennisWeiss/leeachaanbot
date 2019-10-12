import React from 'react'
import {translate} from 'react-translate'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {fetchConfig, fetchDonationLeaderboard} from '../../requests/requests'
import numeral from 'numeral'
import './DonationLeaderboard.scss'

class DonationLeaderboard extends React.Component {

  state = {
    leaderboard: {},
    donationCurrency: ''
  }

  componentDidMount() {
    fetchDonationLeaderboard('leeachaan')
      .then(res => {
        if (res.data && res.data.datas && res.data.datas.result) {
          this.setState({leaderboard: res.data.datas.result})
        }
      })
    fetchConfig()
      .then(res => {
        this.setState({donationCurrency: res.data.donationCurrency})
      })
  }

  render() {
    const {t} = this.props

    return <div className='donationLeaderboard'>
      <h2>{t('TITLE')}</h2>
      <Paper className='tablePaper'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='positionCell'></TableCell>
              <TableCell>{t('USER')}</TableCell>
              <TableCell align='right'>{t('DONATION_AMOUNT')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(this.state.leaderboard).map(([index, user]) => (
              <TableRow key={user.username}>
                <TableCell className='positionCell'>
                  {parseInt(index) + 1}.
                </TableCell>
                <TableCell>
                  <div className='userEntry'>
                    {user.username}
                  </div>
                </TableCell>
                <TableCell align='right'>
                  {numeral(user.amount).format('0,000.00')} {this.state.donationCurrency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  }
}

export default translate('DonationLeaderboard')(DonationLeaderboard)