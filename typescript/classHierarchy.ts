class Person {
  constructor(name: string, surname: string, age: number){}
}

class Employee extends Person {
  constructor(name: string, surname: string, age: number, jobTitle: string){
    super(name, surname, age)
  }
}

console.log('Hello')
