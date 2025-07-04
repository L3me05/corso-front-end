import {Component, computed, Input, Signal, signal} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule
  ],
  standalone: true,
  template: `

    <div class="">
      <table class="table shadow-none w-full border-none border-collapse ">
        <!-- head -->
        <thead>
        <tr
          [ngClass]="headStyle"
          class="text-lg"
        >
          @for (col of columns(); track $index) {
            <th>{{ col }}</th>
          }
        </tr>
        </thead>

        <!-- body -->
        <tbody class="">
          @for (item of items(); track $index) {
            <tr
              [ngClass]="rowStyle"
              class=""
            >
              @for (col of columns(); track $index) {
                <td
                  class=""
                >
                  {{ item[col] }}
                </td>
              }
            </tr>
          }
        </tbody>

        <!-- foot (opzionale, puoi rimuoverlo) -->
        <tfoot>
        <tr>
          @for (col of columns(); track $index) {
            <th></th>
          }
        </tr>
        </tfoot>
      </table>
    </div>

    <!-- debug -->
<!--    <pre>{{ items() | json }}</pre>-->

  `,
  styles: ``
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
