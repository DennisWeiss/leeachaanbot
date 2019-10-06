import React from 'react'
import {translate} from 'react-translate'
import {IconButton, Menu, MenuItem} from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'
import './LanguageSelector.scss'


const locales = ['en', 'de']

class LanguageSelector extends React.Component {

  state = {
    anchorEl: null,
    menuOpen: false
  }

  handleLangSelectClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      menuOpen: true
    })
  }

  handleMenuClose() {
    this.setState({menuOpen: false})
  }

  handleLanguageSelect = locale => () => {
    this.props.changeLocale(locale)
    this.setState({menuOpen: false})
  }

  render() {
    const {t, locale, changeLocale} = this.props
    return <>
      <div className='languageSelector'>
        <div>
          <IconButton onClick={this.handleLangSelectClick.bind(this)}>
            <LanguageIcon color='white' className='languageIcon'/>
          </IconButton>
        </div>
        <div>
          {locale.toUpperCase()}
        </div>
      </div>
      <Menu
        anchorEl={this.state.anchorEl}
        open={this.state.menuOpen}
        onClose={this.handleMenuClose.bind(this)}
      >
        {locales.map(locale => <MenuItem onClick={this.handleLanguageSelect(locale).bind(this)}>
          {locale.toUpperCase()} - {t(`${locale.toUpperCase()}_LONG`)}
        </MenuItem>)}
      </Menu>
    </>
  }
}

export default translate('LanguageSelector')(LanguageSelector)