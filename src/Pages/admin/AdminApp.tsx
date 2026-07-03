import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminHome from "./AdminHome";
import AdminContacts from "./AdminContacts";
import AdminGallery from "./AdminGallery";
import AdminVideos from "./AdminVideos";
import AdminPublications from "./AdminPublications";
import AdminPress from "./AdminPress";
import AdminAccount from "./AdminAccount";
import AdminResetPassword from "./AdminResetPassword";

/** Single admin bundle — avoids lazy-load waterfall on login/dashboard. */
export default function AdminApp() {
  return (
    <Routes>
      <Route path="/qbitadmin-2026-login" element={<AdminLogin />} />
      <Route path="/qbitadmin-2026-login/reset" element={<AdminResetPassword />} />
      <Route path="/qbitadmin-2026-login/dashboard" element={<AdminLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="publications" element={<AdminPublications />} />
        <Route path="press" element={<AdminPress />} />
        <Route path="account" element={<AdminAccount />} />
      </Route>
    </Routes>
  );
}
