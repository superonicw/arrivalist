import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pickBy, identity } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  listTrip,
  clearTrip,
  selectTrips,
  selectLoading,
} from 'store/modules/main'
import { Filter, LineChart, MapChart } from 'components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  filter: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    height: 600,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: theme.spacing(1),
  },
  button: {
    width: 'calc(50% - 4px)',
  },
}))

const Dashboard = () => {
  const classes = useStyles()

  const [states, setStates] = useState(['AL'])
  const [dates, setDates] = useState({ start: '2020-09-01', end: '' })

  const trips = useSelector(selectTrips)
  const loading = useSelector(selectLoading)

  const dispatch = useDispatch()

  function handleFetchData() {
    const { start, end } = dates

    if (!states && !start && !end) {
      return
    }

    const params = pickBy({ states: states.join(','), start, end }, identity)

    dispatch(listTrip({ params }))
  }

  function handleReset() {
    setStates([])
    setDates({ start: '', end: '' })
    dispatch(clearTrip())
  }

  const buttonDisabled =
    (!dates.start && !dates.end && !states.length) || loading

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={2}>
              <Paper className={classes.filter}>
                <Filter
                  states={states}
                  dates={dates}
                  onStatesChange={setStates}
                  onDatesChange={setDates}
                />
                <FormControl className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={buttonDisabled}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={buttonDisabled}
                    onClick={handleFetchData}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" size={24} />
                    ) : (
                      'Search'
                    )}
                  </Button>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Line</Typography>
                <LineChart trips={trips} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={5}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Map</Typography>
                <MapChart trips={trips} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard
