# Section 9: Using Services & Dependency Injection

This is a demo of how to design and use services

## Key points

* 108: Injecting a logging service into Components
* 109: Creating a Data Service
* 110: Understanding the hierarchical injector
* 111: How many instances of services should be?
* 112: Injecting services into services
* 113: Using services for cross-component communication

### 108: Injecting a logging service into Components
Angular has a tool called Angular dependency injector. We need to inform Angular that we need an instance of a service which needs to be injected.
```
  constructor(private logginService: LoggingService){}
```
In this way we inform Angular that we need an instance of `logginService`. Angular is responsible for creating a new instance of a component. 

With Angular knows what we need but doesn't know how to give it. Here we need one more additional step to provide a service. Provide means tell Angular how to create a service.

[new-account.component.ts](https://github.com/ebd622/fe-samples/blob/master/services/src/app/new-account/new-account.component.ts):
```
@Component({
  ...
  providers: [LoggingService] /*Inform Angular how to crete a service*/
})

  ...
constructor(private logginService: LoggingService){}
```
In this way Angular will create an instance. This way is better than manual creating instance because we stay in Angular ecosystem and Ang knows how the application works.

### 109: Creating a Data Service

