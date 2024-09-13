import axios from '@/api/axios'
import { Card,CardContent } from '@/shadcn/components/ui/card'

import  { useEffect } from 'react'


export default function clubGrid() {

  let clubs;

  const getClubs = async () => {
    try {
      clubs = await axios.get('/clubs')


      
    } catch (error) {
      console.error(error)
    }
  }

  

  useEffect(() => {
    getClubs()
  }, [])



  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Clubs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <Card key={club.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={club.image}
                alt={`${club.name} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{club.name}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
