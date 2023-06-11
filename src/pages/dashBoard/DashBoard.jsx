import { useState } from "react";
import {
  RiHome6Line,
  RiFolder2Line,
  RiBook3Line,
  RiCalendar2Line,
  RiChat1Line,
  RiMenu3Fill,
  RiCloseLine
} from "react-icons/ri";
import Componente1 from "../../components/Dashboard/Componente1";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeButton, setActiveButton] = useState("dashboard");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "dashboard":
        return <Componente1 />;
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
        className={`fixed top-13 w-3/4 xl:left-0 md:w-96 h-auto bg-gray-100 p-8 flex flex-col justify-between z-50 transition-all ${
          showMenu ? "left-0" : "-left-full"
        } `}
      >
        <div>
          <ul>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg ${
                  activeButton === "dashboard" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleButtonClick("dashboard")}
              >
                <RiHome6Line /> Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg ${
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
                className={`flex items-center gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg ${
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
                className={`flex items-center gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg ${
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
                className={`flex items-center gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg ${
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
        className="xl:hidden fixed bottom-6 right-6 bg-gray-100 p-4 rounded-full"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>

      <main className="xl:pl-[400px] p-4 pt-36 md:pt-24 xl:pt-28">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
