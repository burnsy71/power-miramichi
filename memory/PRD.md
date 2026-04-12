# Shawn Power for Mayor - Campaign Website PRD

## Problem Statement
Build a mayoral campaign website for Shawn Power running for mayor in Miramichi, New Brunswick, Canada. Single-page landing site with warm, community-focused design.

## Architecture
- **Frontend**: React (single-page with smooth scroll navigation)
- **Backend**: FastAPI with MongoDB
- **Styling**: Tailwind CSS with custom earthy palette (Forest Green, Terracotta, Warm Sand)
- **Fonts**: Playfair Display (headings) + Outfit (body)

## User Personas
- Miramichi residents looking to learn about Shawn's platform
- Potential volunteers wanting to sign up
- Supporters wanting to donate via e-Transfer

## Core Requirements
- [x] Hero section with campaign slogan
- [x] About section (placeholder bio for family to fill in)
- [x] Platform section with 5 key issues (Planning Commission, Taxes, Veterans, Bypass, Centennial Bridge)
- [x] Volunteer sign-up form (stored in MongoDB)
- [x] Donation/e-Transfer section
- [x] Contact info (phone, email, Facebook)
- [x] Responsive design with mobile menu
- [x] Smooth scroll navigation

## What's Been Implemented (Dec 2025)
- Full single-page campaign website
- Backend API: POST/GET /api/volunteers, POST/GET /api/contact
- Volunteer form with validation and success messaging
- E-transfer donation section with powerformayor@gmail.com
- All 5 platform points displayed in bento grid layout
- Sticky glassmorphism navbar with scroll detection
- Contact footer with phone, email, Facebook link, location
- 100% test pass rate (backend + frontend)

## Prioritized Backlog
### P0 (User to provide)
- Replace placeholder portrait with actual Shawn Power photo
- Fill in About section bio details
- Update Facebook link to actual campaign page URL
- Confirm e-transfer email address

### P1
- Add actual Miramichi photos
- Admin panel to view volunteer sign-ups
- Contact form on the contact section

### P2
- Campaign events calendar
- Endorsements section
- Newsletter signup
- SEO optimization / Open Graph meta tags
