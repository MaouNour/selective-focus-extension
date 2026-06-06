import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Shell from 'gi://Shell';

export default class SelectiveFocusExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._windowTracker = Shell.WindowTracker.get_default();

        this._handlerId = global.display.connect(
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
            }
        );
    }

    disable() {
        if (this._handlerId) {
            global.display.disconnect(this._handlerId);
            this._handlerId = null;
        }

        this._settings = null;
    }
}
