# Components & Databinding: deep dive

This is an example of how components can communicate to each other using custom property binding and event binding.

## Key points

* L64: Splitting Apps into Components
* L65: Splitting Apps into components
* L66: [Property & Event binding Overview](#l66-property--event-binding-overview)
* L67: Assigning an alias to custom properties
* L68: Binding to custom properties
* L69: Binding to custom events
* L70: Assigning an alias to custom events
* L71: Custom property and event binding summary
* L74: Using local references in templates
* L75 -76: @ViewChild
* L76: Projecting content into components with ng-content
* L77: Understanding the component lifecycle
* L78: Seeing livecycle hooks in action


#### L66: Property & Event binding Overview
- By default all properties of components are only accessible inside the components
- If you want to allow a parent component to bind a property of a child component you need to add a decorator `@Input` to a property:

```
@Input() element: ...
```
With this decorator a property is exposed to world.

#### L67: Assigning an alias to custom properties
- If you want to allow a parent component to bind a property of a child component you need to add a decorator `@Input` to a property:

```
@Input('myElement') element: ...
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

