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
    Role: Role;
    Customer: Customer;
    Customer_id: number;
    Role_id: number;
    created_at?: string;
    update_at?: string;
    id?: number;
}
