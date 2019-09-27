import React from 'react'
import {translate} from 'react-translate'
import {Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import './PointsLeaderboard.css'
import {fetchPointsLeadeboard} from '../../requests/requests'


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
      <div>
        <h2>{t('TITLE')}</h2>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{t('USER')}</TableCell>
                <TableCell>{currencyName}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.leaderboard.map(user => (
                <TableRow key={user.username}>
                  <TableCell>
                    {user.position}.
                  </TableCell>
                  <TableCell>
                    <div className='userEntry'>
                      <img style={{marginRight: 10}} src={user.profilePicture} width={32} />
                      <a href={`https://twitch.tv/${user.username}`}>{user.username}</a>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.points}
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