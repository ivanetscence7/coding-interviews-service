import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';

@NgModule({
  imports: [RouterModule.forRoot(AppRouting)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
