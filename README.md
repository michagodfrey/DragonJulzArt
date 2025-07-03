# 🎨 Online Gallery of DragonJulzArt

A modern, fast, and fully customizable online art gallery built with **Next.js**, **Tailwind CSS**, and **Stripe Checkout**, deployed on **Vercel**. This project allows artists to showcase and sell their work without the monthly fees of platforms like Shopify.

---

## 🚀 Features

- Responsive image gallery with Tailwind
- Add-to-cart functionality with React context
- Secure Stripe Checkout integration
- Hosted on Vercel with built-in backend API routes
- Custom thank you / success page
- No monthly platform fees (just Stripe's payment processing fee)

---

## 🧰 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Cart State:** React Context (or [Zustand](https://zustand-demo.pmnd.rs/), if preferred)
- **Backend:** Next.js API routes (serverless functions)
- **Payments:** [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- **Hosting:** [Vercel](https://vercel.com/) (free tier works great)

---

## 🛠️ Setup Instructions

### 1. Clone this Repository

```bash
git clone https://github.com/your-username/art-gallery.git
cd art-gallery
 
 ```

### 2 Install Dependencies

```bash
npm install
```

### 3. Set Up Stripe

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_***
STRIPE_SECRET_KEY=sk_test_***
```

### 4. Run Locally

```bash
npm run dev
```

## File Structure Overview

```bash
/pages
  index.tsx          -> Home / Gallery
  success.tsx        -> Post-checkout thank you
  /api
    checkout.ts      -> Stripe checkout session creator
/components
  ArtworkCard.tsx    -> Displays art piece
  CartModal.tsx      -> Cart overview
/context
  CartContext.tsx    -> Manages cart logic
```
