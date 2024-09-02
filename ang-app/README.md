# AngApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Init the project

Run `ng new ang-app` to create a project

#### Add Bootstrap CSS
Run `npm install --save bootstrap@3` to add Bootsrap V3 locally (not globally)

Modify `angular.json` to add bootstrap.min.css:
```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
