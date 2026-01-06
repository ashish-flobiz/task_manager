import { NgModule } from "@angular/core";
import { HighlightDirective } from "./directives/highlight.directive";
import { TruncatePipe } from "./pipes/truncate.pipe";


@NgModule({
  declarations: [HighlightDirective, TruncatePipe],
  exports: [HighlightDirective, TruncatePipe]
})
export class SharedModule {}