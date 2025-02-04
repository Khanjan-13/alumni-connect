import React from "react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  GraduationCap,
  CalendarFold,
  BriefcaseBusiness,
  HeartHandshake,
  ChevronDown,
  Rss,
  EllipsisVertical,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <div>
      <header className="bg-white text-blue-600 shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <GraduationCap size={32} />
              <span className="text-2xl font-bold">BVM Alumni Association</span>
            </div>
            <nav>
              <ul className="flex space-x-4 justify-center items-center">
                {token && userId ? (
                  <>
                    <li>
                      <NavLink
                        to="#"
                        className="hover:underline flex items-center gap-2 font-semibold"
                      >
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:flex">Hello! Khanjan</span>
                      </NavLink>
                    </li>
                    <li>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="uppercase focus:outline-none flex items-center justify-center gap-1">
                          <EllipsisVertical size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="uppercase text-blue-600 w-52 font-medium mr-4">
                          <DropdownMenuItem className="p-3">Profile</DropdownMenuItem>
                          <NavLink to="/settings">
                            <DropdownMenuItem className="p-3">Settings</DropdownMenuItem>
                          </NavLink>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="p-3" onClick={handleLogout}>
                            Logout
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  </>
                ) : (
                  <li>
                    <Button onClick={() => navigate("/login")} className="text-white bg-blue-600 hover:bg-blue-800 rounded-none">
                      Login
                    </Button>
                  </li>
                )}
                <button className="block md:hidden">
                  <Menu size={20} />
                </button>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Secondary Navbar */}
      <nav className="bg-blue-600 text-white shadow-md fixed w-full mt-16 z-40 hidden md:flex">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center items-center gap-3">
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-2 p-3 hover:bg-blue-800 transition-colors font-medium uppercase"
              >
                <Rss size={20} />
                <span>FEED</span>
              </NavLink>
            </li>
            <li>|</li>
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-2 p-3 hover:bg-blue-800 transition-colors font-medium uppercase"
              >
                <GraduationCap size={20} />
                <span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="uppercase focus:outline-none flex items-center justify-center gap-1">
                      Alumni Network <ChevronDown size={17} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="uppercase text-blue-600 w-52 font-medium">
                      <DropdownMenuItem className="p-3">Alumni Directory</DropdownMenuItem>
                      <DropdownMenuItem className="p-3">Groups</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </NavLink>
            </li>
            <li>|</li>
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-2 p-3 hover:bg-blue-800 transition-colors font-medium uppercase"
              >
                <CalendarFold size={20} />
                <span>Events</span>
              </NavLink>
            </li>
            <li>|</li>
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-2 p-3 hover:bg-blue-800 transition-colors font-medium uppercase"
              >
                <BriefcaseBusiness size={20} />
                <span>Jobs & Opportunities</span>
              </NavLink>
            </li>
            <li>|</li>
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-2 p-3 hover:bg-blue-800 transition-colors font-medium uppercase"
              >
                <HeartHandshake size={20} />
                <span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="uppercase focus:outline-none flex items-center justify-center gap-1">
                      Alumni Support <ChevronDown size={17} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="uppercase text-blue-600 w-52 font-medium">
                      <DropdownMenuItem className="p-3">Find your documents</DropdownMenuItem>
                      <DropdownMenuItem className="p-3">Donations</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
