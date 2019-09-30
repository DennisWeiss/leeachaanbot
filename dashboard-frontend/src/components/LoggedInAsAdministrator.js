import React from 'react'
import {translate} from 'react-translate'


const LoggedInAsAdministrator = ({t}) => (
  <div>
    {t('LOGGED_IN_AS_ADMINISTRATOR')}
  </div>
)

export default translate('LoggedInAsAdministrator')(LoggedInAsAdministrator)