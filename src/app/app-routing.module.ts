import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CustomerReviewsComponent } from './pages/customer-reviews/customer-reviews.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MeetOurExpertsComponent } from './pages/meet-our-experts/meet-our-experts.component';
import { QandAComponent } from './pages/qand-a/qand-a.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShopCarComponent } from './pages/shop-car/shop-car.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { RegisterCaragentComponent } from './pages/register-caragent/register-caragent.component';
import { AgentProfileComponent } from './pages/agent-profile/agent-profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FavouriteComponent } from './pages/favourite/favourite.component';
import { ShopComponent } from './pages/shop/shop.component';


const routes: Routes = [


    { path: 'login',component: LoginComponent},
    { path: '', component: HomeComponent },
   

    {path:"about-us",component:AboutUsComponent},
    {path:"contact-us",component:ContactUsComponent},
    {path:"shop",component:ShopComponent},

    {path:"meet-our-experts",component:MeetOurExpertsComponent},
    {path:"car-shop",component:ShopCarComponent},
    {path:"my-favourite",component:FavouriteComponent},
    {path:"signUp",component:RegisterComponent},
    {path:"registerCarAgent/:id",component:RegisterCaragentComponent},
    {path:"emailconfirmation", component: EmailConfirmationComponent },
    {path:"customer-reviews",component:CustomerReviewsComponent},
    {path:"questions-and-answers",component:QandAComponent},
    {path:"profile/:agenceId",component:AgentProfileComponent},
    {path:"payment",component:PaymentComponent},


    {path: "dashboard", loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},


  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
