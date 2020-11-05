import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import { STATES } from 'config/constants'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
  },
}))

const Filter = ({ states, dates, onStatesChange, onDatesChange }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>State</InputLabel>
        <Select
          value={states}
          multiple
          onChange={evt => onStatesChange(evt.target.value)}
        >
          {STATES.map(state => (
            <MenuItem key={state.id} value={state.abbr}>
              {state.name}
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
