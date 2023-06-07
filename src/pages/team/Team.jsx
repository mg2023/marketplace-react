
const Team = () => {
  return (
    <div className="pt-4 min-h-400px mt-12 mb-24">
      <h1 className="text-center text-md xl:text-4xl mb-8">NOSOTROS</h1>
      <div className="flex justify-center">
        <div className="w-1/2 mx-auto">
          <img src="https://via.placeholder.com/500x300/" alt="Imagen 1" className="mb-4" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper fringilla arcu,
            quis posuere neque ullamcorper id. Suspendisse vel consequat nisl. Nullam vel fringilla tellus.
            Fusce auctor quam at ipsum posuere, sed tincidunt leo pellentesque. Curabitur aliquet mi ut velit
            eleifend, sed suscipit ligula tincidunt. Etiam aliquam dolor augue, eget tristique nulla feugiat
            nec. Donec tempus nunc non tellus auctor, eu consequat risus volutpat. Aliquam erat volutpat.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <img src="https://via.placeholder.com/150/" alt="Miembro del equipo 1" className="mx-auto mb-4 rounded-full w-32" />
            <h3 className="text-lg font-semibold">Miembro del Equipo 1</h3>
            <p className="text-sm text-gray-500">Cargo del equipo 1</p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/150/" alt="Miembro del equipo 2" className="mx-auto mb-4 rounded-full w-32" />
            <h3 className="text-lg font-semibold">Miembro del Equipo 2</h3>
            <p className="text-sm text-gray-500">Cargo del equipo 2</p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/150/" alt="Miembro del equipo 3" className="mx-auto mb-4 rounded-full w-32" />
            <h3 className="text-lg font-semibold">Miembro del Equipo 3</h3>
            <p className="text-sm text-gray-500">Cargo del equipo 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
