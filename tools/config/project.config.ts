import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,

      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });




    this.addPackageBundles({
      name: 'firebase',
      path: 'node_modules/firebase/firebase.js',
      packageMeta: {
        main: 'firebase.js',
        defaultExtension: 'js'
      }
    });

    // Add AngularFire configuration to SystemJS
    this.addPackageBundles({
      name: 'angularfire2',
      path: 'node_modules/angularfire2/bundles/angularfire2.umd.js',
      packageMeta: {
        main: 'angularfire2.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'ng2-bootstrap/ng2-bootstrap',
      path: 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
      packageMeta: {
        main: 'ng2-bootstrap.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'moment',
      path: 'node_modules/moment/moment.js',
      packageMeta: {
        main: 'moment.js',
        defaultExtension: 'js'
      }
    });

  }

}
