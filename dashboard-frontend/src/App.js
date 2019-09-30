import React from 'react'
import './App.css'
import Page from './components/Page'
import {TranslatorProvider} from 'react-translate'
import translations from './conf/translations'
import queryString from 'query-string'
import {currentUserInfo} from './requests/requests'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en',
      selectedPage: 'POINTS_LEADERBOARD',
      loggedInUser: null
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.hash)
    let accessToken = parsed.access_token
    if (!accessToken) {
      accessToken = localStorage.getItem('accessToken')
    }
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      currentUserInfo(accessToken)
        .then(res => {
          if (res.data && res.data.data && res.data.data.length > 0) {
            this.setState({loggedInUser: res.data.data[0]})
          } else {
            localStorage.removeItem('acessToken')
          }
        })
        .catch(err => localStorage.removeItem('acessToken'))
    }
  }

  selectPage = selectedPage => this.setState({selectedPage})

  render() {
    console.log(this.state.loggedInUser)
    return (
      <TranslatorProvider translations={translations[this.state.locale]}>
        <Page selectedPage={this.state.selectedPage} selectPage={this.selectPage.bind(this)} loggedInUser={this.state.loggedInUser}/>
      </TranslatorProvider>
    )
  }
}

export default App
