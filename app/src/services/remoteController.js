import React, { useContext, useEffect, useState } from "react"
import EventEmitter from "eventemitter3"

import ReconnectingWebSocket from "reconnecting-websocket"

import { IdleTimeoutContext } from "services/idleTimeout"

export const RemoteControlContext = React.createContext()

export function RemoteControlProvider(props) {
  const {
    children,
    server
  } = props

  const { doActivity } = useContext(IdleTimeoutContext)

  const [eventStream] = useState(() => new EventEmitter())
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const ws = new ReconnectingWebSocket(server)

    ws.addEventListener("open", () => {
      doActivity()
      setConnected(true)
    })

    ws.addEventListener("close", () => {
      doActivity()
      setConnected(false)
    })

    ws.addEventListener("message", event => {
      doActivity()
      eventStream.emit("event", event.data)
    })

    return () => {
      ws.close()
    }
  }, [server, eventStream, doActivity])

  const params = {
    eventStream,
    connected
  }

  return (
    <RemoteControlContext.Provider value={params}>
      {children}
    </RemoteControlContext.Provider>
  )
}

export function useRemoteControl(callback, dependencies) {
  const { eventStream } = useContext(RemoteControlContext)

  useEffect(() => {
    eventStream.on("event", callback)

    return () => {
      eventStream.off("event", callback)
    }
  }, dependencies)
}