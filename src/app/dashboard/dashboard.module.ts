import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModelComponent } from './model/model.component';
import { BrandComponent } from './brand/brand.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    SidebarComponent,
    ModelComponent,
    BrandComponent,
    MessagesComponent,
    ProductsComponent,
    OrdersComponent,
    ReportsComponent
  ],
  imports: [
  CommonModule,
    DashboardRoutingModule,
    NgSelectModule,
    NgxPaginationModule,
    FormsModule,


  ]
})
export class DashboardModule { }
