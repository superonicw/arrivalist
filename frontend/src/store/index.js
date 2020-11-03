import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import sagas from './sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const enhancers = [applyMiddleware(...middlewares)]

export const store = createStore(reducers, compose(...enhancers))

sagaMiddleware.run(sagas)
