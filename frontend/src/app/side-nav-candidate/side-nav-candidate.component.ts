import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav-candidate',
  standalone: true,
  imports: [],
  templateUrl: './side-nav-candidate.component.html',
  styleUrl: './side-nav-candidate.component.scss',
})
export class SideNavCandidateComponent {
  @Input() isOpen: boolean = false;

  constructor() {}
}
