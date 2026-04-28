import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = {
    es: [
        { id: 1, title: "E-COMMERCE HUB", tech: "Python / Streamlit", impact: "Dashboard interactivo para retail de lujo.", details: "Generación de datos sintéticos para modelado de fricción operativa en reembolsos." },
        { id: 2, title: "IA DIABETES", tech: "Random Forest / ML", impact: "Modelo preventivo con ROC-AUC de 0.71.", details: "Clasificación fenotípica basada en ENSANUT para tamizaje preventivo." },
        { id: 3, title: "K-TREND ANALYZER", tech: "Azure / Playwright", impact: "ETL Pipeline para tendencias en Seúl.", details: "Sincronización masiva de datos culturales (+1M registros) en Azure." },
        { id: 4, title: "KODO_STORE", tech: "Next.js / Shopify", impact: "E-commerce de diseño de autor.", details: "Arquitectura frontend enfocada en conversión y UX minimalista." }
    ],
    en: [
        { id: 1, title: "E-COMMERCE HUB", tech: "Python / Streamlit", impact: "Interactive dashboard for luxury retail.", details: "Synthetic data generation for operational friction modeling." },
        { id: 2, title: "DIABETES AI", tech: "Random Forest / ML", impact: "Preventive model with 0.71 ROC-AUC.", details: "Phenotypic classification based on ENSANUT." },
        { id: 3, title: "K-TREND ANALYZER", tech: "Azure / Playwright", impact: "ETL Pipeline for Seoul trends.", details: "Massive synchronization of +1M cultural records." },
        { id: 4, title: "KODO_STORE", tech: "Next.js / Shopify", impact: "Auteur design e-commerce.", details: "Frontend architecture focused on conversion and minimalist UX." }
    ],
};

export default function ProjectStack() {
    const [lang, setLang] = useState('es');
    const [selectedId, setSelectedId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleLang = (e) => setLang(e.detail);
        window.addEventListener('langChange', handleLang);
        return () => window.removeEventListener('langChange', handleLang);
    }, []);

    const projects = projectsData[lang];

    const handleTap = (id) => {
        if (!isDragging) setSelectedId(id);
    };

    return (
        <div className="relative h-[450px] md:h-[500px] w-full flex items-center justify-center">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 font-mono text-[10px] opacity-40 animate-pulse pointer-events-none uppercase tracking-[0.2em] text-center w-full">
                {lang === 'es' ? '← Arrastra las evidencias para explorar →' : '← Drag evidence to explore →'}
            </div>

            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    drag
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(event, info) => {
                        // Umbral de 5px para distinguir entre click y arrastre
                        if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) {
                            setIsDragging(false);
                        } else {
                            setTimeout(() => setIsDragging(false), 100);
                        }
                    }}
                    onTap={() => handleTap(project.id)}
                    className="absolute w-52 h-72 md:w-64 md:h-80 border-2 border-black p-4 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white cursor-grab active:cursor-grabbing overflow-hidden"
                    style={{
                        rotate: index * 4 - 6,
                        zIndex: index
                    }}
                    whileHover={{ scale: 1.05, zIndex: 50 }}
                >
                    <div className="font-mono text-[9px] border-b border-black pb-1 uppercase italic">MÖP_FILE_{project.id}</div>
                    <div className="flex-1 my-4 bg-zinc-100 border border-black flex items-center justify-center italic text-[10px] opacity-30 select-none">PREVIEW_MODE</div>
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
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#F5F5F3] border-4 border-black w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 text-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 font-mono text-[10px] border-2 border-black px-2 hover:bg-black hover:text-white transition-colors"
                            >
                                [ CLOSE ]
                            </button>

                            <header className="border-b-2 border-black pb-4 md:pb-6 mb-6 md:mb-8">
                                <p className="font-mono text-[9px] opacity-50 mb-2 uppercase tracking-widest">Dossier_Archive_Ref</p>
                                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                                    {projects.find(p => p.id === selectedId).title}
                                </h2>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-mono text-xs md:text-sm">
                                <div>
                                    <h4 className="font-black bg-black text-white px-2 mb-3 inline-block uppercase italic tracking-tighter">Impact_Analysis</h4>
                                    <p className="mb-6 leading-relaxed">{projects.find(p => p.id === selectedId).impact}</p>

                                    <h4 className="font-black bg-black text-white px-2 mb-3 inline-block uppercase italic tracking-tighter">Methodology</h4>
                                    <p className="leading-relaxed italic">{projects.find(p => p.id === selectedId).details}</p>
                                </div>

                                <div className="border-2 border-black p-4 md:p-6 bg-white space-y-4">
                                    <h4 className="font-black uppercase border-b border-black pb-2 text-sm md:text-base tracking-tighter">System_Audit_Logs</h4>
                                    <div className="flex justify-between text-[10px] md:text-xs"><span>Status</span><span className="font-bold text-green-600 underline underline-offset-2">PASSED</span></div>
                                    <div className="flex justify-between border-t border-black/10 pt-2 text-[10px] md:text-xs"><span>Region</span><span>Global_MX</span></div>
                                    <div className="flex justify-between border-t border-black/10 pt-2 text-[10px] md:text-xs"><span>Security</span><span>AES_256_Encrypted</span></div>
                                    <div className="mt-8 md:mt-12 text-center opacity-10 font-black text-4xl md:text-6xl rotate-[-15deg] select-none">CONFIDENTIAL</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}