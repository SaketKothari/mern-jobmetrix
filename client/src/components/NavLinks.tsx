import React from "react";
import { NavLink } from "react-router-dom";

import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

interface NavLinksProps {
  isBigSidebar?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role !== "admin") return null;

        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? undefined : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
