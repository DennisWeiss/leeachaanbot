import React from 'react'
import './App.scss'
import Page from './components/Page'
import {TranslatorProvider} from 'react-translate'
import translations from './conf/translations'
import queryString from 'query-string'
import {currentUserInfo, hasAdministrationRights} from './requests/requests'
import PermissionsContext from './context/PermissionsContext'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en',
      selectedPage: 'POINTS_LEADERBOARD',
      loggedInUser: null,
      hasAdministrationRights: false
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
            this.setState({
              accessToken,
              loggedInUser: res.data.data[0]
            })
          } else {
            localStorage.removeItem('accessToken')
          }
        })
        .catch(err => localStorage.removeItem('accessToken'))

      hasAdministrationRights(accessToken)
        .then(res => {
          if (res.data) {
            this.setState({
              accessToken,
              hasAdministrationRights: res.data.hasRights
            })
          }
        })
    }
  }

  selectPage = selectedPage => this.setState({selectedPage})

  changeLocale = locale => this.setState({locale})

  render() {
    return (
      <TranslatorProvider translations={translations[this.state.locale]}>
        <PermissionsContext.Provider value={this.state.hasAdministrationRights}>
          <Page
            accessToken={this.state.accessToken}
            selectedPage={this.state.selectedPage}
            selectPage={this.selectPage.bind(this)}
            loggedInUser={this.state.loggedInUser}
            locale={this.state.locale}
            changeLocale={this.changeLocale.bind(this)}
          />
        </PermissionsContext.Provider>
      </TranslatorProvider>
    )
  }
}

export default App
