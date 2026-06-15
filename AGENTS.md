<!-- BEGIN:nextjs-agent-rules -->
# AGENTS.md

## Project Overview

This is a Next.js 15 application using:

* TypeScript
* Tailwind CSS
* App Router
* Payload CMS
* PostgreSQL

## Coding Standards

* Use TypeScript for all new files.
* Prefer Server Components unless client-side interactivity is required.
* Use `use client` only when necessary.
* Prefer async Server Components for data fetching.
* Avoid unnecessary useEffect hooks.
* Use Tailwind CSS for styling.
* Follow ESLint and Prettier rules.
* If project behavior changes or new patterns are introduced, update this file to reflect the new behavior.

## File Structure

* `app/(frontend)` contains routes and layouts.
* `app/(frontend)/components/` contains reusable UI components.
* `app/(frontend)/lib/` contains utilities and services.
* `app/(payload)/` contains CMS collections and configuration.
* `app/rss.xml` generates the RSS feed.

## Data Fetching

* Fetch data in Server Components whenever possible.
* Do not import `payload.config.ts` into Client Components.
* Use server-only utilities for Payload access.

## API Routes

* Validate all request inputs.
* Return consistent JSON responses.
* Handle errors gracefully.

## Performance

* Prefer static rendering when possible.
* Use ISR where content changes periodically.
* Optimize images using Next.js Image component.

## Security

* Never expose secrets to the client.
* Keep API keys in environment variables.
* Validate and sanitize user input.

## Testing

* Add tests for critical business logic.
* Ensure TypeScript build passes before committing.

## Git

* Use descriptive commit messages.
* Keep pull requests focused and small.

<!-- END:nextjs-agent-rules -->
