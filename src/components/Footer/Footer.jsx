
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center">
          <p className="text-sm">&copy; 2023 Mi Tienda Online</p>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-sm hover:text-gray-300">Inicio</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-gray-300">Acerca de nosotros</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-gray-300">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
