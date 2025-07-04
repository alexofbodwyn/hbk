# HBK Senior Frontend Engineer Test Submission

A React application displaying National Weather Service alerts with filtering, sorting, and detailed views.

## Tech Stack

- **Framework:** Vite + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack Query (React Query)
- **Tables:** TanStack Table
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React

## Performance

![Lighthouse Score](./images/lighthouse.png)

## Features

- 📊 **Interactive Data Table** - Sort and filter weather alerts
- 📅 **Date Range Filtering** - Filter alerts by custom date ranges
- 🔍 **Detailed Alert View** - Click any row to view comprehensive alert details
- ♾️ **Infinite Loading** - Load more alerts seamlessly
- 🕒 **Local Timezone** - All dates displayed in user's local timezone

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test