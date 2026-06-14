import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar.tsx";
import Footer from "../Components/Footer.tsx";

/** Fires after the lazy route has rendered inside Suspense */
function PageReadyMarker({ onReady }: { onReady: () => void }) {
  const location = useLocation();

  useEffect(() => {
    onReady();
  }, [onReady, location.pathname]);

  return null;
}

type MainContentProps = {
  onPageReady: () => void;
};

function MainContent({ onPageReady }: MainContentProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-var(--nav-height))] flex-1">
        <Suspense fallback={null}>
          <>
            <Outlet />
            <PageReadyMarker onReady={onPageReady} />
          </>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default MainContent;

const MIN_LOADER_MS = 450;
const MAX_LOADER_MS = 6000;

export function useRouteLoading() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const shownAtRef = useRef(performance.now());
  const pathnameRef = useRef(location.pathname);

  /* Reset before child effects so PageReadyMarker can set ready on the same navigation */
  useLayoutEffect(() => {
    pathnameRef.current = location.pathname;
    setVisible(true);
    setExiting(false);
    setPageReady(false);
    shownAtRef.current = performance.now();
  }, [location.pathname]);

  const handlePageReady = useCallback(() => {
    if (pathnameRef.current === location.pathname) {
      setPageReady(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!visible || exiting || !pageReady) return;

    const elapsed = performance.now() - shownAtRef.current;
    const wait = Math.max(0, MIN_LOADER_MS - elapsed);

    const timer = window.setTimeout(() => setExiting(true), wait);
    return () => window.clearTimeout(timer);
  }, [visible, exiting, pageReady]);

  /* Safety net — never leave the loader stuck if ready signal is missed */
  useEffect(() => {
    if (!visible || exiting) return;

    const timer = window.setTimeout(() => {
      setPageReady(true);
      setExiting(true);
    }, MAX_LOADER_MS);

    return () => window.clearTimeout(timer);
  }, [visible, exiting, location.pathname]);

  const handleExitComplete = useCallback(() => {
    setVisible(false);
    setExiting(false);
  }, []);

  return {
    visible,
    exiting,
    handlePageReady,
    handleExitComplete,
    loaderKey: location.pathname,
  };
}
