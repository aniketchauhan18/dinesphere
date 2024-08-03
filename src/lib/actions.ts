'use server'
// server actions run on server side
import { z } from "zod";
import { connect } from "./db";
import Restaurant from "./models/restaurant.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { error } from "console";

// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });
export type State = {
  message: string | null;
};

const createRestaurantSchema = z.object({
  userId: z.string({required_error: "UserId is requried"}),
  name: z.string({required_error: "Restaurants name is required"}).min(3, "Name must be at least 3 characters long"),
  country: z.string({required_error: "Country is required"}).min(2, "Please enter correct country name"),
  city: z.string({required_error: "City is required"}),
  state: z.string({required_error: "State is required"}),
  address: z.string({required_error: "Address is required"}),
  description: z.string({required_error: "Description is required"}),
  number: z.string({required_error: "Number is required"}),
  email: z.string({required_error: "Email is required"}),
  websiteUrl: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
  cuisine: z.array(z.string()).optional(),
})

export type RestaurantSchema = z.infer<typeof createRestaurantSchema>;

export async function createRestaurant(userId: string, formData: FormData) {
  const { success, data, error } = createRestaurantSchema.safeParse({
    userId,
    name: formData.get('name'),
    country: formData.get('country'),
    city: formData.get('city'),
    state: formData.get('state'),
    address: formData.get('address'),
    description: formData.get('description'),
    number: formData.get('number'),
    email: formData.get('email'),
    websiteUrl: formData.get('websiteUrl'),
    imageUrls: formData.getAll('imageUrls'),
    cuisine: formData.getAll('cuisine'),
  });

  console.log(error?.errors[0].message)
  console.log(error?.errors)
  if (!success) {
    return {
      // errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create restaurant.'
    };
  }
  
  data.userId = userId;
  console.log(data);

  try {
    await connect();
    const restaurant = await Restaurant.create(data);
    if (!restaurant) {
      return {
        message: "Failed to create restaurant",
      }
    }
    revalidatePath('/restaurants');
    redirect(`/restaurants/${restaurant._id}`);
  } catch(err) {
    return {
      message: "Database Error: Failed to create restaurant",
    }
  }

}