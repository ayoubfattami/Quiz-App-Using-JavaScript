const questions = [
    {
        question : "Which language is used for client-side dynamic web development?",
        answers : [
            { text : "PHP", correct : false},
            { text : "JavaScript", correct : true},
            { text : "Python", correct : false},
            { text : "SQL", correct : false}
        ]
    },
{
    question : "What symbol is used to comment a single line in JavaScript?",
    answers : [
        { text : "//", correct : true},
        { text : "*", correct : false},
        { text : "`<!-- -->`", correct : false},
        { text : "#", correct : false}
    ]
},
{
    question : "Which JavaScript method is used to display an alert message in the browser?",
    answers : [
        { text : "prompt()", correct : false},
        { text : "alert()", correct : true},
        { text : "console.log()", correct : false},
        { text : "display()", correct : false}
    ]
},
{
    question : "Which keyword is used to declare a variable that can be redefined in JavaScript?",
    answers : [
        { text : "const", correct : false},
        { text : "let", correct : false},
        { text : "define", correct : false},
        { text : "var", correct : true}
    ]
}];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0; 

function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();