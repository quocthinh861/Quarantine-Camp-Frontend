import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // List of pages that should require authentication
  const protectedPages = [
    "/", // Add more protected pages as needed
  ];

  // List of pages that should not have the layout
  const pagesWithoutLayout = [
    "/auth/signin",
    "/public-page" /* add more pages */,
    "/auth/error"
  ];

  // Check if the current page requires authentication
  const requiresAuth = protectedPages.includes(router.pathname);

  // Fetch the session
  const { data: session, status } = useSession();

  // If the session is loading, show a loading indicator
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If the page requires authentication and the user is not authenticated, redirect to the sign-in page
  if (requiresAuth && !session) {
    router.push("/auth/signin");
    return null; // Return null to avoid rendering anything while redirecting
  }

  // Check if the current page should not have the layout
  const shouldSkipLayout = pagesWithoutLayout.includes(router.pathname);

  return (
    <>
      {shouldSkipLayout ? (
        <Component {...pageProps} />
      ) : (
        <Sidebar>
          <Header />
          <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <Component {...pageProps} />
            </main>
          </div>
        </Sidebar>
      )}
    </>
  );
}

function MyAppWithSession({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyApp Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

export default MyAppWithSession;