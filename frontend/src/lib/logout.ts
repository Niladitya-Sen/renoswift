export default function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "otToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (window.location.pathname === "/") {
        window.location.reload();
    } else {
        window.location.assign("/");
    }
}