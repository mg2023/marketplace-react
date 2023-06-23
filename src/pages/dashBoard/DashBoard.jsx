import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  RiHome6Line,
  RiFolder2Line,
  RiBook3Line,
  RiCalendar2Line,
  RiChat1Line,
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";
import Products from "../../components/Dashboard/Products";

function Dashboard() {
  const { usuario } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [activeButton, setActiveButton] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar el tipo de usuario y tomar acciones según corresponda
    if (usuario.data?.type !== 1) {
      // Si el tipo de usuario no es administrador, redirigir a otra ruta
      navigate("/login");
    }
  }, [usuario]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "dashboard":
        return <Products />;
      case "classes":
        return <ClassesContent />;
      case "resources":
        return <ResourcesContent />;
      case "learningPlan":
        return <LearningPlanContent />;
      case "chat":
        return <ChatContent />;
      default:
        return null;
    }
  };

  const ClassesContent = () => {
    // Contenido de las clases
    return <h1>Classes Content</h1>;
  };

  const ResourcesContent = () => {
    // Contenido de los recursos
    return <h1>Resources Content</h1>;
  };

  const LearningPlanContent = () => {
    // Contenido del plan de aprendizaje
    return <h1>Learning Plan Content</h1>;
  };

  const ChatContent = () => {
    // Contenido del chat
    return <h1>Chat Content</h1>;
  };

  return (
    <div className="min-h-[50vh]">
      {/* Sidebar */}
      <div
        className={`top-13 fixed z-50 flex h-auto w-3/4 flex-col justify-between bg-gray-100 p-8 transition-all md:w-96 xl:left-0 ${
          showMenu ? "left-0" : "-left-full"
        } `}
      >
        <div>
          <ul>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "dashboard" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("dashboard")}
              >
                <RiHome6Line /> Productos
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "classes" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("classes")}
              >
                <RiFolder2Line /> Classes
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "resources" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("resources")}
              >
                <RiBook3Line /> Resources
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "learningPlan" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("learningPlan")}
              >
                <RiCalendar2Line /> Learning Plan
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "chat" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("chat")}
              >
                <RiChat1Line /> Chat
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 rounded-full bg-gray-100 p-4 xl:hidden"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>

      <main className="p-4 pt-36 md:pt-24 xl:pl-[400px] xl:pt-28">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
