import z from "zod";

export interface UserDetails {
  _id: string;
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  number?: string;
  role: ["user", "admin"];
  __v: number | null;
}

// change price to number
export interface MenuProps {
  _id: string;
  name: string;
  description: string;
  price: string | number;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuOrderItemProps {
  _id: string;
  userId: string;
  menuId: MenuProps;
  quantity: number;
  price: number;
  status: ["pending", "paid", "canceled"];
  createdAt: Date;
  updatedAt: Date;
}

// change status to enum later after deciding the enum values
export interface OrderProps {
  _id: string;
  userId: string;
  restaurantId: string;
  totalPrice: number;
  status: string;
  orderItems: string[];
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TrackOrderItemProps {
  orderItemId: string;
  quantity: number;
  price: number;
  menuDetails: MenuProps;
}

// add created at field in future if needed
// change status to string if the enum for status is decided
export interface TrackOrderProps {
  _id: string;
  orderItems: TrackOrderItemProps[];
  status: string;
  restaurantId: string;
  totalPrice: number;
  userId: string;
  createdAt: Date;
}

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: string;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: number;
  resource_type: string;
  created_at: string;
  tags: any;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  api_key: string;
}

export interface RestaurantImageResponse {
  _id: string;
  url: string;
  restaurantId: string;
  height: number;
  width: number;
  createdAt: Date;
  updatedAt: Date;
}

export const createRestaurantSchema = z.object({
  userId: z.string({ required_error: "UserId is requried" }),
  name: z
    .string({ required_error: "Restaurants name is required" })
    .min(3, "Name must be at least 3 characters long"),
  country: z
    .string({ required_error: "Country is required" })
    .min(2, "Please enter correct country name"),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  address: z.string({ required_error: "Address is required" }),
  description: z.string({ required_error: "Description is required" }),
  number: z.string({ required_error: "Number is required" }),
  email: z.string({ required_error: "Email is required" }),
  websiteUrl: z.string().optional(),
  cuisine: z.array(z.string()).optional(),
});
export type RestaurantSchema = z.infer<typeof createRestaurantSchema>;
