import React from 'react'

function SideCard(props) {
    console.log(props.children)
  return (
    <div className='side-card'>
        <div className='side-info'>
            {props.children}
        </div>
    </div>
  )
}

export default SideCard