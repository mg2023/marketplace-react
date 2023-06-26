import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../../components/Dashboard/ProductsV2";
import ChatContent from "../../components/Dashboard/ChatContent";
import SubMenu from "../../components/Dashboard/SubMenu";
import Analitycs from "../../components/Dashboard/Analitycs";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("products");

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

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="min-h-[50vh]">
      <SubMenu onComponentChange={handleComponentChange} />
      {selectedComponent === "products" && <Products />}
      {selectedComponent === "chat" && <ChatContent />}
      {selectedComponent === "analytics" && <Analitycs />}
    </div>
  );
}

export default Dashboard;
