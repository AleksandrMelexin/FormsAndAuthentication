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
    password: string;
    fullName: string;
    email: string;
    birthDate?: moment.Moment;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
}
