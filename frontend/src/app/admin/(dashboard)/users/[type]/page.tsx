import AdminAddEmployeeDialog from '@/components/custom/admin/AdminAddEmployeeDialog';
import AdminDeleteUserButton from '@/components/custom/admin/AdminDeleteUserButton';
import ToolTipProvider from '@/components/custom/providers/ToolTipProvider';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

type UserType = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
}

async function getUsers(type: "customers" | "operations-team"): Promise<UserType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${type}`, {
        headers: {
            'Authorization': `Bearer ${cookieStore.get('adminToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function Users({ params: { type } }: Readonly<{ params: { type: string } }>) {

    if (type !== 'customers' && type !== 'operations-team') {
        notFound();
    }

    const users = await getUsers(type);

    return (
        <div>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Customer ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Email</TableHead>
                        <TableHead className={cn('text-white')}>Contact Number</TableHead>
                        <TableHead className={cn('text-white')}>Status</TableHead>
                        <TableHead className={cn('text-white')}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users.map(({ id, name, email, isActive, phoneNumber }) => (
                            <TableRow key={id}>
                                <TableCell className="font-medium">{id}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{email}</TableCell>
                                <TableCell>{phoneNumber}</TableCell>
                                <TableCell>{isActive ? 'Active' : 'Inactive'}</TableCell>
                                {
                                    type === 'operations-team' ? (
                                        <TableCell>
                                            <Link href={`/admin/users/operations-team/${id}`} className='flex gap-4 items-center justify-end'>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <FaEye className='text-primary text-xl' />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <div className='flex gap-4 items-center justify-end'>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <FiEdit className='text-green-500 text-xl' />
                                                </Button>
                                                <ToolTipProvider title='Delete customer'>
                                                    <AdminDeleteUserButton id={id} type={type} />
                                                </ToolTipProvider>
                                            </div>
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {
                type === 'operations-team' && (
                    <div className='bg-white w-full sticky bottom-0'>
                        <AdminAddEmployeeDialog
                            trigger={
                                <Button className={cn('mx-auto flex mt-4')}>
                                    Add Employee
                                </Button>
                            }
                        />
                    </div>
                )
            }
        </div>
    )
}
