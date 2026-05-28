---
name: browse
description: Use headless Chrome to screenshot any HTML file or URL. Claude reads the PNG to actually see what the page renders. Zero installs — uses the Chrome the user already has. Use when you need to see how a prototype looks, verify a design change visually, or capture responsive layouts.
---

# browse — vanilla headless Chrome

Take a screenshot of any HTML file or URL using Chrome's built-in headless mode, then `Read` the PNG to see the rendered output. No browser automation library required — Chrome's CLI does it natively.

## Find Chrome

Run this once per session to locate Chrome:

```bash
if [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif command -v google-chrome >/dev/null 2>&1; then
  CHROME=google-chrome
elif command -v chromium >/dev/null 2>&1; then
  CHROME=chromium
else
  echo "Chrome not found — install Google Chrome and retry"; exit 1
fi
echo "CHROME: $CHROME"
```

Windows path (if needed): `"C:\Program Files\Google\Chrome\Application\chrome.exe"`

## Single screenshot

```bash
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --screenshot=/tmp/preview.png \
  --window-size=1440,900 \
  "file://$(pwd)/prototype.html"
```

Then call `Read /tmp/preview.png` — Claude sees the rendered page and can describe / critique / verify it.

**Absolute paths only** in `file://...`. Relative paths don't work.

## Responsive (3 viewports in one go)

```bash
TARGET="file://$(pwd)/prototype.html"
for entry in "375x812:mobile" "768x1024:tablet" "1440x900:desktop"; do
  dims=${entry%%:*}; name=${entry##*:}
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --screenshot=/tmp/preview-${name}.png \
    --window-size=${dims/x/,} \
    "$TARGET"
done
```

Then `Read /tmp/preview-mobile.png`, `/tmp/preview-tablet.png`, `/tmp/preview-desktop.png` in sequence.

## URL instead of file

Replace `file://...` with any `http://...` URL. Works on local dev servers (`http://localhost:3000`).

## Useful flags

- `--virtual-time-budget=2000` — wait 2s for animations / late content before capturing
- `--default-background-color=00000000` — transparent background (PNG only)
- `--force-device-scale-factor=2` — Retina-quality screenshot
- `--user-agent="..."` — fake mobile user-agent if site does UA sniffing

## After screenshot — always Read

The screenshot is only useful if Claude actually looks at it. Always follow a screenshot with `Read /tmp/...png`. The PNG goes into the conversation, Claude (and the user) sees the rendered page.

## Limitations (honest)

- **No clicks, fills, navigation.** Headless screenshot is single-shot. For interactive testing, Claude can edit the HTML to put the page in a different state (add a `.is-open` class, etc.) then re-screenshot.
- **No JS errors / console** — pure visual capture only.
- **No before/after diff** — Claude can Read both PNGs and describe differences.

For workshop-grade static prototypes, these limits don't matter. For real app QA, the user can manually `open` the file and report back.

## Quick handoff to user

```bash
open prototype.html
```

This opens the file in the user's real default browser. Useful at the end of a design session when the user wants to click around.
