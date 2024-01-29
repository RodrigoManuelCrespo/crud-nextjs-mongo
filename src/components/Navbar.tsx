'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Avatar, AvatarIcon } from "@nextui-org/react";

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Tareas",
        "Clima",
        "Gastos",
        "Log Out",
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
                    <Link color="foreground" href="#">
                        Tareas
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" href="#">
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
                    true ?
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
                            <NavbarItem className="hidden lg:flex">
                                <Link href="#">Login</Link>
                            </NavbarItem><NavbarItem>
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
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
