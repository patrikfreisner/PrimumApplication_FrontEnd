import {Component, OnInit} from '@angular/core';
import {Clientserviceorder} from '../Models/clientserviceorder';
import {ClientserviceorderService} from '../Services/ModelServices/clientserviceorder.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-service-orders',
  templateUrl: './service-orders.component.html',
  styleUrls: ['./service-orders.component.css']
})
export class ServiceOrdersComponent implements OnInit {

  service_order: Clientserviceorder;
  serviceorders: Clientserviceorder[];
  soForm: FormGroup;
  IsEditable: false;

  constructor(
    public soService: ClientserviceorderService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.formServiceOrderBuilder();
  }

  ngOnInit() {
  }

  public openModal(content, size): void {
    this.soForm = null;
    this.formServiceOrderBuilder();
    this.modalService.open(content, {size: size});
  }

  public getServiceOrder(): void {
    this.soService.getServiceOrder().subscribe(
      (service_order) => this.serviceorders = service_order
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
        }
      }
    );
    return this.service_order;
  }

  private addNew(): void {
    this.service_order = this.soForm.value;

    this.soService.createServiceOrder(this.service_order)
      .subscribe(
        () => {
          this.getServiceOrder();
        },
        () => alert('ocorreu um erro!')
      );
  }

  private updateServiceOrder(so: Clientserviceorder): void {
    this.service_order = this.soForm.value;

    this.soService.updateServiceOrder(this.service_order)
      .subscribe(
        () => this.getServiceOrder(),
        () => alert('Ocorreu um erro!')
      );
  }

  private deleteServiceOrder(id): void {
    this.soService.deleteServiceOrder(id).subscribe(
      () => {
        this.getServiceOrder();
        this.service_order = null;
      }
    );
  }

  private formServiceOrderBuilder(): void {
    this.soForm = this.fb.group({
      id: '',
      type: ['', Validators.required],
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
      created_at: [''],
      updated_at: [''],
    });
  }

}
