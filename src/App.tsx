import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import MainContent, { useRouteLoading } from "./Layout/MainContent.tsx";
import LoadingScreen from "./Components/LoadingScreen.tsx";
import ScrollToTop from "./Components/ScrollToTop.tsx";

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

function AppRoutes() {
  const { visible, exiting, handlePageReady, handleExitComplete, loaderKey } = useRouteLoading();

  return (
    <>
      {visible && (
        <LoadingScreen
          key={loaderKey}
          exiting={exiting}
          onExitComplete={handleExitComplete}
        />
      )}
      <ScrollToTop />
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

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col text-left">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
