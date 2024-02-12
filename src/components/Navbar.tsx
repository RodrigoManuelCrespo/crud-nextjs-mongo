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
        { title: "Tareas", url: '/tasks' },
        { title: "Clima", url: '/weather' },
        { title: "Tareas", url: '/tasks' },
        { title: "Cerrar sesión", url: '/tasks' },
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
                        <p className="font-bold text-inherit text-neutral-50">RORO</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link color="foreground" href="/tasks">
                        Tareas
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" href="/weather">
                        Clima
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Gastos
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    false ?
                        <div className="flex items-center">
                            <Avatar
                                icon={<AvatarIcon />}
                                classNames={{
                                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                                    icon: "text-black/80",
                                }}
                            />
                        </div>
                        :
                        <div>
                            <NavbarItem>
                                <Button as={Link} color="primary" href="#" variant="flat">
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
        </Navbar>
    );
}
