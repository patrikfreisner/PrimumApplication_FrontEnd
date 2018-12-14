import {Component, OnInit} from '@angular/core';
import {Clientserviceorder} from '../Models/clientserviceorder';
import {ClientserviceorderService} from '../Services/ModelServices/clientserviceorder.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../Services/SearchManager/search.service';
import {Clientcust} from '../Models/clientcust.model';
import {ClientcustService} from '../Services/ModelServices/clientcust.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-service-orders',
  templateUrl: './service-orders.component.html',
  styleUrls: ['./service-orders.component.css']
})
export class ServiceOrdersComponent implements OnInit {
  page: number;
  clientcusts: Clientcust[];
  clientcust: Clientcust;
  service_order: Clientserviceorder;
  serviceorders: Clientserviceorder[];
  soForm: FormGroup;
  IsEditable: false;
  selectedStatusValue = null;
  selectStatus = [
    {
      label: 'Em aberto',
      value: 'Em aberto'
    },
    {
      label: 'Fechado',
      value: 'Fechado'
    }
  ];
  dayToday: String;
  monthToday: String;
  yearToday: String;

  constructor(
    public soService: ClientserviceorderService,
    public searchService: SearchService,
    public customerService: ClientcustService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {
    this.getServiceOrders(1);
    this.formServiceOrderBuilder();
    this.getClientCustBySearch('');
    this.page = 1;

    this.dayToday = new Date().getDate().toLocaleString('latn');

    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    this.monthToday = monthNames[new Date().getMonth()];
    this.yearToday = new Date().getFullYear().toString();
  }

  ngOnInit() {
  }

  public toDocType(): void {
    const margin = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.fromHTML($('#renderThis').get(0), 15, 15, {}, function () {
      doc.save('client_so.pdf');
    }, margin);
  }

  public captureScreen(): void {
    const divHeight = $('#renderThis').height();
    const divWidth = $('#renderThis').width();
    const ratio = divHeight / divWidth;
    html2canvas(document.getElementById('renderThis')).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4
      const width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();
      height = ratio * width;
      doc.addImage(image, 'PNG', 0, 0, width - 0, height - 50);
      doc.save('OS' + this.service_order.id + '.pdf');
    });
  }

  private pageNext(): void {
    this.page += 1;
    this.getServiceOrders(this.page);
    if (this.serviceorders.length === 0) {
      this.page -= 1;
    }
  }

  private pageBack(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.getServiceOrders(this.page);
    }
  }

  public openModal(content, size): void {
    this.soForm = null;
    this.formServiceOrderBuilder();
    this.modalService.open(content, {size: size});
    this.getClientCustBySearch('');
  }

  public getServiceOrders(page): void {
    this.soService.getServiceOrder(page).subscribe(
      (service_order) => this.serviceorders = service_order,
      () => alert('Não foi possivel buscar O.S')
    );
  }

  public getClientCustBySearch(object: string): void {
    this.searchService.getClientcustBySearch('name', object).subscribe(
      (clientcust) => {
        this.clientcusts = clientcust;
      },
      () => alert('Não foi possivel concluir busca!')
    );
  }

  private getCustomerById(id: number, content, setToForm): Clientcust {
    this.IsEditable = false;
    if (content != null) {
      this.modalService.open(content);
    }
    this.customerService.getCustomerById(id).subscribe(
      (clientcust) => {
        this.clientcust = clientcust;
      },
      () => alert('Não foi possivel concluir ação!')
    );
    return this.clientcust;
  }

  public getSOBySearch(id: number): void {
    this.searchService.getServiceOrderBySearch('id', id.toString()).subscribe(
      (so) => this.serviceorders = so,
      () => alert('Não foi possivel concluir busca!')
    );
  }

  public getSObyId(id: number, content, setToForm): Clientserviceorder {
    this.IsEditable = false;
    if (content != null) {
      this.modalService.open(content);
    }
    this.soService.getServiceOrderById(id).subscribe(
      (so) => {
        this.service_order = so;
        if (setToForm === true) {
          this.soForm.patchValue(this.service_order);
          this.selectedStatusValue = this.service_order.status;
        }
      },
      () => alert('Não foi possivel concluir ação!')
    );
    return this.service_order;
  }

  private addNew(): void {
    this.service_order = this.soForm.value;
    this.service_order.Clientcust_id = this.clientcust.id;
    this.service_order.order_init_date = new Date().toLocaleDateString('latn');
    this.service_order.status = 'Em aberto';

    this.soService.createServiceOrder(this.service_order)
      .subscribe(
        () => {
          this.getServiceOrders(1);
        },
        () => alert('Não foi possivel criar S.O!')
      );
  }

  private updateServiceOrder(so: Clientserviceorder): void {
    this.service_order = this.soForm.value;
    if (this.service_order.status === 'Fechado') {
      this.service_order.order_end_date = new Date().toLocaleDateString('latn');
    }

    this.soService.updateServiceOrder(this.service_order)
      .subscribe(
        () => this.getServiceOrders(1),
        () => alert('Não foi possivel atualizar S.O!!')
      );
  }

  private deleteServiceOrder(id): void {
    this.soService.deleteServiceOrder(id).subscribe(
      () => {
        this.getServiceOrders(1);
        this.service_order = null;
      },
      () => alert('Não foi possivel deletar O.S!')
    );
  }

  private formServiceOrderBuilder(): void {
    this.soForm = this.fb.group({
      id: '',
      devicetype: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      accessories: [''],
      details: [''],
      order_init_date: [''],
      order_end_date: [''],
      service: [''],
      reported_defect: ['', Validators.required],
      solution: [''],
      comments: [''],
      advance_payment: [''],
      advance_payment_value: [''],
      status: ['']
    });
  }

}
