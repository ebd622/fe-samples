# Components & Databinding: deep dive

This is an example of how components can communicate to each other using custom property binding and event binding.

## Key points

* L64: Splitting Apps into Components
* L65: Splitting Apps into components
* L66: [Property & Event binding Overview](#l66-property--event-binding-overview)
* L67: [Assigning an alias to custom properties](#l67-Assigning-an-alias-to-custom-properties)
* L68: [Binding to custom properties](#l68-Binding-to-custom-properties)
* L69: Binding to custom events
* L70: Assigning an alias to custom events
* L71: Custom property and event binding summary
* L74: [Using local references in templates](#L74-Using-local-references-in-templates)
* L75 -76: [@ViewChild](#l75-getting-access-to-the-template--dom-with-viewchild)
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
- It is also possible to use alias instead of a property name:

```
@Input('myElement') element: ...
```
- In this case `myElemnt` should be used in other components because `elemnt` will not longer work

#### L68: Binding to custom properties
- A child component may inform a parent component on some changes happened in a child;
- Component communictation is very important (a key building block)!

Example:

- In a **child** component [cookpit.component.ts](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/cookpit/cookpit.component.ts):

```
@Component({
  selector: 'app-cookpit',
  ...
})
export class CookpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerName='';
  newServerContent='';
  ...
  
  onAddServer() {
    this.serverCreated.emit({
      serverName: this.serverName,
      serverContent: this.serverContent
    });
  }
}
```

The **child** template [cookpit.component.html](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/cookpit/cookpit.component.html)
```
  ...
  <button
    class="btn btn-primary"
    (click)="onAddServer()">Add Server</button>
  <button
  ...
```

- In a **parent** component [app.component.html](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/app.component.html)

```
  <app-cookpit
    (serverCreated)="onServerAdded($event)"
  </app-cookpit>
```
Here we bind a custom event `@Output() serverCreated ...` of the **child** to a method `onServerAdded($event)` in the **paren**.

- Then in the parent component [app.component.ts](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/app.component.ts) we get a custom event in `onServerAdded(...)`: 

```
export class AppComponent {
  serverElements = [{type: 'server', name: 'Test server', content: 'Just a test'}];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }
}
```
#### L74: Using local references in templates
- A local reference can be put to any HTML-element in a template.

Example:
- The **child** template [cookpit.component.html](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/cookpit/cookpit.component.html)
```
    <input
      type="text"
      class="form-control"
      #serverNameInput>
      
    ...  
    <button
      class="btn btn-primary"
      (click)="onAddServer(serverNameInput)">Add Server</button>
    <button
```
**#serverNameInput** is a local reference

- A local reference can be used everywhere in a template but not in typescript
- A local reference can be pass to typescipt ([cookpit.component.ts](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/cookpit/cookpit.component.ts)):

```
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      ...
    });
  }
```
#### L75: Getting access to the Template & DOM with @ViewChild
- There is another way to get an access to local references (and any element) using @ViewChild;

Example:
- [cookpit.component.ts](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/cookpit/cookpit.component.ts):

```
export class CookpitComponent implements OnInit {
  ...
  @ViewChild('serverContentInput', {static: true}) serverContentInp: ElementRef;
  ...
  
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      ...
      serverContent: this.serverContentInp.nativeElement.value
    });  
  }
```
- [cookpit.component.html](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/cookpit/cookpit.component.html)
```
  <input
      type="text"
      class="form-control"
      #serverContentInput>
```
- Angular allows to change a value of `ElementRef` in ts, for example, like this:
```
export class CookpitComponent implements OnInit {
  ...
  @ViewChild('serverContentInput', {static: true}) serverContentInp: ElementRef;
  ...
  
  onAddServer(nameInput: HTMLInputElement) {
    this.serverContentInp.nativeElement.value = 'Something';
    ...
  }
```
But it is strongly recommended not doing this - **you should NOT access DOM like this**! <br/>
Angular offers a better way of accessing the DOM (see the Directives section) .

Generally you should use other tools like string-interpolation and property binding if you want to output somthing in the DOM.


#### L76: Projecting content into components with ng-content
Another way to pass data around is to use `ng-content`. With this we can pass (complex) HTML code into a component from outside.

[server-element.component.html](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/server-element/server-element.component.html)
```
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
```

[app.component.html](https://github.com/ebd622/fe-samples/blob/master/cmp-databinding/src/app/app.component.html)
```
<app-server-element>
   ...
   <p>
     <strong *ngIf="oneServeElement.type === 'server'" style="color: red">{{ oneServeElement.content }}</strong>
     <em *ngIf="oneServeElement.type === 'blueprint'">{{ oneServeElement.content }}</em>
   </p>
</app-server-element>
```

