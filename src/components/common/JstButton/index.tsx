import React from 'react'
import Styles from './jstbutton.module.scss'

type JstButtonProps = {
  variant: 'primary' | 'secondary',
  icon?: React.ReactNode
}

const JstButton: React.FC<JstButtonProps> = (props) => { 
  return (
    <>
      <div className={Styles.buttonWrapper}>
        MetaMask
      </div>
    </>
  )
}

export default JstButton