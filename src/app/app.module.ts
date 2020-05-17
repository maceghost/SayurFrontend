import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MobStorefrontComponent } from './mob-storefront/mob-storefront.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { ApplicationStateService } from './application-state.service';


import { HttpClientModule } from "@angular/common/http";

// import { MatListModule,MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTabsModule, MatRadioModule, MatTooltipModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { DeskStorefrontComponent } from './desk-storefront/desk-storefront.component';
import { DeskStorefrontComponent } from './desk-storefront/desk-storefront.component';

import { MobCartComponent } from './mob-cart/mob-cart.component';
import { DeskCartComponent } from './desk-cart/desk-cart.component';
import { DeskOrderComponent } from './desk-order/desk-order.component';
import { MobOrderComponent } from './mob-order/mob-order.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import { DeskPortalComponent } from './desk-portal/desk-portal.component';
import { DeskInfoComponent } from './desk-info/desk-info.component';
import { DeskFooterComponent } from './desk-footer/desk-footer.component';
import { DeskShopComponent } from './desk-shop/desk-shop.component';

import { DeskHeaderComponent } from './desk-header/desk-header.component';
import { SearchOffCLickDirective } from './search-off-click.directive';
import { ShareButtonModule } from '@ngx-share/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MobPortalComponent } from './mob-portal/mob-portal.component';
import { MobHeaderComponent } from './mob-header/mob-header.component';
import { MobHomeComponent } from './mob-home/mob-home.component';
import { MobShopComponent } from './mob-shop/mob-shop.component';
import { MobCheckoutComponent } from './mob-checkout/mob-checkout.component';
import { MobMycartComponent } from './mob-mycart/mob-mycart.component';
import { MobInfoComponent } from './mob-info/mob-info.component';
import { MobFooterComponent } from './mob-footer/mob-footer.component';


// import 'hammerjs';


// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// library.add(fas, far, fab);
@NgModule({
  declarations: [
    AppComponent,
    MobStorefrontComponent,
    DeskStorefrontComponent,
    MobCartComponent,
    DeskCartComponent,
    DeskOrderComponent,
    MobOrderComponent,
    DeskPortalComponent,
    DeskInfoComponent,
    DeskFooterComponent,
    DeskShopComponent,
    // DeskShop1Component,

    DeskHeaderComponent,
    SearchOffCLickDirective,
    MobPortalComponent,
    MobHeaderComponent,
    MobHomeComponent,
    MobShopComponent,
    MobCheckoutComponent,
    MobMycartComponent,
    MobInfoComponent,
    MobFooterComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    // MatTableDataSource,
    MatTableModule,
    // BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    MatSidenavModule,
    MatTreeModule,
    FontAwesomeModule,
    ShareButtonModule


  ],
  providers: [ApplicationStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
