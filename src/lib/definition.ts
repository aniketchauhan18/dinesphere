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
