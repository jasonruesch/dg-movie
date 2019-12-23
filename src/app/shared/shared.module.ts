import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT } from './inject-tokens';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment }
  ]
})
export class SharedModule { }
