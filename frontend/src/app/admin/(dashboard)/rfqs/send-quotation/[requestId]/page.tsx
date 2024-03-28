import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

type QuoteDetailType = {
    quoteId: string;
    createdDate: string;
    name: string;
    email: string;
    contactNumber: string;
    propertyId: string;
    customerRemarks: string;
    teamRemarks: string;
    timeline: string;
    designPlan: string;
    quotation: string;
};

async function getQuoteInDetail(quoteId: string): Promise<QuoteDetailType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/quotation/send-quotation/${quoteId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('adminToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function SendQuotationDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const quote = await getQuoteInDetail(requestId);

    return (
        <div className='relative'>
            <Link href={"/admin/rfqs/send-quotation"} className={cn('absolute -top-[7rem] sm:-top-16 right-2')}>
                <Button variant={"outline"} className={cn('border-primary text-primary hover:text-primary')}>
                    <span title='back'>back</span>
                </Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Request</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Name</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Email</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{requestId}</TableCell>
                        <TableCell>{dayjs(quote.createdDate).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{quote.name}</TableCell>
                        <TableCell>{quote.email}</TableCell>
                        <TableCell>{quote.contactNumber}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='flex flex-col sm:grid sm:grid-cols-2 my-10 gap-4 px-5'>
                <label htmlFor="designPlan">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="designPlan" value={quote.designPlan.split("/").at(-1)} name="designPlan" className={cn('border-0')} />
                        <Link href={process.env.NEXT_PUBLIC_API_URL + quote.designPlan} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </label>
                <label htmlFor="designPlanLink">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <Link target='_blank' href={process.env.NEXT_PUBLIC_API_URL + quote.designPlan}>
                        <Input readOnly type="text" id="designPlanLink" name="designPlanLink" className='w-full border p-2 rounded-sm mt-1 cursor-pointer' value={process.env.NEXT_PUBLIC_API_URL + quote.designPlan} />
                    </Link>
                </label>
                <label htmlFor="quotation">
                    <p className='font-semibold'>Quotation</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="quotation" value={quote.quotation.split("/").at(-1)} name="quotation" className={cn('border-0')} />
                        <Link href={process.env.NEXT_PUBLIC_API_URL + quote.quotation} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Delivery Timeline</p>
                    <Input readOnly type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' value={quote.timeline} />
                </label>
                <label htmlFor="teamRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Team</p>
                    <Input readOnly type="text" id="teamRemarks" name="teamRemarks" className='w-full border p-2 rounded-sm mt-1' value={quote.teamRemarks} />
                </label>
                <label htmlFor="customerRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Customer</p>
                    <Input readOnly type="text" id="customerRemarks" name="customerRemarks" className='w-full border p-2 rounded-sm mt-1' value={quote.customerRemarks} />
                </label>
            </div>
        </div>
    )
}
