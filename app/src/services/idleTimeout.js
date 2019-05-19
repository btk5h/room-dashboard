import React, { useCallback, useContext, useEffect, useState } from "react"

import { remote } from "services/electron"

const { exec } = remote.require("child_process")

function monitorOff() {
  exec("vcgencmd display_power 0")
}

function monitorOn() {
  exec("vcgencmd display_power 1")
}

export const IdleTimeoutContext = React.createContext()

export function IdleTimeoutProvider(props) {
  const {
    children
  } = props

  const [lockCount, setLockCount] = useState(0)
  const acquireLock = useCallback(() => setLockCount(prev => prev + 1), [])
  const releaseLock = useCallback(() => setLockCount(prev => prev - 1), [])

  const [lastActivity, setLastActivity] = useState(new Date())
  const doActivity = useCallback(() => {
    monitorOn()
    setLastActivity(new Date())
  }, [])

  useEffect(() => {
    console.log(`Idle timeout: lockCount = ${lockCount}, lastActivity = ${lastActivity}`)

    if (!lockCount) {
      const idleHandle = setTimeout(monitorOff, 30000)

      return () => {
        clearTimeout(idleHandle)
      }
    }
  }, [lockCount, lastActivity])

  const params = {
    acquireLock,
    releaseLock,
    doActivity
  }

  return (
    <IdleTimeoutContext.Provider value={params}>
      {children}
    </IdleTimeoutContext.Provider>
  )
}

export function useIdleTimeoutLock(condition) {
  const { acquireLock, releaseLock } = useContext(IdleTimeoutContext)

  useEffect(() => {
    if (condition === undefined || condition) {
      acquireLock()

      return () => {
        releaseLock()
      }
    }
  })
}