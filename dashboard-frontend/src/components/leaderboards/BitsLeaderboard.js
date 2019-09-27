import React from 'react'
import {translate} from 'react-translate'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {fetchBitsLeaderboard} from '../../requests/requests'


class BitsLeaderboard extends React.Component {

  state = {
    leaderboard: []
  }

  componentDidMount() {
    fetchBitsLeaderboard()
      .then(res => {
        if (res.data) {
          this.setState({leaderboard: res.data})
        }
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
              <TableCell>{t('BITS')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.leaderboard.map(user => (
              <TableRow key={user.user_name}>
                <TableCell>
                  {user.rank}.
                </TableCell>
                <TableCell>
                  <div className='userEntry'>
                    <img style={{marginRight: 10}} src={user.profilePicture} width={32} />
                    <a href={`https://twitch.tv/${user.user_name}`}>{user.user_name}</a>
                  </div>
                </TableCell>
                <TableCell>
                  {user.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  }
}

export default translate('BitsLeaderboard')(BitsLeaderboard)