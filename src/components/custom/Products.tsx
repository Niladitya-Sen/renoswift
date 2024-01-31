import {
    Card,
    CardHeader
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BiHeart } from "react-icons/bi";
import { IoCart } from "react-icons/io5";
import { Button } from "../ui/button";
import { FaEye } from "react-icons/fa6";

const products = [
    {
        id: 1,
        name: 'Bathtub',
        price: 50000,
        image: '/assets/product-10.jpg',
    },
    {
        id: 2,
        name: 'Sink',
        price: 10000,
        image: '/assets/product-9.jpg',
    },
    {
        id: 3,
        name: 'Toilet',
        price: 15000,
        image: '/assets/product-8.jpg',
    },
    {
        id: 4,
        name: 'Vanity',
        price: 25000,
        image: '/assets/product-7.jpg',
    },
    {
        id: 5,
        name: 'Showers',
        price: 5000,
        image: '/assets/product-5.jpg',
    },
];

function ProductCard({ name, price, image }: Readonly<{ name: string, price: number, image: string }>) {
    return (
        <Card className={cn('rounded-lg overflow-hidden bg-secondary transition-all duration-500 group hover:shadow-md')}>
            <CardHeader className={cn('p-0 relative overflow-hidden')}>
                <Image
                    src={image}
                    alt={name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-[300px] object-center group-hover:scale-[1.2] transition-all duration-500"
                />
                <div className="absolute top-1 right-1 flex flex-col gap-2">
                    <span title="Add to favourites">
                        <Button variant={'secondary'} size={'icon'}>
                            <BiHeart className="text-xl" />
                        </Button>
                    </span>
                    <span title="Quick view">
                        <Button variant={'secondary'} size={'icon'}>
                            <FaEye className="text-xl" />
                        </Button>
                    </span>
                </div>
            </CardHeader>
            <div className="flex justify-between items-center p-6">
                <div>
                    <p className="heading-1 text-xl mb-1">{name}</p>
                    <p className="font-medium text-foreground/80">
                        {price.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </p>
                </div>
                <span title="Add to cart">
                    <Button variant={'default'} size={'icon'}>
                        <IoCart className="text-xl" />
                    </Button>
                </span>
            </div>
        </Card>

    )
}

export default function Products() {
    return (
        <section className='my-20'>
            <h1 className='heading-1 mb-2'>Popular Products</h1>
            <p className='text-foreground/80 mb-8'>Find your perfect match.</p>
            <div>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6'>
                    {
                        products.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
