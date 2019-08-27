import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { SecurityService } from './security.service';

@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  @Input() set hasClaim(claimType: any) {
    if (this.securityService.hasClaim(claimType)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }


  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService
  ) { }

}
