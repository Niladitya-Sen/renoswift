import Categories from '@/components/custom/Categories';
import Footer from '@/components/custom/Footer';
import Hero from '@/components/custom/Hero';
import Inspiration from '@/components/custom/Inspiration';
import Navbar from '@/components/custom/Navbar';
import Newsletter from '@/components/custom/Newsletter';
import Products from '@/components/custom/Products';
import React from 'react'

export default function Index() {
    return (
        <React.Fragment>
            <Navbar />
            <Hero />
            <Categories />
            <Products />
            <Inspiration />
            <Newsletter />
            <Footer />
        </React.Fragment>
    );
}
    
