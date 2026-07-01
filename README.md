# Veloure

A full-stack beauty e-commerce store with a polished, animation-rich frontend.  
Built with React, Vite, and React Router.

**Live site:** [add your Netlify link here after deploying]  
**Backend API:** [veloure-api](https://github.com/bleedopium16/veloure-api)

---

## Features

- **Luxury intro animation** — animated gold "Veloure" logo reveal on first visit
- **Product catalog** — browse makeup, skincare, and haircare, plus featured bestsellers
- **Search** — find products by name from the navbar
- **Authentication** — register and log in, with sessions persisted across refreshes
- **Cart** — add, remove, and adjust quantities; persisted per user
- **Wishlist** — save favorite products with a tap
- **Orders** — checkout and view full order history
- **Polished UX** — toast notifications, loading skeletons, and premium empty states

---

## Tech Stack

- **React 19** + **Vite**
- **React Router** — client-side routing
- **Context API** — auth, cart, wishlist, and toast state
- **CSS** — custom styling and animations
- **JWT** — token-based auth (stored in localStorage)

The backend (Node, Express, MongoDB) lives in a separate repo: [veloure-api](https://github.com/bleedopium16/veloure-api)

---

## Local Setup

### 1. Install
```bash
npm install
```

### 2. Environment
Create a `.env` file pointing at your backend:

### 3. Run
```bash
npm run dev
```
The app runs on http://localhost:5173 (requires the backend running separately).

---

## Building for Production
```bash
npm run build
```
Set `VITE_API_URL` to your deployed backend URL in your hosting provider's environment settings.
