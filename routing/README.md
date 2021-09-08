# Section 11: Changing Pages with Routing

## Key points
* L124: Why do we need a Router? 
* L126: [Setting up and loading Routers](#l126-setting-up-and-loading-routers)
* L127: Navigating with router links
* L128: Understanging navigation path
* L129: Styling Active Router links
* L130: Navigating Programmatically
* L131: Using relative path in Programmatic Navigation
* L132: Passing patemeters to routes


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
