import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const ENVIRONMENT = new InjectionToken<typeof environment>('Environment');
