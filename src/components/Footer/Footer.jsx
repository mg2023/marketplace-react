
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/productos">Productos</a>
              </li>
              <li>
                <a href="/servicios">Servicios</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociales</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://twitter.com">Twitter</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p>Dirección: Calle Principal, Ciudad</p>
            <p>Teléfono: 123-456-7890</p>
            <p>Email: info@example.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
