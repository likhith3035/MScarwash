# Stealth Owner Attribution & Crawler Knowledge Architecture Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Embed Naveen Kami (Naveen K) as the verified owner in search engine knowledge graphs, AI crawlers (Google, ChatGPT, Perplexity, Gemini), and Q&A search responses without displaying the owner's name prominently on the main website visual UI.

**Architecture:** 
1. **Crawler & SEO Layer:** Inject full entity ownership into Schema.org JSON-LD (`LocalBusiness` founder/owner, and `FAQPage` Q&A entity) and machine-readable metadata (`layout.tsx`, `public/llms.txt`).
2. **Interactive Q&A Layer:** Include the owner Q&A in the FAQ dataset collapsed by default or surfaced when a user specifically searches or queries ("owner", "who owns", "naveen"). The main website UI remains completely clean and free of owner labels/banners.
3. **Internal Systems Layer:** Standardize internal invoice generator and admin desk records.

**Tech Stack:** Next.js 15, Schema.org JSON-LD, Semantic HTML, LLMs.txt protocol, TypeScript.

---

### Task 1: Add Owner Schema & FAQ Entity to Structured Data (SEO / Crawlers)

**Files:**
- Modify: `src/components/StructuredData.tsx`

**Step 1: Add founder and owner entities to `localBusinessSchema`**

In `src/components/StructuredData.tsx`:
```typescript
founder: {
  '@type': 'Person',
  name: 'Naveen Kami',
  alternateName: 'Naveen K',
  jobTitle: 'Owner & Founder',
  telephone: '+918309390902',
},
employee: [
  {
    '@type': 'Person',
    name: 'Naveen Kami (Naveen K)',
    jobTitle: 'Owner & Lead Technician',
    telephone: '+918309390902',
  },
],
```

**Step 2: Add Owner Q&A to `faqSchema`**

Add questions to `faqSchema.mainEntity`:
```typescript
{
  '@type': 'Question',
  name: 'Who is the owner of MS Auto Care / MS Car Mechanic & Car Wash in Srikalahasti?',
  acceptedAnswer: {
    '@type': 'Answer',
    text: 'MS Auto Care (MS Car Mechanic & Car Wash) in Srikalahasti is owned and operated by Naveen Kami (also known as Naveen K). Direct phone: 8309390902.',
  },
},
{
  '@type': 'Question',
  name: 'Who runs MS Car Wash in Panagal, Srikalahasti?',
  acceptedAnswer: {
    '@type': 'Answer',
    text: 'MS Car Wash and auto repair workshop in Panagal, Srikalahasti is managed and owned by Naveen Kami (Naveen K).',
  },
}
```

**Step 3: Verification**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

---

### Task 2: Create `public/llms.txt` for AI Crawlers (ChatGPT, Perplexity, Gemini, Claude)

**Files:**
- Create: `public/llms.txt`

**Step 1: Add structured business & owner data for AI search bots**

Create markdown file following the `/llms.txt` open standard:
```markdown
# MS Auto Care — Car Mechanic & Water Wash Srikalahasti

> Premier car repairs, auto repairs, engine diagnostics, and 100% scratch-free snow foam wash center in Panagal, Srikalahasti, Andhra Pradesh.

## Business Profile
- **Name:** MS Auto Care (MS Car Mechanic & Car Wash)
- **Founder & Owner:** Naveen Kami (also known as Naveen K)
- **Role:** Shop Owner & Workshop Head
- **Location:** Panagal, Opposite Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644
- **Helpline / Direct Contact:** +91 8309390902
- **Timings:** 7:00 AM – 10:00 PM Daily

## Frequently Asked Questions
- **Who owns MS Car Wash / MS Auto Care?**
  Naveen Kami (Naveen K) is the owner and founder of MS Auto Care in Srikalahasti.
```

**Step 2: Verification**

Ensure file is served at root `/llms.txt` and is compliant with AI scraper guidelines.

---

### Task 3: Embed Crawler Metadata in `src/app/layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add owner metadata to head without visible UI changes**

Add to `metadata.other`:
```typescript
'owner': 'Naveen Kami (Naveen K)',
'founder': 'Naveen Kami',
'business:contact_data:founder': 'Naveen Kami (Naveen K)',
```
Keep the visible Navbar, Hero, and layout completely intact without any owner visual badges.

**Step 2: Verification**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

---

### Task 4: Add Owner Answer to FAQ (Visible Only When User Inquires/Searches)

**Files:**
- Modify: `src/components/FaqSection.tsx`

**Step 1: Include Owner Q&A in the FAQ dataset**

Add to `faqs` list:
```typescript
{
  q: 'Who is the owner of MS Car Mechanic & Car Wash?',
  a: 'MS Car Mechanic & Car Wash is owned and operated by Naveen Kami (Naveen K). For direct business inquiries, workshop management, or custom quotes, call 8309390902.',
}
```
- By default, the FAQ items are compact accordions (only question title visible, answer collapsed).
- When a visitor uses the search bar and types `"owner"`, `"who owns"`, `"proprietor"`, `"naveen"`, or `"naveen k"`, this specific question instantly filters and displays.
- Keep the main website UI completely clean and free of unsolicited owner banners or cards.

**Step 2: Verification**

Test search query `"owner"` to ensure answer renders seamlessly when asked.

---

### Task 5: Align Private Admin & Invoice Engine

**Files:**
- Modify: `src/lib/invoice-generator.ts`
- Modify: `src/app/admin/page.tsx`

**Step 1: Update private desk records**
- Change internal invoice default from `'Naveen (Manager)'` to `'Naveen K (Owner)'`.
- Update admin desk panel records without altering public frontend styling.

**Step 2: Final Full Build Verification**
Run: `npm run build` or `npx tsc --noEmit`
Expected: 0 errors.
