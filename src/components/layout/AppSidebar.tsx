import { ChevronDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItemWithSub {
  name: string;
  subItems: SubMenuItem[];
}

interface MenuItemSimple {
  name: string;
  path: string;
}

type MenuItem = MenuItemWithSub | MenuItemSimple;

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Change Management",
    subItems: [
      { name: "Change Requests", path: "/change-management/change-request" },
      { name: "Schedule", path: "/change-management/change-schedule" },
      { name: "Results", path: "/change-management/change-results" },
      { name: "Emergency Requests", path: "/change-management/emergency-request" },
    ],
  },
  {
    name: "Patch Management",
    subItems: [
      { name: "Patch Job", path: "/patch-management/patch-job" },
      { name: "Schedule", path: "/patch-management/patch-schedule" },
      { name: "Results", path: "/patch-management/patch-results" },
    ],
  },
  {
    name: "CMDB",
    path: "/cmdb",
  },
];

interface SidebarProps {
  isOpen: boolean;
}

const AppSidebar = ({ isOpen }: SidebarProps) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  return (
    <aside
      className={cn(
        "fixed left-0 transition-transform duration-300 ease-in-out z-40",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{
        top: "80px",
        width: "270px",
        height: "calc(100vh - 80px)",
        backgroundColor: "#384E66",
      }}
    >
      <nav className="py-4">
        {menuItems.map((item) => {
          if ("subItems" in item) {
            const isExpanded = expandedMenu === item.name;

            return (
              <div key={item.name}>
                <button
                  onClick={() => setExpandedMenu(isExpanded ? null : item.name)}
                  className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-transparent"
                >
                  <span className="text-base">{item.name}</span>
                  <ChevronDown 
                    size={18} 
                    className={cn("transition-transform", isExpanded && "rotate-180")}
                  />
                </button>

                {isExpanded && (
                  <div className="bg-[#2F4256]">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className="flex items-center gap-3 px-12 py-3 text-white hover:bg-white/10 text-sm"
                        activeClassName="bg-white/20 border-l-4 border-white"
                      >
                        <span>{subItem.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className="flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2F4256]"
              activeClassName="bg-[#2F4256] border-l-4 border-white"
            >
              <span className="text-base">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
