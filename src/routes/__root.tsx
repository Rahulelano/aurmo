import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAppStore } from "@/lib/store";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gold-gradient">404</h1>
        <h2 className="mt-4 font-serif text-2xl">This path is uncharted</h2>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
          The page you sought has dissolved into the divine. Return to the threshold.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-sm bg-gold-gradient px-6 py-3 text-sm font-medium text-[color:var(--ink)]">
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">A moment of stillness</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Something interrupted the offering. Please try again.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-sm bg-gold-gradient px-5 py-2.5 text-sm font-medium text-[color:var(--ink)]">
            Try again
          </button>
          <a href="/" className="rounded-sm border border-[color:var(--gold)]/40 px-5 py-2.5 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    useAppStore.getState().syncFromServer();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </QueryClientProvider>
  );
}

