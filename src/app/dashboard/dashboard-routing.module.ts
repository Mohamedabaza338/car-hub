import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { ModelComponent } from './model/model.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ReportsComponent } from './reports/reports.component';


const dashboardRoutes: Routes = [
  {path: "brands", component: BrandComponent},  
  {path: "brands/:id", component: ModelComponent},  
  {path: "messages", component: MessagesComponent},  
  {path: "products", component: ProductsComponent},  
  {path: "orders", component: OrdersComponent},  
  {path: "reports", component: ReportsComponent},  













 
  



];



@NgModule({
    imports: [RouterModule, RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
