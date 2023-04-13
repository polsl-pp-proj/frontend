# Page

Page is intended for use inside the component of a specific page.

## Usage

All elements tagged with `pageHeader` attribute will be part of page header. There should almost always be one `h1` tag with this attribute.

Every element that is not tagged with `pageHeader` will be considered as main content of the page.

### Simple header

```html
<app-page>
    <h1 pageHeader>My organizations</h1>
    <p>
        Elit adipisicing dolor sint eiusmod. Et velit ex excepteur sunt veniam
        est tempor id voluptate ea magna reprehenderit. Adipisicing cillum
        voluptate sint quis proident duis reprehenderit culpa ut est et
        adipisicing ad.
    </p>
    <p>
        Velit adipisicing est ad consectetur deserunt veniam laboris incididunt
        nostrud exercitation. Commodo deserunt id consequat nisi id veniam
        nulla. Excepteur cupidatat consectetur esse laboris dolore sunt fugiat
        nisi. Lorem ad minim cupidatat elit velit dolore. Qui esse cupidatat
        sunt incididunt. Non est mollit eiusmod laborum elit et duis.
    </p>
    <p>
        Culpa minim mollit esse irure ullamco aliqua ad eu quis et. Fugiat
        aliqua anim laborum ut eiusmod sunt mollit duis anim. Nostrud deserunt
        non eu pariatur consectetur do eiusmod anim. Consequat laboris sit velit
        dolor. Sunt cillum irure eiusmod commodo non. Est consectetur eu quis
        irure id esse id aliqua velit dolor.
    </p>
    <p>
        Enim sunt incididunt id voluptate minim irure deserunt nostrud deserunt.
        Elit adipisicing ex excepteur magna ut ad. Dolore cillum adipisicing
        cillum dolor officia culpa fugiat Lorem ad excepteur deserunt commodo ad
        Lorem.
    </p>
    <p>
        Quis officia ea occaecat elit eiusmod. Ut aliqua enim veniam amet enim
        officia proident cupidatat mollit cupidatat ullamco aute tempor. Do
        consectetur laborum eiusmod ullamco incididunt nisi consectetur tempor
        labore nulla reprehenderit aliquip reprehenderit sit. Nostrud qui tempor
        veniam aute consequat quis et. Exercitation aliquip commodo sit
        reprehenderit culpa sit deserunt. Culpa occaecat commodo non dolor sit
        esse est nostrud.
    </p>
</app-page>
```

### Complex header

```html
<app-page>
    <h1 pageHeader>
        <div class="keep-together">
            <span>Find</span>
            <app-input name="search-query" [displayErrors]="false"></app-input>
        </div>
        <div class="keep-together">
            <span>in</span>
            <app-select
                name="search-category"
                resetText="every category"
                [options]="[
                    { text: 'electronics', value: 1 },
                    { text: 'computer science', value: 2 },
                    { text: 'physics', value: 3 }
                ]"
                [displayErrors]="false"
            ></app-select>
        </div>
        <div class="keep-together">
            <span>by</span>
            <app-select
                name="search-sort"
                [options]="[
                    { text: 'collected funds', value: SortBy.Funds },
                    { text: 'number of likes', value: SortBy.Likes }
                ]"
                [displayErrors]="false"
            ></app-select>
        </div>
    </h1>
    <p>
        Elit adipisicing dolor sint eiusmod. Et velit ex excepteur sunt veniam
        est tempor id voluptate ea magna reprehenderit. Adipisicing cillum
        voluptate sint quis proident duis reprehenderit culpa ut est et
        adipisicing ad.
    </p>
    <p>
        Velit adipisicing est ad consectetur deserunt veniam laboris incididunt
        nostrud exercitation. Commodo deserunt id consequat nisi id veniam
        nulla. Excepteur cupidatat consectetur esse laboris dolore sunt fugiat
        nisi. Lorem ad minim cupidatat elit velit dolore. Qui esse cupidatat
        sunt incididunt. Non est mollit eiusmod laborum elit et duis.
    </p>
    <p>
        Culpa minim mollit esse irure ullamco aliqua ad eu quis et. Fugiat
        aliqua anim laborum ut eiusmod sunt mollit duis anim. Nostrud deserunt
        non eu pariatur consectetur do eiusmod anim. Consequat laboris sit velit
        dolor. Sunt cillum irure eiusmod commodo non. Est consectetur eu quis
        irure id esse id aliqua velit dolor.
    </p>
    <p>
        Enim sunt incididunt id voluptate minim irure deserunt nostrud deserunt.
        Elit adipisicing ex excepteur magna ut ad. Dolore cillum adipisicing
        cillum dolor officia culpa fugiat Lorem ad excepteur deserunt commodo ad
        Lorem.
    </p>
    <p>
        Quis officia ea occaecat elit eiusmod. Ut aliqua enim veniam amet enim
        officia proident cupidatat mollit cupidatat ullamco aute tempor. Do
        consectetur laborum eiusmod ullamco incididunt nisi consectetur tempor
        labore nulla reprehenderit aliquip reprehenderit sit. Nostrud qui tempor
        veniam aute consequat quis et. Exercitation aliquip commodo sit
        reprehenderit culpa sit deserunt. Culpa occaecat commodo non dolor sit
        esse est nostrud.
    </p>
</app-page>
```
