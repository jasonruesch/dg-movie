import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT } from './inject-tokens.ts';



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
