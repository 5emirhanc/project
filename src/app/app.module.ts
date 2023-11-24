import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
//Pages
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProductPageComponent } from './page/product-page/product-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
//components
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { PartnershipComponent } from './components/partnership/partnership.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import {MatRadioModule} from '@angular/material/radio';
import { CardgroupComponent } from './components/cardgroup/cardgroup.component';
import { UserAddComponent } from './admin/content/user-add/user-add.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { HeaderComponent } from './admin/header/header.component';
import { ProductAddComponent } from './admin/content/product-add/product-add.component';
import { UserListComponent } from './admin/content/user-list/user-list.component';
import { UploadComponent } from './admin/content/upload/upload.component';
import { ProductsComponent } from './admin/content/products-list/products.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductCategoriesComponent } from './admin/content/product-categories/product-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    NaviComponent,
    CardgroupComponent,
    FooterComponent,
    HomePageComponent,
    BannerComponent,
    PartnershipComponent,
    CardsComponent,
    ProductPageComponent,
    ProductPageComponent,
    ProductsComponent,
    UserAddComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    AdminPageComponent,
    LoginPageComponent,
    ProductAddComponent,
    UserListComponent,
    ProductCategoriesComponent,
  ],
  imports: [
    BrowserModule,MatRadioModule,
    JsonPipe,
    MatCheckboxModule,
    NgImageSliderModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
