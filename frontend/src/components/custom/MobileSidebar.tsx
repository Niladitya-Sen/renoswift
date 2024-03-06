import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { OperationsTeamSidebarNavLinks } from "./ot/OperationsTeamSidebar";
import { CustomerProfileSidebarNavLinks } from "./customer/CustomerProfileSidebar";



export default function MobileSidebar({ role }: Readonly<{ role: "ot" | "customer" }>) {
    let navLinks: React.JSX.Element;

    if (role === "ot") {
        navLinks = <OperationsTeamSidebarNavLinks />;
    } else {
        navLinks = <CustomerProfileSidebarNavLinks />;
    }

    return (
        <Sheet>
            <SheetTrigger asChild className='sm:hidden'>
                <HiOutlineMenuAlt3 className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent>
                {navLinks}
            </SheetContent>
        </Sheet>

    )
}
