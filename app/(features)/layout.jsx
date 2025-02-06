import CookieModal from '@/components/common/CookieModal'
import React from 'react'

const layout = ({children}) => {
    
  return (
    <div>
        {children}
        <CookieModal/>
    </div>
  )
}

export default layout