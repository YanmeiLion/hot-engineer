// src/packages/home/app.tsx
import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { App } from '../../containers/home/app'

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
