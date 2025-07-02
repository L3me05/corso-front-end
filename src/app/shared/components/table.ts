import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr>
          <th>1</th>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ``
})
export class Table {

}
