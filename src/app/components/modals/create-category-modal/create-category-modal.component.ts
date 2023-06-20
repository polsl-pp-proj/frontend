import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-create-category-modal',
    templateUrl: './create-category-modal.component.html',
    styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent implements OnInit {
    static ModalName = 'create-category-modal';
    get modalName() {
        return CreateCategoryModalComponent.ModalName;
    }

    @Output()
    createdCategory = new EventEmitter<void>();

    createCategoryForm = new FormGroup({
        categoryName: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });
    inTransit: boolean = false;

    constructor(
        private readonly categoryService: CategoryService,
        private readonly toastrService: ToastrService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {}

    createCategory() {
        this.inTransit = true;
        this.categoryService
            .createCategory(this.createCategoryForm.controls.categoryName.value)
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Kategoria została utworzona!',
                        'Kategoria utworzona'
                    );
                    this.modalService.updateModalState(this.modalName, 'close');
                    this.createdCategory.emit();
                },
                error: (err: HttpErrorResponse) => {
                    this.inTransit = false;
                    this.toastrService.error(
                        'Wystąpił błąd podczas tworzenia kategorii. Spróbuj ponownie później.',
                        'Błąd tworzenia kategorii'
                    );
                },
            });
    }

    modalClosed() {
        this.createCategoryForm.reset();
    }
}
