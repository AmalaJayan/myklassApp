import {Component,Output,EventEmitter} from '@angular/core';
import { Datetime } from './datetime';


@Component({
  selector: 'ngbd-timepicker-basic',
  templateUrl: './time-picker.html'
})

export class NgbdTimepickerBasic {
    @Output() messageEvent = new EventEmitter<object>();
  time = {hour: 13, minute: 30};
  sendTime() {
    this.messageEvent.emit(this.time);
  }
}