# NextAppointments

**Open Source Online Appointment Scheduling**

NextAppointments is a powerful, flexible, and free open source scheduling solution built with **Next.js** and **TypeScript**. Perfect for medical offices, salons, service-based businesses, and more. It offers customizable booking, client communication tools, and secure infrastructure.

![Screenshot](https://nextappointments.net/images/appointment-calendar-demo.png)

Deployment Guide for Appointment Scheduler
Deploy to Vercel (Recommended)
Install Vercel CLI:

npm i -g vercel
Deploy:

vercel
Your app will be available at: https://your-app-name.vercel.app

Deploy to Netlify
Build the project:

npm run build
Upload the out folder to Netlify

Your app will be available at: https://your-app-name.netlify.app

Using in an iframe
Once deployed, you can embed the appointment scheduler in any website using an iframe:

<iframe 
  src="https://your-deployed-app-url.com" 
  width="100%" 
  height="800px" 
  frameborder="0"
  scrolling="no"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>
Responsive iframe example:
<div style="position: relative; padding-bottom: 120%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    src="https://your-deployed-app-url.com" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
    frameborder="0"
    scrolling="no">
  </iframe>
</div>
Important Notes
The app is configured for static export and iframe compatibility
All form data is stored locally in the browser
No server-side functionality is required
The app will work in any modern browser

## 🚀 Features

- **Smart Scheduling**  
  Customizable availability, buffer times, and booking rules.

- **Client Communication**  
  Automated reminders, confirmations, and follow-ups via email and SMS.

- **Secure & Reliable**  
  Built with security in mind — regular backups and data protection.

- **Customizable Branding**  
  Add your logo, brand colors, and custom domain — all for free.

- **Modern Tech Stack**  
  Built using Next.js, React, and TypeScript for modern, fast, scalable development.

- **Responsive Design**  
  Fully optimized for desktop, tablet, and mobile.

## 🔧 Premium Features

Take your business to the next level with optional upgrades:

### Custom Integrations
- CRM Integration (Salesforce, HubSpot)
- Payment Processing (Stripe, PayPal)
- Calendar Sync (Google, Outlook)

### Managed Hosting
- Enterprise-grade infrastructure with unlimited users
- 24/7 technical support
- Automatic backups & updates


## 🎥 Demo

See how easy it is to schedule, manage, and grow your business:

![Watch the demo](https://nextappointments.net/videos/demo.mp4)

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), React, TypeScript  
- **Backend**: Node.js / Express (configurable)  
- **Database**: PostgreSQL / MySQL / MongoDB  
- **Deployment**: Vercel, Docker, or custom hosting

---

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Project Structure

```markdown
nextappointments/
├── app/              # App router pages and logic
├── components/       # Shared UI components
├── public/           # Static assets
├── styles/           # Global styles
└── types/            # TypeScript definitions
```
### Installation

```bash
git clone https://github.com/your-username/nextappointments.git
cd nextappointments
npm install   # or yarn install
npm run dev   # or yarn dev
```

### Development Commands
```javascript
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
npm run test    # Run tests
```
