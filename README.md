# Narada AI: Autonomous Hospital Resource Optimization System

Narada AI is an intelligent, multi-agent system designed to proactively manage hospital resources. By combining real-time external threat detection with internal hospital data, it predicts patient surges and optimizes staff and bed allocation before emergencies escalate.

## 🚀 Features

-   **Autonomous Multi-Agent System**:
    -   **News Fetcher**: Scans external sources for real-time events.
    -   **Summarizer**: Filters noise and identifies critical incidents.
    -   **Analyzer**: Predicts impact on hospital resources and generates action plans.
-   **Real-time Command Center**:
    -   Live view of Ward Capacity (Occupied vs. Total).
    -   Staff Distribution metrics (Doctors, Nurses, Roles).
    -   Department-wise occupancy tracking.
-   **Predictive Analytics**:
    -   Forecasting patient load based on external events.
    -   Impact analysis on specific wards and inventory.
-   **AI Chatbot Assistant**:
    -   Context-aware chatbot for instant queries (e.g., "How many beds are free in Ward A?").
    -   Supports markdown rendering for tables and lists.
-   **Staff Management**:
    -   Detailed directory of doctors and nurses.
    -   Role-based distribution visualization.

## 🛠️ Tech Stack

### Frontend

-   **Framework**: [Next.js](https://nextjs.org/) (React)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Visualization**: [Recharts](https://recharts.org/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Server**: [Express](https://expressjs.com/)
-   **Real-time Communication**: [Socket.IO](https://socket.io/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **AI/LLM**: Google Gemini (via `@google/genai`)
-   **Infrastructure**: [Redis](https://redis.io/) (for agent message queues)

## 📦 Installation & Setup

### Prerequisites

-   Node.js (v18+)
-   PostgreSQL
-   Redis

### 1. Clone the Repository

```bash
git clone <repository-url>
cd narada-ai
```

### 2. Install Dependencies

Install dependencies for both backend and frontend.

**Backend:**

```bash
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_db
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=your_gemini_api_key
PORT=8000
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Database Setup

Push the schema to your PostgreSQL database:

```bash
npx drizzle-kit push
```

### 5. Running the Application

You need to run the backend server, the agents, and the frontend development server concurrently.

**Backend Server:**

```bash
npm run start
```

**Agents (Run in separate terminals):**

```bash
npm run start:fetcher
npm run start:summarizer
npm run start:analyzer
```

**Frontend:**

```bash
cd frontend
npm run dev
```
