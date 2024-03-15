import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";


export default function TableLoading({ columns = 4, rows = 5 }: Readonly<{ columns?: number, rows?: number }>) {
    const rowsArray = Array.from(Array(rows).keys());
    const columnsArray = Array.from(Array(columns).keys());

    return (
        <Table>
            <TableBody>
                {
                    rowsArray.map(row => (
                        <TableRow key={"row" + row}>
                            {
                                columnsArray.map(column => (
                                    <TableCell key={"column" + column}>
                                        <Skeleton className="w-full h-[30px] rounded-sm" />
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    )
}