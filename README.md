# TacomaASDWebsite
[Tacoma ASD Church](https://www.sdatacoma.com/) webiste.

This site provides access to church resources for members who are unable to attend in-person events. It features an embedded livestream during services, general information about the church, current sabbath school lessons, information about the leadership team, overview of the ministries, and a synced events calendar.

Made with Next.js and TypeScript and hosted on Vercel.

## Screenshots

## Features
1. Livestream Integration: Displays church's YouTube livestreams when active.
2. Bible Lessons: Embeds Sabbath School lessons and study resources.
3. Church Calendar: Shows upcoming church events and scheduled activities.
4. Bilingual Interface: Supports English and Russian content.
5. Font toggle: Provides a large font option for most text.

## Tech Stack
- **Frontend:** React, Typescript, Tailwind CSS, FullCalendar
- **Backend:** Next.js (App Router, API Routes)
- **External APIs:** YouTube, Google Calendar, Google OAuth 2.0
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js: A version compatible with Next.js 16 (Node.js 20.9 or later).

### Installation

```bash
git clone https://github.com/glavavlada/TacomaASDWebsite.git
cd repo
npm install
```

### Environment Variables

Create a `.env.local` file based on `.env.example`.

| Variable | Description | Required |
|---|---|---|
| `EXAMPLE_API_KEY` | API credential | Yes |

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000.

## Usage

Explain how to use the main features.

## Architecture

Describe the main components and how data flows between them.

## Development

```bash
npm run lint
npm run build
```

Include only commands supported by the project.

## Known Limitations
Document important limitations or unfinished functionality, if any.

## Credits
Developers: Vladislav Glavatskii, Evgeniia Nemynova  
APIs, libraties, external content:
