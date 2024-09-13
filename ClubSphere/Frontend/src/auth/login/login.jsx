
import { CardWrapper } from '@/components/card-wrapper'
import React from 'react'
import { LoginSchema, RegisterSchema } from '@/schema'
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form"

import { set, useForm } from "react-hook-form"
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'
import useAuth from '@/hooks/useAuth'
import axios from '@/api/axios'

import {Link, useNavigate, useLocation} from 'react-router-dom'

const LOGIN_URL = '/auth'

// import {useFormStatus} from 'react-dom'
const Login = () => {

    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data) => {
      

      try{
        const response = await axios.post(LOGIN_URL, JSON.stringify({
          username:data.email,
          password:data.password
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });


        console.log(JSON.stringify(response));

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;

        const username = data.email;
        const password = data.password;

        console.log(accessToken);
        console.log(roles);

        setAuth({username,password, roles,accessToken});

        navigate(from, {replace:true});
      } catch(err)
      {
        console.error("Error object:", err); // Log the entire error object

        if(!err?.response){
          console.log("No server response");
        }
        else if(err.response.status === 400){
          console.log("Missing Username or Password");
        }
        else if(err.response.status === 401){
          console.log("Unauthorized");
        }
        else{
          console.log("Login Failed");
        }
      }
    }

    // const {pending} = useFormStatus()

    const { handleSubmit, formState: { isSubmitting, errors } } = form;
 


  return (



    <CardWrapper
    label="Login to your account"
    title="Login"
    backButtonHref="/auth/register"
    backButtonLabel="Dont have an account? Register"
    >

      <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4 flex flex-col w-full'>
          <FormField
            control = {form.control}
            name = "email"
            render = {({field}) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="abc@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          
          />

          {/* <input name="remember" value="" /> */}

          <FormField
            control = {form.control}
            name = "password"
            render = {({field}) => (
              <FormItem className="flex flex-col items-start"> 
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />

              </FormItem>
            )}
          
          />
              
          <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
          </Button>

        </div>
      </form>


      </Form>

    </CardWrapper>
  )
}


export default Login