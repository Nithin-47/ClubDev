
import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import {Link} from 'react-router-dom'

export default function BackButton({label,href}) {
  return (
    <Button variant="link" className="font-normal w-full" size="sm">
        <Link to={href}>
            {label}
        </Link>


    </Button>
  )
}
