import type { Dayjs } from "dayjs";

export enum Employment {
    frontendDeveloper = "frontend-разработчик",
    backendDeveloper = "backend-разработчик",
    testingEngineer = "тестировщик",
    devOps = "devOps-инженер",
    systemAnalyst = "системный аналитик",
    none = "---",
}
export interface IUser {
    id: string;
    name: string;
    surName: string;
    password?: string;
    fullName: string;
    email: string;
    birthDate?: Date | Dayjs;
    telephone?: string | null;
    employment?: string;
    userAgreement?: boolean;
}

export const emptyUser: IUser = {
    id: "",
    name: "",
    surName: "",
    password: "",
    fullName: "",
    email: "",
    birthDate: new Date(),
    telephone: "",
    employment: Employment.none,
    userAgreement: false
}

