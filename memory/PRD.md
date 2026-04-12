# Shawn Power for Mayor - Campaign Website PRD

## Problem Statement
Build a mayoral campaign website for Shawn Power running for mayor in Miramichi, New Brunswick, Canada. Single-page landing site with warm, community-focused design. Bilingual (English/Acadian French).

## Architecture
- **Frontend**: React (single-page with smooth scroll navigation)
- **Backend**: FastAPI with MongoDB
- **Styling**: Tailwind CSS with earthy palette (Forest Green, Terracotta, Warm Sand)
- **Fonts**: Playfair Display (headings) + Outfit (body)
- **i18n**: Client-side language context (EN/FR toggle)

## What's Been Implemented (Dec 2025)
- Full single-page campaign website with 6 sections
- **French/English toggle** with Acadian French (uses "asteure", "point", regional expressions)
- Real Shawn Power campaign photo
- Real Facebook link integrated
- Google Drive promo video embed (friends & family slideshow)
- Backend API: POST/GET /api/volunteers, POST/GET /api/contact
- Volunteer form with validation and success messaging
- E-transfer donation section
- All 5 platform points in bento grid layout
- Sticky glassmorphism navbar with language toggle
- 100% test pass rate (2 iterations)

## Prioritized Backlog
### P0 (User to provide)
- Fill in About section bio details
- Upload more photos of Shawn and Miramichi

### P1
- Admin panel to view volunteer sign-ups
- Contact form on the contact section
- SEO / Open Graph meta tags

### P2
- Campaign events calendar
- Endorsements section
- Newsletter signup
