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
import CircularProgress from '@material-ui/core/CircularProgress'
import { listTrip, selectTrips, selectLoading } from 'store/modules/main'
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}))

const Dashboard = () => {
  const classes = useStyles()

  const [state, setState] = useState('')
  const [dates, setDates] = useState({ start: '', end: '' })

  const trips = useSelector(selectTrips)
  const loading = useSelector(selectLoading)

  const dispatch = useDispatch()

  function fetchData() {
    const { start, end } = dates

    if (!state && !start && !end) {
      return
    }

    const params = pickBy({ state, start, end }, identity)

    dispatch(listTrip({ params }))
  }

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
            <Grid item xs={12} md={2}>
              <Paper className={classes.paper}>
                <Filter
                  state={state}
                  dates={dates}
                  onStateChange={setState}
                  onDatesChange={setDates}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={(!state && !dates.start && !dates.end) || loading}
                  onClick={fetchData}
                >
                  {loading ? (
                    <CircularProgress color="secondary" size={24} />
                  ) : (
                    'Search'
                  )}
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
                <LineChart width={700} height={548} trips={trips} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
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
