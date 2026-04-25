import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    { id: 1, title: "E-COMMERCE HUB", tech: "Python / Streamlit", impact: "Dashboard interactivo para retail de lujo.", details: "Generación de datos sintéticos para modelado de fricción operativa en reembolsos." },
    { id: 2, title: "IA DIABETES", tech: "Random Forest / ML", impact: "Modelo preventivo con ROC-AUC de 0.71.", details: "Clasificación fenotípica basada en ENSANUT para tamizaje preventivo." },
    { id: 3, title: "K-TREND ANALYZER", tech: "Azure / Playwright", impact: "ETL Pipeline para tendencias en Seúl.", details: "Sincronización masiva de datos culturales (+1M registros) en Azure." }
];

export default function ProjectStack() {
    const [selectedId, setSelectedId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleTap = (id) => {
        // Solo abrimos si no estábamos arrastrando
        if (!isDragging) {
            setSelectedId(id);
        }
    };

    return (
        <div className="relative h-[500px] w-full flex items-center justify-center">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    drag
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(event, info) => {
                        // Si el movimiento fue mínimo (menos de 5px), lo tratamos como clic
                        if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) {
                            setIsDragging(false);
                        } else {
                            // Si se movió, esperamos un poco para resetear el estado y no disparar el tap
                            setTimeout(() => setIsDragging(false), 100);
                        }
                    }}
                    onTap={() => handleTap(project.id)}
                    className="absolute w-64 h-80 border-2 border-black p-4 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white cursor-grab active:cursor-grabbing overflow-hidden"
                    style={{ rotate: index * 5 - 5, zIndex: index }}
                    whileHover={{ scale: 1.05, zIndex: 50, transition: { duration: 0.2 } }}
                >
                    <div className="font-mono text-[9px] border-b border-black pb-1 uppercase italic">MÖP_FILE_{project.id}</div>
                    <div className="flex-1 my-4 bg-zinc-100 border border-black flex items-center justify-center italic text-[10px] opacity-30">PREVIEW_MODE</div>
                    <h3 className="text-xl font-black uppercase leading-tight">{project.title}</h3>
                    <div className="font-mono text-[9px] bg-black text-white px-2 py-1 self-start mt-2">{project.tech}</div>
                </motion.div>
            ))}

            {/* MODAL (Expediente Confidencial) */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 backdrop-blur-sm bg-black/60"
                        onClick={() => setSelectedId(null)} // Cerrar al hacer clic fuera
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#F5F5F3] border-4 border-black w-full max-w-4xl max-h-[85vh] overflow-y-auto relative shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-black"
                            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 font-mono text-xs border-2 border-black px-2 hover:bg-black hover:text-white transition-colors"
                            >
                                [ CLOSE_FILE ]
                            </button>

                            <header class="border-b-2 border-black pb-6 mb-8">
                                <p class="font-mono text-[10px] opacity-50 mb-2 uppercase tracking-widest">Technical_Dossier_Archive</p>
                                <h2 class="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                                    {projects.find(p => p.id === selectedId).title}
                                </h2>
                            </header>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-xs md:text-sm">
                                <div>
                                    <h4 class="font-black bg-black text-white px-2 mb-4 inline-block uppercase italic tracking-tighter">Impact_Analysis</h4>
                                    <p class="mb-8 leading-relaxed">{projects.find(p => p.id === selectedId).impact}</p>

                                    <h4 class="font-black bg-black text-white px-2 mb-4 inline-block uppercase italic tracking-tighter">Methodology</h4>
                                    <p class="leading-relaxed italic">{projects.find(p => p.id === selectedId).details}</p>
                                </div>

                                <div class="border-2 border-black p-6 bg-white space-y-4">
                                    <h4 class="font-black uppercase border-b border-black pb-2 text-base">System_Audit</h4>
                                    <div class="flex justify-between"><span>Status</span><span class="font-bold text-green-600">PASSED</span></div>
                                    <div class="flex justify-between border-t border-black/10 pt-2"><span>Region</span><span>Global</span></div>
                                    <div class="flex justify-between border-t border-black/10 pt-2"><span>Security</span><span>Encrypted</span></div>
                                    <div class="mt-12 text-center opacity-10 font-black text-6xl rotate-[-15deg]">CONFIDENTIAL</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}