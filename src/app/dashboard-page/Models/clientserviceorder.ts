import {Clientcust} from './clientcust.model';

export class Clientserviceorder {
  id: number;
  devicetype: string;
  brand: string;
  model: string;
  accessories: string;
  details: string;
  order_init_date: string;
  order_end_date: string;
  service: string;
  reported_defect: string;
  solution: string;
  comments: string;
  advance_payment: string;
  advance_payment_value: string;
  status: string;
  clientcust: Clientcust;
  clientcust_id: number;
  created_at: string;
  updated_at: string;
}
