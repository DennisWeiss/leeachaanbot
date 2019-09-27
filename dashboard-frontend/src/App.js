import React from 'react'
import './App.css'
import Page from './components/Page'
import {TranslatorProvider} from 'react-translate'
import translations from './conf/translations'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en'
    }
  }

  render() {
    return (
      <TranslatorProvider translations={translations[this.state.locale]}>
        <Page/>
      </TranslatorProvider>
    )
  }
}

export default App
