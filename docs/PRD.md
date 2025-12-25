# Product Requirements Document (PRD)
## Aviation Intelligence Platform MVP

### 1. Overview

| Attribute | Value |
|-----------|-------|
| **Product** | Model-first intelligence platform for business aviation |
| **MVP Scope** | Bombardier Challenger 350 dashboard |
| **Target Users** | Aviation buyers, sellers, analysts, brokers |

### 2. Problem Statement

Business aviation stakeholders lack a centralized, data-driven platform for market intelligence. Current solutions are fragmented, outdated, or require manual analysis.

### 3. Goals

1. Provide real-time market position metrics
2. Enable comparative analysis across aircraft models
3. Deliver actionable buy/sell signals
4. Support decision-making with historical trend data

---

## 4. Features

### F1: Authentication
| ID | Requirement |
|----|-------------|
| F1.1 | Email/password registration |
| F1.2 | Email/password login |
| F1.3 | Session persistence |
| F1.4 | Logout functionality |
| F1.5 | Protected route middleware |

### F2: Model Selector
| ID | Requirement |
|----|-------------|
| F2.1 | Dropdown with all aircraft models |
| F2.2 | Persist selection across sessions |
| F2.3 | URL-based model routing |
| F2.4 | Default to Challenger 350 |

### F3: Metric Cards
| ID | Requirement |
|----|-------------|
| F3.1 | Asking Price vs Market (%) |
| F3.2 | Residual Value Strength score |
| F3.3 | Market Activity Score |
| F3.4 | Trend direction indicator (up/down/stable) |
| F3.5 | Hover tooltips with definitions |

### F4: Price Distribution Chart
| ID | Requirement |
|----|-------------|
| F4.1 | Histogram of current listings by price bucket |
| F4.2 | Interactive tooltips on hover |
| F4.3 | Highlight current average price |
| F4.4 | Responsive resize on viewport change |

### F5: Price Trend Chart
| ID | Requirement |
|----|-------------|
| F5.1 | Line chart of historical avg price |
| F5.2 | Min/max price range band |
| F5.3 | Event markers (market events) |
| F5.4 | Zoomable time range |
| F5.5 | Responsive resize |

### F6: Days on Market Chart
| ID | Requirement |
|----|-------------|
| F6.1 | Bar chart of DOM distribution |
| F6.2 | Labeled buckets (0-60, 61-120, etc.) |
| F6.3 | Interactive tooltips |
| F6.4 | Responsive resize |

### F7: Comparative Chart
| ID | Requirement |
|----|-------------|
| F7.1 | Grouped bar comparison vs 2+ models |
| F7.2 | Metrics: price, residual, DOM, fleet % |
| F7.3 | Legend toggle visibility |
| F7.4 | Responsive resize |

### F8: Signal Panel
| ID | Requirement |
|----|-------------|
| F8.1 | List of market signals with status |
| F8.2 | Bullish/Bearish/Neutral indicators |
| F8.3 | Confidence score display |
| F8.4 | Buyer/Seller perspective toggle |
| F8.5 | Short/Long term toggle |
| F8.6 | Filter signals by perspective + timeframe |

### F9: Aircraft Listings Table
| ID | Requirement |
|----|-------------|
| F9.1 | Sortable columns (year, hours, price, DOM) |
| F9.2 | Pagination (10, 25, 50 per page) |
| F9.3 | Status badges (active, pending, sold) |
| F9.4 | Responsive horizontal scroll on mobile |
| F9.5 | Empty state handling |

### F10: Responsive Layout
| ID | Requirement |
|----|-------------|
| F10.1 | Desktop: 2-3 column grid |
| F10.2 | Tablet: 2 column grid |
| F10.3 | Mobile: single column stack |
| F10.4 | Chart resize without distortion |
| F10.5 | Touch-friendly controls |

---

## 5. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Dashboard loads in <2s on 3G |
| **Accessibility** | WCAG 2.1 AA compliance |
| **Security** | RLS on all database tables |
| **Scalability** | Support 100+ aircraft models |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |

---

## 6. Out of Scope (MVP)

- Real-time data streaming
- Admin data entry interface
- Multi-user workspaces
- Email notifications
- PDF report export
- Dark mode

---

## 7. Success Metrics

| Metric | Target |
|--------|--------|
| Dashboard load time | <2 seconds |
| Chart interactivity | <100ms response |
| Mobile usability score | >90 (Lighthouse) |
| Test coverage | >80% |
