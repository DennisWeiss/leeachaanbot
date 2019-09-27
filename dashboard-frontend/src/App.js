import React from 'react'
import './App.css'
import Page from './components/Page'
import {TranslatorProvider} from 'react-translate'
import translations from './conf/translations'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en',
      selectedPage: 'POINTS_LEADERBOARD'
    }
  }

  selectPage = selectedPage => this.setState({selectedPage})

  render() {
    return (
      <TranslatorProvider translations={translations[this.state.locale]}>
        <Page selectedPage={this.state.selectedPage} selectPage={this.selectPage.bind(this)}/>
      </TranslatorProvider>
    )
  }
}

export default App
