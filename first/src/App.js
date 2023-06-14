import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar, ThemeSetting } from "./components";
import Privateroute from "./components/Privateroute";
import AdminDashboardPage from "./pages/AdminDashboard/AdminDashboardPage";
import Home from "./pages/Home";
import Login from "./Form/Login";
import Register from "./Form/Register";
import Forgot from "./Form/Forgot";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import {
  SignUp,
  SignIn,
  CompanyProfile,
  UserProfile,
} from "./pages/AdminDashboard/index.js";
import {
  GetReports,
  Qualified,
  Closed,
  Contacted,
  Failed,
  Working,
  DashboardPage,
  Staff,
  AddStaff,
  Customers,
  AddCustomer,
  Leads,
  AddLead,
  AddLeadCategory,
  Deals,
  FollowUP,
  LeadCategory,
  Reportss,
} from "./pages/dashboard/index.js";
import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";
const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const { activeMenu, setActiveMenu } = useStateContext();
  const [AppPathName, setAppPathName] = useState("");
  useEffect(() => {
    // const url = window.location.href;

    setActiveMenu(false);

    const pathname = window.location.pathname;
    setAppPathName(pathname);

    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg w-full overflow-hidden">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/dashboard" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              )}
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/dashboard" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <Sidebar />
              )}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/dashboard" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <Sidebar />
              )}
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/dashboard" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <Navbar />
              )}
            </div>
            <div>
              {AppPathName === "/private/dashboard" && (
                <>{themeSettings && <ThemeSetting />}</>
              )}
              <Routes>
                {/* Private Routes */}
                <Route path="/private" element={<Privateroute />}>
                  <Route exact path="dashboard" element={<DashboardPage />} />
                  <Route exact path="dashboard/staff" element={<Staff />} />
                  <Route
                    exact
                    path="dashboard/customers"
                    element={<Customers />}
                  />
                  <Route
                    exact
                    path="dashboard/lead_category"
                    element={<LeadCategory />}
                  />
                  <Route
                    exact
                    path="dashboard/staff/AddStaff"
                    element={<AddStaff />}
                  />
                  <Route
                    exact
                    path="dashboard/customers/AddCustomer"
                    element={<AddCustomer />}
                  />
                  <Route
                    exact
                    path="dashboard/working_leads"
                    element={<Working />}
                  />
                  <Route
                    exact
                    path="dashboard/failed_leads"
                    element={<Failed />}
                  />
                  <Route
                    exact
                    path="dashboard/contacted_leads"
                    element={<Contacted />}
                  />
                  <Route
                    exact
                    path="dashboard/closed_leads"
                    element={<Closed />}
                  />
                  <Route
                    exact
                    path="dashboard/qualified_leads"
                    element={<Qualified />}
                  />
                  <Route
                    exact
                    path="dashboard/lead_category"
                    element={<LeadCategory />}
                  />
                  <Route
                    exact
                    path="dashboard/lead_category/AddLeadCategory"
                    element={<AddLeadCategory />}
                  />
                  <Route exact path="dashboard/leads" element={<Leads />} />
                  <Route
                    exact
                    path="dashboard/leads/AddLead"
                    element={<AddLead />}
                  />
                  <Route
                    exact
                    path="dashboard/leads_follow_UP"
                    element={<FollowUP />}
                  />
                  <Route exact path="dashboard/deals" element={<Deals />} />
                  <Route
                    exact
                    path="dashboard/reports"
                    element={<Reportss />}
                  />
                  <Route
                    exact
                    path="dashboard/reports/GetReports"
                    element={<GetReports />}
                  />
                </Route>

                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/forgot" element={<Forgot />} />
                <Route exact path="/about" element={<AboutUs />} />
                <Route exact path="/contact" element={<ContactUs />} />

                {/* Admin Dashboard  */}

                <Route
                  exact
                  path="/AdminDashboard"
                  element={<AdminDashboardPage />}
                >
                  <Route
                    exact
                    path="/AdminDashboard/signUp"
                    element={<SignUp />}
                  />
                  <Route
                    exact
                    path="/AdminDashboard/signin"
                    element={<SignIn />}
                  />
                  <Route
                    exact
                    path="/AdminDashboard/CompanyProfile"
                    element={<CompanyProfile />}
                  />
                  <Route
                    exact
                    path="/AdminDashboard/UserProfile"
                    element={<UserProfile />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
