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
export default class AppComponent {
    title = 'app222';
    hero: Hero = {
        id: 2,
        name: '222'
    };
}
