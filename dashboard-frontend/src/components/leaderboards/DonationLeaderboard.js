import React from 'react'
import {translate} from 'react-translate'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {fetchConfig, fetchDonationLeaderboard} from '../../requests/requests'
import {round} from '../../helper/helper'

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
        console.log(res.data)
        this.setState({donationCurrency: res.data.donationCurrency})
      })
  }

  render() {
    const {t} = this.props

    return <div>
      <h2>{t('TITLE')}</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{t('USER')}</TableCell>
              <TableCell>{t('DONATION_AMOUNT')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(this.state.leaderboard).map(([index, user]) => (
              <TableRow key={user.username}>
                <TableCell>
                  {parseInt(index) + 1}.
                </TableCell>
                <TableCell>
                  <div className='userEntry'>
                    {user.username}
                  </div>
                </TableCell>
                <TableCell>
                  {round(2, true)(user.amount)} {this.state.donationCurrency}
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