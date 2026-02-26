# QuantumVerse: Interactive Quantum Computation

QuantumVerse is a cinematic, immersive 3D experience designed to teach quantum computing through high-fidelity visualizations and interactive simulations.

![Quantum Calculator](https://github.com/user-attachments/assets/placeholder)

## 🌌 Features

- **Cosmic-to-Quantum Scale Transition**: A cinematic narrative journey from the macro world to the quantum realm.
- **Interactive Quantum Calculator**: Perform arithmetic (+, -, ×) using reversible ripple-carry logic (Toffoli & CNOT gates).
- **Step-by-Step Simulation**: Scrub through quantum gate operations with real-time educational overlays.
- **Live Metrics**: Monitor Entropy, Purity, and Fidelity of the quantum system.
- **XR Ready**: Built with React Three Fiber, supporting immersive VR experiences.

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite**
- **Three.js** / **React Three Fiber**
- **Drei** (Helper components)
- **GSAP** (Cinematic animations)
- **Postprocessing** (Bloom & HDR)
- **TailwindCSS** (HUD & UI)

### Backend
- **FastAPI** (High-performance API)
- **NumPy** (Statevector simulation)
- **Qiskit** (Reference logic)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quantum-verse.git
   cd quantum-verse
   ```

2. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🧮 How to use the Calculator

1. Enter the **Lab** scene.
2. Select the **Quantum Calculator** module.
3. Input two decimal numbers (0-15).
4. Construct the circuit and use the timeline slider to visualize the **Reversible Ripple-Carry Adder** logic.

---

Built with ❤️ for the future of Quantum Education.
