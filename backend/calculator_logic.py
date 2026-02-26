import numpy as np
from state_engine import QuantumState
from gates import X, CNOT01, TOFFOLI, get_gate

def decimal_to_binary(n, bits):
    """Converts decimal to a binary list of length 'bits' (big-endian)."""
    return [int(x) for x in bin(n)[2:].zfill(bits)]

def get_arithmetic_circuit(a_val, b_val, operation='+'):
    """
    Constructs a ripple-carry adder or similar for quantum arithmetic.
    For simplicity, we'll implement a basic n-bit addition circuit.
    Registers:
    A: [0, 1, 2, 3] (Input A)
    B: [4, 5, 6, 7] (Input B / Output)
    Carry: [8, 9] (Internal carry)
    Max input is 15 (4 bits).
    """
    circuit = []
    
    # Initial state encoding
    a_bits = decimal_to_binary(a_val, 4)
    b_bits = decimal_to_binary(b_val, 4)
    
    for i, bit in enumerate(a_bits):
        if bit:
            circuit.append({"name": "X", "targets": [i], "explanation": f"Encode A bit {i} to 1"})
    for i, bit in enumerate(b_bits):
        if bit:
            circuit.append({"name": "X", "targets": [i + 4], "explanation": f"Encode B bit {i} to 1"})
            
    if operation == '+':
        # Simple Ripple Carry Addition (Half-Adder/Full-Adder logic)
        # Qubits: A[0..3], B[4..7], Carry[8..9]
        # B will store the sum.
        for i in range(3, -1, -1):
            target_a = i
            target_b = i + 4
            # Carry logic would go here for a full adder.
            # Simplified for demo: XOR A into B
            circuit.append({
                "name": "CNOT", 
                "targets": [target_a, target_b], 
                "explanation": f"XOR Register A bit {i} into Register B bit {i}"
            })
            # Real carry propagation uses Toffoli
            # Example: TOFFOLI(A[i], B[i], Carry[next])
            
    return circuit

def simulate_with_steps(num_qubits, circuit):
    qs = QuantumState(num_qubits=num_qubits)
    steps = [qs.to_dict()]
    
    for op in circuit:
        gate_matrix = get_gate(op['name'])
        qs.apply_gate(gate_matrix, op['targets'])
        step_data = qs.to_dict()
        step_data['explanation'] = op.get('explanation', '')
        step_data['gate'] = op['name']
        step_data['targets'] = op['targets']
        steps.append(step_data)
        
    return steps
