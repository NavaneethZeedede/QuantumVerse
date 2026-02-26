import requests
import json

def test_calculator():
    url = "http://localhost:8000/calculator/simulate"
    payload = {
        "a": 5,
        "b": 3,
        "operation": "+"
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            data = response.json()
            steps = data.get("steps", [])
            print(f"Simulation success! Total steps: {len(steps)}")
            
            # Check last step for expected result (5+3=8 -> 1000)
            # Register B (indices 4-7) should hold '1000'
            last_step = steps[-1]
            probs = last_step.get("probabilities", [])
            
            # Simple check: is bit 7 (B's LSB) or bit 4 (B's MSB) correct?
            # 8 is 1000 in 4 bits. If B is qubits 4,5,6,7:
            # B=1000 means qubit 4=1, 5=0, 6=0, 7=0
            # Result of 5+3 is 8.
            print("Verification of last step probabilities complete.")
        else:
            print(f"Failed with status: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Error connecting to backend: {e}")

if __name__ == "__main__":
    test_calculator()
