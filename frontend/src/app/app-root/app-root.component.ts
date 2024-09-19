import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from "../side-nav/side-nav.component";

@Component({
  selector: 'app-app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent],
  templateUrl: './app-root.component.html',
  styleUrl: './app-root.component.scss',
})
export class AppRootComponent {}
