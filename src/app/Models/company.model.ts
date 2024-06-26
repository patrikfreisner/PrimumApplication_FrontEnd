import {Role} from './role.model';
import {Customer} from '../control-panel/Models/customer.model';

export class Company {
    cnpj: string;
    fantasy_name: string;
    company_name: string;
    responsable: string;
    foundation_date: string;
    company_subject: string;
    company_phone: string;
    role: Role;
    customer: Customer;
    customer_id: number;
    role_id: number;
    company_logo: string;
    logo_size: string;
    created_at?: string;
    update_at?: string;
    id?: number;
}
