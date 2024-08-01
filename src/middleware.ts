import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isWebhookRoute = createRouteMatcher(['/api/webhooks(.*)']);

export default clerkMiddleware((auth, req) => {
  // Ignore specific routes like webhooks
  if (isWebhookRoute(req)) {
    return; // Skip authentication for these routes
  }

  // You can add additional logic here for protecting other routes
  // For example, you can check roles or other conditions
  auth().protect(); // Protect all other routes by default
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};