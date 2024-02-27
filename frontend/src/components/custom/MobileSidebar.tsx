import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { OperationsTeamSidebarNavLinks } from "./ot/OperationsTeamSidebar";



export default function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild className='sm:hidden'>
                <HiOutlineMenuAlt3 className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent>
                <OperationsTeamSidebarNavLinks />
            </SheetContent>
        </Sheet>

    )
}
