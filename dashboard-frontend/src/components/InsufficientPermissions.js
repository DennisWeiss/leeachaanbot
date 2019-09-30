import React from 'react'
import {translate} from 'react-translate'


const InsufficientPermission = ({t}) => (
  <div>
    {t('INSUFFICIENT_PERMISSIONS')}
  </div>
)

export default translate('InsufficientPermissions')(InsufficientPermission)