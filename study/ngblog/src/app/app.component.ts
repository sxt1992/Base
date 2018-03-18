import { Component } from '@angular/core';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
