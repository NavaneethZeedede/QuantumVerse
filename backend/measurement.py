import numpy as np

def measure(statevector, shots=1):
    """
    Perform projective measurement on the full state.
    Returns: A dictionary of results (shot counts) and the collapsed statevector (if shots=1)
    """
    probs = np.abs(statevector)**2
    num_states = len(statevector)
    
    # Simulate shots
    results_indices = np.random.choice(num_states, size=shots, p=probs)
    
    counts = {}
    for idx in results_indices:
        # Convert index to binary representation string
        num_qubits = int(np.log2(num_states))
        binary = format(idx, f'0{num_qubits}b')
        counts[binary] = counts.get(binary, 0) + 1
        
    # Collapse statevector if single measurement requested
    if shots == 1:
        collapsed_state = np.zeros(num_states, dtype=complex)
        collapsed_state[results_indices[0]] = 1.0
        return counts, collapsed_state
        
    return counts, statevector # No collapse for multi-shot simulation in this simplified model

def get_probabilities(statevector):
    return np.abs(statevector)**2
