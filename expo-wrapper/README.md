# Expo wrapper for Rd-GUARD

This small Expo project opens the Next.js dev server in a `WebView` so you can view the web app inside Expo on an emulator or device.

Quick start

1. Ensure the Next.js dev server is running in the project root:

```powershell
npm run dev
```

2. Open this folder in a new terminal and install deps:

```powershell
cd expo-wrapper
npm install
```

3. Start Expo:

```powershell
npm run start
# or to open on Android emulator:
npm run android
# or on iOS simulator (macOS only):
npm run ios
```

Notes

- The Expo `App.js` points to `http://192.168.0.106:9002` by default. Change that to `http://localhost:9002` or your machine IP in `App.js` depending on whether you run on simulator/emulator or physical device.
- If you use a physical device, ensure your machine and device are on the same network and use the machine IP (not `localhost`).
- CORS: because the app is loaded in a WebView, CORS normally isn't an issue for the page itself, but external API calls made by the web app may still require proper CORS/origin handling.
- Security: do not embed API keys in `App.js`. Use server-side endpoints or secure env vars.
