import AdminSidebar from "@/components/custom/admin/AdminSidebar";
import Navbar from "@/components/custom/Navbar";
import NextTopLoader from "nextjs-toploader";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <NextTopLoader
                showSpinner={false}
                color='#2563eb'
            />
            <main className="admin max-w-screen-2xl mx-auto grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] md:gap-8 bg-secondary h-screen w-screen relative isolate">
                <header className="col-span-full">
                    <Navbar className="max-w-screen-2xl shadow-md px-4" />
                </header>
                <AdminSidebar className="md:ml-8" />
                <section className="bg-white shadow-md p-4 md:p-8 overflow-y-auto md:mr-8">
                    {children}
                </section>
            </main>
        </>
    )
}