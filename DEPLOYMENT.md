# Deployment Guide for Appointment Scheduler

## Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Your app will be available at:** `https://your-app-name.vercel.app`

## Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `out` folder** to Netlify

3. **Your app will be available at:** `https://your-app-name.netlify.app`

## Using in an iframe

Once deployed, you can embed the appointment scheduler in any website using an iframe:

```html
<iframe 
  src="https://your-deployed-app-url.com" 
  width="100%" 
  height="800px" 
  frameborder="0"
  scrolling="no"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>
```

### Responsive iframe example:

```html
<div style="position: relative; padding-bottom: 120%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    src="https://your-deployed-app-url.com" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
    frameborder="0"
    scrolling="no">
  </iframe>
</div>
```

## Important Notes

- The app is configured for static export and iframe compatibility
- All form data is stored locally in the browser
- No server-side functionality is required
- The app will work in any modern browser 