import React from 'react';

const EducationalOverlay = ({ explanation, gate }) => {
    return (
        <div className="text-center max-w-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {gate && (
                <div className="inline-block self-center bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 rounded text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">
                    Gate: {gate}
                </div>
            )}
            <p className="text-white text-lg font-medium leading-relaxed drop-shadow-lg">
                {explanation || "Initializing quantum registers..."}
            </p>
            <div className="text-[12px] text-white/60 italic">
                {gate === 'TOFFOLI' && "The Toffoli gate is the quantum equivalent of an AND gate, essential for carry logic."}
                {gate === 'CNOT' && "The CNOT gate acts as a reversible XOR, performing addition modulo 2."}
                {gate === 'X' && "The Pauli-X gate flips the state, representing bit initialization."}
            </div>
        </div>
    );
};

export default EducationalOverlay;
