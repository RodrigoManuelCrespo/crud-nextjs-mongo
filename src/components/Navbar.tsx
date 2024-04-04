'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Avatar, AvatarIcon } from "@nextui-org/react";

interface MenuItems {
    title: string,
    url: string,
}

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems: Array<MenuItems> = [
        { title: "Inicio", url: '/home  ' },
        { title: "Tareas", url: '/home/tasks' },
        { title: "Clima", url: '/home/weather' },
        { title: "Cerrar sesión", url: '/api/auth/signout' },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href={"/"}>
                        <p className="font-bold uppercase text-inherit text-neutral-50 text-l">Mokuteki</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/home">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/home/tasks">
                        Tareas
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" href="/home/weather">
                        Clima
                    </Link>
                </NavbarItem>
            </NavbarContent >
            <NavbarContent justify="end">
                {
                    true ?
                        <div className="flex items-center">
                            <Avatar
                                icon={<AvatarIcon />}
                                classNames={{
                                    base: "bg-indigo-500",
                                    icon: "text-white/50",
                                }}
                            />
                        </div>
                        :
                        <div>
                            <NavbarItem>
                                <Button as={Link} href="#" className="bg-gradient-to-tr from-purple-500 to-blue-500">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </div>
                }

            </NavbarContent>
            <NavbarMenu >
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index == menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href={item.url}
                            size="lg"
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    );
}
