import React, { useState } from 'react';

const CalculatorUI = ({ onSolve, loading }) => {
    const [a, setA] = useState(5);
    const [b, setB] = useState(3);
    const [op, setOp] = useState('+');

    return (
        <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-80 flex flex-col gap-6 shadow-2xl">
            <h2 className="text-xl font-black text-cyan-400 tracking-widest uppercase">Quantum Calc</h2>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/40 uppercase font-black">Input Register A (0-15)</label>
                    <input
                        type="number"
                        value={a}
                        onChange={(e) => setA(Math.min(15, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/40 uppercase font-black">Operation</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['+', '-', '×'].map(o => (
                            <button
                                key={o}
                                onClick={() => setOp(o)}
                                className={`py-2 rounded-lg text-sm font-bold transition-all ${op === o ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                            >
                                {o}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/40 uppercase font-black">Input Register B (0-15)</label>
                    <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(Math.min(15, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>
            </div>

            <button
                onClick={() => onSolve(a, b, op)}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
                {loading ? 'Simulating...' : 'Construct Circuit'}
            </button>
        </div>
    );
};

export default CalculatorUI;
