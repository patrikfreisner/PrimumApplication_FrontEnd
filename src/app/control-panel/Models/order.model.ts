import {Customer} from './customer.model';
import {PaymentBankSlip} from './paymentBankSlip';

export class Order {
  id: number;
  item_product: string;
  item_description: string;
  item_quantity: string;
  item_price: string;
  moip_id: string;
  customer_id: number;
  created_at: string;
  updated_at: string;
  customer: Customer;
  payment_bank_slip: PaymentBankSlip;
}
