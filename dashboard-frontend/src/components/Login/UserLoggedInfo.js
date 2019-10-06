import React from 'react'
import './UserLoggedInfo.scss'
import {Popover} from '@material-ui/core'
import {fetchPointsScore} from '../../requests/requests'
import {Button} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {translate} from 'react-translate'
import numeral from 'numeral'
import conf from '../../conf/conf'
import LanguageSelector from '../util/LanguageSelector'


const formatPoints = (score, nameSingular, namePlural) => `${numeral(score).format()} ${score === 1 ? nameSingular : namePlural}`

class UserLoggedInfo extends React.Component {

  state = {
    popoverOpen: false,
    anchorEl: null,
    pointsScore: null
  }

  componentDidMount() {
    fetchPointsScore(this.props.loggedInUser.id)
      .then(res => {
        if (res.data) {
          this.setState({pointsScore: res.data})
        }
      })
  }

  openPopover(event) {
    this.setState({
      popoverOpen: true,
      anchorEl: event.target
    })
  }

  closePopover() {
    this.setState({popoverOpen: false})
  }

  logout() {
    localStorage.removeItem('accessToken')
    window.location = conf.hostUri
  }

  render() {
    const {t, loggedInUser} = this.props

    if (!loggedInUser) {
      return <div/>
    }
    return (
      <>
        <div className='userLoggedInfo' onClick={this.openPopover.bind(this)}>
          <img src={loggedInUser.profile_image_url} width={32} className='profileImage'/>
        </div>
        <Popover
          open={this.state.popoverOpen}
          onClose={this.closePopover.bind(this)}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className='userLoggedInfoExpanded'>
            <img src={loggedInUser.profile_image_url} width={45} className='profileImage'/>
            {loggedInUser.display_name}
          </div>
          <div className='pointsScoreDisplay'>
            {this.state.pointsScore && <div>{formatPoints(
              this.state.pointsScore.points,
              this.state.pointsScore.currencyNameSingular,
              this.state.pointsScore.currencyNamePlural
            )}</div>}
          </div>
          <div className='logoutButton'>
            <Button onClick={this.logout.bind(this)}>
              <ExitToAppIcon/>
              {t('LOGOUT')}
            </Button>
          </div>
        </Popover>
      </>
    )
  }
}

export default translate('UserLoggedInfo')(UserLoggedInfo)