import { CheckUrlDirective } from './check-url.directive';
import { HttpClient } from '@angular/common/http';

describe('CheckUrlDirective', () => {
  it('should create an instance', () => { 
    let http: HttpClient
    const directive = new CheckUrlDirective(http);
    expect(directive).toBeTruthy();
  });
});
