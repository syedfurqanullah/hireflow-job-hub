import { useState } from "react";
import { Bookmark, BriefcaseBusiness, ClipboardList, LayoutDashboard } from "lucide-react";

const SIDEBAR_LINKS = [
  ["dashboard-stats", "Overview", LayoutDashboard],
  ["saved-jobs", "Saved jobs", Bookmark],
  ["recommended-jobs", "Recommended jobs", BriefcaseBusiness],
  ["application-tracking", "Applications", ClipboardList],
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("dashboard-stats");

  return (
    <aside className="dashboard-sidebar block h-fit min-w-0 rounded-2xl border border-blue-200 bg-white p-3 shadow-sm md:p-4">
      <h2 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Dashboard menu</h2>
      <nav aria-label="Dashboard sections" className="mt-2 flex gap-1 overflow-x-auto md:mt-3 md:flex-col md:overflow-visible">
        {SIDEBAR_LINKS.map(([id, label, Icon]) => {
          const active = activeSection === id;
          return (
            <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)} aria-current={active ? "location" : undefined} className={`inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition md:w-full ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
