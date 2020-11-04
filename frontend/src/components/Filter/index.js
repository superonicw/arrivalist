import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import { STATE_ABBREVS } from 'config/constants'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
  },
}))

const Filter = ({ state, dates, onStateChange, onDatesChange }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>State</InputLabel>
        <Select value={state} onChange={evt => onStateChange(evt.target.value)}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {STATE_ABBREVS.map(state => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          label="Start"
          type="date"
          value={dates.start}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={evt => onDatesChange({ ...dates, start: evt.target.value })}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          label="End"
          type="date"
          value={dates.end}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={evt => onDatesChange({ ...dates, end: evt.target.value })}
        />
      </FormControl>
    </React.Fragment>
  )
}

export default Filter
