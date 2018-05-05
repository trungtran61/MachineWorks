import { Injectable } from '@angular/core';

@Injectable()
export class HandleErrorService {
  constructor() { }

  handleError(error: Error): string {
    //console.log(error);  -- handled by token-interceptor
    return error.message;
  }

}
