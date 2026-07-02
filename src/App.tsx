import { useState } from "react";
import LoginCard from "./components/LoginCard";
import DashboardLayout from "./components/DashboardLayout";
import InicioPage from "./pages/InicioPage";
import CursosPage from "./pages/CursosPage"
import AgendaPage from "./pages/AgendaPage";
import HistorialPage from "./pages/HistorialPage";
import ChatPage from "./pages/ChatPage";
import SoportePage from "./pages/SupportPage";
import NotificacionesPage from "./pages/NotificacionesPage";
import EditProfilePage from "./pages/EditProfilePage";
import SettingsPage from "./pages/SettingsPage";


export type Page = | "inicio" | "editar-perfil" |"cursos" | "agenda" |  "historial"   | "chat" | "ajustes" | "soporte" | "notificaciones";

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

       case "editar-perfil":
        return <EditProfilePage setPage={setCurrentPage} />;

       case "cursos":
        return <CursosPage navigate={setCurrentPage} />;

      case "agenda":
        return <AgendaPage />;

      case "historial":
        return <HistorialPage />;

      case "chat":
        return <ChatPage />;

      case "ajustes":
        return (<SettingsPage
            onLogout={() => setLoggedIn(false)}
              setPage={setCurrentPage} 
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