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

export const getUserByID = async (id: string): Promise<IUser | { error: string }> => {
    try {
        const response = await fetch(`/api/v1/users/${id}`, {
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

export const createUser = async (user: IUser) => {
    try {
        const { id, ...createUser } = user;
        if (!createUser.telephone) {
            createUser.telephone = null;
        }
        const response = await fetch(`/api/v1/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(createUser),
        });
        if (!response.ok){
            const data = await response.json();
            return { success: false, data };
        }
        else {
            const data = {};
            return { success: true, data };
        }
    } catch (e) {
        return { 
            success: false, 
            error: (e as Error).message 
        };
    }
}

export const updateUser = async (user: IUser) => {
    try {        
        const { id, email, ...editUser } = user;
        if (!editUser.telephone) {
            editUser.telephone = null;
        }
        const response = await fetch(`/api/v1/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(editUser),
        });
        if (!response.ok){
            const data = await response.json();
            return { success: false, data };
        }
        else {
            const data = {};
            return { success: true, data };
        }
    } catch (e) {
        return { 
            success: false, 
            error: (e as Error).message 
        };
    }
};

export const deleteUser = async (id: string) => {
    try {
        const response = await fetch(`/api/v1/users/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        if (!response.ok){
            const data = await response.json();
            return { success: false, data };
        }
        else {
            const data = {};
            return { success: true, data };
        }
    } catch (e) {
        return { error: (e as Error).message };
    }
};