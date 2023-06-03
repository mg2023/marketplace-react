import { useState } from 'react';
import Input from '../../components/Input/Input';

const Register = () => {
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <div className='pt-4 mb-8 min-h-400px flex-row justify-center items-center'>
      <h1 className='text-center text-md xl:text-4xl mb-8'>CREAR CUENTA</h1>
      <h2 className='text-center text-md xl:text-xl'>Únete a nuestra comunidad</h2>
      <h3 className='text-center text-xs xl:text-md mb-8'>
        Crea una cuenta nueva o inicia sesión para
        <a
          href="/register"
          className='underline hover:font-bold'
          > acceder</a>.
      </h3>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <Input
      label="Teléfono"
      type="tel"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      placeholder="1234567890"
      className="mb-2"
    />
    <Input
      label="Nombre"
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      placeholder="Nombre"
      className="mb-2"
    />
    <Input
      label="Apellido"
      type="text"
      value={apellido}
      onChange={(e) => setApellido(e.target.value)}
      placeholder="Apellido"
      className="mb-2"
    />
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="example@mail.com"
      className="mb-2"
    />
    <Input
      label="Contraseña"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="********"
      className="mb-2"
    />
    
        <div className="flex justify-between">
          <a
            href="javascript:void(0)"
            className="bg-green-500 hover:bg-green-700 text-center text-white font-bold py-2 px-4 rounded w-[45%]"
          >
            Registrar
          </a>
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded w-[45%]"
          >
            Login
          </a>
        </div>

      </form>
      <div className='flex justify-center mt-14'>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.64 11.22h-10v2.53h6.44c-.28 1.59-1.85 4.66-6.44 4.66-3.87 0-7.04-3.16-7.04-7.04s3.16-7.04 7.04-7.04c1.97 0 3.74.82 5.01 2.14l3.54-3.54c-2.14-2.14-5.22-3.46-8.55-3.46-6.39 0-11.58 5.19-11.58 11.58s5.19 11.58 11.58 11.58c6.99 0 11.26-4.72 11.26-10.58v-1.22z" />
          </svg>
          <span>Iniciar sesión con Google</span>
        </button>
      </div>

    </div>
  );
};

export default Register;
