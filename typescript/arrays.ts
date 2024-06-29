class Person {
  //private id: number = 1;
  constructor(private id: number, public firstName: string, public lastName: string, public age: number){}

  getId():number {
    return this.id
  }
}
const user = {
  name: "Daniel",
  age: 26,
};


// --- Arrays: specified types
let fruits1: string[] = ['Apple', 'Orange', 'Banana'];
let fruits2: Array<string> = ['Apple', 'Orange', 'Banana'];
console.log('fruits1: ' + fruits1)
console.log('fruits2: ' + fruits2)


// --- Arrays: any types
const person = new Person(1, "Name_person1", 'Surname_person1', 25);
let list : Array<any> = ['Apple', 'Orange', 'Banana', person, user ];

console.log('Index: ' + list.indexOf('Banana'));
