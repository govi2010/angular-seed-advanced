// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

// app
import { CoreModule } from '../core/core.module';
import { TOKENS_SHARED } from '../core/tokens';
import { OBEK_PROVIDERS } from './services/index';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    OBEK_PROVIDERS,
    TOKENS_SHARED
  ]
})
export class ObekModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: ObekModule,
      providers: configuredProviders
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: ObekModule) {
    console.log(`OBek module constructor`);
    if (parentModule) {
      throw new Error('OBekModule already loaded; Import in root module only.');
    }
  }
}
