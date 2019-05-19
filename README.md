# Room Dashboard

A handy dashboard designed to run on a Raspberry Pi.

### Required Environment Variables

`REACT_APP_REMOTE_CONTROL_WS` (in .env) or `REMOTE_CONTROL_WS` - The remote control server that sends commands to the
dashboard

### Deployment

This project uses a separate git repo for deploying changes to balena. This allows development versions to be pushed
separately from the public-facing git repo