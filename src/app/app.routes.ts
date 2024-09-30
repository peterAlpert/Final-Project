import { AddProductComponent } from './Components/Admin/Product/add-product/add-product.component';
import { ChangePasswordComponent } from './Components/Password/change-password/change-password.component';

import { EditAccountComponent } from './Components/User/edit-account/edit-account.component';
import { Routes } from '@angular/router';

import { RegisterationComponent } from './Components/Authentication/registeration/registeration.component';

import { HomeComponent } from './Components/home/home.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ProductComponent } from './Components/Product/Allproduct/product.component';
import { DetailsComponent } from './Components/Product/details/details.component';
import { NotfoundComponent } from './Components/Layout/notfound/notfound.component';
import { ForgetPasswordComponent } from './Components/Password/forget-password/forget-password.component';
import { OtpComponent } from './Components/Password/otp/otp.component';


import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { AddCategoryComponent } from './Components/Admin/Category/add-category/add-category.component';
import { AddBrandComponent } from './Components/Admin/Brand/add-brand/add-brand.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { OrderComponent } from './Components/order/orders/order.component';
import { OrderDetailsComponent } from './Components/order/order-details/order-details.component';
import { OrderTrackComponent } from './Components/order/order-track/order-track.component';
import { ViewAllProductsComponent } from './Components/Admin/Product/view-all-products/view-all-products.component';
import { UpdateProductComponent } from './Components/Admin/Product/update-product/update-product.component';
import { AddUserComponent } from './Components/Admin/User/add-user/add-user.component';
import { ViewAllUsersComponent } from './Components/Admin/User/view-all-users/view-all-users.component';
import { SideNavbarComponent } from './Components/Admin-dashboard/side-navbar/side-navbar.component';
import { ViewAllBrandComponent } from './Components/Admin/Brand/view-all-brand/view-all-brand.component';
import { ViewAllCategoryComponent } from './Components/Admin/Category/view-all-category/view-all-category.component';
import { UpdateBrandComponent } from './Components/Admin/Brand/update-brand/update-brand.component';
import { UpdateCategoryComponent } from './Components/Admin/Category/update-category/update-category.component';



export const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: 'prefix' },
  { path: "home", component: HomeComponent, title: "Home" },
//products
  { path: "product", component: ProductComponent, title: "product" },


  { path: "product/:id", component: DetailsComponent, title: "productDetails" },



  { path: "forgetPassword", component: ForgetPasswordComponent, title: "forget" },
  { path: "forgetPassword/otp", component: OtpComponent, title: "otp" },

  { path: "WishList", component: WishlistComponent, title: "wishlist" },
  { path: "order", component: OrderComponent, title: "Order" },
  { path: "order/details/:id", component: OrderDetailsComponent, title: "Order" },
  { path: "order/track/:id", component: OrderTrackComponent, title: "Order" },
  {
    path: "profile", component: ProfileComponent, title: "user profile",
    children: [
      { path: "", redirectTo: 'profile/EditAccount', pathMatch: 'full' },
      { path: 'profile/EditAccount', component: EditAccountComponent, title: "EditAccount" },
      { path: "profile/changePassword", component: ChangePasswordComponent, title: "change" },
    ]
  },
  { path: "Cart", component: CartComponent, title: "Cart" },

  {path:"OrderTrack",component:OrderTrackComponent,title:"OrderTrack"},

  //dashbord'

  // {path:"sideNabar",component:SideNavbarComponent,title:"sideNavbar"},
  // {path:"dashboard-app",component:DashboardComponent,title:"dashboard-app"},

  //{path:"addProduct",component:AddProductComponent,title:"addProduct"},


  // {path:"updateProduct/:id",component:UpdateProductComponent,title:"updateProduct"},

  {path:"productDetails/:id",component:DetailsComponent,title:"Details of Product"},




  { path: "dashboard", component:DashboardComponent , title: "dashboard" ,

    children: [

  { path: "ViewAllProducts", component: ViewAllProductsComponent , title:"View All Products"},
  { path: "ViewAllProducts/addProduct", component: AddProductComponent , title:"Add Product"},
  { path: "ViewAllProducts/updateProduct/:id", component: UpdateProductComponent , title:"update Product"},
  {path:"ViewAllProducts/productDetails/:id",component:DetailsComponent,title:"Details of Product"},


      { path: "ViewAllBrand", component: ViewAllBrandComponent , title:"View All Brand "},
      { path: "ViewAllBrand/addBrand", component: AddBrandComponent ,title:"Add Brand"},
      { path: "ViewAllBrand/updateBrand/:id", component: UpdateBrandComponent ,title:"update Brand"},




      { path: "ViewAllCategory", component: ViewAllCategoryComponent , title:"View All Category"},
    { path: "ViewAllCategory/addCategory", component: AddCategoryComponent , title:"Add Category" },
    { path: "ViewAllCategory/updateCategor:id", component: UpdateCategoryComponent , title:"Update Category" },




      { path: "ViewAllUsers", component: ViewAllUsersComponent , title:"View All Users"},
      { path: "addUser", component: AddUserComponent ,title:"AddUser"},
      { path: "ViewAllUsers", component: ViewAllUsersComponent ,title:"View All Users"},




      ]


  },

  // { path: "**", component: NotfoundComponent, title: "Not found" },


  // {path:"Register",component:RegisterationComponent,title:"Register"},
  // {path:"Login",component:LoginComponent,title:"Login"},

  // {path:"WishList",component:WishlistComponent,title:"WishList"},
  // {path:"Cart",component:CartComponent,title:"Cart"},

  // {path:"checkout",component:CheckoutComponent,title:"checkout"},

  //using lazeloading

  // { path: 'home', loadComponent: () => import('./Components/home/home.component').then((m) => m.HomeComponent), title: "Home" },
  // {path:'product',loadComponent:()=>import('./Components/product/product.component').then((m)=>m.ProductComponent),title:"product"},

  { path: 'Register', loadComponent: () => import('./Components/Authentication/registeration/registeration.component').then((m) => m.RegisterationComponent), title: "Register" },
  { path: 'addreview/:id', loadComponent: () => import('./Components//Product/add-review/add-review.component').then((m) => m.AddReviewComponent), title: "Add Review" },
  { path: 'contactus', loadComponent: () => import('./Components/Layout/contact-us/contact-us.component').then((m) => m.ContactUsComponent), title: "Contact Us" },
  { path: 'Login', loadComponent: () => import('./Components/Authentication/login/login.component').then((m) => m.LoginComponent), title: "Login" },
  // { path: 'WishList', loadComponent: () => import('./Components/wishlist/wishlist.component').then((m) => m.WishlistComponent), title: "WishList" },
  // { path: 'Cart', loadComponent: () => import('./Components/cart/cart.component').then((m) => m.CartComponent), title: "Cart" },

  { path: 'checkout', loadComponent: () => import('./Components/checkout/checkout.component').then((m) => m.CheckoutComponent), title: "checkout" },


];
