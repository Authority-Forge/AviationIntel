"""
Generate feature_list.json from TDD.md test specifications.
Run this once to create the complete 516 test feature list.
"""
import json

# All test data extracted from TDD.md
tests = []

# F1: Authentication (52 tests)
f1_tests = [
    # Registration (12)
    ("F1.1.1", "Registration", "Happy", "Valid email + password registers successfully"),
    ("F1.1.2", "Registration", "Happy", "Redirects to dashboard after registration"),
    ("F1.1.3", "Registration", "Edge", "Rejects invalid email format"),
    ("F1.1.4", "Registration", "Edge", "Rejects password < 8 characters"),
    ("F1.1.5", "Registration", "Edge", "Rejects password without number"),
    ("F1.1.6", "Registration", "Edge", "Rejects password without uppercase"),
    ("F1.1.7", "Registration", "Edge", "Rejects duplicate email"),
    ("F1.1.8", "Registration", "Edge", "Handles special characters in email"),
    ("F1.1.9", "Registration", "Edge", "Trims whitespace from email"),
    ("F1.1.10", "Registration", "UI", "Shows loading state during submission"),
    ("F1.1.11", "Registration", "UI", "Disables button during submission"),
    ("F1.1.12", "Registration", "Error", "Handles network timeout gracefully"),
    # Login (10)
    ("F1.2.1", "Login", "Happy", "Valid credentials login successfully"),
    ("F1.2.2", "Login", "Happy", "Redirects to dashboard after login"),
    ("F1.2.3", "Login", "Edge", "Rejects invalid email"),
    ("F1.2.4", "Login", "Edge", "Rejects wrong password"),
    ("F1.2.5", "Login", "Edge", "Rejects non-existent user"),
    ("F1.2.6", "Login", "Edge", "Case-insensitive email matching"),
    ("F1.2.7", "Login", "Security", "Handles SQL injection attempt"),
    ("F1.2.8", "Login", "Security", "Rate limits after 5 failed attempts"),
    ("F1.2.9", "Login", "UI", "Shows loading state during submission"),
    ("F1.2.10", "Login", "Error", "Handles network error gracefully"),
    # Session (10)
    ("F1.3.1", "Session", "Happy", "Session persists on page refresh"),
    ("F1.3.2", "Session", "Edge", "Session expires after timeout"),
    ("F1.3.3", "Session", "Edge", "Session refreshes before expiry"),
    ("F1.3.4", "Session", "Edge", "Concurrent sessions allowed"),
    ("F1.3.5", "Session", "Happy", "Session invalidated on logout"),
    ("F1.3.6", "Session", "Security", "Cookie set as httpOnly"),
    ("F1.3.7", "Session", "Security", "Cookie set as secure in production"),
    ("F1.3.8", "Session", "Error", "Handles corrupted session token"),
    ("F1.3.9", "Session", "UI", "Redirects to login on expired session"),
    ("F1.3.10", "Session", "UI", "Clears local state on session end"),
    # Logout (10)
    ("F1.4.1", "Logout", "Happy", "Logout clears session"),
    ("F1.4.2", "Logout", "Happy", "Redirects to login after logout"),
    ("F1.4.3", "Logout", "Edge", "Protected routes inaccessible after logout"),
    ("F1.4.4", "Logout", "Edge", "Back button doesn't restore session"),
    ("F1.4.5", "Logout", "Edge", "Logout from multiple tabs"),
    ("F1.4.6", "Logout", "Error", "Logout during network error"),
    ("F1.4.7", "Logout", "UI", "Logout button visible when authenticated"),
    ("F1.4.8", "Logout", "UI", "Logout button hidden when unauthenticated"),
    ("F1.4.9", "Logout", "UI", "Confirmation dialog on logout (optional)"),
    ("F1.4.10", "Logout", "Security", "Server session invalidated"),
    # Protected Routes (10)
    ("F1.5.1", "Protected Routes", "Happy", "Dashboard accessible when authenticated"),
    ("F1.5.2", "Protected Routes", "Happy", "Dashboard redirects to login when not authenticated"),
    ("F1.5.3", "Protected Routes", "Security", "API routes return 401 when not authenticated"),
    ("F1.5.4", "Protected Routes", "Security", "Middleware checks session on every request"),
    ("F1.5.5", "Protected Routes", "Edge", "Deep link preserved after login redirect"),
    ("F1.5.6", "Protected Routes", "Edge", "Query params preserved after login redirect"),
    ("F1.5.7", "Protected Routes", "UI", "Loading state shown during auth check"),
    ("F1.5.8", "Protected Routes", "Error", "Handles middleware timeout"),
    ("F1.5.9", "Protected Routes", "Edge", "Static assets accessible without auth"),
    ("F1.5.10", "Protected Routes", "Edge", "API health endpoint accessible without auth"),
]

for id, cat, typ, desc in f1_tests:
    tests.append({"id": id, "feature": "F1: Authentication", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F2: Model Selector (50 tests)
f2_tests = [
    # Dropdown Rendering (10)
    ("F2.1.1", "Dropdown Rendering", "Happy", "Renders all available models"),
    ("F2.1.2", "Dropdown Rendering", "Happy", "Shows model name and manufacturer"),
    ("F2.1.3", "Dropdown Rendering", "Edge", "Handles 0 models (empty state)"),
    ("F2.1.4", "Dropdown Rendering", "Edge", "Handles 100+ models (virtualized)"),
    ("F2.1.5", "Dropdown Rendering", "Edge", "Sorts models alphabetically"),
    ("F2.1.6", "Dropdown Rendering", "Edge", "Groups models by manufacturer"),
    ("F2.1.7", "Dropdown Rendering", "UI", "Shows loading skeleton while fetching"),
    ("F2.1.8", "Dropdown Rendering", "Error", "Handles API error gracefully"),
    ("F2.1.9", "Dropdown Rendering", "A11y", "Accessible via keyboard"),
    ("F2.1.10", "Dropdown Rendering", "A11y", "Screen reader announces options"),
    # Selection (10)
    ("F2.2.1", "Selection", "Happy", "Clicking model updates selection"),
    ("F2.2.2", "Selection", "Happy", "Selection updates dashboard data"),
    ("F2.2.3", "Selection", "Edge", "Keyboard enter selects model"),
    ("F2.2.4", "Selection", "Edge", "Keyboard arrow navigates options"),
    ("F2.2.5", "Selection", "Edge", "Escape closes dropdown"),
    ("F2.2.6", "Selection", "Edge", "Click outside closes dropdown"),
    ("F2.2.7", "Selection", "UI", "Shows checkmark on selected model"),
    ("F2.2.8", "Selection", "Edge", "Handles rapid selection changes"),
    ("F2.2.9", "Selection", "Edge", "Debounces selection events"),
    ("F2.2.10", "Selection", "UI", "Selection preserved during data loading"),
    # Persistence (10)
    ("F2.3.1", "Persistence", "Happy", "Selection persists on page refresh"),
    ("F2.3.2", "Persistence", "Happy", "Selection stored in localStorage"),
    ("F2.3.3", "Persistence", "Error", "Handles corrupted localStorage"),
    ("F2.3.4", "Persistence", "Edge", "Falls back to default if stored model deleted"),
    ("F2.3.5", "Persistence", "Edge", "Syncs selection across tabs"),
    ("F2.3.6", "Persistence", "Edge", "Clears selection on logout"),
    ("F2.3.7", "Persistence", "Error", "Handles localStorage quota exceeded"),
    ("F2.3.8", "Persistence", "Edge", "Private browsing mode fallback"),
    ("F2.3.9", "Persistence", "Edge", "Migration from old storage format"),
    ("F2.3.10", "Persistence", "Edge", "Server-side preference override"),
    # URL Routing (10)
    ("F2.4.1", "URL Routing", "Happy", "URL updates with model ID"),
    ("F2.4.2", "URL Routing", "Happy", "Direct URL navigation loads correct model"),
    ("F2.4.3", "URL Routing", "Edge", "Invalid model ID shows 404"),
    ("F2.4.4", "URL Routing", "Edge", "URL params override localStorage"),
    ("F2.4.5", "URL Routing", "Edge", "Browser back button works"),
    ("F2.4.6", "URL Routing", "Edge", "Browser forward button works"),
    ("F2.4.7", "URL Routing", "Happy", "Shareable URL loads correct model"),
    ("F2.4.8", "URL Routing", "Edge", "URL encoding handles special characters"),
    ("F2.4.9", "URL Routing", "Edge", "History state managed correctly"),
    ("F2.4.10", "URL Routing", "Edge", "No duplicate history entries"),
    # Default Selection (10)
    ("F2.5.1", "Default Selection", "Happy", "Defaults to Challenger 350 on first visit"),
    ("F2.5.2", "Default Selection", "Happy", "Default used when no stored preference"),
    ("F2.5.3", "Default Selection", "Edge", "Default used when stored model unavailable"),
    ("F2.5.4", "Default Selection", "Error", "Handles missing default in database"),
    ("F2.5.5", "Default Selection", "Edge", "Admin can configure default model"),
    ("F2.5.6", "Default Selection", "UI", "Default model loads immediately"),
    ("F2.5.7", "Default Selection", "UI", "No flash of incorrect model"),
    ("F2.5.8", "Default Selection", "Perf", "Default model data pre-fetched"),
    ("F2.5.9", "Default Selection", "Perf", "SSR returns default model data"),
    ("F2.5.10", "Default Selection", "Edge", "Hydration matches server render"),
]

for id, cat, typ, desc in f2_tests:
    tests.append({"id": id, "feature": "F2: Model Selector", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F3: Metric Cards (51 tests)
f3_tests = [
    # Data Display (10)
    ("F3.1.1", "Data Display", "Happy", "Displays asking price vs market %"),
    ("F3.1.2", "Data Display", "Happy", "Displays residual value strength"),
    ("F3.1.3", "Data Display", "Happy", "Displays market activity score"),
    ("F3.1.4", "Data Display", "Edge", "Formats large numbers with commas"),
    ("F3.1.5", "Data Display", "Edge", "Handles negative percentages"),
    ("F3.1.6", "Data Display", "Edge", "Handles zero values"),
    ("F3.1.7", "Data Display", "Error", "Handles null/undefined values"),
    ("F3.1.8", "Data Display", "Edge", "Rounds to appropriate decimals"),
    ("F3.1.9", "Data Display", "UI", "Shows currency symbol for prices"),
    ("F3.1.10", "Data Display", "UI", "Shows percentage symbol for rates"),
    # Trend Indicators (11)
    ("F3.2.1", "Trend Indicators", "Happy", "Shows up arrow for positive trend"),
    ("F3.2.2", "Trend Indicators", "Happy", "Shows down arrow for negative trend"),
    ("F3.2.3", "Trend Indicators", "Happy", "Shows stable icon for no change"),
    ("F3.2.4", "Trend Indicators", "UI", "Green color for positive trends"),
    ("F3.2.5", "Trend Indicators", "UI", "Red color for negative trends"),
    ("F3.2.6", "Trend Indicators", "UI", "Gray color for stable trends"),
    ("F3.2.7", "Trend Indicators", "Edge", "Trend calculated from historical data"),
    ("F3.2.8", "Trend Indicators", "Edge", "Handles insufficient historical data"),
    ("F3.2.9", "Trend Indicators", "Edge", "Trend comparison period configurable"),
    ("F3.2.10", "Trend Indicators", "UI", "Trend animation on change"),
    ("F3.2.11", "Trend Indicators", "Edge", "Inverted color for below-market (good for buyers)"),
    # Tooltips (10)
    ("F3.3.1", "Tooltips", "Happy", "Tooltip appears on hover"),
    ("F3.3.2", "Tooltips", "Happy", "Tooltip contains metric definition"),
    ("F3.3.3", "Tooltips", "Happy", "Tooltip dismisses on mouse leave"),
    ("F3.3.4", "Tooltips", "A11y", "Tooltip accessible via keyboard focus"),
    ("F3.3.5", "Tooltips", "Edge", "Tooltip position adjusts to viewport"),
    ("F3.3.6", "Tooltips", "Edge", "Tooltip doesn't overflow screen"),
    ("F3.3.7", "Tooltips", "Edge", "Touch devices show on tap"),
    ("F3.3.8", "Tooltips", "Edge", "Multiple tooltips don't stack"),
    ("F3.3.9", "Tooltips", "A11y", "Tooltip content is screen reader friendly"),
    ("F3.3.10", "Tooltips", "UI", "Tooltip has proper z-index"),
    # Loading States (10)
    ("F3.4.1", "Loading States", "Happy", "Shows skeleton while loading"),
    ("F3.4.2", "Loading States", "UI", "Skeleton matches card dimensions"),
    ("F3.4.3", "Loading States", "UI", "Skeleton animates smoothly"),
    ("F3.4.4", "Loading States", "Happy", "Data replaces skeleton on load"),
    ("F3.4.5", "Loading States", "CLS", "No layout shift on data load"),
    ("F3.4.6", "Loading States", "Error", "Error state shown on fetch failure"),
    ("F3.4.7", "Loading States", "Error", "Retry button on error state"),
    ("F3.4.8", "Loading States", "Edge", "Stale data shown during refetch"),
    ("F3.4.9", "Loading States", "Edge", "Loading state during model switch"),
    ("F3.4.10", "Loading States", "A11y", "Loading indicator is accessible"),
    # Responsiveness (10)
    ("F3.5.1", "Responsiveness", "Happy", "3 cards in row on desktop"),
    ("F3.5.2", "Responsiveness", "Happy", "2 cards in row on tablet"),
    ("F3.5.3", "Responsiveness", "Happy", "1 card in row on mobile"),
    ("F3.5.4", "Responsiveness", "UI", "Card height remains consistent"),
    ("F3.5.5", "Responsiveness", "Edge", "Text truncates gracefully"),
    ("F3.5.6", "Responsiveness", "A11y", "Touch targets meet minimum size"),
    ("F3.5.7", "Responsiveness", "Perf", "Resizing doesn't cause reflow"),
    ("F3.5.8", "Responsiveness", "UI", "Cards maintain aspect ratio"),
    ("F3.5.9", "Responsiveness", "Edge", "Print layout is readable"),
    ("F3.5.10", "Responsiveness", "UI", "High DPI screens render crisply"),
]

for id, cat, typ, desc in f3_tests:
    tests.append({"id": id, "feature": "F3: Metric Cards", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F4: Price Distribution Chart (52 tests)
f4_tests = [
    # Histogram Rendering (11)
    ("F4.1.1", "Histogram Rendering", "Happy", "Renders histogram bars"),
    ("F4.1.2", "Histogram Rendering", "Happy", "Bar height proportional to count"),
    ("F4.1.3", "Histogram Rendering", "Happy", "X-axis shows price ranges"),
    ("F4.1.4", "Histogram Rendering", "Happy", "Y-axis shows count"),
    ("F4.1.5", "Histogram Rendering", "Edge", "Handles 0 listings (empty state)"),
    ("F4.1.6", "Histogram Rendering", "Edge", "Handles 1000+ listings"),
    ("F4.1.7", "Histogram Rendering", "Error", "Handles negative prices (error)"),
    ("F4.1.8", "Histogram Rendering", "Edge", "Bucket sizes calculated dynamically"),
    ("F4.1.9", "Histogram Rendering", "Edge", "Outliers handled gracefully"),
    ("F4.1.10", "Histogram Rendering", "UI", "Chart renders within container"),
    ("F4.1.11", "Histogram Rendering", "UI", "Axis labels don't overlap"),
    # Interactivity (10)
    ("F4.2.1", "Interactivity", "Happy", "Tooltip shows on bar hover"),
    ("F4.2.2", "Interactivity", "Happy", "Tooltip shows price range"),
    ("F4.2.3", "Interactivity", "Happy", "Tooltip shows count"),
    ("F4.2.4", "Interactivity", "UI", "Tooltip follows cursor"),
    ("F4.2.5", "Interactivity", "UI", "Bar highlights on hover"),
    ("F4.2.6", "Interactivity", "Edge", "Touch devices show tooltip on tap"),
    ("F4.2.7", "Interactivity", "Happy", "Tooltip dismisses on leave"),
    ("F4.2.8", "Interactivity", "A11y", "Keyboard navigation works"),
    ("F4.2.9", "Interactivity", "A11y", "Focus ring visible on bars"),
    ("F4.2.10", "Interactivity", "Edge", "Click bar filters table (optional)"),
    # Average Price Marker (10)
    ("F4.3.1", "Average Price Marker", "Happy", "Vertical line shows average price"),
    ("F4.3.2", "Average Price Marker", "Happy", "Label shows average value"),
    ("F4.3.3", "Average Price Marker", "Happy", "Marker positioned correctly"),
    ("F4.3.4", "Average Price Marker", "UI", "Marker visible above bars"),
    ("F4.3.5", "Average Price Marker", "UI", "Marker color contrasts with bars"),
    ("F4.3.6", "Average Price Marker", "Edge", "Marker label doesn't overlap axis"),
    ("F4.3.7", "Average Price Marker", "Edge", "Marker updates on data change"),
    ("F4.3.8", "Average Price Marker", "UI", "Marker animated on change"),
    ("F4.3.9", "Average Price Marker", "Edge", "Marker visible on mobile"),
    ("F4.3.10", "Average Price Marker", "Edge", "Marker tooltip on hover"),
    # Responsiveness (11)
    ("F4.4.1", "Responsiveness", "Happy", "Chart resizes with container"),
    ("F4.4.2", "Responsiveness", "Happy", "Bars scale proportionally"),
    ("F4.4.3", "Responsiveness", "Happy", "Labels resize appropriately"),
    ("F4.4.4", "Responsiveness", "Edge", "Mobile shows fewer x-axis labels"),
    ("F4.4.5", "Responsiveness", "Edge", "Orientation change handled"),
    ("F4.4.6", "Responsiveness", "Perf", "Window resize debounced"),
    ("F4.4.7", "Responsiveness", "CLS", "No layout shift during resize"),
    ("F4.4.8", "Responsiveness", "Edge", "Touch scrolling doesn't interfere"),
    ("F4.4.9", "Responsiveness", "UI", "Chart maintains aspect ratio"),
    ("F4.4.10", "Responsiveness", "Edge", "Print renders correctly"),
    ("F4.4.11", "Responsiveness", "Edge", "SVG exports cleanly"),
    # Data Updates (10)
    ("F4.5.1", "Data Updates", "Happy", "Chart updates on model change"),
    ("F4.5.2", "Data Updates", "UI", "Animation on data update"),
    ("F4.5.3", "Data Updates", "UI", "Loading state during update"),
    ("F4.5.4", "Data Updates", "Error", "Error state on failed update"),
    ("F4.5.5", "Data Updates", "Edge", "Stale data shown during refetch"),
    ("F4.5.6", "Data Updates", "Edge", "Handles rapid model switches"),
    ("F4.5.7", "Data Updates", "Perf", "Cancels pending requests on switch"),
    ("F4.5.8", "Data Updates", "Perf", "Memory cleaned up on unmount"),
    ("F4.5.9", "Data Updates", "Edge", "SSR hydration matches client"),
    ("F4.5.10", "Data Updates", "Perf", "Chart re-renders efficiently"),
]

for id, cat, typ, desc in f4_tests:
    tests.append({"id": id, "feature": "F4: Price Distribution Chart", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F5: Price Trend Chart (52 tests)
f5_tests = [
    # Line Rendering (11)
    ("F5.1.1", "Line Rendering", "Happy", "Renders price trend line"),
    ("F5.1.2", "Line Rendering", "Happy", "X-axis shows dates"),
    ("F5.1.3", "Line Rendering", "Happy", "Y-axis shows prices"),
    ("F5.1.4", "Line Rendering", "UI", "Line smoothly connects points"),
    ("F5.1.5", "Line Rendering", "Edge", "Handles single data point"),
    ("F5.1.6", "Line Rendering", "Edge", "Handles 100+ data points"),
    ("F5.1.7", "Line Rendering", "Edge", "Handles gaps in data"),
    ("F5.1.8", "Line Rendering", "i18n", "Date format is locale-aware"),
    ("F5.1.9", "Line Rendering", "UI", "Price format includes currency"),
    ("F5.1.10", "Line Rendering", "Edge", "Axis ticks calculated dynamically"),
    ("F5.1.11", "Line Rendering", "Edge", "Zero baseline handling"),
    # Range Band (10)
    ("F5.2.1", "Range Band", "Happy", "Shaded area shows min/max range"),
    ("F5.2.2", "Range Band", "Happy", "Band follows trend line"),
    ("F5.2.3", "Range Band", "UI", "Band color has transparency"),
    ("F5.2.4", "Range Band", "UI", "Band doesn't obscure line"),
    ("F5.2.5", "Range Band", "Edge", "Tooltip shows min/max on hover"),
    ("F5.2.6", "Range Band", "Error", "Band handles missing min/max"),
    ("F5.2.7", "Range Band", "Edge", "Band handles min = max"),
    ("F5.2.8", "Range Band", "Edge", "Band toggle on/off"),
    ("F5.2.9", "Range Band", "UI", "Legend indicates band meaning"),
    ("F5.2.10", "Range Band", "Edge", "Band scales with zoom"),
    # Event Markers (11)
    ("F5.3.1", "Event Markers", "Happy", "Markers show on event dates"),
    ("F5.3.2", "Event Markers", "UI", "Marker icon distinguishes type"),
    ("F5.3.3", "Event Markers", "Happy", "Tooltip shows event description"),
    ("F5.3.4", "Event Markers", "Edge", "Multiple events on same date"),
    ("F5.3.5", "Event Markers", "UI", "Markers don't overlap line"),
    ("F5.3.6", "Event Markers", "Edge", "Markers clickable for details"),
    ("F5.3.7", "Event Markers", "Edge", "Handles 0 events"),
    ("F5.3.8", "Event Markers", "Edge", "Handles 20+ events"),
    ("F5.3.9", "Event Markers", "Edge", "Markers visible at all zoom levels"),
    ("F5.3.10", "Event Markers", "Edge", "Event filter options"),
    ("F5.3.11", "Event Markers", "A11y", "Keyboard accessible markers"),
    # Zoom/Pan (10)
    ("F5.4.1", "Zoom/Pan", "Happy", "Zoom in on date range"),
    ("F5.4.2", "Zoom/Pan", "Happy", "Zoom out to full range"),
    ("F5.4.3", "Zoom/Pan", "Happy", "Pan left/right"),
    ("F5.4.4", "Zoom/Pan", "Edge", "Pinch zoom on touch"),
    ("F5.4.5", "Zoom/Pan", "Edge", "Mouse wheel zoom"),
    ("F5.4.6", "Zoom/Pan", "Edge", "Zoom limit prevents over-zoom"),
    ("F5.4.7", "Zoom/Pan", "UI", "Reset zoom button"),
    ("F5.4.8", "Zoom/Pan", "Edge", "Zoom state preserved on update"),
    ("F5.4.9", "Zoom/Pan", "UI", "Smooth zoom animation"),
    ("F5.4.10", "Zoom/Pan", "A11y", "Zoom accessible via keyboard"),
    # Responsiveness (10)
    ("F5.5.1", "Responsiveness", "Happy", "Chart resizes with container"),
    ("F5.5.2", "Responsiveness", "Edge", "Mobile shows simplified axis"),
    ("F5.5.3", "Responsiveness", "Edge", "Touch scrolling works"),
    ("F5.5.4", "Responsiveness", "Edge", "No interference with page scroll"),
    ("F5.5.5", "Responsiveness", "UI", "Legend repositions on mobile"),
    ("F5.5.6", "Responsiveness", "Edge", "Tooltips fit viewport"),
    ("F5.5.7", "Responsiveness", "Perf", "Chart loads progressively"),
    ("F5.5.8", "Responsiveness", "Perf", "Resize throttled"),
    ("F5.5.9", "Responsiveness", "Edge", "Print mode disables interactivity"),
    ("F5.5.10", "Responsiveness", "UI", "High DPI rendering"),
]

for id, cat, typ, desc in f5_tests:
    tests.append({"id": id, "feature": "F5: Price Trend Chart", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F6: Days on Market Chart (50 tests)
f6_tests = [
    # Bar Rendering (10)
    ("F6.1.1", "Bar Rendering", "Happy", "Renders bars for each bucket"),
    ("F6.1.2", "Bar Rendering", "Happy", "X-axis shows DOM ranges"),
    ("F6.1.3", "Bar Rendering", "Happy", "Y-axis shows aircraft count"),
    ("F6.1.4", "Bar Rendering", "Happy", "Bars ordered by bucket"),
    ("F6.1.5", "Bar Rendering", "Edge", "Handles empty buckets"),
    ("F6.1.6", "Bar Rendering", "Edge", "Handles single bucket"),
    ("F6.1.7", "Bar Rendering", "Edge", "Handles 20+ buckets"),
    ("F6.1.8", "Bar Rendering", "Edge", "Bar width calculated dynamically"),
    ("F6.1.9", "Bar Rendering", "UI", "Bar color consistent"),
    ("F6.1.10", "Bar Rendering", "UI", "Grid lines visible"),
    # Labels (10)
    ("F6.2.1", "Labels", "Happy", "Bucket labels readable"),
    ("F6.2.2", "Labels", "UI", "Labels don't overlap"),
    ("F6.2.3", "Labels", "Edge", "Labels rotate on overflow"),
    ("F6.2.4", "Labels", "Happy", "Average DOM line labeled"),
    ("F6.2.5", "Labels", "Edge", "Count labels above bars"),
    ("F6.2.6", "Labels", "Edge", "Labels truncate gracefully"),
    ("F6.2.7", "Labels", "UI", "Label font scales with chart"),
    ("F6.2.8", "Labels", "A11y", "Labels accessible to screen readers"),
    ("F6.2.9", "Labels", "Edge", "Custom bucket labels supported"),
    ("F6.2.10", "Labels", "i18n", "RTL language support"),
    # Tooltips (10)
    ("F6.3.1", "Tooltips", "Happy", "Tooltip on bar hover"),
    ("F6.3.2", "Tooltips", "Happy", "Tooltip shows range and count"),
    ("F6.3.3", "Tooltips", "Edge", "Tooltip shows percentage"),
    ("F6.3.4", "Tooltips", "UI", "Tooltip positions correctly"),
    ("F6.3.5", "Tooltips", "Edge", "Touch tooltip works"),
    ("F6.3.6", "Tooltips", "UI", "Multiple bar hover transition"),
    ("F6.3.7", "Tooltips", "Edge", "Tooltip content customizable"),
    ("F6.3.8", "Tooltips", "UI", "Tooltip style matches brand"),
    ("F6.3.9", "Tooltips", "UI", "Tooltip z-index correct"),
    ("F6.3.10", "Tooltips", "A11y", "Tooltip accessible"),
    # Responsiveness (10)
    ("F6.4.1", "Responsiveness", "Happy", "Chart resizes with container"),
    ("F6.4.2", "Responsiveness", "Happy", "Bars resize proportionally"),
    ("F6.4.3", "Responsiveness", "Edge", "Mobile hides some labels"),
    ("F6.4.4", "Responsiveness", "Edge", "Horizontal scroll on overflow"),
    ("F6.4.5", "Responsiveness", "A11y", "Touch targets adequate"),
    ("F6.4.6", "Responsiveness", "CLS", "No layout shift on resize"),
    ("F6.4.7", "Responsiveness", "Edge", "Orientation change handled"),
    ("F6.4.8", "Responsiveness", "UI", "Consistent padding"),
    ("F6.4.9", "Responsiveness", "Edge", "Print layout correct"),
    ("F6.4.10", "Responsiveness", "Perf", "Chart reflows efficiently"),
    # Data Updates (10)
    ("F6.5.1", "Data Updates", "Happy", "Chart updates on model change"),
    ("F6.5.2", "Data Updates", "UI", "Animation on data update"),
    ("F6.5.3", "Data Updates", "UI", "Loading skeleton shown"),
    ("F6.5.4", "Data Updates", "Error", "Error state displayed"),
    ("F6.5.5", "Data Updates", "Edge", "Stale-while-revalidate"),
    ("F6.5.6", "Data Updates", "Edge", "Rapid switches handled"),
    ("F6.5.7", "Data Updates", "Perf", "Memory leak prevention"),
    ("F6.5.8", "Data Updates", "Edge", "SSR renders correctly"),
    ("F6.5.9", "Data Updates", "Edge", "Hydration mismatch prevented"),
    ("F6.5.10", "Data Updates", "Perf", "Rerender count optimized"),
]

for id, cat, typ, desc in f6_tests:
    tests.append({"id": id, "feature": "F6: Days on Market Chart", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F7: Comparative Chart (50 tests)
f7_tests = [
    # Grouped Bar Rendering (10)
    ("F7.1.1", "Grouped Bar Rendering", "Happy", "Renders grouped bars per metric"),
    ("F7.1.2", "Grouped Bar Rendering", "Happy", "Each model has distinct color"),
    ("F7.1.3", "Grouped Bar Rendering", "Happy", "X-axis shows metrics"),
    ("F7.1.4", "Grouped Bar Rendering", "Happy", "Y-axis scales to data"),
    ("F7.1.5", "Grouped Bar Rendering", "Happy", "Handles 2 models"),
    ("F7.1.6", "Grouped Bar Rendering", "Edge", "Handles 5+ models"),
    ("F7.1.7", "Grouped Bar Rendering", "Error", "Handles missing model data"),
    ("F7.1.8", "Grouped Bar Rendering", "UI", "Bar groups have spacing"),
    ("F7.1.9", "Grouped Bar Rendering", "A11y", "Colors are accessible"),
    ("F7.1.10", "Grouped Bar Rendering", "A11y", "Patterns for color blindness"),
    # Metrics (10)
    ("F7.2.1", "Metrics", "Happy", "Price metric displayed"),
    ("F7.2.2", "Metrics", "Happy", "Residual value displayed"),
    ("F7.2.3", "Metrics", "Happy", "DOM metric displayed"),
    ("F7.2.4", "Metrics", "Happy", "Fleet % displayed"),
    ("F7.2.5", "Metrics", "Edge", "Different scales handled"),
    ("F7.2.6", "Metrics", "Edge", "Normalized comparison option"),
    ("F7.2.7", "Metrics", "Edge", "Metric toggle visibility"),
    ("F7.2.8", "Metrics", "Edge", "Metric sort order"),
    ("F7.2.9", "Metrics", "Edge", "Custom metrics supported"),
    ("F7.2.10", "Metrics", "UI", "Metric units displayed"),
    # Legend (10)
    ("F7.3.1", "Legend", "Happy", "Legend shows all models"),
    ("F7.3.2", "Legend", "Happy", "Legend matches bar colors"),
    ("F7.3.3", "Legend", "Happy", "Click legend toggles model"),
    ("F7.3.4", "Legend", "UI", "Hidden model bars disappear"),
    ("F7.3.5", "Legend", "Edge", "At least one model required"),
    ("F7.3.6", "Legend", "Edge", "Legend wraps on overflow"),
    ("F7.3.7", "Legend", "Edge", "Legend position configurable"),
    ("F7.3.8", "Legend", "A11y", "Keyboard toggles legend items"),
    ("F7.3.9", "Legend", "Edge", "Legend state persisted"),
    ("F7.3.10", "Legend", "Edge", "Legend tooltip on truncation"),
    # Tooltips (10)
    ("F7.4.1", "Tooltips", "Happy", "Tooltip on bar hover"),
    ("F7.4.2", "Tooltips", "Happy", "Tooltip shows model + metric"),
    ("F7.4.3", "Tooltips", "Happy", "Tooltip shows value"),
    ("F7.4.4", "Tooltips", "Edge", "Tooltip shows % difference"),
    ("F7.4.5", "Tooltips", "Edge", "Tooltip for grouped bars"),
    ("F7.4.6", "Tooltips", "Edge", "Touch tooltip works"),
    ("F7.4.7", "Tooltips", "UI", "Tooltip formatted correctly"),
    ("F7.4.8", "Tooltips", "Edge", "Tooltip doesn't overflow"),
    ("F7.4.9", "Tooltips", "UI", "Tooltip has proper z-index"),
    ("F7.4.10", "Tooltips", "A11y", "Screen reader announces values"),
    # Responsiveness (10)
    ("F7.5.1", "Responsiveness", "Happy", "Chart resizes correctly"),
    ("F7.5.2", "Responsiveness", "Edge", "Mobile stacks bars vertically"),
    ("F7.5.3", "Responsiveness", "Edge", "Touch interact works"),
    ("F7.5.4", "Responsiveness", "Edge", "Labels fit container"),
    ("F7.5.5", "Responsiveness", "UI", "Legend moves below on mobile"),
    ("F7.5.6", "Responsiveness", "UI", "No horizontal overflow"),
    ("F7.5.7", "Responsiveness", "UI", "Resize animation smooth"),
    ("F7.5.8", "Responsiveness", "Edge", "Print renders all models"),
    ("F7.5.9", "Responsiveness", "UI", "High DPI support"),
    ("F7.5.10", "Responsiveness", "Perf", "Performance on resize"),
]

for id, cat, typ, desc in f7_tests:
    tests.append({"id": id, "feature": "F7: Comparative Chart", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F8: Signal Panel (54 tests)
f8_tests = [
    # Signal Display (11)
    ("F8.1.1", "Signal Display", "Happy", "Renders list of signals"),
    ("F8.1.2", "Signal Display", "Happy", "Signal label displayed"),
    ("F8.1.3", "Signal Display", "Happy", "Signal value shown (bullish/bearish/neutral)"),
    ("F8.1.4", "Signal Display", "UI", "Visual indicator matches value"),
    ("F8.1.5", "Signal Display", "UI", "Green for bullish"),
    ("F8.1.6", "Signal Display", "UI", "Red for bearish"),
    ("F8.1.7", "Signal Display", "UI", "Gray for neutral"),
    ("F8.1.8", "Signal Display", "Edge", "Handles empty signals list"),
    ("F8.1.9", "Signal Display", "Edge", "Handles 20+ signals"),
    ("F8.1.10", "Signal Display", "Edge", "Signals sorted consistently"),
    ("F8.1.11", "Signal Display", "UI", "Signal icon/emoji displayed"),
    # Confidence Scores (10)
    ("F8.2.1", "Confidence Scores", "Happy", "Confidence score displayed"),
    ("F8.2.2", "Confidence Scores", "UI", "Score shown as percentage"),
    ("F8.2.3", "Confidence Scores", "UI", "Progress bar for score"),
    ("F8.2.4", "Confidence Scores", "Edge", "Handles 0% confidence"),
    ("F8.2.5", "Confidence Scores", "Edge", "Handles 100% confidence"),
    ("F8.2.6", "Confidence Scores", "UI", "Color gradient by confidence"),
    ("F8.2.7", "Confidence Scores", "Edge", "Tooltip explains confidence"),
    ("F8.2.8", "Confidence Scores", "UI", "Score animation on load"),
    ("F8.2.9", "Confidence Scores", "A11y", "Score accessible to screen readers"),
    ("F8.2.10", "Confidence Scores", "Error", "Handles null confidence"),
    # Perspective Toggle (11)
    ("F8.3.1", "Perspective Toggle", "Happy", "Buyer/Seller toggle visible"),
    ("F8.3.2", "Perspective Toggle", "Happy", "Default to buyer perspective"),
    ("F8.3.3", "Perspective Toggle", "Happy", "Toggle switches signals shown"),
    ("F8.3.4", "Perspective Toggle", "Edge", "Only relevant signals displayed"),
    ("F8.3.5", "Perspective Toggle", "Edge", "Toggle state persisted"),
    ("F8.3.6", "Perspective Toggle", "A11y", "Toggle is accessible"),
    ("F8.3.7", "Perspective Toggle", "A11y", "Keyboard toggle works"),
    ("F8.3.8", "Perspective Toggle", "UI", "Toggle animation smooth"),
    ("F8.3.9", "Perspective Toggle", "Edge", "Both perspectives shows all"),
    ("F8.3.10", "Perspective Toggle", "Edge", "URL reflects perspective"),
    ("F8.3.11", "Perspective Toggle", "Edge", "Empty state per perspective"),
    # Timeframe Toggle (11)
    ("F8.4.1", "Timeframe Toggle", "Happy", "Short/Long term toggle visible"),
    ("F8.4.2", "Timeframe Toggle", "Happy", "Default to short term"),
    ("F8.4.3", "Timeframe Toggle", "Happy", "Toggle filters signals"),
    ("F8.4.4", "Timeframe Toggle", "Edge", "Combined with perspective filter"),
    ("F8.4.5", "Timeframe Toggle", "Edge", "Toggle state persisted"),
    ("F8.4.6", "Timeframe Toggle", "A11y", "Toggle is accessible"),
    ("F8.4.7", "Timeframe Toggle", "A11y", "Keyboard toggle works"),
    ("F8.4.8", "Timeframe Toggle", "UI", "Toggle animation smooth"),
    ("F8.4.9", "Timeframe Toggle", "Edge", "Both timeframes shows all"),
    ("F8.4.10", "Timeframe Toggle", "Edge", "URL reflects timeframe"),
    ("F8.4.11", "Timeframe Toggle", "Edge", "Empty state per timeframe"),
    # Responsiveness (11)
    ("F8.5.1", "Responsiveness", "Happy", "Panel fits container"),
    ("F8.5.2", "Responsiveness", "UI", "Scrollable on overflow"),
    ("F8.5.3", "Responsiveness", "Edge", "Toggles stack on mobile"),
    ("F8.5.4", "Responsiveness", "A11y", "Touch targets adequate"),
    ("F8.5.5", "Responsiveness", "Edge", "Signal items wrap correctly"),
    ("F8.5.6", "Responsiveness", "UI", "Confidence bar scales"),
    ("F8.5.7", "Responsiveness", "UI", "No horizontal overflow"),
    ("F8.5.8", "Responsiveness", "Edge", "Print layout readable"),
    ("F8.5.9", "Responsiveness", "Edge", "Collapsible on mobile"),
    ("F8.5.10", "Responsiveness", "UI", "Loading skeleton matches layout"),
    ("F8.5.11", "Responsiveness", "Error", "Error state handled"),
]

for id, cat, typ, desc in f8_tests:
    tests.append({"id": id, "feature": "F8: Signal Panel", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F9: Aircraft Listings Table (55 tests)
f9_tests = [
    # Data Display (11)
    ("F9.1.1", "Data Display", "Happy", "Renders all columns"),
    ("F9.1.2", "Data Display", "Happy", "Serial number displayed"),
    ("F9.1.3", "Data Display", "Happy", "Year displayed"),
    ("F9.1.4", "Data Display", "Happy", "Hours displayed"),
    ("F9.1.5", "Data Display", "UI", "Price formatted as currency"),
    ("F9.1.6", "Data Display", "Happy", "DOM displayed"),
    ("F9.1.7", "Data Display", "Happy", "Location displayed"),
    ("F9.1.8", "Data Display", "Happy", "Status badge displayed"),
    ("F9.1.9", "Data Display", "Edge", "Handles null values gracefully"),
    ("F9.1.10", "Data Display", "Edge", "Handles 0 listings (empty)"),
    ("F9.1.11", "Data Display", "Edge", "Handles 1000+ listings"),
    # Sorting (11)
    ("F9.2.1", "Sorting", "Happy", "Click header sorts column"),
    ("F9.2.2", "Sorting", "Happy", "Ascending sort first click"),
    ("F9.2.3", "Sorting", "Happy", "Descending sort second click"),
    ("F9.2.4", "Sorting", "Edge", "Third click removes sort"),
    ("F9.2.5", "Sorting", "UI", "Sort indicator visible"),
    ("F9.2.6", "Sorting", "Edge", "Multi-column sort (shift+click)"),
    ("F9.2.7", "Sorting", "Edge", "Sort persists on pagination"),
    ("F9.2.8", "Sorting", "Edge", "Sort persists on model change"),
    ("F9.2.9", "Sorting", "A11y", "Keyboard sort triggers"),
    ("F9.2.10", "Sorting", "Edge", "Null values sort last"),
    ("F9.2.11", "Sorting", "Edge", "Sort URL encoded"),
    # Pagination (11)
    ("F9.3.1", "Pagination", "Happy", "Default 10 items per page"),
    ("F9.3.2", "Pagination", "Happy", "Page selector works"),
    ("F9.3.3", "Pagination", "Happy", "Prev/Next buttons work"),
    ("F9.3.4", "Pagination", "Happy", "Page size options (10, 25, 50)"),
    ("F9.3.5", "Pagination", "Edge", "Handles last page with fewer items"),
    ("F9.3.6", "Pagination", "UI", "Shows total count"),
    ("F9.3.7", "Pagination", "Edge", "Jump to page input"),
    ("F9.3.8", "Pagination", "A11y", "Keyboard navigation"),
    ("F9.3.9", "Pagination", "Edge", "Page persists on sort"),
    ("F9.3.10", "Pagination", "Edge", "Page resets on model change"),
    ("F9.3.11", "Pagination", "Edge", "URL encodes page state"),
    # Status Badges (11)
    ("F9.4.1", "Status Badges", "UI", "Active badge green"),
    ("F9.4.2", "Status Badges", "UI", "Pending badge yellow"),
    ("F9.4.3", "Status Badges", "UI", "Sold badge gray"),
    ("F9.4.4", "Status Badges", "UI", "Withdrawn badge red"),
    ("F9.4.5", "Status Badges", "A11y", "Badge accessible colors"),
    ("F9.4.6", "Status Badges", "Edge", "Badge tooltip explains status"),
    ("F9.4.7", "Status Badges", "Edge", "Filter by status"),
    ("F9.4.8", "Status Badges", "Edge", "Status count shown"),
    ("F9.4.9", "Status Badges", "Error", "Unknown status handled"),
    ("F9.4.10", "Status Badges", "UI", "Status icon + text"),
    ("F9.4.11", "Status Badges", "UI", "Status change animation"),
    # Responsiveness (11)
    ("F9.5.1", "Responsiveness", "Happy", "Table scrolls horizontally on mobile"),
    ("F9.5.2", "Responsiveness", "Edge", "Sticky first column"),
    ("F9.5.3", "Responsiveness", "Edge", "Column resize handles"),
    ("F9.5.4", "Responsiveness", "Edge", "Hide columns on mobile"),
    ("F9.5.5", "Responsiveness", "Edge", "Touch scroll smooth"),
    ("F9.5.6", "Responsiveness", "UI", "Row height consistent"),
    ("F9.5.7", "Responsiveness", "UI", "Alternating row colors"),
    ("F9.5.8", "Responsiveness", "UI", "Hover row highlight"),
    ("F9.5.9", "Responsiveness", "Edge", "Print shows all columns"),
    ("F9.5.10", "Responsiveness", "UI", "Loading skeleton matches"),
    ("F9.5.11", "Responsiveness", "Error", "Error state displayed"),
]

for id, cat, typ, desc in f9_tests:
    tests.append({"id": id, "feature": "F9: Aircraft Listings Table", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# F10: Responsive Layout (50 tests)
f10_tests = [
    # Desktop Layout (10)
    ("F10.1.1", "Desktop Layout", "Happy", "3 metric cards in row"),
    ("F10.1.2", "Desktop Layout", "Happy", "2 charts per row"),
    ("F10.1.3", "Desktop Layout", "Happy", "Signal panel + table side by side"),
    ("F10.1.4", "Desktop Layout", "Happy", "Header fixed on scroll"),
    ("F10.1.5", "Desktop Layout", "Edge", "Sidebar visible"),
    ("F10.1.6", "Desktop Layout", "Edge", "Min-width breakpoint works"),
    ("F10.1.7", "Desktop Layout", "UI", "Max content width applied"),
    ("F10.1.8", "Desktop Layout", "UI", "Consistent padding/margins"),
    ("F10.1.9", "Desktop Layout", "UI", "Grid gaps consistent"),
    ("F10.1.10", "Desktop Layout", "UI", "Scroll behavior smooth"),
    # Tablet Layout (10)
    ("F10.2.1", "Tablet Layout", "Happy", "2 metric cards in row"),
    ("F10.2.2", "Tablet Layout", "Happy", "Charts stack or 2 per row"),
    ("F10.2.3", "Tablet Layout", "Happy", "Signal panel full width"),
    ("F10.2.4", "Tablet Layout", "Happy", "Table scrolls horizontally"),
    ("F10.2.5", "Tablet Layout", "Edge", "Header responsive"),
    ("F10.2.6", "Tablet Layout", "Edge", "Sidebar collapses to hamburger"),
    ("F10.2.7", "Tablet Layout", "A11y", "Touch targets adequate"),
    ("F10.2.8", "Tablet Layout", "Edge", "Portrait orientation works"),
    ("F10.2.9", "Tablet Layout", "Edge", "Landscape orientation works"),
    ("F10.2.10", "Tablet Layout", "UI", "Breakpoint transitions smooth"),
    # Mobile Layout (10)
    ("F10.3.1", "Mobile Layout", "Happy", "Single column stack"),
    ("F10.3.2", "Mobile Layout", "Happy", "Metric cards stack"),
    ("F10.3.3", "Mobile Layout", "Happy", "Charts full width"),
    ("F10.3.4", "Mobile Layout", "Happy", "Table scrollable"),
    ("F10.3.5", "Mobile Layout", "UI", "Model selector accessible"),
    ("F10.3.6", "Mobile Layout", "Edge", "Bottom navigation (optional)"),
    ("F10.3.7", "Mobile Layout", "Edge", "Touch scrolling smooth"),
    ("F10.3.8", "Mobile Layout", "UI", "No horizontal overflow"),
    ("F10.3.9", "Mobile Layout", "UI", "Font sizes readable"),
    ("F10.3.10", "Mobile Layout", "A11y", "Buttons have adequate size"),
    # Chart Responsiveness (10)
    ("F10.4.1", "Chart Responsiveness", "Happy", "Charts resize with container"),
    ("F10.4.2", "Chart Responsiveness", "Happy", "Aspect ratio maintained"),
    ("F10.4.3", "Chart Responsiveness", "Edge", "Labels scale appropriately"),
    ("F10.4.4", "Chart Responsiveness", "Edge", "Tooltips fit viewport"),
    ("F10.4.5", "Chart Responsiveness", "UI", "No distortion on resize"),
    ("F10.4.6", "Chart Responsiveness", "Perf", "Resize debounced"),
    ("F10.4.7", "Chart Responsiveness", "Perf", "No layout shift (CLS)"),
    ("F10.4.8", "Chart Responsiveness", "Edge", "Legend repositions"),
    ("F10.4.9", "Chart Responsiveness", "Edge", "Interactive even when small"),
    ("F10.4.10", "Chart Responsiveness", "Edge", "Minimum size enforced"),
    # Touch Interaction (10)
    ("F10.5.1", "Touch Interaction", "Happy", "Tap works like click"),
    ("F10.5.2", "Touch Interaction", "Edge", "Long press shows tooltip"),
    ("F10.5.3", "Touch Interaction", "Happy", "Swipe scrolls page"),
    ("F10.5.4", "Touch Interaction", "Edge", "Pinch zoom on charts"),
    ("F10.5.5", "Touch Interaction", "Edge", "Double tap zoom"),
    ("F10.5.6", "Touch Interaction", "Edge", "Gesture conflicts prevented"),
    ("F10.5.7", "Touch Interaction", "UI", "Touch feedback visible"),
    ("F10.5.8", "Touch Interaction", "Edge", "Pull to refresh (optional)"),
    ("F10.5.9", "Touch Interaction", "A11y", "Touch targets 44px minimum"),
    ("F10.5.10", "Touch Interaction", "Edge", "No ghost clicks"),
]

for id, cat, typ, desc in f10_tests:
    tests.append({"id": id, "feature": "F10: Responsive Layout", "category": cat, "type": typ, "description": desc, "steps": [], "passes": False})

# Write to JSON file
with open("feature_list.json", "w") as f:
    json.dump(tests, f, indent=2)

print(f"Generated {len(tests)} tests")
