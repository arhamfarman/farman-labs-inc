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

## Deploying to Cloudflare Workers

The site runs on Cloudflare Workers through the [OpenNext](https://opennext.js.org/cloudflare) adapter (`wrangler.jsonc`, `open-next.config.ts`).

```bash
npm run preview   # build for Workers and run locally in workerd (http://localhost:8787)
npm run deploy    # build and deploy from this machine (needs `npx wrangler login` once)
```

Git deploys use Workers Builds: **Workers & Pages → Create → Workers → Import a repository**, then:

| Setting | Value |
| --- | --- |
| Worker name | `farman-labs-inc` (must match `name` in `wrangler.jsonc`) |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Non-production branch deploy command | `npx opennextjs-cloudflare upload` |
| Root directory | `/` |

Use the OpenNext deploy command, not plain `wrangler deploy`: it also uploads the prerendered pages that `/work/[slug]` is served from. Add `NEXT_PUBLIC_*` values as build variables and the server keys (Supabase, Resend, Turnstile) as runtime variables and secrets under the Worker's settings.

## Before launch

- Copy `.env.example` to `.env.local` (and to Vercel) and fill in Supabase, Resend, Turnstile and the Cal.com link. Without them the form still validates and logs leads to the server console, and the booking tab shows email and phone.
- Replace the demo case study with real ones, and the portrait placeholders with a photo at `public/brand/arham.jpg`.
- Copy marked "Draft" in the code (heritage story, founder bio, FAQ answers) needs Arham's sign-off, as do the open items in the spec.
- Swap `public/brand/logo.png` for an SVG once the vector logo is exported.
