"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  showBadge?: boolean;
  badgeCount?: number;
}

export function NavLink({
  href,
  children,
  className,
  prefetch = true,
  showBadge = false,
  badgeCount = 0,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        "text-sm font-medium transition-colors hover:text-orange-600 relative px-3 py-2 rounded-md",
        isActive ? "text-orange-600 bg-orange-50" : "text-neutral-700",
        className
      )}
    >
      {children}
      {showBadge && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white">
          {badgeCount > 9 ? "9+" : badgeCount}
        </span>
      )}
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  showBadge?: boolean;
  badgeCount?: number;
}

export function MobileNavLink({
  href,
  icon,
  label,
  showBadge = false,
  badgeCount = 0,
}: MobileNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center cursor-pointer transition-colors hover:text-orange-600 relative",
        isActive && "text-orange-600"
      )}
    >
      <div className="relative">
        {icon}
        {showBadge && badgeCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm">
            {badgeCount > 9 ? "9+" : badgeCount}
          </span>
        )}
      </div>
      <p className="text-xs mt-1 font-medium">{label}</p>
    </Link>
  );
}

