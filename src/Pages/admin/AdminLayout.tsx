import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { HiOutlineHome, HiOutlineLogout, HiOutlineMenu, HiOutlineRefresh, HiOutlineX } from "react-icons/hi";

import { clearAdminToken, enforceAdminSession } from "../../api/client";

import { loadingScreenLogoUrl } from "../../content/mediaHub";



type RefreshContextValue = {

  refreshKey: number;

  refresh: () => void;

};



const RefreshContext = createContext<RefreshContextValue>({ refreshKey: 0, refresh: () => {} });



export function useAdminRefresh() {

  return useContext(RefreshContext);

}



const nav = [

  { to: "home", label: "Home" },

  { to: "contacts", label: "Inbox" },

  { to: "gallery", label: "Gallery" },

  { to: "videos", label: "Videos" },

  { to: "publications", label: "Publications" },

  { to: "press", label: "Press & Media" },

  { to: "account", label: "Account" },

];



export default function AdminLayout() {

  const navigate = useNavigate();

  const location = useLocation();

  const [refreshKey, setRefreshKey] = useState(0);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);



  const refresh = useCallback(() => {

    if (!enforceAdminSession()) {

      clearAdminToken();

      navigate("/qbitadmin-2026-login", { replace: true });

      return;

    }

    setRefreshKey((k) => k + 1);

  }, [navigate]);



  useEffect(() => {

    if (!enforceAdminSession()) {

      clearAdminToken();

      navigate("/qbitadmin-2026-login", { replace: true });

    }

  }, [navigate]);



  useEffect(() => {

    setMobileNavOpen(false);

  }, [location.pathname]);



  useEffect(() => {

    if (!mobileNavOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape") setMobileNavOpen(false);

    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {

      document.body.style.overflow = "";

      window.removeEventListener("keydown", onKeyDown);

    };

  }, [mobileNavOpen]);



  const logout = () => {

    clearAdminToken();

    window.location.href = "/qbitadmin-2026-login";

  };



  return (

    <RefreshContext.Provider value={{ refreshKey, refresh }}>

      <div className="flex min-h-screen bg-slate-100">

        <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-white lg:flex">

          <div className="border-b border-border p-5">

            <img src={loadingScreenLogoUrl} alt="" className="h-10 w-10 rounded-lg" />

            <p className="mt-3 font-display text-sm font-bold text-navy">Admin CMS</p>

          </div>

          <nav className="flex flex-1 flex-col gap-1 p-3">

            {nav.map((item) => (

              <NavLink

                key={item.to}

                to={`/qbitadmin-2026-login/dashboard/${item.to}`}

                className={({ isActive }) =>

                  `rounded-lg px-3 py-2 text-sm font-semibold no-underline ${

                    isActive ? "bg-navy/10 text-petal" : "text-navy hover:bg-slate-50 hover:text-petal"

                  }`

                }

              >

                {item.label}

              </NavLink>

            ))}

          </nav>

          <div className="space-y-1 border-t border-border p-3">

            <a

              href="/"

              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy no-underline hover:text-petal"

            >

              <HiOutlineHome className="text-lg" /> Website Home

            </a>

            <button

              type="button"

              onClick={logout}

              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-navy hover:bg-petal/5 hover:text-petal"

            >

              <HiOutlineLogout className="text-lg" /> Logout

            </button>

          </div>

        </aside>



        <div className="flex min-w-0 flex-1 flex-col">

          <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">

            <div className="flex items-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3">

              <button

                type="button"

                onClick={() => setMobileNavOpen(true)}

                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-navy lg:hidden"

                aria-label="Open menu"

              >

                <HiOutlineMenu className="text-lg" />

              </button>



              <div className="flex min-w-0 items-center gap-2 lg:hidden">

                <img src={loadingScreenLogoUrl} alt="" className="h-8 w-8 shrink-0 rounded-lg" />

                <span className="truncate font-display text-sm font-bold text-navy">Admin CMS</span>

              </div>



              <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">

                <button

                  type="button"

                  onClick={refresh}

                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-2.5 text-sm font-semibold text-navy hover:border-petal hover:text-petal sm:px-3"

                  aria-label="Refresh data"

                >

                  <HiOutlineRefresh className="text-base" />

                  <span className="hidden sm:inline">Refresh</span>

                </button>

                <a

                  href="/"

                  className="hidden h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-semibold text-navy no-underline hover:text-petal sm:inline-flex"

                >

                  <HiOutlineHome className="text-base" /> Home

                </a>

                <button

                  type="button"

                  onClick={logout}

                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy px-2.5 text-sm font-semibold text-white hover:bg-petal sm:px-4"

                  aria-label="Logout"

                >

                  <HiOutlineLogout className="text-base" />

                  <span className="hidden sm:inline">Logout</span>

                </button>

              </div>

            </div>

          </header>



          {mobileNavOpen && (

            <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation">

              <button

                type="button"

                className="absolute inset-0 bg-navy/40 backdrop-blur-sm"

                aria-label="Close menu"

                onClick={() => setMobileNavOpen(false)}

              />

              <aside className="absolute left-0 top-0 flex h-full w-[min(88vw,18rem)] flex-col border-r border-border bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-border p-4">

                  <div className="flex items-center gap-2">

                    <img src={loadingScreenLogoUrl} alt="" className="h-9 w-9 rounded-lg" />

                    <span className="font-display text-sm font-bold text-navy">Admin CMS</span>

                  </div>

                  <button

                    type="button"

                    onClick={() => setMobileNavOpen(false)}

                    className="rounded-lg p-2 text-navy hover:bg-slate-50"

                    aria-label="Close menu"

                  >

                    <HiOutlineX className="text-xl" />

                  </button>

                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">

                  {nav.map((item) => (

                    <NavLink

                      key={item.to}

                      to={`/qbitadmin-2026-login/dashboard/${item.to}`}

                      className={({ isActive }) =>

                        `rounded-lg px-3 py-2.5 text-sm font-semibold no-underline ${

                          isActive ? "bg-navy/10 text-petal" : "text-navy hover:bg-slate-50 hover:text-petal"

                        }`

                      }

                    >

                      {item.label}

                    </NavLink>

                  ))}

                </nav>

                <div className="space-y-1 border-t border-border p-3">

                  <a

                    href="/"

                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy no-underline hover:bg-slate-50 hover:text-petal"

                  >

                    <HiOutlineHome className="text-lg" /> Website Home

                  </a>

                  <button

                    type="button"

                    onClick={logout}

                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-navy hover:bg-petal/5 hover:text-petal"

                  >

                    <HiOutlineLogout className="text-lg" /> Logout

                  </button>

                </div>

              </aside>

            </div>

          )}



          <main className="flex-1 p-3 sm:p-6">

            <Outlet />

          </main>

        </div>

      </div>

    </RefreshContext.Provider>

  );

}


