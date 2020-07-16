import React from 'react'
import { connect } from 'react-redux'

import Income from './Income'

export const SideBar = () => {
  return (
    <div id='sidebar'>
      <Income />
    </div>
  )
}

export default connect()(SideBar)
