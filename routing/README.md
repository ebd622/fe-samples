# Section 11: Changing Pages with Routing

## Key points
* L124: Why do we need a Router? 
* L126: Setting up and loading Routers
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
'''
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"<a href=#>Home</a></li>
        <li role="presentation" class="active"<a href=#>Servers</a></li>
        <li role="presentation" class="active"<a href=#>Users</a></li>       
      </ul>
'''

