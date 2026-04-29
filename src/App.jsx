import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Smartphone, Monitor, Zap, Loader2, Paperclip } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null); // Tracks the selected file
  const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    const FORMSPREE_ID = 'maqvwyad'; 
    const IMGBB_KEY = 'aa1b5a0483e89de37c3249d665cfb3aa'; // PASTE YOUR KEY HERE
    
    try {
      let finalMessage = message;

      // 1. If there's an image, upload it to ImgBB first
      if (attachment) {
        const formData = new FormData();
        formData.append('image', attachment);
        
        const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
          method: 'POST',
          body: formData,
        });
        
        const imgData = await imgResponse.json();
        
        if (imgData.success) {
          // Add the image URL to the bottom of the email message
          finalMessage += `\n\n--------------------------\n📎 Attached Screenshot/Photo: ${imgData.data.url}`;
        }
      }

      // 2. Send the combined data to Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          email: email,
          message: finalMessage,
          _subject: "New Axiom Solutions Request"
        }),
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setEmail('');
        setMessage('');
        setAttachment(null);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 flex flex-col items-center p-6 font-sans overflow-hidden selection:bg-cyan-500/30 relative">
      
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6, 182, 212, 0.07) 0%, transparent 50%)`
        }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] pointer-events-none z-0" />
      
      <header className="w-full max-w-4xl flex justify-between items-center py-12 relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center gap-4 group cursor-default">
          <img 
            src="/Axiom_Solutions_logo.png" 
            alt="Axiom Solutions Logo" 
            className="w-12 h-12 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500 object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none uppercase">
              AXIOM<span className="text-cyan-500 ml-1">SOLUTIONS</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">Systems & Tech Support</p>
          </div>
        </div>
      </header>

      <main className="w-full max-w-xl mt-8 relative z-10">
        {status !== 'SUCCESS' ? (
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-700 delay-200 fill-mode-both">
            <h2 className="text-4xl font-bold mb-3 tracking-tight text-white">Need a hand?</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              If something is broken, confusing, or just taking too much time, describe it below and we'll handle the rest.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-cyan-500/50 focus:bg-black/40 transition-all placeholder:text-white/20 text-lg relative z-10"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="group relative">
                <textarea
                  name="message"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl p-6 text-white outline-none focus:border-cyan-500/50 focus:bg-black/40 transition-all resize-none placeholder:text-white/20 text-lg relative z-10"
                  placeholder="Describe the issue..."
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {/* NEW: File Upload UI */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-black/20 border border-white/5 hover:bg-black/40 hover:border-cyan-500/50 text-slate-300 rounded-2xl cursor-pointer transition-all active:scale-[0.98]">
                  <Paperclip size={18} className={attachment ? "text-cyan-500" : "text-slate-500"} />
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {attachment ? attachment.name : "Attach screenshot"}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={(e) => setAttachment(e.target.files[0])}
                  />
                </label>
                
                {attachment && (
                  <button 
                    type="button" 
                    onClick={() => setAttachment(null)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>

              <button 
                type="submit"
                disabled={status === 'SUBMITTING'}
                className="w-full py-5 bg-cyan-500 text-[#0d1117] font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-cyan-500/10 disabled:opacity-50 mt-4"
              >
                {status === 'SUBMITTING' ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <>Fix this for me <Send size={22} strokeWidth={2.5} /></>
                )}
              </button>
              
              {status === 'ERROR' && (
                <p className="text-red-400 text-sm text-center font-medium">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        ) : (
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-16 rounded-[2.5rem] text-center animate-in fade-in zoom-in duration-500 shadow-2xl">
            <div className="w-24 h-24 bg-cyan-500/10 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Message Sent!</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We've received your request. Relax, we'll reach out to you shortly.
            </p>
            <button 
              onClick={() => {
                setStatus('IDLE');
                setAttachment(null);
              }}
              className="mt-10 text-cyan-500 font-semibold hover:opacity-80 transition-opacity"
            >
              Submit another request
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <Feature icon={<Zap />} label="Fast Help" />
          <Feature icon={<Smartphone />} label="Simple Talk" />
          <Feature icon={<Monitor />} label="Expert Care" />
        </div>
      </main>

      <footer className="mt-auto py-12 text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] relative z-10 animate-in fade-in duration-1000 delay-700">
        © {new Date().getFullYear()} Axiom Solutions • Made in Cebu
      </footer>
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div className="text-cyan-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-center opacity-40 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );
}

export default App;
