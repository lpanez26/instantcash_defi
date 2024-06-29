
"use client";

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import Image from "next/image";
import { SITE_NAME, SITE_LOGO, MENU_ITEMS } from "@/constants/siteInfo";
import { JSX, SVGProps } from "react"
import { Label } from "./ui/label";
import ConnectButtonComponent from "./ConnectButton";


export default function HeaderComponent() {

  return (
    <div className="flex justify-center">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-background border border-muted shadow-md rounded-md mx-4">
        <nav className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-8">
                <SheetTitle>{SITE_NAME}</SheetTitle>
              </SheetHeader>

              {MENU_ITEMS.map((item, index) => (
                <Link key={index} href={item.href} prefetch={false}
                className="flex w-full items-center gap-2 my-4 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <Image src={item.icon} alt={item.label} width={24} height={24} className="h-6 w-6"/>
                    {item.label}
                </Link>
              ))}

            </SheetContent>
          </Sheet>
        </nav>

        <Link href="/" className="mr-6 flex items-center" prefetch={false}>
          <Label className="text-2xl">{SITE_NAME}</Label>
        </Link>{" "}

        <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
          <NavigationMenu>
            <NavigationMenuList>
                {MENU_ITEMS.map((item, index) => (
                    <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                        <Link
                        href={item.href}
                        className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        prefetch={false}
                        >
                        {item.label}
                        </Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}

            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <ConnectButtonComponent labelButton="Join"/>
        </div>
      </header>
    </div>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
