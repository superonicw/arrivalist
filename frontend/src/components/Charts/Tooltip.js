import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import numeral from 'numeral'

const useStyles = makeStyles(() => ({
  tooltip: {
    color: 'white',
    background: 'rgba(0, 0, 0, 0.9)',
    border: '1px solid transparent',
    borderRadius: 3,
    padding: '4px 8px',
    marginTop: -30,
  },
}))

const Tooltip = ({ x, y, state }) => {
  const classes = useStyles()

  return (
    <div className={classes.tooltip}>
      <div>
        <b>{state}</b>
      </div>
      <div>
        {moment(x).format('MMM Do')}: <b>{numeral(y).format('0,0')}</b>
      </div>
    </div>
  )
}

export default Tooltip
