# Test-Driven Development Document (TDD)
## Aviation Intelligence Platform

> **Testing Stack**: Jest + React Testing Library + Playwright (E2E)

---

## F1: Authentication (52 Tests)

### Category 1: Registration (12 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F1.1.1 | Valid email + password registers successfully | Happy |
| F1.1.2 | Redirects to dashboard after registration | Happy |
| F1.1.3 | Rejects invalid email format | Edge |
| F1.1.4 | Rejects password < 8 characters | Edge |
| F1.1.5 | Rejects password without number | Edge |
| F1.1.6 | Rejects password without uppercase | Edge |
| F1.1.7 | Rejects duplicate email | Edge |
| F1.1.8 | Handles special characters in email | Edge |
| F1.1.9 | Trims whitespace from email | Edge |
| F1.1.10 | Shows loading state during submission | UI |
| F1.1.11 | Disables button during submission | UI |
| F1.1.12 | Handles network timeout gracefully | Error |

### Category 2: Login (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F1.2.1 | Valid credentials login successfully | Happy |
| F1.2.2 | Redirects to dashboard after login | Happy |
| F1.2.3 | Rejects invalid email | Edge |
| F1.2.4 | Rejects wrong password | Edge |
| F1.2.5 | Rejects non-existent user | Edge |
| F1.2.6 | Case-insensitive email matching | Edge |
| F1.2.7 | Handles SQL injection attempt | Security |
| F1.2.8 | Rate limits after 5 failed attempts | Security |
| F1.2.9 | Shows loading state during submission | UI |
| F1.2.10 | Handles network error gracefully | Error |

### Category 3: Session (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F1.3.1 | Session persists on page refresh | Happy |
| F1.3.2 | Session expires after timeout | Edge |
| F1.3.3 | Session refreshes before expiry | Edge |
| F1.3.4 | Concurrent sessions allowed | Edge |
| F1.3.5 | Session invalidated on logout | Happy |
| F1.3.6 | Cookie set as httpOnly | Security |
| F1.3.7 | Cookie set as secure in production | Security |
| F1.3.8 | Handles corrupted session token | Error |
| F1.3.9 | Redirects to login on expired session | UI |
| F1.3.10 | Clears local state on session end | UI |

### Category 4: Logout (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F1.4.1 | Logout clears session | Happy |
| F1.4.2 | Redirects to login after logout | Happy |
| F1.4.3 | Protected routes inaccessible after logout | Edge |
| F1.4.4 | Back button doesn't restore session | Edge |
| F1.4.5 | Logout from multiple tabs | Edge |
| F1.4.6 | Logout during network error | Error |
| F1.4.7 | Logout button visible when authenticated | UI |
| F1.4.8 | Logout button hidden when unauthenticated | UI |
| F1.4.9 | Confirmation dialog on logout (optional) | UI |
| F1.4.10 | Server session invalidated | Security |

### Category 5: Protected Routes (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F1.5.1 | Dashboard accessible when authenticated | Happy |
| F1.5.2 | Dashboard redirects to login when not authenticated | Happy |
| F1.5.3 | API routes return 401 when not authenticated | Security |
| F1.5.4 | Middleware checks session on every request | Security |
| F1.5.5 | Deep link preserved after login redirect | Edge |
| F1.5.6 | Query params preserved after login redirect | Edge |
| F1.5.7 | Loading state shown during auth check | UI |
| F1.5.8 | Handles middleware timeout | Error |
| F1.5.9 | Static assets accessible without auth | Edge |
| F1.5.10 | API health endpoint accessible without auth | Edge |

---

## F2: Model Selector (50 Tests)

### Category 1: Dropdown Rendering (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F2.1.1 | Renders all available models | Happy |
| F2.1.2 | Shows model name and manufacturer | Happy |
| F2.1.3 | Handles 0 models (empty state) | Edge |
| F2.1.4 | Handles 100+ models (virtualized) | Edge |
| F2.1.5 | Sorts models alphabetically | Edge |
| F2.1.6 | Groups models by manufacturer | Edge |
| F2.1.7 | Shows loading skeleton while fetching | UI |
| F2.1.8 | Handles API error gracefully | Error |
| F2.1.9 | Accessible via keyboard | A11y |
| F2.1.10 | Screen reader announces options | A11y |

### Category 2: Selection (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F2.2.1 | Clicking model updates selection | Happy |
| F2.2.2 | Selection updates dashboard data | Happy |
| F2.2.3 | Keyboard enter selects model | Edge |
| F2.2.4 | Keyboard arrow navigates options | Edge |
| F2.2.5 | Escape closes dropdown | Edge |
| F2.2.6 | Click outside closes dropdown | Edge |
| F2.2.7 | Shows checkmark on selected model | UI |
| F2.2.8 | Handles rapid selection changes | Edge |
| F2.2.9 | Debounces selection events | Edge |
| F2.2.10 | Selection preserved during data loading | UI |

### Category 3: Persistence (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F2.3.1 | Selection persists on page refresh | Happy |
| F2.3.2 | Selection stored in localStorage | Happy |
| F2.3.3 | Handles corrupted localStorage | Error |
| F2.3.4 | Falls back to default if stored model deleted | Edge |
| F2.3.5 | Syncs selection across tabs | Edge |
| F2.3.6 | Clears selection on logout | Edge |
| F2.3.7 | Handles localStorage quota exceeded | Error |
| F2.3.8 | Private browsing mode fallback | Edge |
| F2.3.9 | Migration from old storage format | Edge |
| F2.3.10 | Server-side preference override | Edge |

### Category 4: URL Routing (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F2.4.1 | URL updates with model ID | Happy |
| F2.4.2 | Direct URL navigation loads correct model | Happy |
| F2.4.3 | Invalid model ID shows 404 | Edge |
| F2.4.4 | URL params override localStorage | Edge |
| F2.4.5 | Browser back button works | Edge |
| F2.4.6 | Browser forward button works | Edge |
| F2.4.7 | Shareable URL loads correct model | Happy |
| F2.4.8 | URL encoding handles special characters | Edge |
| F2.4.9 | History state managed correctly | Edge |
| F2.4.10 | No duplicate history entries | Edge |

### Category 5: Default Selection (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F2.5.1 | Defaults to Challenger 350 on first visit | Happy |
| F2.5.2 | Default used when no stored preference | Happy |
| F2.5.3 | Default used when stored model unavailable | Edge |
| F2.5.4 | Handles missing default in database | Error |
| F2.5.5 | Admin can configure default model | Edge |
| F2.5.6 | Default model loads immediately | UI |
| F2.5.7 | No flash of incorrect model | UI |
| F2.5.8 | Default model data pre-fetched | Perf |
| F2.5.9 | SSR returns default model data | Perf |
| F2.5.10 | Hydration matches server render | Edge |

---

## F3: Metric Cards (51 Tests)

### Category 1: Data Display (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F3.1.1 | Displays asking price vs market % | Happy |
| F3.1.2 | Displays residual value strength | Happy |
| F3.1.3 | Displays market activity score | Happy |
| F3.1.4 | Formats large numbers with commas | Edge |
| F3.1.5 | Handles negative percentages | Edge |
| F3.1.6 | Handles zero values | Edge |
| F3.1.7 | Handles null/undefined values | Error |
| F3.1.8 | Rounds to appropriate decimals | Edge |
| F3.1.9 | Shows currency symbol for prices | UI |
| F3.1.10 | Shows percentage symbol for rates | UI |

### Category 2: Trend Indicators (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F3.2.1 | Shows up arrow for positive trend | Happy |
| F3.2.2 | Shows down arrow for negative trend | Happy |
| F3.2.3 | Shows stable icon for no change | Happy |
| F3.2.4 | Green color for positive trends | UI |
| F3.2.5 | Red color for negative trends | UI |
| F3.2.6 | Gray color for stable trends | UI |
| F3.2.7 | Trend calculated from historical data | Edge |
| F3.2.8 | Handles insufficient historical data | Edge |
| F3.2.9 | Trend comparison period configurable | Edge |
| F3.2.10 | Trend animation on change | UI |
| F3.2.11 | Inverted color for below-market (good for buyers) | Edge |

### Category 3: Tooltips (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F3.3.1 | Tooltip appears on hover | Happy |
| F3.3.2 | Tooltip contains metric definition | Happy |
| F3.3.3 | Tooltip dismisses on mouse leave | Happy |
| F3.3.4 | Tooltip accessible via keyboard focus | A11y |
| F3.3.5 | Tooltip position adjusts to viewport | Edge |
| F3.3.6 | Tooltip doesn't overflow screen | Edge |
| F3.3.7 | Touch devices show on tap | Edge |
| F3.3.8 | Multiple tooltips don't stack | Edge |
| F3.3.9 | Tooltip content is screen reader friendly | A11y |
| F3.3.10 | Tooltip has proper z-index | UI |

### Category 4: Loading States (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F3.4.1 | Shows skeleton while loading | Happy |
| F3.4.2 | Skeleton matches card dimensions | UI |
| F3.4.3 | Skeleton animates smoothly | UI |
| F3.4.4 | Data replaces skeleton on load | Happy |
| F3.4.5 | No layout shift on data load | CLS |
| F3.4.6 | Error state shown on fetch failure | Error |
| F3.4.7 | Retry button on error state | Error |
| F3.4.8 | Stale data shown during refetch | Edge |
| F3.4.9 | Loading state during model switch | Edge |
| F3.4.10 | Loading indicator is accessible | A11y |

### Category 5: Responsiveness (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F3.5.1 | 3 cards in row on desktop | Happy |
| F3.5.2 | 2 cards in row on tablet | Happy |
| F3.5.3 | 1 card in row on mobile | Happy |
| F3.5.4 | Card height remains consistent | UI |
| F3.5.5 | Text truncates gracefully | Edge |
| F3.5.6 | Touch targets meet minimum size | A11y |
| F3.5.7 | Resizing doesn't cause reflow | Perf |
| F3.5.8 | Cards maintain aspect ratio | UI |
| F3.5.9 | Print layout is readable | Edge |
| F3.5.10 | High DPI screens render crisply | UI |

---

## F4: Price Distribution Chart (52 Tests)

### Category 1: Histogram Rendering (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F4.1.1 | Renders histogram bars | Happy |
| F4.1.2 | Bar height proportional to count | Happy |
| F4.1.3 | X-axis shows price ranges | Happy |
| F4.1.4 | Y-axis shows count | Happy |
| F4.1.5 | Handles 0 listings (empty state) | Edge |
| F4.1.6 | Handles 1000+ listings | Edge |
| F4.1.7 | Handles negative prices (error) | Error |
| F4.1.8 | Bucket sizes calculated dynamically | Edge |
| F4.1.9 | Outliers handled gracefully | Edge |
| F4.1.10 | Chart renders within container | UI |
| F4.1.11 | Axis labels don't overlap | UI |

### Category 2: Interactivity (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F4.2.1 | Tooltip shows on bar hover | Happy |
| F4.2.2 | Tooltip shows price range | Happy |
| F4.2.3 | Tooltip shows count | Happy |
| F4.2.4 | Tooltip follows cursor | UI |
| F4.2.5 | Bar highlights on hover | UI |
| F4.2.6 | Touch devices show tooltip on tap | Edge |
| F4.2.7 | Tooltip dismisses on leave | Happy |
| F4.2.8 | Keyboard navigation works | A11y |
| F4.2.9 | Focus ring visible on bars | A11y |
| F4.2.10 | Click bar filters table (optional) | Edge |

### Category 3: Average Price Marker (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F4.3.1 | Vertical line shows average price | Happy |
| F4.3.2 | Label shows average value | Happy |
| F4.3.3 | Marker positioned correctly | Happy |
| F4.3.4 | Marker visible above bars | UI |
| F4.3.5 | Marker color contrasts with bars | UI |
| F4.3.6 | Marker label doesn't overlap axis | Edge |
| F4.3.7 | Marker updates on data change | Edge |
| F4.3.8 | Marker animated on change | UI |
| F4.3.9 | Marker visible on mobile | Edge |
| F4.3.10 | Marker tooltip on hover | Edge |

### Category 4: Responsiveness (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F4.4.1 | Chart resizes with container | Happy |
| F4.4.2 | Bars scale proportionally | Happy |
| F4.4.3 | Labels resize appropriately | Happy |
| F4.4.4 | Mobile shows fewer x-axis labels | Edge |
| F4.4.5 | Orientation change handled | Edge |
| F4.4.6 | Window resize debounced | Perf |
| F4.4.7 | No layout shift during resize | CLS |
| F4.4.8 | Touch scrolling doesn't interfere | Edge |
| F4.4.9 | Chart maintains aspect ratio | UI |
| F4.4.10 | Print renders correctly | Edge |
| F4.4.11 | SVG exports cleanly | Edge |

### Category 5: Data Updates (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F4.5.1 | Chart updates on model change | Happy |
| F4.5.2 | Animation on data update | UI |
| F4.5.3 | Loading state during update | UI |
| F4.5.4 | Error state on failed update | Error |
| F4.5.5 | Stale data shown during refetch | Edge |
| F4.5.6 | Handles rapid model switches | Edge |
| F4.5.7 | Cancels pending requests on switch | Perf |
| F4.5.8 | Memory cleaned up on unmount | Perf |
| F4.5.9 | SSR hydration matches client | Edge |
| F4.5.10 | Chart re-renders efficiently | Perf |

---

## F5: Price Trend Chart (52 Tests)

### Category 1: Line Rendering (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F5.1.1 | Renders price trend line | Happy |
| F5.1.2 | X-axis shows dates | Happy |
| F5.1.3 | Y-axis shows prices | Happy |
| F5.1.4 | Line smoothly connects points | UI |
| F5.1.5 | Handles single data point | Edge |
| F5.1.6 | Handles 100+ data points | Edge |
| F5.1.7 | Handles gaps in data | Edge |
| F5.1.8 | Date format is locale-aware | i18n |
| F5.1.9 | Price format includes currency | UI |
| F5.1.10 | Axis ticks calculated dynamically | Edge |
| F5.1.11 | Zero baseline handling | Edge |

### Category 2: Range Band (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F5.2.1 | Shaded area shows min/max range | Happy |
| F5.2.2 | Band follows trend line | Happy |
| F5.2.3 | Band color has transparency | UI |
| F5.2.4 | Band doesn't obscure line | UI |
| F5.2.5 | Tooltip shows min/max on hover | Edge |
| F5.2.6 | Band handles missing min/max | Error |
| F5.2.7 | Band handles min = max | Edge |
| F5.2.8 | Band toggle on/off | Edge |
| F5.2.9 | Legend indicates band meaning | UI |
| F5.2.10 | Band scales with zoom | Edge |

### Category 3: Event Markers (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F5.3.1 | Markers show on event dates | Happy |
| F5.3.2 | Marker icon distinguishes type | UI |
| F5.3.3 | Tooltip shows event description | Happy |
| F5.3.4 | Multiple events on same date | Edge |
| F5.3.5 | Markers don't overlap line | UI |
| F5.3.6 | Markers clickable for details | Edge |
| F5.3.7 | Handles 0 events | Edge |
| F5.3.8 | Handles 20+ events | Edge |
| F5.3.9 | Markers visible at all zoom levels | Edge |
| F5.3.10 | Event filter options | Edge |
| F5.3.11 | Keyboard accessible markers | A11y |

### Category 4: Zoom/Pan (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F5.4.1 | Zoom in on date range | Happy |
| F5.4.2 | Zoom out to full range | Happy |
| F5.4.3 | Pan left/right | Happy |
| F5.4.4 | Pinch zoom on touch | Edge |
| F5.4.5 | Mouse wheel zoom | Edge |
| F5.4.6 | Zoom limit prevents over-zoom | Edge |
| F5.4.7 | Reset zoom button | UI |
| F5.4.8 | Zoom state preserved on update | Edge |
| F5.4.9 | Smooth zoom animation | UI |
| F5.4.10 | Zoom accessible via keyboard | A11y |

### Category 5: Responsiveness (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F5.5.1 | Chart resizes with container | Happy |
| F5.5.2 | Mobile shows simplified axis | Edge |
| F5.5.3 | Touch scrolling works | Edge |
| F5.5.4 | No interference with page scroll | Edge |
| F5.5.5 | Legend repositions on mobile | UI |
| F5.5.6 | Tooltips fit viewport | Edge |
| F5.5.7 | Chart loads progressively | Perf |
| F5.5.8 | Resize throttled | Perf |
| F5.5.9 | Print mode disables interactivity | Edge |
| F5.5.10 | High DPI rendering | UI |

---

## F6: Days on Market Chart (50 Tests)

### Category 1: Bar Rendering (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F6.1.1 | Renders bars for each bucket | Happy |
| F6.1.2 | X-axis shows DOM ranges | Happy |
| F6.1.3 | Y-axis shows aircraft count | Happy |
| F6.1.4 | Bars ordered by bucket | Happy |
| F6.1.5 | Handles empty buckets | Edge |
| F6.1.6 | Handles single bucket | Edge |
| F6.1.7 | Handles 20+ buckets | Edge |
| F6.1.8 | Bar width calculated dynamically | Edge |
| F6.1.9 | Bar color consistent | UI |
| F6.1.10 | Grid lines visible | UI |

### Category 2: Labels (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F6.2.1 | Bucket labels readable | Happy |
| F6.2.2 | Labels don't overlap | UI |
| F6.2.3 | Labels rotate on overflow | Edge |
| F6.2.4 | Average DOM line labeled | Happy |
| F6.2.5 | Count labels above bars | Edge |
| F6.2.6 | Labels truncate gracefully | Edge |
| F6.2.7 | Label font scales with chart | UI |
| F6.2.8 | Labels accessible to screen readers | A11y |
| F6.2.9 | Custom bucket labels supported | Edge |
| F6.2.10 | RTL language support | i18n |

### Category 3: Tooltips (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F6.3.1 | Tooltip on bar hover | Happy |
| F6.3.2 | Tooltip shows range and count | Happy |
| F6.3.3 | Tooltip shows percentage | Edge |
| F6.3.4 | Tooltip positions correctly | UI |
| F6.3.5 | Touch tooltip works | Edge |
| F6.3.6 | Multiple bar hover transition | UI |
| F6.3.7 | Tooltip content customizable | Edge |
| F6.3.8 | Tooltip style matches brand | UI |
| F6.3.9 | Tooltip z-index correct | UI |
| F6.3.10 | Tooltip accessible | A11y |

### Category 4: Responsiveness (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F6.4.1 | Chart resizes with container | Happy |
| F6.4.2 | Bars resize proportionally | Happy |
| F6.4.3 | Mobile hides some labels | Edge |
| F6.4.4 | Horizontal scroll on overflow | Edge |
| F6.4.5 | Touch targets adequate | A11y |
| F6.4.6 | No layout shift on resize | CLS |
| F6.4.7 | Orientation change handled | Edge |
| F6.4.8 | Consistent padding | UI |
| F6.4.9 | Print layout correct | Edge |
| F6.4.10 | Chart reflows efficiently | Perf |

### Category 5: Data Updates (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F6.5.1 | Chart updates on model change | Happy |
| F6.5.2 | Animation on data update | UI |
| F6.5.3 | Loading skeleton shown | UI |
| F6.5.4 | Error state displayed | Error |
| F6.5.5 | Stale-while-revalidate | Edge |
| F6.5.6 | Rapid switches handled | Edge |
| F6.5.7 | Memory leak prevention | Perf |
| F6.5.8 | SSR renders correctly | Edge |
| F6.5.9 | Hydration mismatch prevented | Edge |
| F6.5.10 | Rerender count optimized | Perf |

---

## F7: Comparative Chart (50 Tests)

### Category 1: Grouped Bar Rendering (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F7.1.1 | Renders grouped bars per metric | Happy |
| F7.1.2 | Each model has distinct color | Happy |
| F7.1.3 | X-axis shows metrics | Happy |
| F7.1.4 | Y-axis scales to data | Happy |
| F7.1.5 | Handles 2 models | Happy |
| F7.1.6 | Handles 5+ models | Edge |
| F7.1.7 | Handles missing model data | Error |
| F7.1.8 | Bar groups have spacing | UI |
| F7.1.9 | Colors are accessible | A11y |
| F7.1.10 | Patterns for color blindness | A11y |

### Category 2: Metrics (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F7.2.1 | Price metric displayed | Happy |
| F7.2.2 | Residual value displayed | Happy |
| F7.2.3 | DOM metric displayed | Happy |
| F7.2.4 | Fleet % displayed | Happy |
| F7.2.5 | Different scales handled | Edge |
| F7.2.6 | Normalized comparison option | Edge |
| F7.2.7 | Metric toggle visibility | Edge |
| F7.2.8 | Metric sort order | Edge |
| F7.2.9 | Custom metrics supported | Edge |
| F7.2.10 | Metric units displayed | UI |

### Category 3: Legend (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F7.3.1 | Legend shows all models | Happy |
| F7.3.2 | Legend matches bar colors | Happy |
| F7.3.3 | Click legend toggles model | Happy |
| F7.3.4 | Hidden model bars disappear | UI |
| F7.3.5 | At least one model required | Edge |
| F7.3.6 | Legend wraps on overflow | Edge |
| F7.3.7 | Legend position configurable | Edge |
| F7.3.8 | Keyboard toggles legend items | A11y |
| F7.3.9 | Legend state persisted | Edge |
| F7.3.10 | Legend tooltip on truncation | Edge |

### Category 4: Tooltips (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F7.4.1 | Tooltip on bar hover | Happy |
| F7.4.2 | Tooltip shows model + metric | Happy |
| F7.4.3 | Tooltip shows value | Happy |
| F7.4.4 | Tooltip shows % difference | Edge |
| F7.4.5 | Tooltip for grouped bars | Edge |
| F7.4.6 | Touch tooltip works | Edge |
| F7.4.7 | Tooltip formatted correctly | UI |
| F7.4.8 | Tooltip doesn't overflow | Edge |
| F7.4.9 | Tooltip has proper z-index | UI |
| F7.4.10 | Screen reader announces values | A11y |

### Category 5: Responsiveness (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F7.5.1 | Chart resizes correctly | Happy |
| F7.5.2 | Mobile stacks bars vertically | Edge |
| F7.5.3 | Touch interact works | Edge |
| F7.5.4 | Labels fit container | Edge |
| F7.5.5 | Legend moves below on mobile | UI |
| F7.5.6 | No horizontal overflow | UI |
| F7.5.7 | Resize animation smooth | UI |
| F7.5.8 | Print renders all models | Edge |
| F7.5.9 | High DPI support | UI |
| F7.5.10 | Performance on resize | Perf |

---

## F8: Signal Panel (54 Tests)

### Category 1: Signal Display (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F8.1.1 | Renders list of signals | Happy |
| F8.1.2 | Signal label displayed | Happy |
| F8.1.3 | Signal value shown (bullish/bearish/neutral) | Happy |
| F8.1.4 | Visual indicator matches value | UI |
| F8.1.5 | Green for bullish | UI |
| F8.1.6 | Red for bearish | UI |
| F8.1.7 | Gray for neutral | UI |
| F8.1.8 | Handles empty signals list | Edge |
| F8.1.9 | Handles 20+ signals | Edge |
| F8.1.10 | Signals sorted consistently | Edge |
| F8.1.11 | Signal icon/emoji displayed | UI |

### Category 2: Confidence Scores (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F8.2.1 | Confidence score displayed | Happy |
| F8.2.2 | Score shown as percentage | UI |
| F8.2.3 | Progress bar for score | UI |
| F8.2.4 | Handles 0% confidence | Edge |
| F8.2.5 | Handles 100% confidence | Edge |
| F8.2.6 | Color gradient by confidence | UI |
| F8.2.7 | Tooltip explains confidence | Edge |
| F8.2.8 | Score animation on load | UI |
| F8.2.9 | Score accessible to screen readers | A11y |
| F8.2.10 | Handles null confidence | Error |

### Category 3: Perspective Toggle (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F8.3.1 | Buyer/Seller toggle visible | Happy |
| F8.3.2 | Default to buyer perspective | Happy |
| F8.3.3 | Toggle switches signals shown | Happy |
| F8.3.4 | Only relevant signals displayed | Edge |
| F8.3.5 | Toggle state persisted | Edge |
| F8.3.6 | Toggle is accessible | A11y |
| F8.3.7 | Keyboard toggle works | A11y |
| F8.3.8 | Toggle animation smooth | UI |
| F8.3.9 | Both perspectives shows all | Edge |
| F8.3.10 | URL reflects perspective | Edge |
| F8.3.11 | Empty state per perspective | Edge |

### Category 4: Timeframe Toggle (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F8.4.1 | Short/Long term toggle visible | Happy |
| F8.4.2 | Default to short term | Happy |
| F8.4.3 | Toggle filters signals | Happy |
| F8.4.4 | Combined with perspective filter | Edge |
| F8.4.5 | Toggle state persisted | Edge |
| F8.4.6 | Toggle is accessible | A11y |
| F8.4.7 | Keyboard toggle works | A11y |
| F8.4.8 | Toggle animation smooth | UI |
| F8.4.9 | Both timeframes shows all | Edge |
| F8.4.10 | URL reflects timeframe | Edge |
| F8.4.11 | Empty state per timeframe | Edge |

### Category 5: Responsiveness (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F8.5.1 | Panel fits container | Happy |
| F8.5.2 | Scrollable on overflow | UI |
| F8.5.3 | Toggles stack on mobile | Edge |
| F8.5.4 | Touch targets adequate | A11y |
| F8.5.5 | Signal items wrap correctly | Edge |
| F8.5.6 | Confidence bar scales | UI |
| F8.5.7 | No horizontal overflow | UI |
| F8.5.8 | Print layout readable | Edge |
| F8.5.9 | Collapsible on mobile | Edge |
| F8.5.10 | Loading skeleton matches layout | UI |
| F8.5.11 | Error state handled | Error |

---

## F9: Aircraft Listings Table (55 Tests)

### Category 1: Data Display (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F9.1.1 | Renders all columns | Happy |
| F9.1.2 | Serial number displayed | Happy |
| F9.1.3 | Year displayed | Happy |
| F9.1.4 | Hours displayed | Happy |
| F9.1.5 | Price formatted as currency | UI |
| F9.1.6 | DOM displayed | Happy |
| F9.1.7 | Location displayed | Happy |
| F9.1.8 | Status badge displayed | Happy |
| F9.1.9 | Handles null values gracefully | Edge |
| F9.1.10 | Handles 0 listings (empty) | Edge |
| F9.1.11 | Handles 1000+ listings | Edge |

### Category 2: Sorting (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F9.2.1 | Click header sorts column | Happy |
| F9.2.2 | Ascending sort first click | Happy |
| F9.2.3 | Descending sort second click | Happy |
| F9.2.4 | Third click removes sort | Edge |
| F9.2.5 | Sort indicator visible | UI |
| F9.2.6 | Multi-column sort (shift+click) | Edge |
| F9.2.7 | Sort persists on pagination | Edge |
| F9.2.8 | Sort persists on model change | Edge |
| F9.2.9 | Keyboard sort triggers | A11y |
| F9.2.10 | Null values sort last | Edge |
| F9.2.11 | Sort URL encoded | Edge |

### Category 3: Pagination (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F9.3.1 | Default 10 items per page | Happy |
| F9.3.2 | Page selector works | Happy |
| F9.3.3 | Prev/Next buttons work | Happy |
| F9.3.4 | Page size options (10, 25, 50) | Happy |
| F9.3.5 | Handles last page with fewer items | Edge |
| F9.3.6 | Shows total count | UI |
| F9.3.7 | Jump to page input | Edge |
| F9.3.8 | Keyboard navigation | A11y |
| F9.3.9 | Page persists on sort | Edge |
| F9.3.10 | Page resets on model change | Edge |
| F9.3.11 | URL encodes page state | Edge |

### Category 4: Status Badges (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F9.4.1 | Active badge green | UI |
| F9.4.2 | Pending badge yellow | UI |
| F9.4.3 | Sold badge gray | UI |
| F9.4.4 | Withdrawn badge red | UI |
| F9.4.5 | Badge accessible colors | A11y |
| F9.4.6 | Badge tooltip explains status | Edge |
| F9.4.7 | Filter by status | Edge |
| F9.4.8 | Status count shown | Edge |
| F9.4.9 | Unknown status handled | Error |
| F9.4.10 | Status icon + text | UI |
| F9.4.11 | Status change animation | UI |

### Category 5: Responsiveness (11 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F9.5.1 | Table scrolls horizontally on mobile | Happy |
| F9.5.2 | Sticky first column | Edge |
| F9.5.3 | Column resize handles | Edge |
| F9.5.4 | Hide columns on mobile | Edge |
| F9.5.5 | Touch scroll smooth | Edge |
| F9.5.6 | Row height consistent | UI |
| F9.5.7 | Alternating row colors | UI |
| F9.5.8 | Hover row highlight | UI |
| F9.5.9 | Print shows all columns | Edge |
| F9.5.10 | Loading skeleton matches | UI |
| F9.5.11 | Error state displayed | Error |

---

## F10: Responsive Layout (50 Tests)

### Category 1: Desktop Layout (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F10.1.1 | 3 metric cards in row | Happy |
| F10.1.2 | 2 charts per row | Happy |
| F10.1.3 | Signal panel + table side by side | Happy |
| F10.1.4 | Header fixed on scroll | Happy |
| F10.1.5 | Sidebar visible | Edge |
| F10.1.6 | Min-width breakpoint works | Edge |
| F10.1.7 | Max content width applied | UI |
| F10.1.8 | Consistent padding/margins | UI |
| F10.1.9 | Grid gaps consistent | UI |
| F10.1.10 | Scroll behavior smooth | UI |

### Category 2: Tablet Layout (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F10.2.1 | 2 metric cards in row | Happy |
| F10.2.2 | Charts stack or 2 per row | Happy |
| F10.2.3 | Signal panel full width | Happy |
| F10.2.4 | Table scrolls horizontally | Happy |
| F10.2.5 | Header responsive | Edge |
| F10.2.6 | Sidebar collapses to hamburger | Edge |
| F10.2.7 | Touch targets adequate | A11y |
| F10.2.8 | Portrait orientation works | Edge |
| F10.2.9 | Landscape orientation works | Edge |
| F10.2.10 | Breakpoint transitions smooth | UI |

### Category 3: Mobile Layout (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F10.3.1 | Single column stack | Happy |
| F10.3.2 | Metric cards stack | Happy |
| F10.3.3 | Charts full width | Happy |
| F10.3.4 | Table scrollable | Happy |
| F10.3.5 | Model selector accessible | UI |
| F10.3.6 | Bottom navigation (optional) | Edge |
| F10.3.7 | Touch scrolling smooth | Edge |
| F10.3.8 | No horizontal overflow | UI |
| F10.3.9 | Font sizes readable | UI |
| F10.3.10 | Buttons have adequate size | A11y |

### Category 4: Chart Responsiveness (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F10.4.1 | Charts resize with container | Happy |
| F10.4.2 | Aspect ratio maintained | Happy |
| F10.4.3 | Labels scale appropriately | Edge |
| F10.4.4 | Tooltips fit viewport | Edge |
| F10.4.5 | No distortion on resize | UI |
| F10.4.6 | Resize debounced | Perf |
| F10.4.7 | No layout shift (CLS) | Perf |
| F10.4.8 | Legend repositions | Edge |
| F10.4.9 | Interactive even when small | Edge |
| F10.4.10 | Minimum size enforced | Edge |

### Category 5: Touch Interaction (10 tests)
| ID | Test Case | Type |
|----|-----------|------|
| F10.5.1 | Tap works like click | Happy |
| F10.5.2 | Long press shows tooltip | Edge |
| F10.5.3 | Swipe scrolls page | Happy |
| F10.5.4 | Pinch zoom on charts | Edge |
| F10.5.5 | Double tap zoom | Edge |
| F10.5.6 | Gesture conflicts prevented | Edge |
| F10.5.7 | Touch feedback visible | UI |
| F10.5.8 | Pull to refresh (optional) | Edge |
| F10.5.9 | Touch targets 44px minimum | A11y |
| F10.5.10 | No ghost clicks | Edge |

---

## Test Summary

| Feature | Tests | Categories |
|---------|-------|------------|
| F1: Authentication | 52 | 5 |
| F2: Model Selector | 50 | 5 |
| F3: Metric Cards | 51 | 5 |
| F4: Price Distribution | 52 | 5 |
| F5: Price Trend | 52 | 5 |
| F6: Days on Market | 50 | 5 |
| F7: Comparative Chart | 50 | 5 |
| F8: Signal Panel | 54 | 5 |
| F9: Aircraft Table | 55 | 5 |
| F10: Responsive Layout | 50 | 5 |
| **TOTAL** | **516** | **50** |

---

## Test Type Legend

| Type | Description |
|------|-------------|
| Happy | Normal expected behavior |
| Edge | Boundary/unusual conditions |
| Error | Error handling |
| UI | Visual/interaction |
| A11y | Accessibility |
| Perf | Performance |
| Security | Security-related |
| CLS | Cumulative Layout Shift |
| i18n | Internationalization |
