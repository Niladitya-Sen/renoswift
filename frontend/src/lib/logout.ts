import { useCookies } from "@/hooks/useCookies";

export default function logout() {
    const cookies = useCookies();

    cookies?.remove("token");
    cookies?.remove("adminToken");
    cookies?.remove("otToken");

    if (window.location.pathname === "/") {
        window.location.reload();
    } else {
        window.location.assign("/");
    }
}