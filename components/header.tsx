import { Bell, Filter, HelpCircle, LogOut, Menu, MessageCircle, Search, Settings, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Pageheader() {
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
            <div className="flex-1 max-w-md hidden sm:block">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search your course" className="pl-8" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <HelpCircle className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" alt="Adeline H. Dancy" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Adeline H. Dancy</p>
                                <p className="text-xs leading-none text-muted-foreground">adeline@example.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="sm:hidden">
                            <Search className="mr-2 h-4 w-4" />
                            <span>Search</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="sm:hidden">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Help</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="sm:hidden">
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}