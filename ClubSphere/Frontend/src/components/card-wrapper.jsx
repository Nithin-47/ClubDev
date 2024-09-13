

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/shadcn/components/ui/card"

import React from 'react'
import BackButton from "./back-button"
import AuthHeader from "./auth-header"
import Layout from "@/auth/layout"
// import { Interface } from 'readline'



export const CardWrapper = ({label,title,backButtonHref,backButtonLabel,children}) => {
  return (
    <Layout>  
    <Card className="xl:w-1/2 md:w-1/2 shadow-md">
        <CardHeader>  
            <AuthHeader label = {label} title = {title}>

            </AuthHeader>

            <CardContent>
                {children}
            </CardContent>

            <CardFooter> 
                <BackButton href = {backButtonHref} label = {backButtonLabel}>
                </BackButton>
            </CardFooter>

        </CardHeader>

    </Card>
    </Layout>
  )
}
