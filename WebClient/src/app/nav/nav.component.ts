import { Component } from '@angular/core';

interface PageLink {
  slug: string;
  component: Component | undefined;
  displayName: string;
}

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  staticPages: PageLink[] = [
    {
        slug: 'taco',
        component: undefined,
        displayName: 'Taco News'
    },
    {
        slug: 'toast',
        component: undefined,
        displayName: 'Toast News'
    },
    {
        slug: 'hello',
        component: undefined,
        displayName: 'Hello'
    },
    {
        slug: 'hello-world',
        component: undefined,
        displayName: 'Hello World'
    }
  ];
}
