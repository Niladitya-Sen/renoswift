import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className='bg-[url("/renovate-pro/assets/auth/authBg.webp")] bg-cover bg-center bg-no-repeat h-screen px-2 flex items-center'>
      {children}
    </section>
  );
}
