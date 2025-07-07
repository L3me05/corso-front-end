import {Component, computed, Input, Signal, signal} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule
  ],
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  @Input() items!: Signal<Record<string, any>[]>;
  @Input() rowStyle: string = 'bg-base-100';
  @Input() headStyle: string = '';



  columns = computed(() => {
    const data = this.items();
    return data.length > 0
      ? Object.keys(data[0])
      : [];
  })





}
