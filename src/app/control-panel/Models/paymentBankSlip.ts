import {Order} from './order.model';

export class PaymentBankSlip {
  id: number;
  expirationdate: string;
  paid: boolean;
  bank_slip_href: string;
  moip_id: string;
  Order: Order;
  Order_id: number;
  created_at: string;
  updated_at: string;
}
