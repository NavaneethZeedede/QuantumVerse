import numpy as np

# Single-Qubit Gates
I = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.array([[1, 0], [0, -1]], dtype=complex)
H = 1/np.sqrt(2) * np.array([[1, 1], [1, -1]], dtype=complex)
S = np.array([[1, 0], [0, 1j]], dtype=complex)
T = np.array([[1, 0], [0, np.exp(1j*np.pi/4)]], dtype=complex)

# Multi-Qubit Gates (defined for specific qubit orderings)
# CNOT: Controlled-NOT (Control: 0, Target: 1)
CNOT01 = np.array([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
], dtype=complex)

# CZ: Controlled-Z (Control: 0, Target: 1)
CZ = np.array([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
], dtype=complex)

# SWAP
SWAP = np.array([
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
], dtype=complex)

# CCNOT: Toffoli Gate (Control: 0, 1, Target: 2)
TOFFOLI = np.eye(8, dtype=complex)
TOFFOLI[6, 6] = 0
TOFFOLI[6, 7] = 1
TOFFOLI[7, 6] = 1
TOFFOLI[7, 7] = 0

GATES = {
    "X": X,
    "Y": Y,
    "Z": Z,
    "H": H,
    "S": S,
    "T": T,
    "I": I,
    "CNOT": CNOT01,
    "CZ": CZ,
    "SWAP": SWAP,
    "TOFFOLI": TOFFOLI
}

def get_gate(name):
    return GATES.get(name.upper())

def is_unitary(matrix):
    identity = np.eye(matrix.shape[0])
    return np.allclose(np.dot(matrix, matrix.conj().T), identity)
