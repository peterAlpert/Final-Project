import { ChangePasswordComponent } from './Components/Password/change-password/change-password.component';

import { EditAccountComponent } from './Components/edit-account/edit-account.component';
import { Routes } from '@angular/router';

import { RegisterationComponent } from './Components/registeration/registeration.component';

import { HomeComponent } from './Components/home/home.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ProductComponent } from './Components/product/product.component';
import { DetailsComponent } from './Components/details/details.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ForgetPasswordComponent } from './Components/Password/forget-password/forget-password.component';
import { OtpComponent } from './Components/Password/otp/otp.component';

export const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: 'prefix' },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "product", component: ProductComponent, title: "product" },
  { path: "product/:id", component: DetailsComponent, title: "productDetails" },

  { path: "changePassword", component: ChangePasswordComponent, title: "change" },
  { path: "forgetPassword", component: ForgetPasswordComponent, title: "forget" },
  { path: "forgetPassword/otp", component: OtpComponent, title: "otp" },
  // { path: "**", component: NotfoundComponent, title: "Not found" },


  // {path:"Register",component:RegisterationComponent,title:"Register"},
  // {path:"Login",component:LoginComponent,title:"Login"},

  // {path:"WishList",component:WishlistComponent,title:"WishList"},
  // {path:"Cart",component:CartComponent,title:"Cart"},

  // {path:"checkout",component:CheckoutComponent,title:"checkout"},

  //using lazeloading

  // { path: 'home', loadComponent: () => import('./Components/home/home.component').then((m) => m.HomeComponent), title: "Home" },
  // {path:'product',loadComponent:()=>import('./Components/product/product.component').then((m)=>m.ProductComponent),title:"product"},

  { path: 'Register', loadComponent: () => import('./Components/registeration/registeration.component').then((m) => m.RegisterationComponent), title: "Register" },
  { path: 'Admin', loadComponent: () => import('./Components/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent), title: "admin-dashboard" },
  { path: 'Login', loadComponent: () => import('./Components/login/login.component').then((m) => m.LoginComponent), title: "Login" },
  { path: 'WishList', loadComponent: () => import('./Components/wishlist/wishlist.component').then((m) => m.WishlistComponent), title: "WishList" },
  { path: 'Cart', loadComponent: () => import('./Components/cart/cart.component').then((m) => m.CartComponent), title: "Cart" },
  { path: 'EditAccount', loadComponent: () => import('./Components/edit-account/edit-account.component').then((m) => m.EditAccountComponent), title: "EditAccount" },
  { path: 'checkout', loadComponent: () => import('./Components/checkout/checkout.component').then((m) => m.CheckoutComponent), title: "checkout" },



];
