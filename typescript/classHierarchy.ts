class Person {
  //private id: number = 1;
  constructor(private firstName: string, lastName: string, age: number){}

  
//  public toString = () : string => {
//    return `Person (name: ${this.firstName})`;
//  }

}

class Employee extends Person {
  constructor(name: string, surname: string, age: number, jobTitle: string){
    super(name, surname, age)
  }
}

const person = new Person("Name1", 'Surname1', 25);
console.log(person)
