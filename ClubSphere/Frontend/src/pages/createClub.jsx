import { CardWrapper } from '@/components/card-wrapper'
import React from 'react'
import { CreateClubSchema } from '@/schema'
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

import { useForm } from "react-hook-form"
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'
import { Textarea } from '@/shadcn/components/ui/textarea'
import { useState } from 'react'

import axios from '@/api/axios'


const CREATE_CLUB_URL = '/clubs'


const CreateClub = () => {


  const form = useForm({
    resolver: zodResolver(CreateClubSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      image: undefined,
      Contact: ""
    }
  })

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };




  const onSubmit = async (data) => {
    // event.preventDefault();
    // const formData = new FormData();
    // formData.append("image", selectedFile);


    try {

      console.log(data)

      const response = await axios(
        {
          method: 'post',
          url: CREATE_CLUB_URL,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(JSON.stringify(response))


    }
    catch (e) {
      if (!e?.response) {
        console.log("Network error")
      }
      else {
        console.log("Registration Failed")
      }

    }
  }



  return (



    <CardWrapper
      label="Create a Club"
      title="Club Register"
      backButtonHref="/"
      backButtonLabel="Return Home"
    >

      <Form  {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8' encType='multipart/form-data'>
          <div className='space-y-4 flex flex-col w-full'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Club Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Type Club Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Provide short intro" />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}

            />

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter Long Desc" />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contact Details" />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Provide Image</FormLabel>
                  <FormControl>
                    <Input onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)} type="file" name="image" />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />





            <Button type="submit" className="w-full">
              Add Club
            </Button>

          </div>
        </form>


      </Form>








    </CardWrapper>

    //   <form onSubmit={onSubmit} encType='multipart/form-data'>
    //   <input type="file" onChange={handleFileChange} />
    //   <button type="submit">Upload</button>
    // </form>

  )
}


export default CreateClub