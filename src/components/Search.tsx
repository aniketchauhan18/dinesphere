"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Search() {
  const searchParams = useSearchParams(); // provides readonly access to the search params cannot modfiy it
  const currentPath = usePathname(); // current Path
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams); // creates a key value pair of the search params and also to modify search params
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // replacing current path with new search params
    replace(`${currentPath}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex justify-center items-center max-w-lg w-full px-5">
      <Input
        className="rounded-none rounded-l-lg border-r-0"
        placeholder="Search for restaurants"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button className=" rounded-none rounded-r-lg gap-1 flex items-center justify-center bg-linear-to-r from-orange-400 to-orange-500">
        <div className="flex justify-center items-center">
          <SearchIcon className="w-3.5 h-3.5" />
        </div>
      </Button>
    </div>
  );
}
