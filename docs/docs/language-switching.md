# Language Switching

This feature allows users to switch the app's language between English, Hindi, and French in real-time.

## What it does

The language switching feature provides an intuitive way for users to change the app's interface language without reloading the page. It uses `react-i18next` to manage translations and update the UI dynamically.

## How to use it

1. Open the app in your browser
2. Look for the language buttons at the bottom of the page
3. Click "EN" for English, "HI" for Hindi, or "FR" for French
4. The page content will immediately update to the selected language

## Screenshots

![Language switching interface](@site/static/img/screenshots/language-switching.png)

## Notes

- Language preference is stored in browser memory and persists during the session
- All text content is translated automatically using the configured translation pipeline
- The feature works offline once translations are generated
- No keyboard shortcuts are available for language switching