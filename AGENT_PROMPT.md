# Aviation Intelligence Platform - Agent Initialization Prompt

## YOUR ROLE - INITIALIZER AGENT (Session 1 of Many)

You are the FIRST agent in a long-running autonomous development process.
Your job is to set up the foundation for all future coding agents.

---

## FIRST: Read the Project Documentation

Read these files in order before proceeding:

1. **`Job_summary.md`** - Client requirements and tech stack preferences
2. **`dashboard_mock.png`** - Visual design reference for the dashboard
3. **`docs/PRD.md`** - Product Requirements with 10 features and 50+ requirements
4. **`docs/ADD.md`** - Architecture Design with directory structure and code guidelines
5. **`docs/TDD.md`** - Test-Driven Development with 516 edge case tests

---

## CRITICAL CODE GUIDELINES (from ADD.md)

**No file may exceed 350 lines of code.**

When approaching 350 lines, refactor immediately:

| File Type | Split Trigger | Refactor Pattern |
|-----------|---------------|------------------|
| Component | >200 lines | Extract sub-components |
| Hook | >100 lines | Split by concern |
| Utils | >150 lines | Split by domain |
| Types | >100 lines | Split by entity |
| API Route | >150 lines | Extract handlers |

---

## SECOND: Create feature_list.json (From TDD.md)

The `docs/TDD.md` file contains 516 pre-defined test cases organized by feature.
Transform these into `feature_list.json`:

**Format:**
```json
[
  {
    "id": "F1.1.1",
    "feature": "F1: Authentication",
    "category": "Registration",
    "type": "Happy",
    "description": "Valid email + password registers successfully",
    "steps": [
      "Navigate to /signup",
      "Enter valid email address",
      "Enter password meeting requirements",
      "Submit registration form",
      "Verify redirect to dashboard"
    ],
    "passes": false
  }
]
```

**Requirements:**
- Extract ALL 516 tests from TDD.md
- Preserve feature IDs (F1.1.1, F1.1.2, etc.)
- Preserve category and type labels
- Expand each test into executable steps
- ALL tests start with `"passes": false`

**CRITICAL INSTRUCTION:**
IT IS CATASTROPHIC TO REMOVE OR EDIT FEATURES IN FUTURE SESSIONS.
Features can ONLY be marked as passing (`"passes": false` → `"passes": true`).
Never remove features, never edit descriptions, never modify steps.

---

## THIRD: Create init.sh

Based on the tech stack in PRD.md and ADD.md:

```bash
#!/bin/bash
# Aviation Intelligence Platform - Development Setup

# 1. Install dependencies
npm install

# 2. Start Docker Supabase (dev/staging)
docker-compose up -d

# 3. Run database migrations
npm run db:migrate

# 4. Seed mock data
npm run db:seed

# 5. Start development server
npm run dev

# Access points:
# - App: http://localhost:3000
# - Supabase Studio: http://localhost:54323
```

---

## FOURTH: Initialize Project Structure (from ADD.md)

Create the directory structure exactly as specified in `docs/ADD.md`:

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/          # Dashboard components
│   │   ├── charts/         # Chart sub-components
│   │   ├── signal-panel/   # Signal panel sub-components
│   │   └── aircraft-table/ # Table sub-components
│   └── layout/
├── lib/
│   ├── supabase/
│   ├── mock-data/          # Split by entity
│   └── utils/
├── hooks/
└── types/
```

---

## FIFTH: Initialize Git

Create git repository with first commit:

```bash
git init
git add .
git commit -m "Initial setup: project structure, feature_list.json, documentation"
```

---

## SIXTH: Create Mock Data (Frontend-First)

Before touching Supabase, create TypeScript mock data in `src/lib/mock-data/`:

| File | Content | Max Lines |
|------|---------|-----------|
| `index.ts` | Re-exports | 30 |
| `models.ts` | Aircraft models | 50 |
| `metrics.ts` | Market metrics | 100 |
| `distributions.ts` | Price/DOM buckets | 80 |
| `trends.ts` | Historical prices | 100 |
| `signals.ts` | Signal states | 80 |
| `listings.ts` | Aircraft listings | 150 |

Reference `supabase/seed.sql` for real market data values.

---

## IMPLEMENTATION ORDER (from PRD.md)

Build features in this priority:

| Phase | Features | Approach |
|-------|----------|----------|
| 1 | F2 (Model Selector), F10 (Layout) | Structure first |
| 2 | F3 (Metric Cards) | Simple components |
| 3 | F4, F5, F6, F7 (Charts) | Data visualization |
| 4 | F8 (Signal Panel), F9 (Table) | Complex components |
| 5 | F1 (Authentication) | Backend integration |

---

## SESSION END PROTOCOL

Before context fills up:

1. **Commit all work** with descriptive messages
2. **Create `agent-progress.md`** with:
   - Features completed (IDs from TDD.md)
   - Features in progress
   - Blockers or decisions needed
   - Next priority items
3. **Update `feature_list.json`** - mark passing tests
4. **Leave environment clean** - no broken builds

---

## ENVIRONMENT SETUP

| Environment | Database | Hosting |
|-------------|----------|---------|
| Development | Docker Supabase | localhost:3000 |
| Staging | Docker Supabase | localhost:3001 |
| Production | Self-hosted Supabase | Vercel |

---

## FILE SIZE VIGILANCE

After every file edit, check line count:
- **>300 lines**: Plan refactoring
- **>350 lines**: STOP and refactor immediately

Use the patterns in `docs/ADD.md` for splitting files.

---

## REFERENCE FILES

| File | Purpose |
|------|---------|
| `Job_summary.md` | Client requirements |
| `dashboard_mock.png` | Visual design |
| `docs/PRD.md` | Features & requirements |
| `docs/ADD.md` | Architecture & refactoring |
| `docs/TDD.md` | 516 test cases |
| `supabase/schema.sql` | Database schema |
| `supabase/seed.sql` | Real market data |

---

**Remember:** You have unlimited time across many sessions.
Quality over speed. Production-ready is the goal.
Reference the dashboard mock for visual fidelity.
