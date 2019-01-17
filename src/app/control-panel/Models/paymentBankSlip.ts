import {Order} from './order.model';

export class PaymentBankSlip {
  expirationdate: string;
  paid: boolean;
  bank_slip_href: string;
  moip_id: string;
  order: Order;
  order_id: number;
  created_at: string;
  updated_at: string;
  id?: number;
}
