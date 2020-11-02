import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'

export const history = createBrowserHistory()

const middlewares = []

const enhancers = [applyMiddleware(...middlewares)]

export const store = createStore(reducers, compose(...enhancers))
