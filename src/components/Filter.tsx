"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FilterIcon } from "lucide-react";

export default function Filter({ cuisines }: { cuisines: string[] }) {
  const searchParams = useSearchParams(); // provides readonly access to the search params cannot modfiy it
  const currentPath = usePathname(); // current Path
  const { replace } = useRouter();

  const handleFilter = (cuisine: string) => {
    const params = new URLSearchParams(searchParams);
    if (cuisine) {
      params.set("cuisine", cuisine);
    } else {
      params.delete("cuisine");
    }

    replace(`${currentPath}?${params.toString()}`);
  };

  return (
    <Select onValueChange={(value: string) => handleFilter(value)}>
      <SelectTrigger className="w-auto text-neutral-700 flex items-center gap-2">
        <FilterIcon className="w-4 h-4 text-neutral-700" />
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        {cuisines.map((cuisine) => {
          return (
            <SelectItem key={cuisine.toString()} value={cuisine}>
              {cuisine}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
