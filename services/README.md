# Section 9: Using Services & Dependency Injection

This is a demo of how to design and use services

## Key points

* 108: [Injecting a logging service into Components](#108-injecting-a-logging-service-into-components)
* 109: [Creating a Data Service](https://github.com/ebd622/fe-samples/tree/master/services#109-creating-a-data-service)
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

Let's consider a typica use case for using services - store and manage data.

[account.service.ts](https://github.com/ebd622/fe-samples/blob/master/services/src/app/account.service.ts)
```
export class AccountService {
  ...
  addAccount(name: string, status: string){
    this.accounts.push({name: name, status: status});
  }

  updateAccount(id: number, status: string){
    this.accounts[id].status = status;
  }
}
```
Then let's inject `AccountService` into app.component.ts and add an array `accounts`:

[app.component.ts](https://github.com/ebd622/fe-samples/blob/master/services/src/app/app.component.ts)
```
export class AppComponent implements OnInit{
  accounts: {name: string, status: string}[] = [];

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }
}
```
Also let's add `AccountService` to new-account.component.ts:

[new-account.component.ts](https://github.com/ebd622/fe-samples/blob/master/services/src/app/new-account/new-account.component.ts)
```
export class NewAccountComponent {
  constructor(private accountService: AccountService){
      ...
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountStatus, accountName);
  }
}
```
### 110. Understanding the hierarchical injector
Angulat dependeny injector is a hierarchical injector. When we provide a service in a component, Angular knows how to created an instance of a sevice for the component and *all its child components*. And the component and all its child components will receive the same instance of the servce.
