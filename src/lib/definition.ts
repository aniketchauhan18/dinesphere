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
