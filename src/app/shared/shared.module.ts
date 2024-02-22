import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SecondHeaderComponent } from './components/second-header/second-header.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { NgxBraintreeModule } from 'ngx-braintree';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoaderComponent, 
    SecondHeaderComponent, ProductListingComponent,  
  ],
  imports: [
    NgxBraintreeModule,
  CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    DragulaModule.forRoot(),
      TranslateModule, 
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoaderComponent,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    SecondHeaderComponent,
    ProductListingComponent
  ],
})
export class SharedModule { }
