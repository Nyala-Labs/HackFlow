# Full Stack Web Development with SvelteKit, AI, and Docker

This repository contains the code for a four-part workshop series designed to teach beginners how to build, integrate, and deploy a modern web application using SvelteKit, JavaScript, AI, Docker, and Render.

## Course Overview

This four-part workshop series teaches beginners how to build, integrate, and deploy a modern web application using SvelteKit, JavaScript, AI, Docker, and Render. The central project is a Hackathon Idea Generator, which transforms user input into structured AI-generated ideas.

The series emphasizes hands-on learning with minimal slides. Each session progressively builds the application while introducing essential concepts:

*   **Episode 1 – Foundations of Modern Web Development:** Participants set up their environment, learn SvelteKit basics, and build a multi-page interactive web project. The landing page along with footer will be built out using components and ShadCn. The focus is on understanding how web apps work and writing simple reactive components.

*   **Episode 2 – Building the Hackathon Idea Generator:** Participants extend the app with forms and server endpoints, learning how data flows from frontend to backend. JavaScript fundamentals are taught in context, including async fetch calls, form handling, and server routes.

*   **Episode 3 – Integrating AI with Gemini API:** Participants connect the app to the Gemini AI API through a secure server endpoint. They learn prompt design, structured AI output handling, loading states, and error management, turning the app into a functional AI tool.

*   **Episode 4 – Docker and Deployment with Render:** Participants learn how to package the app in Docker and deploy it to Render, making it publicly accessible. Concepts of containers, environment variables, and deployment flow are introduced without requiring prior experience.

By the end of the series, participants will have built and deployed a complete, working AI web application, gained practical experience with full stack development, and acquired mental models that support hackathon-ready project building.

## Project Structure

The repository is organized by workshop episode:

```
.
├── completed_project/      # The final, complete application
├── workshop_1/
│   ├── start/              # Starting code for Episode 1
│   └── end/                # Completed code for Episode 1
├── workshop_2/              # (Coming soon)
├── workshop_3/              # (Coming soon)
└── workshop_4/              # (Coming soon)
```

-   `completed_project/`: Contains the final, production-ready version of the Hackathon Idea Generator application.
-   `workshop_*/start/`: Provides the boilerplate code needed to begin each workshop episode.
-   `workshop_*/end/`: Contains the completed code at the end of each episode, for your reference.

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [Docker](https://www.docker.com/products/docker-desktop/) (for Episode 4)
-   [Pnpm]
## Getting Started

To get started with any of the workshops or the completed project, navigate to the respective directory and install the dependencies:

```bash
# Example for Workshop 1
cd workshop_1/start
pnpm install
```

Once dependencies are installed, you can run the development server:

```bash
pnpm run dev
```
````
This will start the application on `http://localhost:5173`.

### Available Scripts

Each project includes the following scripts:

-   `pnpm run dev`: Starts the development server.
-   `pnpm run build`: Builds the application for production.
-   `pnpm run preview`: Previews the production build locally.
-   `pnpm run check`: Runs Svelte check to validate types.
-   `pnpm run lint`: Lints the code using ESLint and Prettier.
-   `pnpm run format`: Formats the code with Prettier.

## How to Use This Repository

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the workshop:**
    Choose the workshop you want to start and `cd` into the `start` directory (e.g., `cd workshop_1/start`).
3.  **Follow the workshop:**
    Follow the instructions for the workshop, using the `end` directory as a reference if you get stuck.

## The Completed Project

The `completed_project` directory holds the final version of the application, integrating all the concepts from the workshop series. You can run it locally to see the finished product in action.