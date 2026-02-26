from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from state_engine import QuantumState
from gates import get_gate
from measurement import measure, get_probabilities
from metrics import von_neumann_entropy, purity, concurrence_two_qubits, get_bloch_coordinates
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="QuantumVerse VR API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GateOp(BaseModel):
    name: str
    targets: List[int]

class SimulationRequest(BaseModel):
    num_qubits: int
    circuit: List[GateOp]

class MeasurementRequest(BaseModel):
    statevector: List[str] # Complex strings like "1+0j"
    shots: int = 1000

@app.post("/simulate")
async def simulate(request: SimulationRequest):
    try:
        qs = QuantumState(num_qubits=request.num_qubits)
        for op in request.circuit:
            gate_matrix = get_gate(op.name)
            if gate_matrix is None:
                raise HTTPException(status_code=400, detail=f"Gate {op.name} not found")
            qs.apply_gate(gate_matrix, op.targets)
        
        return qs.to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from calculator_logic import get_arithmetic_circuit, simulate_with_steps

class CalculatorRequest(BaseModel):
    a: int
    b: int
    operation: str
    num_qubits: int = 10

@app.post("/calculator/simulate")
async def simulate_calculator(request: CalculatorRequest):
    try:
        circuit = get_arithmetic_circuit(request.a, request.b, request.operation)
        steps = simulate_with_steps(request.num_qubits, circuit)
        return {"steps": steps}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class MetricsRequest(BaseModel):
    num_qubits: int
    statevector: List[dict] # List of {"real": r, "imag": i}

@app.post("/metrics")
async def get_metrics(request: MetricsRequest):
    try:
        # Convert structured dicts back to complex numpy array
        statevector = np.array([complex(s['real'], s['imag']) for s in request.statevector])
        
        entropy = von_neumann_entropy(statevector)
        p = purity(statevector)
        concurrence = 0.0
        if request.num_qubits == 2:
            concurrence = concurrence_two_qubits(statevector)
        
        bloch_coords = get_bloch_coordinates(statevector)
            
        return {
            "entropy": entropy,
            "purity": p,
            "concurrence": concurrence,
            "bloch_coords": bloch_coords
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
