# 🎯 Selective Focus

> Force focus only for the applications you choose on GNOME Wayland.

Selective Focus is a GNOME Shell extension that restores a workflow many users miss on Wayland: allowing only specific applications to automatically take focus when they demand attention.

Instead of every application being able to steal focus, you decide which ones are allowed.

Perfect for users who want notifications and alerts from important applications without being interrupted by everything else.

---

## ✨ Features

- ✅ Allow only selected applications to take focus
- ✅ Works on GNOME Wayland
- ✅ Simple graphical preferences window
- ✅ Add or remove applications from an allow-list
- ✅ Lightweight and dependency-free
- ✅ Uses native GNOME settings (GSettings)

---

## 🖥️ Example Use Cases

### Terminal Focus

Allow your terminal emulator to gain focus when a long-running task finishes.

Examples:

- Tilix
- GNOME Terminal
- Ptyxis
- Konsole

### Communication Apps

Allow important communication tools to gain focus.

Examples:

- Telegram
- Signal
- Discord
- Slack

### Development Workflow

Permit IDEs or editors to focus when user interaction is required.

Examples:

- VS Code
- IntelliJ IDEA
- Android Studio

---

## ⚙️ How It Works

GNOME emits a `window-demands-attention` signal whenever an application requests user attention.

Selective Focus listens for those requests and checks whether the application's desktop ID is present in the allow-list.

If the application is allowed:

```text
Application requests attention
            ↓
      Allow-list check
            ↓
         Allowed
            ↓
      Window focused
```

Otherwise:

```text
Application requests attention
            ↓
      Allow-list check
            ↓
        Not allowed
            ↓
      Focus is ignored
```

---

## 📦 Installation

### From GNOME Extensions

Install from the GNOME Extensions website:

https://extensions.gnome.org/

Search for:

**Selective Focus**

---

### Manual Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/selective-focus.git
```

Copy the extension:

```bash
mkdir -p ~/.local/share/gnome-shell/extensions
cp -r selective-focus ~/.local/share/gnome-shell/extensions/selective-focus@maou-nournar
```

Compile schemas:

```bash
glib-compile-schemas schemas/
```

Restart GNOME Shell or log out and back in.

---

## 🔧 Configuration

Open the extension preferences and:

1. Press **Add Application**
2. Select an application
3. It is immediately added to the allow-list
4. Remove applications at any time using the trash button

Only applications in the list will be allowed to automatically receive focus.

---

## 🛠️ Supported GNOME Versions

| GNOME Shell |
|------------|
| 48 |
| 49 |
| 50 |

---

## 📂 Project Structure

```text
selective-focus/
├── extension.js
├── prefs.js
├── metadata.json
├── schemas/
│   └── org.gnome.shell.extensions.selective-focus.gschema.xml
└── README.md
```

---

## 🏗️ Built With

- GNOME Shell Extensions API
- GJS
- GTK 4
- LibAdwaita
- GSettings

---

## 🤝 Contributing

Issues, feature requests, and pull requests are welcome.

If you discover a bug or have an idea for improvement, feel free to open an issue.

---

## 📜 License

MIT License

Copyright (c) 2026 MaourNournar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.

---

## ❤️ Support

If you find this extension useful, consider starring the repository and sharing it with other GNOME users.

---

### Screenshots

```markdown
![Preferences Window](screenshots/preferences.png)
```

---

Made with ❤️ for GNOME Wayland users.
