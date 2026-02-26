import numpy as np
from gates import X, Z, I

def apply_bit_flip(state, p, target_qubit):
    """
    Apply bit flip noise with probability p.
    """
    if np.random.random() < p:
        state.apply_gate(X, [target_qubit])

def apply_phase_flip(state, p, target_qubit):
    """
    Apply phase flip noise with probability p.
    """
    if np.random.random() < p:
        state.apply_gate(Z, [target_qubit])

def depolarizing_noise(state, p, target_qubit):
    """
    Depolarizing noise: Replace state with maximally mixed state with prob p.
    For statevectors, we simulate this by applying X, Y, or Z randomly.
    """
    if np.random.random() < p:
        choice = np.random.choice(["X", "Y", "Z"])
        if choice == "X":
            state.apply_gate(X, [target_qubit])
        elif choice == "Y":
            from gates import Y as Y_gate
            state.apply_gate(Y_gate, [target_qubit])
        else:
            state.apply_gate(Z, [target_qubit])

def amplitude_damping(state, p, target_qubit):
    """
    Simulate T1 decay behavior (Simplified for statevector).
    Probabilistically decay to |0>.
    """
    # This is tricky with pure statevectors. 
    # Usually requires density matrices or Kraus operators.
    # For a simple demo, we can just force the state to |0> with prob p
    # if it's currently in |1> territory.
    pass
