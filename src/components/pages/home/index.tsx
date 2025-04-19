import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-black to-gray-900 px-6">
      <div className="bg-gray-800/80 backdrop-blur-md border border-cyan-500/30 shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold text-cyan-400 neon-glow tracking-wide">
          ⚡ ChatHub
        </h1>

        <p className="text-cyan-200 text-lg sm:text-xl leading-relaxed">
          A fast, real-time messaging app built for speed, style, and
          simplicity. Whether you're catching up with friends or planning world
          domination — ChatHub gives you a smooth, modern chat experience.
        </p>

        <p className="text-cyan-300 text-md italic">
          Built with React, SignalR, and pure passion 💬
        </p>

        <div>
          <button
            onClick={() => navigate('/login')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 text-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
