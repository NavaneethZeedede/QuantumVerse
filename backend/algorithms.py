from state_engine import QuantumState
from gates import H, CNOT01, X, Z, get_gate
import numpy as np

def bell_state():
    """
    Creates a Bell State: (|00> + |11>) / sqrt(2)
    """
    qs = QuantumState(num_qubits=2)
    qs.apply_gate(H, [0])
    qs.apply_gate(CNOT01, [0, 1])
    return qs

def deutsch_algorithm(oracle_type="constant"):
    """
    Simulates Deutsch's algorithm.
    """
    qs = QuantumState(num_qubits=2)
    # Put qubit 1 into |1>
    qs.apply_gate(X, [1])
    # Apply H to both
    qs.apply_gate(H, [0])
    qs.apply_gate(H, [1])
    
    # Apply Oracle
    if oracle_type == "balanced":
        qs.apply_gate(CNOT01, [0, 1]) # Example CX oracle
    else:
        pass # Identity for constant f(x)=0
        
    # Apply H to qubit 0
    qs.apply_gate(H, [0])
    return qs

def grover_iteration_2_qubits(target_state="11"):
    """
    Single iteration of Grover's search for 2 qubits.
    """
    qs = QuantumState(num_qubits=2)
    # 1. Superposition
    qs.apply_gate(H, [0])
    qs.apply_gate(H, [1])
    
    # 2. Oracle (Mark target)
    if target_state == "11":
        # Controlled-Z (marks |11> with -1 phase)
        from gates import CZ
        qs.apply_gate(CZ, [0, 1])
        
    # 3. Diffusion (Amplitude Amplification)
    # H (x) H
    qs.apply_gate(H, [0])
    qs.apply_gate(H, [1])
    # Z (x) Z or similar shift
    # Shift around mean
    # ... (Simplified for demo)
    return qs
