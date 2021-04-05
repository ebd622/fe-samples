import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  /*Use "Input"-decorator to expose the property "element" to a word and make it available to other components */
  /* Option 1:
  @Input() element: {type: string, name: string, content: string};
  */
  /*Option 2: use alias 'serElelemnt'. The alias should be used in other components*/
  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
