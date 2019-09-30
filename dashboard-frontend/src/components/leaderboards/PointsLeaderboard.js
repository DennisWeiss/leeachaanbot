import React from 'react'
import {translate} from 'react-translate'
import {Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import './PointsLeaderboard.scss'
import {fetchPointsLeadeboard} from '../../requests/requests'
import numeral from 'numeral'


class PointsLeaderboard extends React.Component {

  state = {
    leaderboard: []
  }

  componentDidMount() {
    fetchPointsLeadeboard()
      .then(res => {
        if (res.data) {
          this.setState({leaderboard: res.data || []})
        }
      })
  }

  render() {

    const {t} = this.props

    // TODO: fetch from API
    const currencyName = 'Dangos'

    return (
      <div className='pointsLeaderboard' >
        <h2>{t('TITLE')}</h2>
        <Paper className='tablePaper'>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell className='positionCell'></TableCell>
                <TableCell>{t('USER')}</TableCell>
                <TableCell align='right'>{currencyName}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.leaderboard.map(user => (
                <TableRow key={user.username}>
                  <TableCell className='positionCell'>
                    {user.position}.
                  </TableCell>
                  <TableCell>
                    <div className='userEntry'>
                      <img style={{marginRight: 10}} src={user.profilePicture} width={32} />
                      <a href={`https://twitch.tv/${user.username}`}>{user.username}</a>
                    </div>
                  </TableCell>
                  <TableCell align='right'>
                    {numeral(user.points).format()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default translate('PointsLeaderboard')(PointsLeaderboard)