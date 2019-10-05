import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core'
import {translate} from 'react-translate'
import {deleteCustomCommand} from '../../requests/requests'
import queryString from 'query-string'


class DeleteCustomCommandDialog extends React.Component {

  handleClose() {
    this.props.setOpen(false)
  }

  handleDelete() {
    const parsed = queryString.parse(window.location.hash)
    let accessToken = parsed.access_token
    if (!accessToken) {
      accessToken = localStorage.getItem('accessToken')
    }
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      deleteCustomCommand(this.props.customCommandId, accessToken)
        .then(res => {
          if (res.status === 200) {
            this.props.setOpen(false)
            this.props.reload()
          }
        })
    }
  }

  render() {
    const {t, open} = this.props
    return (
      <Dialog
        open={open}
        onClose={this.handleClose.bind(this)}
      >
        <DialogTitle>{t('TITLE')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('DELETION_WARNING')}
          </DialogContentText>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color='secondary'>{t('CANCEL')}</Button>
            <Button onClick={this.handleDelete.bind(this)} color='error'>{t('DELETE')}</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}

export default translate('DeleteCustomCommandDialog')(DeleteCustomCommandDialog)