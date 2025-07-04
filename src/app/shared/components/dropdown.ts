import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

export type DropdownItem = {
  label: string;
  value: any;
  route?: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [
    NgClass
  ],
  template: `
    <div class="dropdown"
         [ngClass]="{
            'dropdown-top dropdown-end': placement === 'top',
            'dropdown-left': placement === 'left',
            'dropdown-right': placement === 'right',
            'dropdown-hover': hover,
         }"


    >
      <div
        tabindex="0"
        role="button"
        class="btn"
        [ngClass]="buttonClass"
      >
        <ng-content/>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"

      >
        @for (item of items; track $index) {
          <li
            (click)="itemClick(item)"
          ><a>
            {{item.label}}
          </a></li>

        }
      </ul>
    </div>
  `,
  styles: ``
})
export class Dropdown {
  @Input() items: DropdownItem[] = [];
  @Input() placement: 'left' | 'right' | 'bottom' | 'top' = 'bottom';
  @Input({transform: booleanAttribute}) hover = false;
  @Input() buttonClass: string = ' m-1';
  @Output() select = new EventEmitter<DropdownItem>();

  itemClick(item: DropdownItem) {
    this.select.emit(item);
    const el = document.activeElement as HTMLElement;
    el.blur() ;
  }

}
