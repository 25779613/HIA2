import { Pipe, PipeTransform } from '@angular/core';
import { roomsList } from './rooms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: roomsList[], price: number): roomsList[] {
    return rooms.filter((room) => room.price > price);
  }

}
