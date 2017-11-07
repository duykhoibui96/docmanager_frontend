import { Injectable } from '@angular/core';

@Injectable()
export class SharedMemoryService {

  DATE_OBJECT: Object;
  constructor() { 

    let time = new Date();

    this.DATE_OBJECT = {

      beginTime: {

        day: time.getDate(),
        month: time.getMonth(),
        year: time.getFullYear()


      }

    }

  }

}
