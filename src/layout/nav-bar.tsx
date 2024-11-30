import React from 'react';
import { Link } from 'react-router';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, ChartArea } from 'lucide-react';
import shortrLogo from '@/assets/shotr.png';
import { useAuth } from 'src/context/AuthContext';

export default function NavBar() {
    const { user, signOut } = useAuth();
    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img
                                className="h-40 w-auto"
                                src={shortrLogo}
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                                    <User className="h-12 w-12" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem className="flex items-center">
                                    {user ? (
                                        <img src={user.picture} alt="User" className="mr-2 h-4 w-4 rounded-full" />
                                    ) : (
                                        <User className="mr-2 h-4 w-4" />
                                    )}
                                    <span>{user?.name ?? 'Guest'}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                    <ChartArea className="mr-2 h-4 w-4" />
                                    <span>Analytics</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center text-red-600" onClick={signOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};