"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCookies } from "@/hooks/useCookies";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from "../ui/button";
import MobileSidebar from "./MobileSidebar";
import SectionWrapper from "./SectionWrapper";
import UserDropdown from "./UserDropdown";

export default function Navbar({
  className,
}: Readonly<{ className?: string }>) {
  const pathname = usePathname();
  const cookies = useCookies();
  const [isLoginHidden, setIsLoginHidden] = useState(false);

  useEffect(() => {
    if (
      cookies?.get("token") ||
      cookies?.get("otToken") ||
      cookies?.get("adminToken")
    ) {
      setIsLoginHidden(true);
    }
  }, [cookies]);

  function navigateTo(id: string) {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  }

  return (
    <nav
      className={cn("sticky top-0 z-50 bg-background", {
        hidden: pathname === "/auth/login" || pathname === "/auth/signup",
      })}
    >
      <SectionWrapper
        className={cn(
          "py-4 flex max-w-screen-xl gap-4 items-center px-2 text-foreground",
          className
        )}
      >
        <Link href={"/"} className="w-[40%] sm:w-auto inline-block text-lg md:text-2xl font-semibold">
          <span className="text-amber-600">Renovate</span>
          <span className="text-black">Pro</span>
        </Link>
        <div className="flex-grow"></div>
        <div
          className={cn("hidden", {
            "flex items-center gap-2":
              pathname === "/" ||
              pathname === "/about" ||
              pathname === "/services" ||
              pathname === "/packages" ||
              pathname === "/blogs" ||
              pathname === "/testimonials" ||
              pathname === "/presence" ||
              pathname === "/contact" ||
              pathname === "/cookiespolicy" ||
              pathname === "/termandconditions" ||
              pathname === "/privacypolicy",
          })}
        >
          <div className="hidden lg:flex items-center gap-2">
            <Link href={"/"}>
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size={"sm"}
              >
                Home
              </Button>
            </Link>
            <Link href={"/#about"}>
              <Button
                variant={pathname === "/#about" ? "default" : "ghost"}
                size={"sm"}
              >
                About Us
              </Button>
            </Link>
            <Button
              variant={pathname === "/#feature" ? "default" : "ghost"}
              size={"sm"}
              onClick={() => {
                navigateTo("feature");
              }}
            >
              Feature
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                navigateTo("inspiration");
              }}
            >
              Inspiration
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                navigateTo("working");
              }}
            >
              Our Process
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                navigateTo("testimonials");
              }}
            >
              Testimonials
            </Button>
            <Link href={"/contact"}>
              <Button
                variant={pathname === "/contact" ? "default" : "ghost"}
                size={"sm"}
              >
                Contact
              </Button>
            </Link>
          </div>
          <Link
            href={"/auth/login"}
            className={cn({
              hidden: isLoginHidden,
            })}
          >
            <Button
              variant={"outline"}
              className={cn("border-primary border-[3px]")}
              size={"sm"}
            >
              Login
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className={cn("inline-flex lg:hidden")}
              >
                <HiMenuAlt3 className="text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col items-start">
                <Link href={"/"}>
                  <Button
                    variant={pathname === "/" ? "default" : "ghost"}
                    size={"sm"}
                  >
                    Home
                  </Button>
                </Link>
                <Link href={"/#about"}>
                  <Button
                    variant={pathname === "/#about" ? "default" : "ghost"}
                    size={"sm"}
                    onClick={() => {
                      navigateTo("about");
                    }}
                  >
                    About Us
                  </Button>
                </Link>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => {
                    navigateTo("category");
                  }}
                >
                  Categories
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => {
                    navigateTo("inspiration");
                  }}
                >
                  Inspiration
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => {
                    navigateTo("working");
                  }}
                >
                  Our Process
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => {
                    navigateTo("testimonials");
                  }}
                >
                  Testimonials
                </Button>
                <Link href={"/contact"}>
                  <Button
                    variant={pathname === "/contact" ? "default" : "ghost"}
                    size={"sm"}
                  >
                    Contact
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <UserDropdown />
        {pathname.includes("/ot") && <MobileSidebar role="ot" />}
        {pathname.includes("/customer") && <MobileSidebar role="customer" />}
      </SectionWrapper>
    </nav>
  );
}