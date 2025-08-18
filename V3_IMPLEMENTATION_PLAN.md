# V3 Page Implementation Plan
*Heavy inspiration from decriminalizepoverty.org*

## 🎯 Project Overview
Create a new `/v3` page that combines our existing hero section with design patterns, transitions, and effects inspired by the decriminalizepoverty.org website.

## 📋 Requirements Analysis

### Current Understanding:
1. **Keep existing hero section** with rotating slideshow
2. **Second section**: Teal background with narrative text (inspired by decriminalizepoverty.org homepage)
3. **Subsequent sections**: Follow design patterns from /present/ pages
4. **Special effects**: Torn paper transitions between sections
5. **Focus**: Transitions, colors, and visual effects (content TBD)

### Requirements Confirmed ✅:
- [x] **Torn Paper Effect**: Use exact image from decriminalizepoverty.org (2880x90px RGBA PNG)
- [x] **Sections**: Recreate present, present1, present2, and present3 sections
- [x] **Colors**: Use EXACT color scheme from original (#004542 teal, etc.)
- [x] **Tech Stack**: Next.js/React with performance focus
- [x] **Layout**: Magazine-style responsive design matching original
- [x] **Transitions**: Smooth scroll with torn paper effect after section 2 only

## 🎨 Design System Analysis
*Based on decriminalizepoverty.org analysis*

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary-teal: #004542;
  --primary-white: #ffffff;
  
  /* Accent Colors */
  --accent-light-green: #ddf6e6;
  --accent-light-blue: #d6f0ff;
  --accent-purple: #5c47a0;
  --accent-light-purple: #C8B8F7;
  --accent-pink: #ffd6db;
  --accent-yellow: #eeffd9;
  
  /* Transparency Variants */
  --teal-64: #00454264;
  --black-64: #00000064;
}
```

### Typography System
```css
/* Font Hierarchy */
--font-size-hero: 150px;
--font-size-large: 110px;
--font-size-h1: 48px;
--font-size-h2: 36px;
--font-size-h3: 30px;
--font-size-h4: 28px;
--font-size-h5: 24px;
--font-size-body: 18px;
--font-size-small: 14px;

/* Font Weights */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--font-weight-black: 900;
```

### Animation System
```css
/* Easing Functions */
--ease-smooth: cubic-bezier(0.56, 0.86, 0.59, 1);
--ease-standard: ease;
--ease-in: ease-in;
--ease-out: ease-out;

/* Transition Durations */
--duration-fast: 0.15s;
--duration-medium: 0.3s;
--duration-slow: 0.6s;
```

## 🏗️ Technical Architecture

### Recommended Tech Stack
Based on analysis of decriminalizepoverty.org:

**What They Use:**
- **Platform**: Readymag (custom magazine builder)
- **JavaScript**: jQuery + custom scroll handlers
- **Animations**: Pure CSS transitions + requestAnimationFrame
- **Scroll**: Custom vertical magazine scroll with `cubic-bezier(0.40, 0.24, 0.40, 1)` easing
- **Performance**: No heavy animation libraries - just optimized CSS + native APIs

**Our Implementation:**
- **Framework**: Next.js 14+ (existing)
- **Styling**: Tailwind CSS + Custom CSS for magazine-style layouts
- **Animations**: **Pure CSS transitions** (like original) + Intersection Observer API
- **Scroll**: Custom smooth scroll with `cubic-bezier(0.56, 0.86, 0.59, 1)` easing
- **Performance**: Minimal JavaScript, CSS-driven animations, optimized for 60fps

**Why No Heavy Animation Libraries:**
- Original site achieves smooth 60fps with pure CSS
- Smaller bundle size = faster load times
- Better performance on mobile devices
- Easier to maintain and customize

### File Structure
```
src/app/v3/
├── page.tsx                 # Main V3 page component
├── components/
│   ├── HeroSection.tsx      # Existing hero (adapted)
│   ├── NarrativeSection.tsx # Teal background section
│   ├── PresentSection.tsx   # Present-style sections
│   ├── TornPaperTransition.tsx # Torn paper effect
│   └── ScrollHandler.tsx    # Smooth scroll management
├── styles/
│   ├── v3-globals.css       # Global styles for V3
│   ├── animations.css       # Animation definitions
│   └── torn-paper.css       # Torn paper effect styles
└── hooks/
    ├── useScrollAnimations.ts
    └── useIntersectionObserver.ts
```

## 📱 Section Breakdown

### Section 1: Hero (Existing + Adapted)
- **Keep**: Current rotating slideshow functionality
- **Adapt**: Transition smoothly into teal section
- **Add**: Subtle scroll indicator/arrow

### Section 2: Narrative Introduction
- **Background**: Teal (#004542)
- **Content**: Centered text with logos (similar to decriminalize homepage)
- **Typography**: Large, readable text with proper hierarchy
- **Animation**: Fade-in on scroll

### Section 3+: Present-Style Sections
- **Layout**: Magazine-style with precise positioning
- **Colors**: Rotating background colors (teal, light green, blue, etc.)
- **Content**: Mix of text, images, and data visualizations
- **Transitions**: Smooth scroll with torn paper effects

## 🎭 Animation & Effects Plan

### Scroll Animations
1. **Parallax scrolling** for background elements
2. **Staggered text animations** (words/lines appear sequentially)
3. **Image reveals** with blur-to-focus transitions
4. **Color transitions** between sections

### Torn Paper Effect
- **Implementation**: CSS mask with downloaded texture (2880x90px RGBA PNG)
- **Location**: After section 2 only (narrative → first present section)
- **Technique**: `mask-image` CSS property with torn paper texture
- **Animation**: Smooth reveal on scroll using Intersection Observer
- **Image**: `/public/images/torn-paper-texture.png` ✅ Downloaded

### Micro-interactions
- **Hover effects** on interactive elements
- **Smooth color transitions** on buttons/links
- **Subtle scale animations** on focus

## 🚀 Implementation Phases

### Phase 1: Foundation Setup ⏳
- [ ] Create `/v3` route structure
- [ ] Set up base components
- [ ] Implement design system (colors, typography)
- [ ] Create scroll management system

### Phase 2: Hero Integration ⏳
- [ ] Adapt existing hero section
- [ ] Create smooth transition to teal section
- [ ] Add scroll indicators

### Phase 3: Narrative Section ⏳
- [ ] Implement teal background section
- [ ] Add centered content layout
- [ ] Implement fade-in animations

### Phase 4: Present-Style Sections ⏳
- [ ] Section 3: Recreate /present/ design patterns
- [ ] Section 4: Recreate /present1/ design patterns  
- [ ] Section 5: Recreate /present2/ design patterns
- [ ] Section 6: Recreate /present3/ design patterns
- [ ] Implement exact color schemes for each section
- [ ] Add magazine-style absolute positioning layouts

### Phase 5: Torn Paper Transitions ⏳
- [ ] Implement torn paper effect component
- [ ] Add section transition animations
- [ ] Integrate provided image/code

### Phase 6: Polish & Optimization ⏳
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Cross-browser testing
- [ ] Accessibility improvements

## 📊 Progress Tracking

### Completed ✅
- [x] Initial analysis of decriminalizepoverty.org
- [x] Design system extraction
- [x] Implementation plan creation

### In Progress 🔄
- [ ] Awaiting clarification on requirements

### Pending ⏳
- [ ] All implementation phases

## 🛠️ Technical Implementation Details

### Torn Paper Effect Implementation
```css
.torn-paper-transition {
  position: relative;
  height: 90px;
  width: 100%;
  background: url('/images/torn-paper-texture.png') repeat-x;
  background-size: 2880px 90px;
  mask-image: url('/images/torn-paper-texture.png');
  mask-repeat: repeat-x;
  mask-size: 2880px 90px;
  transition: opacity 0.6s cubic-bezier(0.56, 0.86, 0.59, 1);
}
```

### Scroll Animation System
```typescript
// Custom hook for magazine-style scrolling
const useScrollAnimations = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Implement smooth scroll behaviors
      requestAnimationFrame(() => {
        // Update animations based on scroll position
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
```

### Section Color Mapping
Based on analysis:
- **Section 1**: Hero (existing colors)
- **Section 2**: `#004542` (primary teal)
- **Section 3**: `#ddf6e6` (light green) - /present/
- **Section 4**: `#d6f0ff` (light blue) - /present1/
- **Section 5**: `#c7b9f6` (light purple) - /present2/
- **Section 6**: `#ffd6db` (light pink) - /present3/

## 🔍 Next Steps
1. **Begin Phase 1** implementation immediately
2. **Create base structure** for /v3 route
3. **Implement design system** with exact colors
4. **Build scroll animation system**
5. **Iterate** based on visual feedback

---

*Last Updated: [Current Date]*
*Status: Planning Phase*
