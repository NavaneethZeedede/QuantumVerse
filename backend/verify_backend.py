import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_simulate():
    print("Testing /simulate...")
    payload = {
        "num_qubits": 2,
        "circuit": [
            {"name": "H", "targets": [0]},
            {"name": "CNOT", "targets": [0, 1]}
        ]
    }
    response = requests.post(f"{BASE_URL}/simulate", json=payload)
    if response.status_code == 200:
        data = response.json()
        print("Success!")
        print(f"Statevector sample: {data['statevector'][0]}")
        return data['statevector']
    else:
        print(f"Failed! {response.status_code}")
        print(response.text)
        return None

def test_metrics(statevector):
    if not statevector: return
    print("\nTesting /metrics...")
    payload = {
        "num_qubits": 2,
        "statevector": statevector
    }
    response = requests.post(f"{BASE_URL}/metrics", json=payload)
    if response.status_code == 200:
        data = response.json()
        print("Success!")
        print(f"Metrics: {json.dumps(data, indent=2)}")
    else:
        print(f"Failed! {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    sv = test_simulate()
    test_metrics(sv)
