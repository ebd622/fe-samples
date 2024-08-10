class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

let user = new Student("Jane", "M.", "User");
//console.log(user)

enum Role {
  Admin = 'Admin',
  Empl = 'Employee',
  Custm = 'Customer'
}

interface Address {
  street: string;
  houseNumber: string
  postCode: string;
  city: string;
}
let a1: Address
a1 = {
  street: 'Street_1',
  houseNumber: '1',
  postCode: '2624ll',
  city: 'Delft'
}
let a2: Address
a2 = {
  street: 'Street_2',
  houseNumber: '2',
  postCode: '2624hh',
  city: 'Delft'
}

interface Person {
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: Address[]
}

interface User extends Person {
  role: Role;
  userName: string;
  password: string;
  email: string;
}


let u: User
u = {
  firstName: 'Max',
  lastName: 'Last',
  birthDate: new Date('2024-02-27'),
  role: Role.Empl,
  address: [a1,a2],
  userName: 'user1',
  password: '12345',
  email: 'dd@dd.com'
}

console.log(u)


