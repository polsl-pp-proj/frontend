import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreateCategoryModalComponent } from 'src/app/components/modals/create-category-modal/create-category-modal.component';
import { CategoryDto } from 'src/app/dtos/category.dto';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
    categories: CategoryDto[] = [];

    icons: { [key: string]: SafeHtml } = {};

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly categoryService: CategoryService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

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
        this.fetchCategories();
    }

    createCategory() {
        this.modalService.updateModalState(
            CreateCategoryModalComponent.ModalName,
            'open'
        );
    }

    // changeCategory(categoryId: number) {}

    removeCategory(category: CategoryDto) {
        this.categoryService.deleteCategory(category.id).subscribe({
            next: () => {
                this.toastrService.success(
                    `Kategoria '${category.name}' została usunięta.`,
                    'Kategoria usunięta'
                );
                this.fetchCategories();
            },
            error: () => {
                this.toastrService.error(
                    'Podczas próby usunięcia kategorii wystąpił błąd.',
                    'Błąd usuwania kategorii'
                );
                this.fetchCategories();
            },
        });
    }

    fetchCategories() {
        this.categoryService
            .getCategories(true)
            .subscribe((categories) => (this.categories = categories));
    }
}
