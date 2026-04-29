import React, { useState } from 'react';
import { Send, CheckCircle, Smartphone, Monitor, Zap } from 'lucide-react';

function App() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      console.log("Problem submitted:", message);
    }
  };

  return (
    <div className="min-h-screen bg-axiom-bg text-axiom-text flex flex-col items-center p-6 font-sans">
      
      {/* Header Area */}
      <header className="w-full max-w-4xl flex justify-between items-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-axiom-accent rounded-lg rotate-12 flex items-center justify-center">
            <span className="text-axiom-bg font-black"></span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Axiom Solutions</h1>
        </div>
        <div className="hidden sm:flex gap-6 text-sm font-medium opacity-70">
          <a href="#" className="hover:text-axiom-accent transition-colors">How it works</a>
          <a href="#" className="hover:text-axiom-accent transition-colors">Contact</a>
        </div>
      </header>

      <main className="w-full max-w-lg mt-12 sm:mt-20">
        {!submitted ? (
          /* The Main Glassmorphism Problem Box */
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-center">Need a hand?</h2>
            <p className="text-axiom-text/60 mb-8 text-center leading-relaxed">
              If something is broken, confusing, or just taking too much of your time, tell us below!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  className="w-full bg-black/20 border-2 border-white/5 rounded-2xl p-5 text-axiom-text outline-none focus:border-axiom-accent transition-all resize-none placeholder:text-white/10"
                  placeholder="Ex: My computer is slow or I need help with my business page..."
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-axiom-accent text-axiom-bg font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-axiom-accent/20"
              >
                Help me fix this! <Send size={20} />
              </button>
            </form>
          </div>
        ) : (
          /* Success State */
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[2rem] text-center">
            <div className="w-20 h-20 bg-axiom-accent/20 text-axiom-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-axiom-accent">Got it!</h2>
            <p className="text-axiom-text/60">
              Thanks for reaching out. We'll look into this and get back to you soon. Relax, we've got this!
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-axiom-accent font-medium hover:underline"
            >
              Have another problem?
            </button>
          </div>
        )}

        {/* Simplified Info Grid - No Borders for a Cleaner Look */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 opacity-80">
          <div className="flex flex-col items-center text-center">
            <Zap className="text-axiom-accent mb-3" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Fast Help</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Smartphone className="text-axiom-accent mb-3" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Simple Talk</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Monitor className="text-axiom-accent mb-3" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Expert Fixes</span>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 text-axiom-text/30 text-[10px] font-bold uppercase tracking-widest">
        © {new Date().getFullYear()} Axiom Solutions • Made in Cebu
      </footer>
    </div>
  );
}

export default App;
