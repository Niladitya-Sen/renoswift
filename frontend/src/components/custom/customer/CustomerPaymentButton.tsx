"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCookies } from "@/hooks/useCookies";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CustomerPaymentButton({
  title,
  className,
  amount,
  size,
  quoteId,
  phase,
  disabled,
}: Readonly<{
  title: string;
  className?: string;
  amount: number;
  size?: "default" | "sm" | "lg" | "icon" | null;
  quoteId: string;
  phase: string;
  disabled?: boolean;
}>) {
  const cookies = useCookies();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function displayRazorpay() {
    try {
      setLoading(true);

      // creating a new order
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.get("token")}`,
          },
          body: JSON.stringify({ amount, quoteId, phase }),
        }
      );

      if (!response.ok) {
        alert("Server error. Are you online?");
        return;
      }

      const data = await response.json();

      const body = {
        paymentId: data.paymentId,
        amount: amount,
      };

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/payment/success${
          phase === "design" ? "?phase=design" : ""
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.get("token")}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (result.ok) {
        toast({
          title: "Payment successful",
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "An error occurred while processing your payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      disabled={disabled || loading}
      size={size}
      className={cn(className)}
      onClick={displayRazorpay}
    >
      {loading && <AiOutlineLoading3Quarters className="animate-spin mr-2" />}
      {title}
    </Button>
  );
}
