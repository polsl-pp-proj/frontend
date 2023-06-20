# Base Modal

Base Modal is intended for use inside the component of a specific modal.

## Usage

```html
<app-base-modal
    modalTitle="Sample modal title"
    modalName="sample-modal"
    transitionDuration="200ms"
    [closable]="true"
    (closed)="doSomething()"
    (submit)="doSomethingElse()"
>
    <p>This is a sample modal content.</p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit,
        massa sed tristique imperdiet, mi dolor viverra lectus, id finibus massa
        metus et lorem. Maecenas pharetra efficitur neque, at consectetur odio
        varius eleifend.
    </p>
</app-base-modal>
```
