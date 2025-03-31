let currentQuestion = "";  // Store the current question
let correctAnswer = "";    // Store the correct answer
let score = 0;             // Initialize score
let highScore = 0;         // Track highest score
let timer;                 // Timer reference
let timeLeft = 60;         // 1 minute timer

function startQuiz() {
    score = 0;  // Reset score at the start
    timeLeft = 60;  // Reset timer
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("highScore").innerText = `High Score: ${highScore}`;
    document.getElementById("result").innerText = "";
    
    startTimer(); // Start the countdown timer
    fetchNewQuestion();
}

function fetchNewQuestion() {
    let difficulty = document.getElementById("difficulty").value;
    fetch("/get_question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ difficulty: difficulty })
    })
    .then(response => response.json())
    .then(data => {
        currentQuestion = data.question;  // Save question
        correctAnswer = data.answer;      // Save answer
        document.getElementById("question").innerText = "Question: " + currentQuestion;
        document.getElementById("answer").value = "";  // Clear input
    });
}

function submitAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    
    if (!currentQuestion) {
        document.getElementById("result").innerText = "❗ Start the quiz first!";
        return;
    }

    // Check the answer against the stored correct answer
    if (userAnswer.toLowerCase() === correctAnswer.toString().toLowerCase()) {
        score += 1;  // Increase score
        document.getElementById("result").innerText = `✅ Correct! Score: ${score}`;
        fetchNewQuestion(); // Generate a new question
    } else {
        document.getElementById("result").innerText = `❌ Wrong! The correct answer was: ${correctAnswer}`;
        gameOver(); // End game on wrong answer
    }

    document.getElementById("score").innerText = `Score: ${score}`;
}

// Timer Function
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = `⏳ Time Left: ${timeLeft}s`;
        } else {
            gameOver(); // End game when timer reaches 0
        }
    }, 1000);
}

// Game Over Function
function gameOver() {
    clearInterval(timer);
    
    // Update High Score
    if (score > highScore) {
        highScore = score;
        document.getElementById("highScore").innerText = `🏆 High Score: ${highScore}`;
    }
    
    document.getElementById("result").innerText = `⏳ Time's Up! Final Score: ${score}`;
    document.getElementById("question").innerText = "Game Over! Press Start to Play Again.";
}
