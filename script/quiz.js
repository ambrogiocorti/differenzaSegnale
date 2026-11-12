document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        {
            question: "Cosa rappresenta il parametro 'n' nella formula del guadagno?",
            options: [
                "La frequenza operativa",
                "Il livello di direttività",
                "La potenza del trasmettitore",
                "La distanza tra le antenne"
            ],
            answer: 1,
            explanation: "Il parametro 'n' determina quanto è stretto il fascio principale dell'antenna."
        },
        {
            question: "Cosa succede al segnale con un disallineamento di 30°?",
            options: [
                "Rimane invariato",
                "Si riduce gradualmente",
                "Crolla drasticamente",
                "Diventa più forte"
            ],
            answer: 2,
            explanation: "Nelle antenne direzionali, piccoli disallineamenti causano grandi perdite di segnale."
        },
        {
            question: "Quale tecnologia sfrutta antenne direzionali adattive?",
            options: [
                "Wi-Fi domestico",
                "Radio AM",
                "Reti 5G con beamforming",
                "Tutte le precedenti"
            ],
            answer: 2,
            explanation: "Il 5G usa beamforming per indirizzare dinamicamente il segnale verso l'utente."
        },
        {
            question: "Dove si trova il guadagno massimo in un'antenna direzionale?",
            options: [
                "Nei lobi laterali",
                "Nella direzione del lobo principale",
                "Uniforme in tutte le direzioni",
                "Nella zona posteriore"
            ],
            answer: 1,
            explanation: "Il lobo principale è la direzione di massima irradiazione."
        },
        {
            question: "Perché si usano antenne direzionali nei ponti radio?",
            options: [
                "Per ridurre le interferenze",
                "Per aumentare la portata",
                "Per migliorare la sicurezza",
                "Tutte le precedenti"
            ],
            answer: 3,
            explanation: "Le antenne direzionali offrono tutti questi vantaggi nei collegamenti punto-punto."
        }
    ];

    // Elementi DOM
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const prevBtn = document.getElementById('quiz-prev');
    const nextBtn = document.getElementById('quiz-next');
    const progressEl = document.getElementById('quiz-progress');
    const resultEl = document.getElementById('quiz-result');

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = Array(quizData.length).fill(null);

    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionEl.innerHTML = `<p>${question.question}</p>`;
        
        optionsEl.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.classList.add('quiz-option');
            if (userAnswers[currentQuestion] === index) {
                optionEl.classList.add('selected');
            }
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => selectOption(index));
            optionsEl.appendChild(optionEl);
        });

        progressEl.textContent = `${currentQuestion + 1}/${quizData.length}`;
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Mostra Risultati' : 'Avanti';
    }

    function selectOption(index) {
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        optionsEl.children[index].classList.add('selected');
        userAnswers[currentQuestion] = index;
    }

    function showResult() {
        score = quizData.reduce((acc, question, index) => {
            return acc + (userAnswers[index] === question.answer ? 1 : 0);
        }, 0);

        resultEl.innerHTML = `
            <h3>Risultato: ${score}/${quizData.length}</h3>
            <p>${getFeedback(score, quizData.length)}</p>
            <button onclick="window.location.reload()" class="quiz-button">Riprova</button>
        `;
        resultEl.style.display = 'block';
        questionEl.style.display = 'none';
        optionsEl.style.display = 'none';
        document.querySelector('.quiz-controls').style.display = 'none';
    }

    function getFeedback(score, total) {
        const percent = (score / total) * 100;
        if (percent >= 80) return 'Eccellente! Padroneggi l\'argomento!';
        if (percent >= 60) return 'Buono! Hai una solida comprensione.';
        if (percent >= 40) return 'Non male! Potresti rivedere alcuni concetti.';
        return 'Consigliato studiare di più le antenne direzionali!';
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResult();
        }
    });

    // Inizializzazione
    loadQuestion();
});
