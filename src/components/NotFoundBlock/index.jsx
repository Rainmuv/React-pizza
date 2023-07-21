import React from 'react'

import style from './style.module.scss'

export const NotFoundBlock = () => {
  return (
    <h1 className={style.root}>
      <span>:[</span>
      <br/>
      Ничего не найдено
    </h1>
  )
}
