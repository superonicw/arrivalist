import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Dashboard } from 'containers/pages'

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Dashboard} />
  </BrowserRouter>
)

export default Routes
