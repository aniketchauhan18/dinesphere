import { Roles } from "@/types/global";
import { currentUser } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles) => {
  const user = await currentUser();

  return user?.publicMetadata?.role === role;
};
