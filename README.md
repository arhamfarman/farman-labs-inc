# farmanlabs.com

Next.js (App Router) + Tailwind site built from the *Farman Labs Website & Services Specification*.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run check:brand  # fails on white-on-orange or any blue class
```

## Where things live

| Path | What |
| --- | --- |
| `tailwind.config.ts` | Brand tokens. The palette replaces Tailwind's, so there is no blue. |
| `lib/services.ts`, `lib/site.ts` | Services, engagement steps, contact details: the copy every page shares |
| `content/work/*.mdx` | Case studies (front-matter + body). `demo: true` shows a "Demo build" label. |
| `components/` | Nav bar, hero, rail, buttons, labelled cells, footer, closing band, architecture diagram |
| `app/contact/actions.ts` | Intake form server action: Zod, honeypot, Turnstile, Supabase insert, Resend emails |
| `supabase/leads.sql` | Table for intake submissions |

## Before launch

- Copy `.env.example` to `.env.local` (and to Vercel) and fill in Supabase, Resend, Turnstile and the Cal.com link. Without them the form still validates and logs leads to the server console, and the booking tab shows email and phone.
- Replace the demo case study with real ones, and the portrait placeholders with a photo at `public/brand/arham.jpg`.
- Copy marked "Draft" in the code (heritage story, founder bio, FAQ answers) needs Arham's sign-off, as do the open items in the spec.
- Swap `public/brand/logo.png` for an SVG once the vector logo is exported.
# farman-labs-inc
