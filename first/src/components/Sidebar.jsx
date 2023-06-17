import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const navigate = useNavigate();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 200) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const [showFollowUpDropdown, setShowFollowUpDropdown] = useState(false);

  const handleFollowUpHover = () => {
    setShowFollowUpDropdown(true);
  };

  const handleFollowUpLeave = () => {
    setShowFollowUpDropdown(false);
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <a href="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>GAB_LMS</span>
            </a>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <div key={link.route}>
                    {link.route === 'private/dashboard/leads_follow_UP' ? (
                      <div
                        className="relative"
                        onMouseEnter={handleFollowUpHover}
                        onMouseLeave={handleFollowUpLeave}
                      >
                        <NavLink
                          to={link.route}
                          onClick={handleCloseSideBar}
                          style={({ isActive }) => ({
                            backgroundColor: isActive ? currentColor : '',
                          })}
                          className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        >
                          {link.icon}
                          <span className="capitalize">{link.name}</span>
                        </NavLink>
                        {showFollowUpDropdown && (
                          <div
                            className="absolute top-0 left-48 w-36 bg-white shadow-lg rounded-md p-2 mt-1"
                            onMouseEnter={handleFollowUpHover}
                            onMouseLeave={handleFollowUpLeave}
                          >
                            <NavLink
                              to="/dashboard/failed_leads"
                              className="block px-2 py-1 hover:bg-gray-200 rounded"
                            >
                              Failed
                            </NavLink>
                            <NavLink
                              to="/dashboard/working_leads"
                              className="block px-2 py-1 hover:bg-gray-200 rounded"
                            >
                             Working
                            </NavLink>
                            <NavLink
                              to="/dashboard/contacted_leads"
                              className="block px-2 py-1 hover:bg-gray-200 rounded"
                            >
                              Contaced
                            </NavLink>
                            <NavLink
                              to="/dashboard/closed_leads"
                              className="block px-2 py-1 hover:bg-gray-200 rounded"
                            >
                             Closed
                            </NavLink>
                            <NavLink
                              to="/dashboard/qualified_leads"
                              className="block px-2 py-1 hover:bg-gray-200 rounded"
                            >
                             Qualified
                            </NavLink>
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={link.route}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize">{link.name}</span>
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
