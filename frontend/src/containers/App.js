import React from 'react'
import { Provider } from 'react-redux'
import axios from 'axios'
import { store } from 'store'
import { API_BASE_URL } from 'config/base'
import Routes from '../routes'
import 'styles/core.scss'

axios.defaults.baseURL = API_BASE_URL

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default App
