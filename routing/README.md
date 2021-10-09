# Section 11: Changing Pages with Routing

## Key points
* L124: Why do we need a Router? 
* L126: [Setting up and loading Routers](#l126-setting-up-and-loading-routers)
* L127: [Navigating with router links](#l127-navigating-with-router-links)
* L128: [Understanging navigation path](#l128-understanging-navigation-path)
* L129: [Styling Active Router links](#l129-styling-active-router-links)
* L130: [Navigating Programmatically](#l130-navigating-programmatically)
* L131: [Using relative path in Programmatic Navigation](#l131-using-relative-path-in-programmatic-navigation)
* L132: [Passing patemeters to routes](#l132-passing-patemeters-to-routes)
* L133: [Fetching route parematers](#l133-fetching-route-parematers)
* L134: [Fetching route parameters reactively](https://github.com/ebd622/fe-samples/tree/master/routing#l134-fetching-route-parameters-reactively)
* L135: [An important note about route observable](#l135-an-important-note-about-route-observable)
* L136: Passing query parameters and fragments
* L137: Retrieving query parameters and fragments
* L139: Setting up child (nested) routes
* L140: Using Query Parameters - Practice


### L126: Setting up and loading Routers
In the example app.componemt we are using three components:
- [home](https://github.com/ebd622/fe-samples/tree/master/routing/src/app/home)
- [users](https://github.com/ebd622/fe-samples/tree/master/routing/src/app/users)
- [servers](https://github.com/ebd622/fe-samples/tree/master/routing/src/app/servers)

For now we can see all three components on a screen at the same time, but it would be nice to see just one component at a time clicking a corresponding tab.

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
`router-outlet` is a special directive shipping with Angular. With this directive we mark the place in our document where we want the Anular router to load the component in the currently selected route.

### L127 Navigating with router links
Let's add a navigation via the menu bar:

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

Let's add a paremeter to out router:

[app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)

```
...
{path: 'user/:id', component: UsersComponent },
...
```
With this we can pass a user id in URL like `user/1`, `user/2` and so on. This path will be interpreted as dynamic, otherwise we would get an error that `user/1` is an unknown route.

### L133 Fetching route parematers
Let's fetch a parameter in our app

First we need to inject a router in a component:

[user.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/users/user/user.component.ts)

```
constructor(private route: ActivatedRoute) { }
```
By injecting this we have an access to a currently loaded route.

Then we can initiate `user` with values from the route:
```
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
  }  

```
Here we fetch two parameters `id` and `name`. We assume that both parameters are specified in a router:

```
{path: 'user/:id/:name', component: UsersComponent },
```

Now let's output the data in our template using string interpolation:

[user.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/users/user/user.component.html)
```
<p>User with ID {{user.id}} loaded.</p>
<p>User name is {{user.name}}</p>
```
With this we will be able to see parameters passed in a router.

### L134 Fetching route parameters reactively
Let's add a routing-link to the template:

[user.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/users/user/user.component.html)

```
<a [routerLink]="['/users', 10, 'Anna']">Anna (10)</a>
```
Thiis will construct a route like `/users/10/Anna`, but this route will not work. The URL will be updated in a brawser but we will see the a previous data on a page. 

This is not a bug. Angular creates routes when creating a component. In this case an angular-component has already beed created and Angular will not reinstanciate the component (watch vide for more details).

This can be solved with using `observable`:

[user.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/users/user/user.component.ts)

```
    ...
    this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
    ...
```
Here we subscribe to an event which may happen in a future. With this Angular will update a `user` object whenever a `params` is changed (Super!).

If you know that the component your are on may never be relaoaded *from whithin that component*, than you may not need `observable`, using `snapshot` will be enough. Otherwise, you need to use an aproach with `observable`.

### L135 An important note about route observable
When you subsribe to a `observable` your subscription will leave in a memory, eveny when a component is destroyed. This is because a subscriprion is not closely tied to your component.

You may need to unsubscribe when a component is destroyed, this can be done in `ngOnDestroy()`:

[user.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/users/user/user.component.ts)

```
export class UserComponent implements OnInit, OnDestroy{
  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // Create obsevable: user will be changes when parameters (id, name) are changed
    this.paramSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }
  ngOnDestroy(): void {
    // unsubscribe from the observabale when a component is destroyed
    this.paramSubscription.unsubscribe();
  }
}
```
Normally Angular will do it behind the scene, but it doesn't hurt to do it manualy. It is important to understand what happens here.

### L136 Passing query parameters and fragments
URLs may have query parameters and fragments (followed by `#` (hash sign)). Fragments are used to jump to a specific place in the app. Let's see how we can add them. 

First add one more routing to app.module.ts (via [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)):
```
{path: 'servers/:id/edit', component: EditServerComponent}
```
Then let's add the routing to the template [servers.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/servers.component.html):
```
      <a
        [routerLink]="['/servers',server.id]"
        [queryParams]="{allowEdit: '1'}"
        fragment="loading"
        ...
      </a>
```
This will create a URL like this: `http://.../servers/5/edit?allowEdit=1#loading`

Now let's do the same proramatically:

[home.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.html)
```
<button class="btn btn-primary" (click)="onLoadServer(1)">Load Server 1</button>
```
[home.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.ts):
```
onLoadServer(id: number){
    //do something
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }
```
