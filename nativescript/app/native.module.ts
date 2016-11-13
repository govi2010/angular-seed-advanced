// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Http } from '@angular/http';

// angular
import { NgModule } from '@angular/core';

// libs
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
//
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ng2-fonticon';

// app
import { WindowService, ConsoleService, RouterExtensions } from './app/frameworks/core/index';
import { NSAppComponent } from './pages/app/app.component';
import { TOKENS_NATIVE } from './tokens.native';
import { AppComponent, ENTRY_COMPONENTS } from './app/frameworks/obek/index';
import { routes } from './app/frameworks/obek/routes';
import { ObekModule } from './app/frameworks/obek/obek.module';
import {registerElement} from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);



// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';
// import { MultilingualModule, translateFactory } from './app/frameworks/i18n/multilingual.module';
// import { multilingualReducer, MultilingualEffects } from './app/frameworks/i18n/index';
// import { SampleModule } from './app/frameworks/sample/sample.module';
// import { nameListReducer, NameListEffects } from './app/frameworks/sample/index';

// {N} custom app specific
import { WindowNative } from './shared/core/index';
import { NS_ANALYTICS_PROVIDERS } from './shared/nativescript/index';

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    TNSFontIconModule.forRoot({
      'fa': 'fonts/font-awesome.css'
    })
  ],
  declarations: [
    ENTRY_COMPONENTS
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule
  ]
})
class ComponentsModule { }

// For AoT compilation to work:
export function cons() {
  return console;
}

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useFactory: (cons) }
    ]),
    AnalyticsModule,
    ComponentsModule,
    ObekModule.forRoot([
      TOKENS_NATIVE,
      {}
    ]),
    NativeScriptRouterModule.forRoot(<any>routes),
  ],
  declarations: [
    NSAppComponent
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
