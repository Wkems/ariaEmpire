# Rename & Modernize Aria Empire

The goal is to rename the existing "Nexus Digital Marketing Platform" to "Aria Empire", introduce a modern visual identity (logo and typography), and perform a radical modernization of both the homepage and the admin interface ensuring an exceptional, premium experience across mobile, tablet, and laptop devices.

## Proposed Changes

### Global Theme & Configuration
- **Tailwind Config**: Rename the `nexus` color palette to `aria`. We will update the default palette to an "Empire" aesthetic (e.g., deep obsidian backgrounds, rich gold/amber accents, and crisp white typography).
- **Index.html**: Import modern typography (e.g., Google Fonts 'Outfit' and 'Inter') and update the document title to "Aria Empire".
- **Asset Generation**: Generate a sleek, high-end logo for "Aria Empire" using the `generate_image` tool and integrate it throughout the site.
- **Global CSS**: Update `index.css` to include global font definitions and custom glassmorphism/gradient utility classes.

### Homepage Modernization
The homepage will undergo a structural and aesthetic overhaul to feel responsive, dynamic, and premium on all device sizes.
- **Hero Section (`src/sections/Hero.tsx`)**: Implement a dynamic, gradient-rich hero section with micro-animations on buttons and text, utilizing glassmorphism for floating UI elements.
- **Navigation (`src/components/ui/custom/Navbar.tsx`)**: Incorporate the new logo, adopt a frosted-glass (backdrop-blur) navigation bar, and enhance mobile menu transitions.
- **Footer (`src/sections/Footer.tsx`)**: Update branding and add subtle hover animations to links.
- **Product Sections (`FeaturedProduct`, `CategoryGrid`, etc.)**: Apply modern card designs with hover elevation, subtle borders, and harmonious colors replacing the old `nexus-*` classes with `aria-*`.

### Admin Panel Redesign & Access
- **Admin Authentication (`src/context/AppContext.tsx`)**: Update the admin password from the current value to `adminempire004`.
- **System Access Modal (`src/sections/GhostAdmin.tsx`)**: Modify the password entry to have a sleeker, more secure-looking interface with modern input focus states.
- **Admin Dashboard (`GhostAdmin.tsx`)**: Redesign the admin panel to resemble a professional, high-tech command center. We will use comprehensive grid layouts, status badges with glowing effects, and a glass-panel aesthetic for managing products and viewing analytics.

## Open Questions
> [!IMPORTANT]
> The color palette will shift to a more "Empire" theme (deep dark backgrounds with rich gold/amber or deep blue/purple accents). Do you have a specific color preference in mind for "Aria Empire" (e.g., Gold & Black, Purple & Dark Blue, or something else)?

## Verification Plan

### Automated Tests
- Build verification using `npm run build` to ensure no TypeScript or CSS errors remain after class renaming (`nexus` -> `aria`).

### Manual Verification
- Start the Vite development server (`npm run dev`).
- Launch a browser subagent to verify the overall layout of the Homepage and rendering of the generated logo.
- Test responsiveness (mobile, tablet, desktop widths).
- Use the secret admin trigger (Shift+Alt+A) or triple click, enter `adminempire004`, and visually inspect the modernized Admin Panel.
