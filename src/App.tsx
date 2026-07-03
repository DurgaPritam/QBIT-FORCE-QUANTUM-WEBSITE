import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainContent, { useRouteLoading } from "./Layout/MainContent.tsx";
import LoadingScreen from "./Components/LoadingScreen.tsx";
import ScrollToTop from "./Components/ScrollToTop.tsx";
import PageMeta from "./Components/PageMeta.tsx";
import CursorDotTrail from "./Components/CursorDotTrail.tsx";

const Home = lazy(() => import("./Pages/Home.tsx"));
const AboutUs = lazy(() => import("./Pages/AboutUs.tsx"));
const Products = lazy(() => import("./Pages/Products.tsx"));
const Careers = lazy(() => import("./Pages/Careers.tsx"));
const ContactUs = lazy(() => import("./Pages/ContactUs.tsx"));
const TC = lazy(() => import("./Pages/TC.tsx"));
const PrivacyPolicy = lazy(() => import("./Pages/Privacy.tsx"));
const Gallery = lazy(() => import("./Pages/Gallery.tsx"));
const Publications = lazy(() => import("./Pages/Publications.tsx"));
const Videos = lazy(() => import("./Pages/Videos.tsx"));
const Press = lazy(() => import("./Pages/Press.tsx"));

const AdminApp = lazy(() => import("./Pages/admin/AdminApp.tsx"));

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
    </div>
  );
}

function PublicApp() {
  const { visible, exiting, handlePageReady, handleExitComplete, loaderKey } = useRouteLoading();

  return (
    <>
      {visible && (
        <LoadingScreen key={loaderKey} exiting={exiting} onExitComplete={handleExitComplete} />
      )}
      <Routes>
        <Route element={<MainContent onPageReady={handlePageReady} />}>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<AboutUs />} />
          <Route path="/company/ourteam" element={<Navigate to="/company#leaders" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/press" element={<Press />} />
          <Route path="/terms" element={<TC />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </>
  );
}

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/qbitadmin");

  return (
    <>
      <ScrollToTop />
      <PageMeta />
      {!isAdmin && <CursorDotTrail />}
      <Suspense fallback={isAdmin ? <AdminFallback /> : null}>
        {isAdmin ? <AdminApp /> : <PublicApp />}
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col text-left">
        <Routes>
          <Route path="/*" element={<AppShell />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
