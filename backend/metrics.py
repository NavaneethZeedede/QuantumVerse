import numpy as np

def von_neumann_entropy(statevector):
    # Pure state entropy is 0. 
    return 0.0

def purity(statevector):
    return 1.0

def fidelity(psi, phi):
    overlap = np.vdot(psi, phi)
    return np.abs(overlap)**2

def concurrence_two_qubits(statevector):
    if len(statevector) != 4:
        return 0.0
    a00, a01, a10, a11 = statevector
    return 2 * np.abs(a00 * a11 - a01 * a10)

def get_bloch_coordinates(statevector):
    """
    Calculate (theta, phi) for each qubit in the system.
    Returns a list of dictionaries: [{"theta": t, "phi": p}, ...]
    """
    num_qubits = int(np.log2(len(statevector)))
    coords = []
    
    # Pauli Matrices
    X = np.array([[0, 1], [1, 0]], dtype=complex)
    Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
    Z = np.array([[1, 0], [0, -1]], dtype=complex)
    I = np.eye(2, dtype=complex)

    for i in range(num_qubits):
        # Construct operators for this qubit
        # For qubit 'i', operator is I (x) ... (x) Pauli (x) ... (x) I
        ops = []
        for j in range(num_qubits):
            if i == j:
                ops.append((X, Y, Z))
            else:
                ops.append((I, I, I))
        
        def get_full_op(pauli_idx):
            full_op = ops[0][pauli_idx]
            for j in range(1, num_qubits):
                full_op = np.kron(full_op, ops[j][pauli_idx])
            return full_op

        # Expectation values <X>, <Y>, <Z>
        rx = np.real(np.vdot(statevector, np.dot(get_full_op(0), statevector)))
        ry = np.real(np.vdot(statevector, np.dot(get_full_op(1), statevector)))
        rz = np.real(np.vdot(statevector, np.dot(get_full_op(2), statevector)))

        # Convert to spherical coordinates
        # r is 1 for pure states, < 1 for entangled (mixed reduced states)
        r = np.sqrt(rx**2 + ry**2 + rz**2)
        
        # Avoid division by zero
        theta = np.arccos(rz / r) if r > 0.001 else 0
        phi = np.arctan2(ry, rx) if r > 0.001 else 0
        
        coords.append({
            "theta": float(theta),
            "phi": float(phi),
            "r": float(r)
        })
        
    return coords
