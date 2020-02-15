import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignalrComponent} from './signalr/signalr/signalr.component';

const routes: Routes = [
  {
    path: '',
    component: SignalrComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
