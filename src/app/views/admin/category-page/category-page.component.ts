import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
    categoryList: { name: string; amount: number }[] = [
        { name: 'Elektronika', amount: 10 },
        { name: 'Paduch', amount: 666 },
        { name: 'Oleg', amount: 7 },
    ];

    icons: { [key: string]: SafeHtml } = {};

    constructor(private readonly iconVaultService: IconVaultService) {}

    ngOnInit() {
        this.iconVaultService
            .getIcon('ion_add-circle-outline')
            .subscribe(
                (icon) => (this.icons['ion_add-circle-outline'] = icon!)
            );
        this.iconVaultService
            .getIcon('eye')
            .subscribe((icon) => (this.icons['eye'] = icon!));
        this.iconVaultService
            .getIcon('trash-2')
            .subscribe((icon) => (this.icons['trash-2'] = icon!));
    }
}
