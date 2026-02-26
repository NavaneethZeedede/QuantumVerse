import numpy as np

class QuantumState:
    def __init__(self, num_qubits=1):
        if num_qubits < 1 or num_qubits > 10:
            raise ValueError("Unsupported number of qubits (1-10 allowed)")
        self.num_qubits = num_qubits
        self.dim = 2**num_qubits
        # Initialize to |0...0> state
        self.statevector = np.zeros(self.dim, dtype=complex)
        self.statevector[0] = 1.0

    def apply_gate(self, gate_matrix, target_qubits):
        """
        Apply a gate matrix to a specific set of target qubits.
        gate_matrix: A unitary matrix.
        target_qubits: List of indices for target qubits.
        """
        full_unitary = self._get_full_unitary(gate_matrix, target_qubits)
        self.statevector = np.dot(full_unitary, self.statevector)
        self.normalize()

    def _get_full_unitary(self, gate_matrix, target_qubits):
        """
        Expands the gate_matrix to the full Hilbert space of self.num_qubits.
        Supports single and multi-qubit gates.
        """
        # If the gate is already the full size, return it
        if gate_matrix.shape[0] == self.dim:
            return gate_matrix

        # Identity matrix of the full system
        # For large n, we might want to avoid full matrix construction,
        # but for n=10, 2^10 = 1024, so it's manageable.
        
        num_targets = len(target_qubits)
        gate_dim = 2**num_targets
        
        if gate_matrix.shape[0] != gate_dim:
            raise ValueError(f"Gate matrix size {gate_matrix.shape[0]} does not match targets {num_targets}")

        new_full_op = np.zeros((self.dim, self.dim), dtype=complex)
        
        for i in range(self.dim):
            # Decompose basis state index i into bits
            # Using big-endian (qubit 0 is most significant bit)
            bits = [ (i >> (self.num_qubits - 1 - j)) & 1 for j in range(self.num_qubits) ]
            
            # Extract the target bits values
            target_bits_val = 0
            for t in target_qubits:
                target_bits_val = (target_bits_val << 1) | bits[t]
            
            # Apply the gate to these target bits
            for target_bits_out in range(gate_dim):
                coeff = gate_matrix[target_bits_out, target_bits_val]
                if coeff == 0: continue
                
                # Construct output basis state
                new_bits = list(bits)
                for idx, t in enumerate(target_qubits):
                    # Extract bits from target_bits_out
                    new_bits[t] = (target_bits_out >> (num_targets - 1 - idx)) & 1
                
                # Convert bits back to index
                out_idx = 0
                for b in new_bits:
                    out_idx = (out_idx << 1) | b
                
                new_full_op[out_idx, i] += coeff
                
        return new_full_op

    def normalize(self):
        norm = np.linalg.norm(self.statevector)
        if norm > 0:
            self.statevector /= norm

    def get_probabilities(self):
        return np.abs(self.statevector)**2

    def to_dict(self):
        return {
            "num_qubits": self.num_qubits,
            "statevector": [{"real": float(z.real), "imag": float(z.imag)} for z in self.statevector],
            "probabilities": self.get_probabilities().tolist()
        }
