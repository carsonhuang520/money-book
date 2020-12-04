import React from 'react'

function Icon(props) {
  const {name} = props
  return (
    <svg className={'icon'} aria-hidden={true}>
      <use xlinkHref={`#icon-${name}`}/>
    </svg>
  )
}

export default Icon