"use server";
// server actions run on server side
import { z } from "zod";
import { connect } from "./db";
import Restaurant from "./models/restaurant.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  userId: z.string().min(1, { message: "UserId is requried" }),
  name: z
    .string()
    .min(1, { message: "Restaurants name is required" })
    .min(3, "Name must be at least 3 characters long"),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .min(2, "Please enter correct country name"),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  number: z.string().min(1, { message: "Number is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  websiteUrl: z.string().optional(),
  cuisine: z.array(z.string()).optional(),
});

export type RestaurantSchema = z.infer<typeof createRestaurantSchema>;

export async function createRestaurant(userId: string, formData: FormData) {
  const { success, data, error } = createRestaurantSchema.safeParse({
    userId,
    name: formData.get("name"),
    country: formData.get("country"),
    city: formData.get("city"),
    state: formData.get("state"),
    address: formData.get("address"),
    description: formData.get("description"),
    number: formData.get("number"),
    email: formData.get("email"),
    websiteUrl: formData.get("websiteUrl"),
  });

  // add cuisine option later
  if (!success) {
    return {
      // errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create restaurant.",
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
      };
    }
    console.log(restaurant);
    if (restaurant) {
      redirect(`/restaurants/${restaurant._id}`);
    }
    revalidatePath("/restaurants");
  } catch (err) {
    return {
      message: "Database Error: Failed to create restaurant",
    };
  }
}
