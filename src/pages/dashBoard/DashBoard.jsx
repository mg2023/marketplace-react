import { useState, useEffect } from "react";
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
import ChatContent from "../../components/Dashboard/ChatContent";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeButton, setActiveButton] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar la existencia del token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Recuperar la información del usuario almacenada en localStorage
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userType = userData.type;
        if (userType !== 1) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);

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

  return (
    <div className="min-h-[50vh]">
      {/* Sidebar */}
      <div
        className={`top-13 fixed z-50 flex h-full w-3/4 flex-col justify-between bg-gray-300 py-8 transition-all md:w-96 xl:left-0 ${
          showMenu ? "left-0" : "-left-full"
        } `}
      >
        <div>
          <ul>
            <li>
              <a
                href="#"
                className={`m-2 flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
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
                className={`m-2 flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "chat" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("chat")}
              >
                <RiChat1Line /> Comentarios
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`m-2 flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
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
                className={`m-2  flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
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
                className={`m-2  flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-gray-200 ${
                  activeButton === "learningPlan" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("learningPlan")}
              >
                <RiCalendar2Line /> Learning Plan
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 rounded-full bg-gray-900 p-4 text-cyan-50 xl:hidden"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>

      <main className="p-4 pt-12 md:pt-12 xl:pl-[400px] xl:pt-12">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
