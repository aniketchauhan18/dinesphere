export interface UserDetails {
  _id: string;
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: ["user", "admin"];
  __v: number | null;
}

// change price to number
export interface MenuProps {
  _id: String;
  name: String;
  description: String;
  price: String | number;
  restaurantId: String;
  createdAt: Date;
  updatedAt: Date;
}
