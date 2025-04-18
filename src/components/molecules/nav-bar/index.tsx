import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `relative px-5 py-2 font-bold uppercase tracking-wide transition-all duration-300
     ${isActive ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'}
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]
     after:scale-x-0 after:origin-left after:bg-cyan-400 after:transition-transform after:duration-300
     hover:after:scale-x-100`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl border-b border-cyan-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl text-cyan-400 font-extrabold tracking-widest neon-glow">
          ⚡ ChatVerse
        </h1>
        <div className="flex space-x-6">
          <NavLink to="/" className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/login" className={linkStyles}>
            Login
          </NavLink>
          <NavLink to="/registration" className={linkStyles}>
            Registration
          </NavLink>
          <NavLink to="/join" className={linkStyles}>
            Join
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
