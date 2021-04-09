import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  }
)
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string){
    /*Event will be emitted evety time when a button is clicked*/
    this.featureSelected.emit(feature);

  }

}
