import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { StartPageComponent } from './start-page/start-page.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'result',
    component: ResultComponent,
  },
  {
    path: 'startPage',
    component: StartPageComponent,
  },
  {
    path: 'test/:name/:qNo',
    component: TestComponent,
  },
  {
    path: '',
    redirectTo: '/startPage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
