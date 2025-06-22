"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { MdMail } from "react-icons/md";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import facebookSvg from "../../../public/assets/logos_facebook - Copy.svg";
import linkedinSvg from "../../../public/assets/devicon_linkedin.svg";
import instagramSVG from "../../../public/assets/skill-icons_instagram.svg";
import { useToast } from "../ui/use-toast";
export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const pathname = usePathname();

  const handleSubscribe = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/subscriptionemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast({
          title: result.message,
        });
      } else if (response.status === 400) {
        toast({
          title: result.message,
        });
      } else {
        toast({
          title: "Something Goes Wrong, Try again Please",
        });
      }
    } catch (error) {
      toast({
        title: "something goes wrong",
      });
    }
  };
  return (
    <SectionWrapper className={cn("w-full mt-10")}>
      <footer
        className={cn(
          "bg-primary/20 dark:bg-primary/50 mb-10 rounded-lg py-12 px-10 sm:px-20 w-full",
          {
            hidden: pathname === "/auth/login" || pathname === "/auth/signup",
          }
        )}
      >
        <section className="flex flex-wrap gap-4 items-start justify-center md:justify-between mt-5">
          <div className="flex flex-col lg:flex-row gap-6 text-start justify-between w-full sm:w-auto">
            <div className="flex flex-col items-start justify-center w-full mb-4 ">
              <p className="text-2xl md:text-5xl font-bold">
                <span className="text-amber-600">Renovate</span>
                <span className="text-black">Pro</span>
              </p>
              <div className="text-start">
                <p className="italic text-sm text-foreground/80 flex flex-col gap-2 mt-6 ">
                  Embark on a journey with us to turn your vision into reality.
                </p>
              </div>
            </div>
            <div>
              <h5 className="mb-2 font-semibold lg:w-36">Quick links</h5>
              <ul className="text-foreground/80 flex flex-col gap-2">
                <li className="transition-transform duration-300 hover:translate-x-4">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-4">
                  <Link href="/contact">Contact</Link>
                </li>

                <li className="transition-transform duration-300 hover:translate-x-4">
                  <Link href="/cookiespolicy">Cookies Policy</Link>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-4">
                  <Link href="/privacypolicy">Privacy Policy</Link>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-4">
                  <Link href="/termandconditions">Term & Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="text-start w-full">
              <h5 className="font-semibold mb-2">Sign up for our newsletter</h5>
              <p className="italic text-sm mt-1 text-foreground/80 flex flex-col gap-2">
                Add your email address to sign up for our monthly emails and to
                receive promotional offers.
              </p>
              <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full mt-2">
                <Input
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleSubscribe}>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </SectionWrapper>
  );
}
