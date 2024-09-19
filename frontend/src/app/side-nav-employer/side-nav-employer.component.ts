import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav-employer',
  standalone: true,
  imports: [],
  templateUrl: './side-nav-employer.component.html',
  styleUrl: './side-nav-employer.component.scss'
})
export class SideNavEmployerComponent {
  @Input() isOpen: boolean = false;

}
