import { useState } from "react";
import LoginCard from "./components/LoginCard";
import DashboardLayout from "./components/DashboardLayout";
import InicioPage from "./pages/InicioPage";
import CursosPage from "./pages/CursosPage"
import AgendaPage from "./pages/AgendaPage";
import HistorialPage from "./pages/HistorialPage";
import ChatPage from "./pages/ChatPage";
import AjustesPage from "./pages/AjustesPage";
import SoportePage from "./pages/SoportePage";
import NotificacionesPage from "./pages/NotificacionesPage";

export type Page = | "inicio" | "cursos" | "agenda" |  "historial"   | "chat" | "ajustes" | "soporte" | "notificaciones";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("inicio");

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <LoginCard onLogin={() => setLoggedIn(true)} />
        </div>
      </main>
    );
  }

  function NavPage() {
    switch (currentPage) {
      case "inicio":
        return <InicioPage navigate={setCurrentPage} />;

       case "cursos":
        return <CursosPage navigate={setCurrentPage} />;

      case "agenda":
        return <AgendaPage />;

      case "historial":
        return <HistorialPage />;

      case "chat":
        return <ChatPage />;

       case "ajustes":
        return (
          <AjustesPage
            onLogout={() => setLoggedIn(false)}
          />
        );

       case "soporte":
        return <SoportePage />;

      case "notificaciones":
        return <NotificacionesPage />;

      default:
        return <InicioPage navigate={setCurrentPage} />;
    }
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      navigate={setCurrentPage}
    >
      {NavPage()}
    </DashboardLayout>
  );
}

export default App;