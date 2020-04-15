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

import { FormsModule } from '@angular/forms';
import { DeskStorefrontComponent } from './desk-storefront/desk-storefront.component';
import { MobCartComponent } from './mob-cart/mob-cart.component';
import { DeskCartComponent } from './desk-cart/desk-cart.component';
import { DeskOrderComponent } from './desk-order/desk-order.component';
import { MobOrderComponent } from './mob-order/mob-order.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule

  ],
  providers: [ApplicationStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
