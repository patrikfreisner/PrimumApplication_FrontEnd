import {Customer} from './customer.model';
import {PaymentBankSlip} from './paymentBankSlip';

export class Order {
  id: number;
  item_product: string;
  item_description: string;
  item_quantity: string;
  item_price: string;
  moip_id: string;
  Customer_id: number;
  created_at: string;
  updated_at: string;
  Customer: Customer;
  PaymentBankSlip: PaymentBankSlip;
}
