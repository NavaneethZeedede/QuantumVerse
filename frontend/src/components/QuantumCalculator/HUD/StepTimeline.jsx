import React from 'react';

const StepTimeline = ({ current, total, onChange }) => {
    return (
        <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-6 w-[600px] shadow-2xl">
            <button
                onClick={() => onChange(Math.max(0, current - 1))}
                className="text-cyan-400 hover:scale-125 transition-transform"
            >
                ◀
            </button>

            <div className="flex-1 flex flex-col gap-2">
                <input
                    type="range"
                    min={0}
                    max={total - 1}
                    value={current}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 font-black uppercase tracking-widest">
                    <span>Start</span>
                    <span>Step {current + 1} of {total}</span>
                    <span>Result</span>
                </div>
            </div>

            <button
                onClick={() => onChange(Math.min(total - 1, current + 1))}
                className="text-cyan-400 hover:scale-125 transition-transform"
            >
                ▶
            </button>
        </div>
    );
};

export default StepTimeline;
