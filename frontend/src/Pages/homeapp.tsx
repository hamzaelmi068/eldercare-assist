import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Hero */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 bg-gradient-to-br from-primary-50 to-primary-100 p-8 md:p-16 flex flex-col justify-center items-center text-center md:text-left"
      >
        <div className="max-w-xl">
          <img 
            src="/public/8293b05a-1f52-4874-8937-0962bf6f6dc4/image-Photoroom.png" 
            alt="Elderly person using technology"
            className="w-64 h-64 mx-auto mb-8 rounded-full shadow-xl"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6">
            ElderCareAssist is your guardian angel.
          </h1>
          <p className="text-xl md:text-2xl text-primary-700 mb-8">
            Advanced AI monitoring system providing peace of mind for families with elderly loved ones living independently.
          </p>
          <button 
            onClick={() => navigate('/monitor')} 
            className="btn-primary text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Start Monitoring
          </button>
        </div>
      </motion.div>

      {/* Right Section - Login */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 bg-gray-900 p-8 md:p-16 flex flex-col justify-center items-center"
      >
        <div className="w-full max-w-md">
          <div className="text-white mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Log in</h2>
            <p className="text-gray-400 text-xl">Monitor your daily routines</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-300 text-xl mb-2" htmlFor="feed-url">
                Enter video feed URL
              </label>
              <input
                id="feed-url"
                type="text"
                className="input-large w-full bg-gray-800 border-gray-700 text-white"
                placeholder="rtsp://your-camera-url"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xl mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input-large w-full bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full text-xl py-4 rounded-lg"
            >
              Log in
            </button>

            <p className="text-center text-gray-400 text-lg">
              <button className="hover:text-white transition-colors">
                Forgot your password?
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}