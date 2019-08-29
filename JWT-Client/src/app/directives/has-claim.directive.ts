import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { SecurityService } from '../services/security.service';

@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {

@Input() set hasClaim(claimType: any) {
  if (this.securityObject.hasClaim(claimType)) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainer.clear();
  }
}

constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityObject: SecurityService
  ) { }

}
