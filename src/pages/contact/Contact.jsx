import { useState } from 'react';
import Input from '../../components/Input/Input';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario aquí
  };

  return (
    <div className="pt-4 min-h-400px flex flex-col items-center mb-24 mt-12">
      <h1 className="text-center text-md xl:text-4xl mb-8">CONTACTO</h1>
      <h2 className="text-center text-md xl:text-xl">¡Nos encantaría saber de ti!</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <Input
          label="Nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
          className="mb-4"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          className="mb-4"
        />
        <div className="w-full">
          <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
