<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/47717112-faa1-4ef6-a00d-b75a3d285bda

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Netlify

Deployments use Netlify's Git integration rather than GitHub Actions:

1. In Netlify, choose **Add new site** → **Import an existing project** and connect this GitHub repository.
2. Select the `main` branch. Netlify reads the build command, publish directory, and Node.js version from [netlify.toml](./netlify.toml).
3. Choose **Deploy site**. Netlify will build and publish the site on pushes to `main`.

The app's `GEMINI_API_KEY` must be configured in the Netlify site's environment variables if the deployed app needs it. Do not commit the key to the repository.
