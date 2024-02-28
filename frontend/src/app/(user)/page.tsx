import Categories from '@/components/custom/Categories';
import ChatBot from '@/components/custom/ChatBot';
import ChooseUs from '@/components/custom/ChooseUs';
import Hero from '@/components/custom/Hero';
import Inspiration from '@/components/custom/Inspiration';
import Newsletter from '@/components/custom/Newsletter';
import Products from '@/components/custom/Products';
import SectionWrapper from '@/components/custom/SectionWrapper';
import Working from '@/components/custom/Working';
import { cn } from '@/lib/utils';

export default function Index() {
    return (
        <>
            <Hero />
            <SectionWrapper className={cn('w-full')}>
                <ChooseUs />
                <Categories />
                <Products />
                <Inspiration />
                <Working />
                <Newsletter />
                <ChatBot />
            </SectionWrapper>
        </>
    );
}

