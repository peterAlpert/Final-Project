
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
import { ViewAllBrandComponent } from './Components/Admin/Brand/view-all-brand/view-all-brand.component';
import { ViewAllCategoryComponent } from './Components/Admin/Category/view-all-category/view-all-category.component';
import { UpdateBrandComponent } from './Components/Admin/Brand/update-brand/update-brand.component';
import { UpdateCategoryComponent } from './Components/Admin/Category/update-category/update-category.component';
import { ContactUsComponent } from './Components/Layout/contact-us/contact-us.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { RegisterAdminComponent } from './Components/Admin/RegisterAdmin/register-admin/register-admin.component';
import { AddImageComponent } from './Components/Product/add-image/add-image.component';



export const routes: Routes = [

  //website

  {
    path: '',
    // canActivate:[authGuard],
    loadComponent: () => import('./Layout/website/website.component').then((m) => m.WebsiteComponent),
    children: [

      { path: "", redirectTo: "home", pathMatch: 'prefix' },
      { path: "home", component: HomeComponent, title: "Home" },
      { path: "cotactus", component: ContactUsComponent, title: "cotactus" },
      //products
      { path: "product", component: ProductComponent, title: "product" },
      { path: "addImage", component: AddImageComponent, title: "add new image" },


      { path: "product/:id", component: DetailsComponent, title: "productDetails" },

      { path: "forgetPassword", component: ForgetPasswordComponent, title: "forget" },
      { path: "forgetPassword/otp", component: OtpComponent, title: "otp" },

      { path: "Register", component: RegisterationComponent, title: "Register" },
      { path: "Login", component: LoginComponent, title: "Login" },


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
      { path: "checkout", component: CheckoutComponent, title: "checkout" },

      { path: "OrderTrack", component: OrderTrackComponent, title: "OrderTrack" },


      { path: "productDetails/:id", component: DetailsComponent, title: "Details of Product" },


    ]
  },

  {
    path: '', loadComponent: () => import('./Layout/dashboard-admin/dashboard-admin.component').then((m) => m.DashboardAdminComponent),

    children: [

      {
        path: "dashboard", component: DashboardComponent, title: "dashboard",

        children: [

          { path: "", redirectTo: "ViewAllProducts", pathMatch: 'prefix' },
          { path: "ViewAllProducts", component: ViewAllProductsComponent, title: "View All Products" },
          { path: "ViewAllProducts/addProduct", component: AddProductComponent, title: "Add Product" },
          { path: "ViewAllProducts/updateProduct/:id", component: UpdateProductComponent, title: "update Product" },
          { path: "ViewAllProducts/productDetails/:id", component: DetailsComponent, title: "Details of Product" },


          { path: "ViewAllBrands", component: ViewAllBrandComponent, title: "View All Brand " },
          { path: "ViewAllBrand/addBrand", component: AddBrandComponent, title: "Add Brand" },
          { path: "ViewAllBrand/updateBrand/:id", component: UpdateBrandComponent, title: "update Brand" },


          { path: "ViewAllCategory", component: ViewAllCategoryComponent, title: "View All Category" },
          { path: "ViewAllCategory/addCategory", component: AddCategoryComponent, title: "Add Category" },
          { path: "ViewAllCategory/updateCategor/:id", component: UpdateCategoryComponent, title: "Update Category" },

          { path: "registerAdmin", component: RegisterAdminComponent, title: "Register new Admin" },

          { path: "ViewAllUsers", component: ViewAllUsersComponent, title: "View All Users" },
          { path: "addUser", component: AddUserComponent, title: "AddUser" },
          { path: "ViewAllUsers", component: ViewAllUsersComponent, title: "View All Users" },

        ]
      }
    ]
  }

];
