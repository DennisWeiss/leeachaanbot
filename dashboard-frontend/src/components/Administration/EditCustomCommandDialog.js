import React from 'react'
import {translate} from 'react-translate'
import {updateCustomCommand} from '../../requests/requests'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {Checkbox, Input, Select} from 'antd'
import isEqual from 'lodash.isequal'
import queryString from 'query-string'


class EditCustomCommandDialog extends React.Component {

  state = {
    customCommand: {}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevProps, this.props) && this.props.customCommand && this.props.customCommand.commandHandles) {
      const customCommand = {...this.props.customCommand}
      customCommand.commandHandles = customCommand.commandHandles.map(commandHandle => '!' + commandHandle)
      this.setState({customCommand})
    }
  }

  handleCommandHandlesChange(commandHandlesValue) {
    const customCommand = {...this.state.customCommand}
    customCommand.commandHandles = commandHandlesValue.map(value => value[0] === '!' ? value : '!' + value)
    this.setState({customCommand})
  }

  handleClose() {
    this.props.setOpen(false)
  }

  handleSubmit() {
    const modifiedCustomCommand = {...this.state.customCommand}
    modifiedCustomCommand.commandHandles = modifiedCustomCommand.commandHandles.map(
      commandHandle => commandHandle.substr(1, commandHandle.length)
    )
    const parsed = queryString.parse(window.location.hash)
    let accessToken = parsed.access_token
    if (!accessToken) {
      accessToken = localStorage.getItem('accessToken')
    }
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      updateCustomCommand(modifiedCustomCommand, accessToken)
        .then(res => {
          if (res.status === 200) {
            this.handleClose()
            this.openSuccessSnackbar()
            this.props.reload()
          }
        })
    }
  }

  handleResponseChange(event) {
    const customCommand = {...this.state.customCommand}
    customCommand.response = event.target.value
    this.setState({customCommand})
  }

  handleShowTwitchHandleChange(event) {
    const customCommand = {...this.state.customCommand}
    customCommand.showTwitchHandle = event.target.checked
    this.setState({customCommand})
  }

  handleSnackbarClose() {
    this.setState({snackbarOpen: false})
  }

  openSuccessSnackbar() {
    this.setState({snackbarOpen: true})
  }

  render() {
    const {t, open} = this.props

    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>{t('EDITED_CUSTOM_COMMAND_SUCCESSFULLY')}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackbarClose.bind(this)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
        >
          <DialogTitle>{t('TITLE')}</DialogTitle>
          <DialogContent>
            <Select
              mode='tags'
              style={{width: '100%', margin: '6px 0'}}
              placeholder={t('COMMAND_HANDLES')}
              onChange={this.handleCommandHandlesChange.bind(this)}
              tokenSeparators={[',', ' ']}
              value={this.state.customCommand.commandHandles}
            >
            </Select>
            <Input.TextArea
              value={this.state.customCommand.response}
              placeholder={t('RESPONSE')}
              rows={3}
              style={{margin: '6px 0'}}
              onChange={this.handleResponseChange.bind(this)}
            />
            <Checkbox
              checked={this.state.customCommand.showTwitchHandle}
              onChange={this.handleShowTwitchHandleChange.bind(this)}
              style={{margin: '6px 0'}}
            >
              {t('SHOW_TWITCH_HANDLE')}
            </Checkbox>
            <DialogActions>
              <Button onClick={this.handleClose.bind(this)}>{t('CANCEL')}</Button>
              <Button onClick={this.handleSubmit.bind(this)} color='primary'>{t('ADD_CUSTOM_COMMAND')}</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

export default translate('EditCustomCommandDialog')(EditCustomCommandDialog)