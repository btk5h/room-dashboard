import React from "react"
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"

import { env } from "services/electron"
import { IdleTimeoutProvider, useIdleTimeoutLock } from "services/idleTimeout"
import { RemoteControlProvider } from "services/remoteController"
import { GlobalStyles } from "styles/globalStyles"

import Dashboard from "layouts/Dashboard"

function AppRouteTable() {
  useIdleTimeoutLock(process.env.NODE_ENV === "development")

  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard}/>
        <Redirect to="/dashboard"/>
      </Switch>
    </Router>
  )
}

export default function App() {
  return (
    <div>
      <GlobalStyles/>
      <IdleTimeoutProvider>
        <RemoteControlProvider server={env.REMOTE_CONTROL_WS}>
          <AppRouteTable/>
        </RemoteControlProvider>
      </IdleTimeoutProvider>
    </div>
  )
}
