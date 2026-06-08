import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Footer from "./Footer";
import type { Page } from "../App";

interface Props {
  currentPage: Page;
  navigate: (page: Page) => void;
  children: React.ReactNode;
}

export default function DashboardLayout({ currentPage, navigate, children }: Props) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} navigate={navigate} />

       <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
     </div>
  );
}