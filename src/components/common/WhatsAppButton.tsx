import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { settings } = useData();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
    const defaultText = message.trim() || 'Hello Tchuki Group, I would like to inquire about your services.';
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 animate-in fade-in slide-in-from-bottom-3 duration-200 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">Chat with Tchuki</h4>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Verified: {settings.whatsapp_number}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 py-3 leading-relaxed">
            Need prompt assistance regarding Tchuki Farms, BioKash Organic Fertilizer, or Tchuki Digital software projects? Message our team directly:
          </p>

          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here (e.g. Inquiring about BioKash Fertilizer delivery)..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:outline-none text-white resize-none"
            />
            
            <div className="flex items-center justify-between gap-2">
              <a
                href={`tel:${settings.contact_phone}`}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Call instead</span>
              </a>

              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-950 transition-all cursor-pointer"
              >
                <span>Open WhatsApp</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl shadow-emerald-950/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/30"
        aria-label="Chat with Tchuki on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold tracking-wide">
          Chat with Tchuki
        </span>
      </button>
    </div>
  );
};

