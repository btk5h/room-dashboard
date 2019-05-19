import React from "react"
import styled from "styled-components/macro"
import { Route } from "react-router-dom"
import Clock from "react-live-clock"

import { dashboardApps } from "services/registry"

const DashboardContainer = styled.div`
  padding: 72px;
  height: 100vh;
  max-height: 100%;
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`

const TopBarContainer = styled.nav`
  height: 72px;
  width: 100vw;
  max-width: 100%;
  flex: 0 0;
  display: flex;
  align-items: center;
`

const ClockWidget = styled(Clock)`
  margin-left: auto;
  font-family: Nunito, sans-serif;
  font-size: 48px;
`

const AppContainer = styled.div`
  flex: 1 0;
`

function TopBar() {
  return (
    <TopBarContainer>
      <ClockWidget format="h:mm A" ticking={true} timezone="America/Los_Angeles"/>
    </TopBarContainer>
  )
}

export default function Dashboard() {
  return (
    <DashboardContainer>
      <TopBar/>
      <AppContainer>
        {
          Object.entries(dashboardApps)
            .map(([key, Component]) => (
              <Route key={key} path={`dashboard/${key}`} component={Component}/>
            ))
        }
      </AppContainer>
    </DashboardContainer>
  )
}