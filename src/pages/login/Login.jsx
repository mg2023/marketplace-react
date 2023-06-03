import { useState } from 'react';
import Input from '../../components/Input/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <div className='pt-12  min-h-400px flex-row justify-center items-center'>
      <h1 className='text-center text-4xl mb-12'>LOGIN</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          className="mb-4"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
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

export default Login;
