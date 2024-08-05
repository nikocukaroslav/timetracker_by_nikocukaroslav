export const setCookie = (name: string, value: string, expiresAt: number) => {
    let expires = "";
    const date = new Date(expiresAt);
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export const deleteCookie = (name: string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
