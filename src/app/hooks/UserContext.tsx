"use client";
import { UserProps } from "@/components/ui/orders/checkout-button";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useAuth } from "@clerk/nextjs";

// user context
const UserContext = createContext<UserProps | null>(null);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState(null);
  const { userId } = useAuth();
  const fetchUser = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetch(`/api/users/clerk/${userId}`);
      const resData = await response.json();
      setUser(resData.data);
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const memoizedUser = useMemo(() => user, [user]);
  return (
    <UserContext.Provider value={memoizedUser}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
