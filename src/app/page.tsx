import Categories from '@/components/custom/Categories';
import ChooseUs from '@/components/custom/ChooseUs';
import Hero from '@/components/custom/Hero';
import Inspiration from '@/components/custom/Inspiration';
import Newsletter from '@/components/custom/Newsletter';
import Products from '@/components/custom/Products';
import SectionWrapper from '@/components/custom/SectionWrapper';
import React from 'react'

export default function Index() {
    return (
        <SectionWrapper>
            <Hero />
            <ChooseUs />
            <Categories />
            <Products />
            <Inspiration />
            <Newsletter />
        </SectionWrapper>
    );
}
    
