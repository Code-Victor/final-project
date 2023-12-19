import React from "react";
import { useAuthContext, useUser } from "@/providers/auth-provider";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const user = useUser();
  const {logout}= useAuthContext();
  return (
    <nav className="w-full h-16 flex items-center">
      <div className="mx-auto flex-1 flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img src="./logo.svg" alt="Windbnb" className="h-8" />
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <Button asChild>
            <Link to="/trip-dashboard">View Trip Dashboard</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="relative inline-block border border-gray-300 rounded-full">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`https://api.dicebear.com/7.x/micah/svg?seed=${user?.user?.name}`}
                  alt="Felix"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={logout}>
                logout
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
