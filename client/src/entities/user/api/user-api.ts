import type { IUser } from "../model/user-model";

export const getUsers = async (): Promise<IUser[] | { error: string }> => {
    try {
        const response = await fetch(`/api/v1/users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (e) {
        return { error: (e as Error).message };
    }
};