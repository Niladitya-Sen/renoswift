import AdminChangeColorScheme from "@/components/custom/admin/AdminChangeColorScheme";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RenoSwift",
  description: `At RenoSwift, we embark on a journey with you to turn your bathroom dreams into reality. Committed to innovation and unwavering quality, we are more than just a renovation service – we are your dedicated companions in transforming your space.

  Renoswift®️ revolutionizes the renovation experience by bringing expert services right to your doorstep.Our team is driven by a passion for delivering quality work, always on time.As your one- stop solution for home renovations, we take pride in the seamless integration of our Design and Technical teams.
  
  Our Design team specializes in curating beautiful and personalized designs for your home, ensuring a touch of elegance in every corner.Meanwhile, our Technical team, equipped with years of expertise, ensures a bespoke and high - quality experience, all within a budget that suits your needs.
  
  Embark on a journey with RenoSwift, where excellence meets affordability.Your dream bathroom awaits – let's make it a reality together!
`,

  keywords: [
    "Renovation Trends 2024",
    "Bathroom Remodel Ideas",
    "Smart Home Innovations",
    "DIY Renovation Tips",
    "Green Living Spaces",
    "Budget-Friendly Home Upgrades",
    "Modern Kitchen Designs",
    "Eco-Friendly Interior Trends",
    "Luxury Home Makeovers",
    "Innovative Design Concepts",
    "Open Concept Living Spaces",
    "Timeless Interior Styles",
    "Sustainable Home Solutions",
    "Renovation Before and After",
    "Customized Home Designs",
    "Renovation Project Showcase",
    "Creative Space Transformations",
    "Minimizing Home Clutter",
    "Efficient Home Improvement",
    "Renovation Success Stories",
    "Bathroom makeover",
    "Renovation specialists",
    "Creative bathroom design",
    "Home remodeling",
    "Renoswift quotes",
    "Quality renovation",
    "Dream bathroom experience",
    "Renovation consultation",
    "Swift home improvement",
    "Expert renovation team",
    "Luxury bathroom fixtures",
    "Innovative renovation ideas",
    "Skilled renovation professionals",
    "On-time precision",
    "Renovation consultation",
    "Renoswift craftsmanship",
    "High-end bathroom products",
    "Home transformation services",
    "Renovation partners",
    "Renovation at your doorstep",
    "Home renovation",
    "Interior design",
    "Bathroom makeover",
    "Kitchen renovation",
    "Garden landscaping",
    "Custom carpentry",
    "Plumbing solutions",
    "Transparent quoting",
    "Visual design",
    "Project tracking",
    "Modern home design",
    "Renovation ideas",
    "Stylish interiors",
    "Sustainable living",
    "Personalized spaces",
    "Creative carpentry",
    "Efficient plumbing",
    "Home improvement",
    "Total makeover",
    "Dream home transformation",
    "Bathroom makeover",
    "Luxury fixtures",
    "Home renovation",
    "Interior design",
    "Customized bathroom",
    "Opulent spaces",
    "Elegance on a budget",
    "High-end brands",
    "Lavish sanctuary",
    "Premium bathroom",
    "Designer vanity",
    "Lifestyle upgrade",
    "Modern bathroom",
    "Home improvement",
    "Renovation ideas",
    "Bespoke luxury",
    "Dream bathroom design",
    "Trendy lighting",
    "Unique spaces",
    "Bathroom essentials",
    "Home renovation ideas",
    "Bathroom remodel inspiration",
    "Affordable kitchen upgrades",
    "DIY home improvement projects",
    "Interior design trends",
    "Outdoor landscaping tips",
    "Budget-friendly home decor",
    "Sustainable living solutions",
    "Energy-efficient home upgrades",
    "Small space organization hacks",
    "Modern bedroom designs",
    "Eco-friendly home products",
    "Quick home fixes",
    "Stylish living room decor",
    "Creative storage solutions",
    "Trendy paint colors for walls",
    "Smart home technology",
    "Renovation before and after photos",
    "Curb appeal ideas",
    "Best home improvement tools",
    "Home renovation",
    "Interior design ideas",
    "Renovation services",
    "Dream home makeover",
    "Customized home solutions",
    "Northern city renovations",
    "Renoswift®️ testimonials",
    "Professional design team",
    "Swift home transformations",
    "Unique renovation concepts",
    "Renovation experts near me",
    "Personalized home upgrades",
    "Best products for home renovation",
    "Classy home decor",
    "Top-notch renovation service",
    "Renovation trends 2024",
    "Renoswift®️ expansion plans",
    "Home improvement stories",
    "Transformative home experiences",
    "Renovation joy and happiness",
    "Home Decor Trends 2024",
    "Modern Interior Design Ideas",
    "DIY Home Improvement Projects",
    "Sustainable Living Solutions",
    "Kitchen Renovation Tips",
    "Luxury Home Makeovers",
    "Smart Home Technology Trends",
    "Budget-Friendly Design Hacks",
    "Small Space Organization Tips",
    "Eco-Friendly Furniture Ideas",
    "Outdoor Living Space Design",
    "Contemporary Home Styling",
    "Minimalist Interior Designs",
    "Affordable DIY Home Decor",
    "Renovation Before and After Pictures",
    "Clever Storage Solutions for Homes",
    "Timeless Bedroom Design Ideas",
    "Innovative Bathroom Layouts",
    "Best Indoor Plants for Home",
    "Creative Home Office Setup Ideas"
  ],

  category: "Home Improvement",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className)}>
        <AdminChangeColorScheme />
        {children}
        <Toaster />
        <GoogleAnalytics gaId={process.env.GAID as string} />
      </body>
    </html>
  );
}
