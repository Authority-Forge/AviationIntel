I’m building a model-first intelligence platform for business aviation, starting with a single aircraft model (Bombardier Challenger 350) as an MVP.

This is not a flight-tracking app, directory, or generic analytics dashboard.

Please see the attached image for the design of the page.

What I need is someone who can translate that design into a robust, scalable implementation, starting with one model and expanding cleanly.

All data will be stored in Supabase.

The final frontend application needs to be scalable between mobile and desktop, with the charts all being interactive.

Stack preference (flexible, but opinionated):
	•	React / Next.js
	•	TypeScript
	•	Charting library suitable for statistical visuals (e.g. Recharts, VisX, ECharts)

Backend / Data
	•	Supabase (Postgres) as the primary data store
	•	Tables for:
	•	Aircraft models
	•	Aggregated metrics (time-series)
	•	Pre-computed distributions
	•	Signal states (with timestamps, confidence, persistence)
	•	API layer that:
	•	Serves pre-computed metrics (no heavy computation in the UI)
	•	Supports versioned / historical signal states
	•	No real-time streaming required
	•	Updates will be batched and governed, not live

You do not need to source data — only structure, store, and serve it.

Please get in touch with a bid that you believe to be fair.