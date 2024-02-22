import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { NgxPaginationModule } from 'ngx-pagination';

import { GoogleMapsModule } from "@angular/google-maps";

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

 

import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { ShopCarComponent } from './pages/shop-car/shop-car.component';
import { CustomerReviewsComponent } from './pages/customer-reviews/customer-reviews.component';
import { QandAComponent } from './pages/qand-a/qand-a.component';
import { MeetOurExpertsComponent } from './pages/meet-our-experts/meet-our-experts.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { RegisterCaragentComponent } from './pages/register-caragent/register-caragent.component';
import { AgentProfileComponent } from './pages/agent-profile/agent-profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NgxBraintreeModule } from 'ngx-braintree';
import { FavouriteComponent } from './pages/favourite/favourite.component';
import { ShopComponent } from './pages/shop/shop.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent, LoginComponent,HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    RegisterComponent,
    ShopCarComponent,
    CustomerReviewsComponent,
    QandAComponent,
    MeetOurExpertsComponent,
    EmailConfirmationComponent,
    RegisterCaragentComponent,
    AgentProfileComponent,
    PaymentComponent,
    FavouriteComponent,
    ShopComponent,
  ],
  imports: [
    NgxBraintreeModule,
    GoogleMapsModule,
BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxPaginationModule,

      NgSelectModule,
      ToastrModule.forRoot(
      ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
//     // for HttpClient use:
    LoadingBarHttpClientModule,
//     // for Router use:
    LoadingBarRouterModule,
//     // for Core use:
    LoadingBarModule
  ],
  providers: [
    provideAnimations(), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
