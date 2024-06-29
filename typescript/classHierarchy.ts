class Person {
  //private id: number = 1;
  constructor(private id: number, public firstName: string, public lastName: string, public age: number){}
}

class Employee extends Person {
  constructor(id: number, name: string, surname: string, age: number, jobTitle: string){
    super(id, name, surname, age)
  }
}

//--- Create Person
const person = new Person(1, "Name_person1", 'Surname_person1', 25);
console.log(person)

//--- Create Employee
const employee = new Employee(1, "Name1_empl1", 'Surnameempl1', 35, 'Developer' );
console.log(employee)
