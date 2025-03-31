from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__, static_folder='static', template_folder='templates')

def generate_question(difficulty):
    formulas = [
        ("What is the area of a circle with radius 7? (Use π=3.14)", 3.14 * 7 * 7),
        ("What is the Pythagorean theorem formula?", "a^2 + b^2 = c^2"),
        ("What is the perimeter of a square with side length 5?", 4 * 5),
        ("What is the quadratic formula?", "x = (-b ± sqrt(b^2 - 4ac)) / 2a"),
        ("What is the volume of a cube with side length 3?", 3**3)
    ]
    
    if random.random() < 0.3:
        question, answer = random.choice(formulas)
    else:
        num1, num2 = random.randint(1, 50), random.randint(1, 50)
        operation = random.choice(['+', '-', '*'])
        if operation == '+':
            answer = num1 + num2
        elif operation == '-':
            answer = num1 - num2
        else:
            answer = num1 * num2
        question = f"{num1} {operation} {num2}"
    
    return question, answer

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_question', methods=['POST'])
def get_question():
    data = request.get_json()
    difficulty = data.get("difficulty", "Easy")
    question, answer = generate_question(difficulty)
    return jsonify({"question": question, "answer": str(answer)})

if __name__ == '__main__':
    app.run(debug=True)
