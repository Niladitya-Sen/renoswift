import AboutUs from '@/components/custom/AboutUs';
import Categories from '@/components/custom/Categories';
import ChatBot from '@/components/custom/ChatBot';
import ChooseUs from '@/components/custom/ChooseUs';
import ClientReview from '@/components/custom/ClientReview';
import Downweb from '@/components/custom/downwep';
import Hero from '@/components/custom/Hero';
import Inspiration from '@/components/custom/Inspiration';
import Newsletter from '@/components/custom/Newsletter';
import SectionWrapper from '@/components/custom/SectionWrapper';
import Working from '@/components/custom/Working';
import { cn } from '@/lib/utils';

export default function Index() {
    return (
        <>
        {/* <Downweb/> */}
            <Hero />
            <SectionWrapper className={cn('w-full')}>
                <AboutUs />
                {/* <ChooseUs /> */}
                <Categories />
                {/* <Products /> */}
                <Inspiration />
                <Working />
                <ClientReview />
                <Newsletter />
                <ChatBot />
            </SectionWrapper>
        </>
    );
}

