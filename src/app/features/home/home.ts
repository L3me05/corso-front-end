import {Component, inject} from '@angular/core';
import {EnterCard} from '../../shared/components/enter-card';

@Component({
  selector: 'app-home',
  imports: [
    EnterCard
  ],
  template: `
    <p>
      home works!
    </p>

    <div class="flex flex-col md:flex-row gap-4 p-4">
      <div class="w-7/24">
        <app-enter-card />
      </div>
      <div class="flex-1">
        <p>prova</p>
      </div>
    </div>


  `,
  styles: ``
})
export default class Home {


}
