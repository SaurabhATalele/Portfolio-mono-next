# Portfolio‑mono‑next

A **modern, high‑performance portfolio website** built with **Next.js (App Router)**, **Tailwind‑CSS**, and **Payload CMS**. It showcases projects, blog posts, and client testimonials with a premium, glass‑morphism UI, auto‑scrolling carousel, and RSS feed.

## ✨ Key Features
- **Testimonials carousel** with auto‑scroll, manual navigation, and conditional visibility based on approval flag.
- **Reusable `TestimonialCard` component** used across the carousel and testimonials page.
- **Testimonials page** displaying the latest six approved testimonials with pagination controls.
- **Blog section** with static rendering of markdown/MDX posts.
- **RSS feed** (`public/rss.xml`) automatically generated and linked in the footer.
- **Environment configuration** via `.env` for Payload CMS connection and API keys.
- **Premium UI** – glass‑morphism cards, smooth micro‑animations, dark‑mode support.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router) – server‑side rendering & static generation.
- **UI:** Tailwind CSS, custom CSS variables for glass‑morphism.
- **CMS:** Payload CMS – collection `testimonials`.
- **Language:** TypeScript (strict mode).
- **Package manager:** Bun (fast install & dev server).
- **Testing:** Jest & React Testing Library (optional).

## 📦 Getting Started
```bash
# Clone the repository
git clone <repo‑url>
cd Portfolio-mono-next

# Install dependencies (using Bun)
bun install

# Set up environment variables – copy the template and fill values
cp .env.example .env
# edit .env with your Payload CMS URL and secret

# Run the development server
bun run dev
```
The app will be available at `http://localhost:3000`.

## 📂 Project Structure (excerpt)
```
app/
 ├─ (frontend)/
 │   ├─ components/          # UI components (Footer, TestimonialCard, TestimonialsCarousel, …)
 │   ├─ blogs/               # Blog page (static MDX rendering)
 │   ├─ testimonials/        # Testimonials page (list view)
 │   └─ layout.tsx           # Root layout with navigation
public/
 └─ rss.xml                 # RSS feed for blog/testimonials
payload.config.ts            # Payload CMS configuration
next.config.js               # Next.js custom config (including docs path for Next.js version)
README.md                    # **You are reading it**
```

## 🗂️ Scripts
- `bun dev` – start development server.
- `bun build` – generate production build.
- `bun start` – run the production server after build.

## 🔧 Environment Variables
Create a `.env` file (see `.env.example`). Typical variables:
```
NEXT_PUBLIC_PAYLOAD_URL=https://cms.example.com
NEXT_PUBLIC_PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```
These are required for the Payload CMS client and Google Analytics.

## 🤝 Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Ensure code follows existing linting & TypeScript standards.
4. Open a pull request with a clear description.

## 📜 License
MIT – feel free to use, modify, and distribute.

---
*Built with love for performance, design, and developer ergonomics.*
