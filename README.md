# AviationIntel

A model-first intelligence platform for business aviation. This project is an MVP focused on the **Bombardier Challenger 350**, designed to provide market intelligence, signal detection, and aircraft listings.

## 🚀 Features

*   **Authentication**: Secure user registration and login.
*   **Model Intelligence**: Detailed metrics for specific aircraft models.
*   **Market Analysis**:
    *   **Price Distribution**: Histogram of asking prices.
    *   **Price Trend**: Historical price trends with range bands.
    *   **Days on Market (DOM)**: Analysis of market velocity.
    *   **Comparative Analysis**: Compare metrics across different models.
*   **Signal Detection**: Bullish/Bearish/Neutral market signals with confidence scores.
*   **Inventory Management**: Comprehensive aircraft listings table.
*   **Responsive Design**: Optimized for desktop, tablet, and mobile viewing.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
*   **Charting**: [Recharts](https://recharts.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

*   Node.js >= 18.0.0
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/aviation-intel.git
    cd aviation-intel
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Architecture

The application follows a standard Next.js architecture using the App Router.

-   **Frontend**: React components rendering data served by the API layer. Charts are built with Recharts for statistical visualization.
-   **Backend**: API layer that serves pre-computed metrics stored in Supabase.
-   **Database**: Supabase (PostgreSQL) is the primary data store. It handles:
    -   Aircraft models
    -   Aggregated metrics (time-series)
    -   Pre-computed distributions
    -   Signal states (with timestamps, confidence, persistence)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📜 License

This project is private and proprietary.
