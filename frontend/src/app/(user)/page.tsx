import AboutUs from "@/components/custom/AboutUs";
import Categories from "@/components/custom/Categories";
import Hero from "@/components/custom/Hero";
import Inspiration from "@/components/custom/Inspiration";
import Newsletter from "@/components/custom/Newsletter";
import SectionWrapper from "@/components/custom/SectionWrapper";
import Working from "@/components/custom/Working";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <>
      <Hero />
      <SectionWrapper className={cn("w-full")}>
        <AboutUs />
        <Categories />
        <Inspiration />
        <Working />
        <Newsletter />
      </SectionWrapper>
    </>
  );
}
