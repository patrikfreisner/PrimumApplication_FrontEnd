import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class HelpersModule {
  firstD: string;
  month: string;
  year: string;

  public dateChange(data: string, type: string): string {

    if (type === 'toHTML') {
      this.year = data.slice(0, 4);
      this.month = data.slice(5, 7);
      this.firstD = data.slice(8, 10);
      data = this.firstD + '/' + this.month + '/' + this.year;
      return data;

    } else if (type === 'toDB') {
      this.firstD = data.slice(0, 2);
      this.month = data.slice(2, 4);
      this.year = data.slice(4, 8);
      data = this.year + '-' + this.month + '-' + this.firstD;
      return data;

    } else if (type === 'toSearchDate') {
      this.year = data.slice(6, 10);
      this.month = data.slice(3, 5);
      this.firstD = data.slice(0, 2);
      data = this.year + '-' + this.month + '-' + this.firstD;
      return data;
    }
  }

  public toMoney(number: number): string {
    let valor: string;
    let th: string;
    let th2: string;
    let rest: string;

    valor = number.toString();

    if (valor.length === 4) {
      th = valor.slice(0, 2);
      rest = valor.slice(2, 4);
      valor = th + ',' + rest;
    } else if (valor.length === 5) {
      th = valor.slice(0, 3);
      rest = valor.slice(3, 5);
      valor = th + ',' + rest;
    } else if (valor.length === 6) {
      th = valor.slice(0, 1);
      th2 = valor.slice(1, 4);
      rest = valor.slice(4, 6);
      valor = th + '.' + th2 + ',' + rest;
    }

    return valor;
  }
}
