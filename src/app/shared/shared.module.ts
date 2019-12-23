import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT } from './inject-tokens';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment }
  ],
  exports: [MovieComponent]
})
export class SharedModule { }
