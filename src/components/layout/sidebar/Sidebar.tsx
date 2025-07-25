import { SidebarNav } from './SidebarNav';

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] border-r bg-muted/40 md:block lg:w-[280px]">
      <SidebarNav />
    </aside>
  );
};
