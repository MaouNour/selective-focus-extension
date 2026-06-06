import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import GioUnix from 'gi://GioUnix';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
export default class SelectiveFocusPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        this._settings = this.getSettings();
	this._prefsWindow = window;

        const page = new Adw.PreferencesPage({
            title: 'Selective Focus',
        });

        const group = new Adw.PreferencesGroup({
    	title: 'Allowed Applications',
    	margin_top: 12,
   	margin_bottom: 12,
	});

        page.add(group);

        // SAFE CONTAINER (IMPORTANT FIX)
        this._list = new Gtk.ListBox({
            selection_mode: Gtk.SelectionMode.NONE,
        });

        group.add(this._list);

        this._buildList();

        window.add(page);
    }

    _clearList() {
        let child;
        while ((child = this._list.get_first_child())) {
            this._list.remove(child);
        }
    }

    _buildList() {
        this._clearList();

        const apps = this._settings.get_strv('allowed-apps');

        for (const appId of apps) {
            const appInfo = GioUnix.DesktopAppInfo.new(appId);

            const row = new Adw.ActionRow({
                title: appInfo?.get_display_name() ?? appId,
                subtitle: appId,
            });

            const remove = new Gtk.Button({
                icon_name: 'user-trash-symbolic',
                valign: Gtk.Align.CENTER,
            });

            remove.connect('clicked', () => {
                const current = this._settings.get_strv('allowed-apps');

                this._settings.set_strv(
                    'allowed-apps',
                    current.filter(x => x !== appId)
                );

                this._buildList();
            });

            row.add_suffix(remove);

            this._list.append(row);
        }

        const addRow = new Adw.ActionRow({
            title: 'Add Application',
            activatable: true,
        });

        addRow.add_suffix(
            new Gtk.Image({ icon_name: 'list-add-symbolic' })
        );

        addRow.connect('activated', () => this._openChooser());

        this._list.append(addRow);
    }

    _openChooser() {
        const dialog = new Adw.Dialog();
	dialog.set_content_width(300);
	dialog.set_content_height(300);
	dialog.set_follows_content_size(true);

        const scroll = new Gtk.ScrolledWindow({
            vexpand: true,
            hexpand: true,
        });
	scroll.set_min_content_width(400);
	scroll.set_min_content_height(500);

        const list = new Gtk.ListBox({
            selection_mode: Gtk.SelectionMode.NONE,
        });

        scroll.set_child(list);
        dialog.set_child(scroll);

        const current = this._settings.get_strv('allowed-apps');

        const apps = Gio.AppInfo.get_all()
            .filter(a => a.should_show())
            .sort((a, b) =>
                a.get_display_name().localeCompare(b.get_display_name())
            );

        for (const app of apps) {
            const id = app.get_id();
            if (!id || current.includes(id))
                continue;

            const row = new Adw.ActionRow({
                title: app.get_display_name(),
                subtitle: id,
                activatable: true,
            });

            row.connect('activated', () => {
                this._settings.set_strv('allowed-apps', [...current, id]);

                dialog.close();
                this._buildList();
            });

            list.append(row);
        }

        dialog.present(this._prefsWindow);
    }
}
