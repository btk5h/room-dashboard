const electron = window.require("electron")

export default electron

export const remote = electron.remote

export const env = new Proxy({}, {
  get(target, property, reciever) {
    return process.env[`REACT_APP_${property}`] || remote.getGlobal("process").env[property]
  }
})