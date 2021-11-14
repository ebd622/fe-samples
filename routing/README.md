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
* L134: [Fetching route parameters reactively](#l134-fetching-route-parameters-reactively)
* L135: [An important note about route observable](#l135-an-important-note-about-route-observable)
* L136: [Passing query parameters and fragments](#l136-passing-query-parameters-and-fragments)
* L137: [Retrieving query parameters and fragments](#l137-retrieving-query-parameters-and-fragments)
* L139: [Setting up child (nested) routes](#l139-setting-up-child-nested-routes)
* L140: Using Query Parameters - Practice
* L142: [Configure the handling of query params](#l142-configure-the-handling-of-query-params)
* L143: [Redirecting and wildcard routes](#l143-redirecting-and-wildcard-routes)
* L145: [Outsourcing the route configuration](#l145-outsourcing-the-route-configuration)
* L146: [An introduction to Guards](#l146-an-introduction-to-guards)
* L147: [Protecting routes with canActivate](#l147-protecting-routes-with-canactivate)
* L148: [Protecting child (nested) roites with canActivateChild](#l148-protecting-child-nested-roites-with-canactivatechild)
* L149: [Using a fake auth serivice](#l149-using-a-fake-auth-serivice)
* L150: [Controlling navigation with canDeactivate](#l150-controlling-navigation-with-candeactivate)
* L151: [Passing static data to a route](https://github.com/ebd622/fe-samples/tree/master/routing#l151-passing-static-data-to-a-route)
* L152: Resolving dynamic data with the resolve guard
* L153: Understanding location stratagies

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
Here we use a relative path (like `'myservers'` but not `'/myservers'`) and also indicate to which path/route it should be relative (`relativeTo: this.route`)

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
This will construct a route like `/users/10/Anna`, but this route will not work. The URL will be updated in a brawser but we will see a previous data on a page. 

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
Then let's add the routing to the template

[servers.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/servers.component.html)
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
[home.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.ts)
```
onLoadServer(id: number){
    //do something
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }
```
### L137 Retrieving query parameters and fragments
To retrieve params and a fragment. For this we need to ingect our `ActivatedRoute`
There are two ways to rettrieve params:
* Using snapshots
* Using observable

Let's see both ways.
#### Using snapshots

[edit-server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/edit-server/edit-server.component.ts)
```
  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }
  ...
  
  ngOnInit() {
    console.log.(this.route.snapshot.queryParams);
    console.log.(this.route.snapshot.fragment);
    ...
  }
```
This is only run or updated at the time this comopnent is created. So, if your change query params from the page you are currently on, you might not want to use this approach because it won't be reactive. It won't display or allow you to react to any changes which happen after this component has been loaded.

#### Using observable
An alternative is to use observable:
```
  ngOnInit() {
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();    
    ...
  }
```
This approach allows you to react to any change of query params.
You don't need to unsubscribe here, Angular will handle it for you.

### L139 Setting up child (nested) routes
in the current `Routes` implementation we have a kind of duplications for `users` and `servers`:

```
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/:id/:name', component: UsersComponent},
  { path: 'servers', component: ServersComponent},
  { path: 'servers/:id', component: ServersComponent},  
  { path: 'servers/:id/edit', component: EditServersComponent},    
];
```

It would be nice to neste them and have some child routes. Let's add such child routes for `servers`:
```
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/:id/:name', component: UsersComponent},
  { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServersComponent},  
      { path: ':id/edit', component: EditServersComponent},    
      ]
   }
];
```

We also need to modify the template to add `<router-outlet>` there:

[servers.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/servers.component.html)

```
  <div class="col-xs-12 col-sm-4">
    <router-outlet></router-outlet>
  </div>
```

Let's do the same for `users`:
```
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent, children: [
      { path: 'users/:id/:name', component: UsersComponent}
    ]
  },
  { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServersComponent},  
      { path: ':id/edit', component: EditServersComponent},    
     ]
  }
];
```

In the template we also need to replace the element `<app-user>` with `<router-outlet>`:

[users.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/users/users.component.html)
```
  <div class="col-xs-12 col-sm-4">
    <!--<app-user></app-user>-->
    <router-outlet></router-outlet>
  </div>
```
This is how we can implement child routing nested routes with `children` property which holds all the nested routes.

### L140 Using Query Parameters - Practice
Let's add a button 'Edit Server' to server component:

[server.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/server/server.component.html)

```
<button class="btn btn-primary" (click)="onEdit()">Edit Server</button>
```

In the typescript we inject a `router` and add `onEdit()`:

[server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/server/server.component.ts)
```
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }
              
  ...            
  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
```
In `onEdit()` method we use a relative path `edit` in the `navigate` method. We also need to specify `relativeTo:` to let Angular know to which path it is relative.

Let's also modify the servers component to decide whether we want to allow the editing depending ob the server ID:

[servers.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/servers.component.html)
```
  ...
  [queryParams]="{allowEdit: server.id === 3 ? '1' : '0'}"
  ...
```
With this we will allow edit only when a server.id is 3.

Next we need to retrieve the query params:

[edit-server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/edit-server/edit-server.component.ts)
```
allowEdit = false;

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );

    ...
  }
```
Now we can use `allowEdit` in the tempate:

[edit-server.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/edit-server/edit-server.component.html)
```
<h4 *ngIf="!allowEdit">You are not allowed to edit!</h4>
<div *ngIf="allowEdit">
  // Logic to edit a edit a server
</div>
```

### L142 Configure the handling of query params
In the previous example our query params are gone whenever we naviagate away from our single server component to the edit server component, for example. So we want to preserve them.

There is a simple wat of doing so using the propery `queryParamsHandling`:


[server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/server/server.component.ts)
```
  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
```
The propery `queryParamsHandling` may oter values, like `merge` for instace (look into docs for details).

### L143 Redirecting and wildcard routes
We may need to redirect the user to a specific page whenever he tries to visit a page we don't have.

First we can create a new component `page-not-found`:

[page-not-found.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/page-not-found/page-not-found.component.html)
```
<h3>This page was not found!</h3>
```
Then we can add a new route:

[app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)
```
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'}},
  {path: '**', redirectTo: '/not-found'}
```
`**` means catch all routes you don't know. The order is very important here! The 'generic' route should be the last one in the array of routes because your routes get parsed from top to bottom.

With this the user will be always redirected to the `page-not-found` when he provides a wrong route (i.e. routes unkonown to Angular).

### L145 Outsourcing the route configuration
Normally when you have 2 or 3 routes it makes to move them out of the `app.module.ts`. We can add a new file which is for the applications as a whole, typically it is called [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts).

Then in the [app.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.module.ts) we need add `app-routing.module.ts`:
```
imports: [
    ...
    AppRoutingModule
  ],
```
With this we have the same setup as before but with a bit of a leaner app module and our routing logic is outsourced into a separate module.

### L146 An introduction to Guards

Guard is a functionality which is executed before a route is loaded or once you want to leave a route. We can use *CanActivate* guard to define whether a route can be activated or not.

### L147 Protecting routes with canActivate
Let's add [auth-guard.service.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/auth-guard.service.ts) which implements `CanActivate` interface. The interface has a method `canActivate` which has to be implemented.
```
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if(authenticated) {
            return true;
          } else {
            this.router.navigate(['/'])
          }
        }
      );
  }
```
The arguments `ActivatedRouteSnapshot` and `RouterStateSnapshot` will be proviede by Angular. Angular should execute the code before a route is loaded and it will proide the argumants. We only need to handle them.

`canActivate` can run async (and return `Observable` or `Promise`) or sync (and return `boolean`).

In the example we use [auth.service.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/auth.service.ts) to mocke an Authenctication service.

In [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts) we need to define which route should be protected by the guard. 

```
  {path: 'servers',
    canActivate: [AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]},
```
Two new services `AuthService` and `AuthGuard` need to be added also in [app.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.module.ts):
```
providers: [ServersService, AuthService, AuthGuard],
```
With this setup, when we run the app the tab `Servers` will be not accessible, because it is now protected by the guard. If the user clicks `Servers` he will be always redirected to to home after 800 ms. This time out is mocked in `AuthService` and defines how long it takes to resolve information whether we are authencticated or not.

### L148 Protecting child (nested) roites with canActivateChild

In the previous example we added a guard for the whole `servrs` path. We can also add a guard for a child using `CanActivateChild`:

[auth-guard.service.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/auth-guard.service.ts)
```
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  ...
}
```
The interface `CanActivateChild` requires to implement one method `canActivateChild`:
```
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route,state);
  }
```
What is the advanage of using this this?

Whit this we can use a different hook in our routes, insted of using only `canActivate` we can use a different one:

[app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)
```
  {path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]},

```
This is a finegrained control we can implement to protect a whole route and its child routes or just child routes. Depending on which behaviour we need in our apps. 

### L149 Using a fake auth serivice
Let's allow user to login. We will add two new buttons:

[home.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.html)
```
<button class="btn btn-default" (click)="onLogin()">Login</button>
<button class="btn btn-default" (click)="onLogout()">Logout</button>
```
[home.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/home/home.component.ts)
```
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  
  ...
  
  onLogin(){
    this.authService.login();
  }
  onLogout(){
    this.authService.logout();
  }
}
```
With this simple improvement we can not see any visual indication but we can login and logout.

### L150 Controlling navigation with canDeactivate
Let' add some logic to prevent user from accidentally moving away from a page (for inctance, before clicking a button `Save` on a page).

Add `changesSaved` variable:

[edit-server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/edit-server/edit-server.component.ts)
```
export class EditServerComponent implements OnInit {
  ...
  changeSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }


  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
```
The method `onUpdateServer()` needs to be called somehow. For this let's add a new service `CanDeactivateGuard`:

[can-deactivate-guard.service.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/edit-server/can-deactivate-guard.service.ts)
```
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
```
The `canDeactivate` method will be called by the Angular router once we try to leave a Route.

The new gard `CanDeactivateGuard` shold be also added to app [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)
```
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]},
```
Now Angular will run this guard whenever we try to leave this path. To make this work we alse need to add the guard to [app.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.module.ts`):
```
providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
```

Now we need to add a new interface to our [edit-server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/edit-server/edit-server.component.ts)
```
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ...

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changeSaved) {
      return confirm('Do yuo really want to discard your changes?');
    } else {
      return true;
      }
    }
}
```
With this in place, if the user didn't save changes and wont to navigate to another page, the user will be always get the notification message.

### L151 Passing static data to a route
Some routes depend of data thay receive, either staticlly each time they are loaded or they will resolve dinamically.
First let's see how we can pass static data.

For example, we want to create a reusable error page where we would like to pass an error message.

[error-page.component.html](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/error-page/error-page.component.html)
```
<h4>{{errorMessage}}</h4>
```

The `erroMessage` needs to be also added in the component [error-page.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/error-page/error-page.component.ts).

But we still need to pass `errorMessage` to the component from a route. For this let's make a change in [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)
```
{path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'}},
```
With this we load the `ErrorPageComponent` when a page not found. Here we may have another route with another error message. But we will be using the same `ErrorPageComponent`.

The issue is that we need to fetch `data->message` in [error-page.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/error-page/error-page.component.ts). There are two options how to do it:

```
  ngOnInit(): void {
    // Option 1:
    this.errorMessage = this.route.snapshot.data['message'];
  }
```

```
  ngOnInit(): void {
    // Option 2: use subscribe
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }
```
Both options will work fine, but in the second one we use Observable. Also in bothe cases we use `data['message']` which we define in [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts)

### L152: Resolving dynamic data with the resolve guard
Let's assume we have some dynamic data we have to fetch before a rount can be displayed or can be rendered.

For this we need a resolver (service) which will allow us to run some code before a route is rendered. A resolver will not decide whether a component should be loaded, it will always render a component in the end but it will do some pre-load. In other words, it will fetch data the component needs later on. 

Let's create [server-resolver.service.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/server/server-resolver.service.ts) which implements `Resolve`:
```
interface Server {
  id: number;
  name: string;
  status: string;
}
@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
```
(The interface `Server` can be outsourced into a dedicated file. `+route.params['id']` is custing to Integer)

Then we need to add the resolver to [app.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app.module.ts):
```
...
providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
...
```
Next add it to [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts):
```
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
       ...
    ]},
```

Next we need to modify [server.component.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/servers/server/server.component.ts):
```
  ngOnInit() {
    // Option 2: use resolver
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )
  }
```
The name 'server' in `data['server']` has to mutch the name in [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts) `resolve: {server: ServerResolver}`

With this in place it will work as before but now with using a resolver. This is important when using asynch data.

### L153: Understanding location stratagies
When necessary we can enable using a hash sign in routes (for instance, to support some old brawsers). It can be enabled in [app-routing.module.ts](https://github.com/ebd622/fe-samples/blob/master/routing/src/app/app-routing.module.ts) where we register your routes
```
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // Option2: use hash (see L153)
    // RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [RouterModule]
})
```


