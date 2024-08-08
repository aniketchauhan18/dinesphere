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
