import {Company} from './company.model';

export class User {
    name: string;
    email: string;
    nickname: string;
    password: string;
    password_confirmation: string;
    company: Company;
    company_id: number;
    id?: number;
    created_at: string;
    updated_at: string;
}
