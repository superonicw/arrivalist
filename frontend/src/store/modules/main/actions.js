import { createAction } from 'redux-actions'
import { successAction, failAction } from 'utils/state-helpers'

export const LIST_RECORD = 'LIST_RECORD'

export const listRecord = createAction(LIST_RECORD)
export const listRecordSuccess = createAction(successAction(LIST_RECORD))
export const listRecordFail = createAction(failAction(LIST_RECORD))
