import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Shell from 'gi://Shell';

export default class SelectiveFocusExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._windowTracker = Shell.WindowTracker.get_default();
	global.display.connectObject(
    'window-demands-attention',
    (display, window) => {
        const app = this._windowTracker.get_window_app(window);

        if (!app)
            return;

        const appId = (app.get_id() || '').toLowerCase();

        console.log(`[SelectiveFocus] Focus request from ${appId}`);

        const allowedApps = this._settings
            .get_strv('allowed-apps')
            .map(id => id.toLowerCase());

        if (allowedApps.includes(appId))
            Main.activateWindow(window);
    },
    this
);
        }

    disable() {
	global.display.disconnectObject(this);
    	this._settings = null;
    	this._windowTracker = null;
          }
}
