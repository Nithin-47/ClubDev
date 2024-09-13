import { CardWrapper } from '@/components/card-wrapper'
import { RegisterSchema } from '@/schema'
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form"

import { useForm } from "react-hook-form"
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'

import axios from '@/api/axios'

const REGISTER_URL = '/auth/register'


const Register = () => {


    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })


    

    const onSubmit = async (data) => {
        

      try{

        const response = await axios.post(REGISTER_URL, JSON.stringify({
          user:data.email,
          pswd:data.password
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          
          // credentials : 'include'
        } 
      );
        console.log(JSON.stringify(response))


      }
      catch(e){
        if(!e?.response){
          console.log("Network error")
        }
        else if(e.response.status === 409){
          console.log("UserName Taken")
        }
        else{
          console.log("Registration Failed")
      }

    }
    }



  return (



    <CardWrapper
    label="Create an account"
    title="Register"
    backButtonHref="/auth/login"
    backButtonLabel="Already have an account? Login"
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

          <FormField
            control = {form.control}
            name = "confirmPassword"
            render = {({field}) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />

              </FormItem>
            )}



          
          />
              
          <Button type="submit" className="w-full">
              Register
          </Button>

        </div>
      </form>


      </Form>

    </CardWrapper>
  )
}


export default Register