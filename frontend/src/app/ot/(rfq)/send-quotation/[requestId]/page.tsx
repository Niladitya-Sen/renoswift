import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IoArrowBack } from "react-icons/io5"

export default function SendQuotationDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const formData: Record<string, string> = {};

    return (
        <div>
            <Link href={"/ot/send-quotation"} className={cn('md:absolute block right-4 top-4 my-2 ml-auto w-fit')}>
                <Button variant={"link"}>
                    <IoArrowBack className='mr-2 text-lg' />
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
                        <TableCell>15/02/24</TableCell>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>rahul@gmail.com</TableCell>
                        <TableCell>7894567851</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='flex flex-col sm:grid sm:grid-cols-2 my-10 gap-4 px-5'>
                <label htmlFor="designPlan">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="designPlan" name="designPlan" className={cn('border-0')} />
                        <Link href={formData?.designPlan ?? "#"} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </label>
                <label htmlFor="designPlanLink">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <Input readOnly type="text" id="designPlanLink" name="designPlanLink" className='w-full border p-2 rounded-sm mt-1' value={formData?.designPlan} />
                </label>
                <label htmlFor="quotation">
                    <p className='font-semibold'>Quotation</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="quotation" name="quotation" className={cn('border-0')} />
                        <Link href={formData?.quotation ?? "#"} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Delivery Timeline</p>
                    <Input readOnly type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' value={formData?.timeline} />
                </label>
                <label htmlFor="teamRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Team</p>
                    <Input readOnly type="text" id="teamRemarks" name="teamRemarks" className='w-full border p-2 rounded-sm mt-1' value={formData?.teamRemarks} />
                </label>
                <label htmlFor="customerRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Customer</p>
                    <Input readOnly type="text" id="customerRemarks" name="customerRemarks" className='w-full border p-2 rounded-sm mt-1' value={formData?.customerRemarks} />
                </label>
            </div>
        </div>
    )
}
