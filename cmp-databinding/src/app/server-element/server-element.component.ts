import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges {
  /*Use "Input"-decorator to expose the property "element" to a word and make it available to other components */
  /* Option 1:
  @Input() element: {type: string, name: string, content: string};
  */
  /*Option 2: use alias 'serElelemnt'. The alias should be used in other components*/
  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() {
    console.log('constructor called!');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
  }

}
