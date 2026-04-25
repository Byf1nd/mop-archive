import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
    { id: 'bi', name: 'BI_DASHBOARD_FOUNDRY', price: 'CUSTOM', desc: 'Data architecture & visualization.' },
    { id: 'ml', name: 'ML_INTELLIGENCE_UNIT', price: 'VARIES', desc: 'Predictive models & data science.' },
    { id: 'web', name: 'WEB_FABRICATION', price: 'FIXED', desc: 'Astro/React high-end frontend.' },
    { id: 'bot', name: 'AUTOMATED_AGENTS', price: 'PER_UNIT', desc: 'Scraping & automation bots.' }
];

export default function ServiceTicket() {
    const [selected, setSelected] = useState([]);

    const toggleService = (service) => {
        if (selected.find(s => s.id === service.id)) {
            setSelected(selected.filter(s => s.id !== service.id));
        } else {
            setSelected([...selected, service]);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start py-20 border-t-2 border-black">
            {/* Lado izquierdo */}
            <div className="flex-1 space-y-4">
                <h3 className="text-4xl font-black uppercase mb-8 italic">Order_Selection</h3>
                {SERVICES.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => toggleService(s)}
                        className={`w-full text-left p-4 border-2 transition-all flex justify-between items-center ${selected.find(item => item.id === s.id)
                                ? 'bg-black text-white border-black'
                                : 'bg-transparent text-black border-black/20 hover:border-black'
                            }`}
                    >
                        <div>
                            <p className="font-mono text-[10px] opacity-50">{s.id.toUpperCase()}_v.24</p>
                            <h4 className="text-xl font-bold uppercase">{s.name}</h4>
                        </div>
                        <span className="font-mono text-xs">{selected.find(item => item.id === s.id) ? '[ SELECTED ]' : '[ ADD+ ]'}</span>
                    </button>
                ))}
            </div>

            {/* Lado derecho */}
            <div className="w-full md:w-80 sticky top-10">
                <motion.div
                    initial={false}
                    className="bg-[#FFFFF0] border border-zinc-300 p-6 shadow-xl relative overflow-hidden text-black font-mono text-[10px] uppercase leading-tight"
                >
                    {/* Efecto de papel cortado arriba */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-white flex justify-around opacity-50">
                        {[...Array(20)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full -mt-1 bg-[#F5F5F3]"></div>)}
                    </div>

                    <div className="text-center mb-6 pt-4">
                        <h4 className="text-lg font-black tracking-tighter italic">MOP_ARCHIVE_SERVICES</h4>
                        <p>TERMINAL: 001_MÉRIDA_MX</p>
                        <p>{new Date().toLocaleDateString()} // {new Date().toLocaleTimeString()}</p>
                    </div>

                    <div className="border-t border-dashed border-black/30 py-4 space-y-2">
                        <AnimatePresence>
                            {selected.length === 0 && (
                                <p className="italic text-zinc-400 text-center py-10">Waiting for selection...</p>
                            )}
                            {selected.map((s) => (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex justify-between"
                                >
                                    <span>1x {s.name}</span>
                                    <span>{s.price}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="border-t border-black pt-4 mt-4">
                        <div className="flex justify-between text-base font-black">
                            <span>TOTAL</span>
                            <span>QUOTE_REQ</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <div className="bg-black text-white p-2 mb-2 cursor-pointer hover:bg-[#FF3E00] transition-colors">
                            CONFIRM_ORDER_EMAIL
                        </div>
                        <p className="text-[8px] opacity-50">No money is taken at this stage. This is a formal inquiry request.</p>
                    </div>

                    {/* Código de barras falso */}
                    <div className="mt-6 flex flex-col items-center opacity-30">
                        <div className="h-8 w-full bg-[url('https://www.creativindie.com/wp-content/uploads/2012/07/barcode.png')] bg-repeat-x"></div>
                        <span className="mt-1">MOP-2026-V.1.0</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}