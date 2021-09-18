# Section 11: Changing Pages with Routing

## Key points
* L124: Why do we need a Router? 
* L126: [Setting up and loading Routers](#l126-setting-up-and-loading-routers)
* L127: [Navigating with router links](#l127-navigating-with-router-links)
* L128: [Understanging navigation path](#l128-understanging-navigation-path)
* L129: [Styling Active Router links](#l129-styling-active-router-links)
* L130: Navigating Programmatically
* L131: Using relative path in Programmatic Navigation
* L132: Passing patemeters to routes
* L133: Fetching route parematers


### L126: Setting up and loading Routers
In the example app.componemt we are using three components:
- [home](https://github.com/ebd622/fe-samples/tree/master/routing/src/app/home)
- [users](https://github.com/ebd622/fe-samples/tree/master/routing/src/app/users)
- [servers](https://github.com/ebd622/fe-samples/tree/master/routing/src/app/servers)

For not we can see all three components on a screen at the same time, but it would be nice to see just one component at a time clicking a corresponding tab.

We would like to dynamically load the components by clicking the links:
[app.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.component.html)
```
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"<a href=#>Home</a></li>
        <li role="presentation" class="active"<a href=#>Servers</a></li>
        <li role="presentation" class="active"<a href=#>Users</a></li>       
      </ul>
```
We configure routes in [app.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.module.ts):
```
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'servers', component: ServersComponent},
];
```
Next we need to register a router module in [app.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.module.ts):
```
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
```
Next in [app.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.component.html) we need to inform a component where to load the route:

```
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
```
`router-outlet` is a special directive shippint with Angular. With this directive we mark the place in our document where we want the Anular router to load the component in the currently selected route.

### L127 Navigating with router links
Let's add navigation via menu bar:

[app.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.component.html)
```
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"<a href=/>Home</a></li>
        <li role="presentation" class="active"<a href=/servers>Servers</a></li>
        <li role="presentation" class="active"<a href=/users>Users</a></li>       
      </ul>
```
But this is not a best way to do, because it restarts our app on every navigation. It means our whole applications state will be lost.

Angular provides a better way to do it using `routeLink`:
```
      <ul class="nav nav-tabs">
        <li role="presentation"
            routerLinkActive="active"
            <a routerLink="/">Home</a>
        </li>
        <li role="presentation"
            <a routerLink="/servers">Servers</a>
        </li>
        <li role="presentation"
            <a [routerLink]="['/users']">Users</a>
        </li>
      </ul>
```
With this approach Angular reloads a component but it doesn't reload a page.

A record like this
```
<a [routerLink]="['/users', 'something']">Users</a>
```
it an another way of using 'routerLink' - property binding to some not-string data. This allows to construct more complex paths very easily.

### L128 Understanging navigation path
(Watch the video!)

### L129 Styling Active Router links
Let's add the directive `routerLinkActive` to make our menu on UI acvive when they are selected:

```
      <ul class="nav nav-tabs">
        <li role="presentation"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: true}">
            <a routerLink="/">Home</a>
        </li>
        <li role="presentation"
            routerLinkActive="active">
            <a routerLink="/servers">Servers</a>
        </li>
        <li role="presentation"
            routerLinkActive="active">
            <a [routerLink]="['/users']">Users</a>
        </li>
      </ul>
```
A special propety `[routerLinkActiveOptions]="{exact: true}"` says that the menu 'Home' sould me markt as 'acvive' only when a whole path is exacly the same as specified (it this paeticular case a whole path is `/`). Without this the menu 'Home' will be always set as active.

### L130 Navigating Programmatically
We may need to navigate automatically when some opetations are finished or a the user clickes some button and then we wany to trigger the naviation from a typescript code.

Let's add a button in the template, it will trigger some complex logic and then will redirect to another page:

[home.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.html)
```
...
<button class="btn btn-primary" (click)="onLoadServer(1)">Load Servers</button>
...
```
[home.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.ts)
```
  ...
  onLoadServer(id: number){
    //Some complex logic here
    
    //Then we want to navigate
    this.router.navigate(['/servers']);
  }
  ...
```
Not it does the same as we clicked a routerLink

### L131 Using relative path in Programmatic Navigation
We can also use a relevant path

[servers.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/servers.component.html)
```
<button class="btn btn-primary" (click)="onReload()">Reload page</button>
```

[servers.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/servers.component.ts)

```
  ...
  onReload(){
    this.router.navigate(['myservers'], {relativeTo: this.route});
  }
  ...
```
Here we use a relative patch (like `'myservers'` but not `'/myservers'`) and also indicate to which path/route it should be relative (`relativeTo: this.route`)

This will redirect us to `/servers/myservers` (this will break our app because this path doesn't exist, but this is just an example).

### L132 Passing patemeters to routes

Let's add a paremeter to out router
[app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)

```
...
{path: 'user/:id', component: UsersComponent },
...
```
With this we can path a user id in URL like `user/1`, `user/2` and so on. This path will be interpreted as dynamic, otherwise we would get an error that `user/1` is an unknown route.

