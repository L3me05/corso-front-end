import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Dropdown, DropdownItem} from '../../shared/components/dropdown';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    Dropdown
  ],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <app-dropdown
          [items]="dropdownItems()"
          buttonClass="btn-ghost text-3xl hover:text-sky-400"
          (select)="onSelect($event)"
          dropStyle="bg-base-100 text-sky-800 hover:text-sky-400 hover:border-sky-400"
          hover
        >
          MyCorsi
        </app-dropdown>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal pxs-1 text-xl">
          <li routerLinkActive="text-sky-400" routerLink="home"><a>Home</a></li>
          <li routerLinkActive="text-sky-400" routerLink="corso"><a>Corso</a></li>
          <li routerLinkActive="text-sky-400" routerLink="discente"><a>Discente</a></li>
          <li routerLinkActive="text-sky-400" routerLink="docente"><a>Docente</a>

          </li>


        </ul>
      </div>
    </div>
  `,
  styles: ``
})
export class Navbar {
  auth= inject(AuthService)
  router = inject(Router)

  dropdownItems = computed(() => {
    return this.auth.isLoggedIn()
      ? [{ label: 'Logout', value: '/logout' }]
      : [
        { label: 'Login', value: '/login' },
        { label: 'Signup', value: '/signup' }
      ];
  });

  onSelect(item: DropdownItem) {
    switch (item.value) {
      case '/login':
        this.router.navigate(['/login'])
        break;
      case '/signup':
        this.router.navigate(['/signup'])
        break;
      case '/logout':
        this.auth.logout()
        break;
      default:
        console.log('Hai cliccato', item)
    }

  }

}


