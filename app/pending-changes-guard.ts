import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';
import { Observable ,  Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmLeaveComponent } from './shared/confirm-leave.component';
import { Injectable } from '@angular/core';

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(private modalService: BsModalService) {}

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if(component.canDeactivate()) {
      return true;
    } else {                
        const subject = new Subject<boolean>();
        const modal = this.modalService.show(ConfirmLeaveComponent, {'class': 'modal-dialog-primary'});
        modal.content.subject = subject;  
        return subject.asObservable();                
       //confirm('You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    }
  }
}