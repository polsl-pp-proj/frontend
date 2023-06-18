import { Component } from '@angular/core';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent {
    categoryList: { name: string; amount: number }[] = [
        { name: 'Elektronika', amount: 10 },
        { name: 'Paduch', amount: 666 },
        { name: 'Oleg', amount: 7 },
    ];
}
