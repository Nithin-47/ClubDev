

import React from 'react'

export default function Layout({children}) {
  return (
    <section className='w-full'>
        <div className='h-screen flex items-center justify-center'>
            {children}
        </div>
    </section>
  )
}
