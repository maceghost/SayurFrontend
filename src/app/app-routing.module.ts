import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/**', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'provision', loadChildren: './provision/provision.module#ProvisionPageModule' },
  { path: 'cloud-login', loadChildren: './cloud-login/cloud-login.module#CloudLoginPageModule' },
  { path: 'sites', loadChildren: './sites/sites.module#SitesPageModule' },
  { path: 'storefront', loadChildren: './storefront/storefront.module#StorefrontPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' },
  { path: 'summary', loadChildren: './summary/summary.module#SummaryPageModule' },
  { path: 'storefront-mobile', loadChildren: './storefront-mobile/storefront-mobile.module#StorefrontMobilePageModule' },





  { path: '404', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '**/**', redirectTo: '', pathMatch: 'full' },
  // { path: 'device-panel', loadChildren: './device-panel/device-panel.module#DevicePanelPageModule' }
  // { path: 'tab1a', loadChildren: './tab1a/tab1a.module#Tab1aPageModule' },
  // { path: 'tab1b', loadChildren: './tab1b/tab1b.module#Tab1bPageModule' },
  // { path: 'hvac', loadChildren: './hvac/hvac.module#HvacPageModule' },
  // { path: 'status', loadChildren: './status/status.module#StatusPageModule' }
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  // { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
