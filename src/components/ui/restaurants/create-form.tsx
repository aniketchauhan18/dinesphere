'use client'
import { Input } from '../input';
import { Button } from "../button"
import { Textarea } from '../textarea';
import { Label } from '../label'
import { createRestaurant, State } from '@/lib/actions';
export default function CreateForm({ userId }: { userId: string }) {
  const createRestaurantWithUserId = createRestaurant.bind(null, userId);
  return (
  <form action={createRestaurantWithUserId} className="flex flex-col justify-center items-center gap-3 max-w-lg w-full p-3">
    <div className='w-full space-y-0.5'>
      <Label>Restaurant Name</Label>
      <Input type="text" name="name" placeholder="DineSphere" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Country</Label>
      <Input type="text" name="country" placeholder="Country" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>City</Label>
      <Input type="text" name="city" placeholder="City" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>State</Label>
      <Input type="text" name="state" placeholder="State" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Address</Label>
      <Input type="text" name="address" placeholder="Address" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Description</Label>
      <Textarea name="description" placeholder="Description" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Contact No.</Label>
      <Input type="text" name="number" placeholder="Number" required/>
    </div>
    <div className='w-full space-y-0.5'>
    <Label>Email</Label>
    <Input type="email" name="email" placeholder="Email" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Image Url</Label>
      <Input type="text" name="imageUrls" placeholder="Image Url 1" required/>
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Website Url</Label>
    {/* <Input type="text" name="imageUrls" placeholder="Image Url 2" /> */}
      <Input type="text" name="websiteUrl" placeholder="Website Url" required/>  
    </div>
    <div className='w-full space-y-0.5'>
      <Label>Cuisine</Label>
      {/* <Input type="text" name="cuisine" placeholder="Cuisine 2" />
      <Input type="text" name="cuisine" placeholder="Cuisine3" /> */}
    <Input type="text" name="cuisine" placeholder="Cuisine 1" required/>
    </div>
    <Button type="submit" className='bg-gradient-to-b from-orange-600 to-orange-500'>Create Restaurant</Button>
  </form>
  )
}