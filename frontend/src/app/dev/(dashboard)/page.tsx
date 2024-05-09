import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { cookies } from "next/headers";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

async function getOrders(): Promise<string[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dev/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('devToken')?.value}`
        },
        cache: 'no-store'
    });
    const data = await response.json();
    return data;
}

export default async function Projects() {
    const orders = await getOrders();

    return (
        <div className="flex flex-col-reverse gap-4 md:grid md:grid-cols-2">
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>S No</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Order ID</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map((order, index) => (
                            <TableRow key={order}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{order}</TableCell>
                                <TableCell>
                                    <Link href={`/dev/${order}`}>
                                        <Button variant={"outline"} className={cn("border text-blue-500 bg-blue-50 border-blue-500")}>
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <search className="flex gap-4 justify-self-end relative max-w-md w-full h-fit">
                <Input type="text" placeholder="Search" className={cn("px-8")} />
                <IoIosSearch className="absolute left-2 text-xl self-center text-gray-500" />
            </search>
        </div>
    )
}
