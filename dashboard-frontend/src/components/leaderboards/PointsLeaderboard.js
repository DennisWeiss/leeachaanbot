import React from 'react'
import {translate} from 'react-translate'
import {Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import './PointsLeaderboard.css'


class PointsLeaderboard extends React.Component {

  render() {
    const {t} = this.props

    // TODO: fetch from API
    const currencyName = 'Dangos'
    const leaderboard = [{
      profilePicture: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8e8ae128-7000-425d-9e4d-e78564f29e5f-profile_image-300x300.png',
      username: 'LeeaChaan',
      points: 5402
    }]

    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('USER')}</TableCell>
                <TableCell>{currencyName}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map(user => (
                <TableRow key={user.username}>
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