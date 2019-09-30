import React from 'react'
import './LoginButton.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitch} from '@fortawesome/free-brands-svg-icons'
import {createBrowserHistory} from 'history'
import conf from '../../conf/conf'


const history = createBrowserHistory()

class LoginButton extends React.Component {

  render() {
    return (
      <div className='twitchLoginButton' onClick={() =>
        window.location = `https://id.twitch.tv/oauth2/authorize?client_id=${conf.clientId}&redirect_uri=${conf.hostUri}&response_type=token`
      }>
        <FontAwesomeIcon icon={faTwitch} size='lg'/>
        <span className='loginText'>Login with Twitch</span>
      </div>
    )
  }
}

export default LoginButton