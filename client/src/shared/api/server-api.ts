export const auth = async (email: string, password: string) => {
    try {
        const response = await fetch(`/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ "email": email, "password": password }),
        });
        return response;
    } catch (e) {
        return { error: (e as Error).message };
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`/api/v1/auth/logout`, {
            method: "POST",
            credentials: 'include',
        });
        return response;
    } catch (e) {
        return { error: (e as Error).message };
    }
};

export const checkAuth = async () => {
    try {
        const response = await fetch(`/api/v1/auth/me`, {
            method: "GET",
            credentials: 'include',
        });
        return response;
    } catch (e) {
        return { error: (e as Error).message };
    }
};

