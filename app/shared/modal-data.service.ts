import { Injectable } from '@angular/core';

@Injectable()
export class ModalDataService {
  data;
  constructor() { }
  setData(data) {
    this.data = data
  }
  getData() {
    return this.data
  }
}
