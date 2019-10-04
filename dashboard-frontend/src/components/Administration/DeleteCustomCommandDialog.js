import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core'
import {translate} from 'react-translate'
import {deleteCustomCommand} from '../../requests/requests'


class DeleteCustomCommandDialog extends React.Component {

  handleClose() {
    this.props.setOpen(false)
  }

  handleDelete() {
    deleteCustomCommand(this.props.customCommandId)
      .then(res => {
        this.props.setOpen(false)
        this.props.reload()
      })
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