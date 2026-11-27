
// ======================================
// AI PROMPT QUALITY CHECKER
// ======================================

// Get HTML elements

const promptInput = document.getElementById("promptInput");
const checkBtn = document.getElementById("checkBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");

const totalScore = document.getElementById("totalScore");
const rating = document.getElementById("rating");
const ratingDescription = document.getElementById("ratingDescription");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const wordCount = document.getElementById("wordCount");
const errorMessage = document.getElementById("errorMessage");
const suggestions = document.getElementById("suggestions");

const scoreCircle = document.querySelector(".score-circle");

// ======================================
// COMPONENT KEYWORDS
// ======================================

const components = [
    {
        id: "roleResult",
        name: "Role",
        keywords: [
            "act as",
            "you are",
            "assume the role",
            "behave as",
            "expert",
            "teacher",
            "professor",
            "developer",
            "designer",
            "specialist",
            "consultant",
            "tutor"
        ],
        suggestion:
            'Add a role such as "Act as an expert teacher" or "You are a professional developer".'
    },

    {
        id: "taskResult",
        name: "Task",
        keywords: [
            "explain",
            "write",
            "create",
            "generate",
            "summarize",
            "analyse",
            "analyze",
            "compare",
            "describe",
            "develop",
            "design",
            "list",
            "solve",
            "prepare",
            "discuss",
            "identify"
        ],
        suggestion:
            'Clearly describe the task. For example: "Explain artificial intelligence" or "Create a study timetable".'
    },

    {
        id: "contextResult",
        name: "Context",
        keywords: [
            "context",
            "background",
            "for college students",
            "for students",
            "for beginners",
            "audience",
            "purpose",
            "scenario",
            "university",
            "academic",
            "subject",
            "topic",
            "course",
            "level",
            "environment"
        ],
        suggestion:
            'Provide background information. Mention your audience, subject, purpose or situation.'
    },

    {
        id: "constraintsResult",
        name: "Constraints",
        keywords: [
            "must",
            "should",
            "only",
            "limit",
            "maximum",
            "minimum",
            "under",
            "within",
            "avoid",
            "do not",
            "don't",
            "without",
            "at least",
            "no more than",
            "less than",
            "word limit",
            "simple language",
            "step by step"
        ],
        suggestion:
            'Add clear rules such as "Use simple language", "Keep it under 300 words" or "Avoid technical terms".'
    },

    {
        id: "formatResult",
        name: "Output Format",
        keywords: [
            "bullet points",
            "table",
            "paragraph",
            "headings",
            "json",
            "markdown",
            "format",
            "in points",
            "numbered list",
            "step-by-step",
            "list format",
            "report",
            "essay",
            "code",
            "outline",
            "sections"
        ],
        suggestion:
            'Specify how the answer should appear, such as "Use bullet points", "Create a table" or "Write as a report".'
    }
];

// ======================================
// WORD COUNT
// ======================================

promptInput.addEventListener("input", function () {

    const text = promptInput.value.trim();

    const count = text
        ? text.split(/\s+/).length
        : 0;

    wordCount.textContent = count + " words";

    errorMessage.textContent = "";

});

// ======================================
// CHECK PROMPT FUNCTION
// ======================================

checkBtn.addEventListener("click", checkPrompt);

function checkPrompt() {

    const prompt = promptInput.value.trim();

    // Validate empty input

    if (prompt === "") {

        errorMessage.textContent =
            "⚠ Please enter a prompt before checking.";

        promptInput.focus();

        return;
    }

    errorMessage.textContent = "";

    // Case-insensitive detection

    const lowerPrompt = prompt.toLowerCase();

    let score = 0;
    let detectedCount = 0;

    suggestions.innerHTML = "";

    // Check each component

    components.forEach(component => {

        const isDetected = component.keywords.some(keyword =>
            lowerPrompt.includes(keyword.toLowerCase())
        );

        const resultElement = document.getElementById(component.id);

        const status = resultElement.querySelector(".component-status");
        const mark = resultElement.querySelector(".component-mark");

        if (isDetected) {

            score += 20;
            detectedCount++;

            resultElement.classList.remove("missing");
            resultElement.classList.add("detected");

            status.textContent = "✓";
            mark.textContent = "20/20";

        } else {

            resultElement.classList.remove("detected");
            resultElement.classList.add("missing");

            status.textContent = "✕";
            mark.textContent = "0/20";

            // Display improvement suggestion

            const suggestion = document.createElement("div");

            suggestion.className = "suggestion-item";

            suggestion.innerHTML =
                `<strong>${component.name} Missing:</strong> ${component.suggestion}`;

            suggestions.appendChild(suggestion);
        }

    });

    // ==================================
    // UPDATE SCORE
    // ==================================

    totalScore.textContent = score;

    // ==================================
    // UPDATE PROGRESS BAR
    // ==================================

    progressBar.style.width = score + "%";
    progressText.textContent = score + "%";

    // ==================================
    // UPDATE SCORE CIRCLE
    // ==================================

    const degrees = (score / 100) * 360;

    scoreCircle.style.background =
        `conic-gradient(#635bdb ${degrees}deg, #ecebfa ${degrees}deg)`;

    // ==================================
    // RATING SYSTEM
    // ==================================

    if (score === 100) {

        rating.textContent = "Excellent! 🏆";

        ratingDescription.textContent =
            "Your prompt contains all five essential components.";

    }

    else if (score === 80) {

        rating.textContent = "Very Good! ⭐";

        ratingDescription.textContent =
            "Great work! Your prompt needs only a small improvement.";

    }

    else if (score >= 40) {

        rating.textContent = "Good! 👍";

        ratingDescription.textContent =
            "Your prompt has a good foundation. Add the missing components.";

    }

    else {

        rating.textContent = "Needs Improvement 📚";

        ratingDescription.textContent =
            "Keep practising! Improve your prompt by adding the missing components.";

    }

    // ==================================
    // ALL COMPONENTS DETECTED
    // ==================================

    if (detectedCount === 5) {

        suggestions.innerHTML = `
            <div class="suggestion-item"
                 style="border-left-color:#20ad68">
                <strong style="color:#20ad68">
                    🎉 Excellent work!
                </strong>
                Your prompt contains all five essential components.
                Keep practising to improve your prompt engineering skills.
            </div>
        `;

    }

}

// ======================================
// LOAD SAMPLE PROMPT
// ======================================

sampleBtn.addEventListener("click", function () {

    promptInput.value =
        `Act as an expert computer science teacher.

Explain artificial intelligence and its applications in education.

The explanation is for college students who are beginners in AI.
Provide simple and relevant academic examples.

Use simple language, avoid complicated technical terms,
and keep the answer under 300 words.

Present the output using headings and bullet points.`;

    updateWordCount();

    errorMessage.textContent = "";

    promptInput.focus();

});

// ======================================
// UPDATE WORD COUNT
// ======================================

function updateWordCount() {

    const text = promptInput.value.trim();

    const count = text
        ? text.split(/\s+/).length
        : 0;

    wordCount.textContent = count + " words";

}

// ======================================
// CLEAR FUNCTION
// ======================================

clearBtn.addEventListener("click", function () {

    // Clear input

    promptInput.value = "";

    // Reset score

    totalScore.textContent = "--";

    // Reset rating

    rating.textContent = "Not Checked";

    ratingDescription.textContent =
        "Check your prompt to see your results.";

    // Reset progress bar

    progressBar.style.width = "0%";

    progressText.textContent = "0%";

    // Reset score circle

    scoreCircle.style.background =
        "conic-gradient(#635bdb 0deg, #ecebfa 0deg)";

    // Reset component results

    components.forEach(component => {

        const resultElement =
            document.getElementById(component.id);

        resultElement.classList.remove("detected", "missing");

        resultElement.querySelector(".component-status").textContent = "—";

        resultElement.querySelector(".component-mark").textContent = "0/20";

    });

    // Reset suggestions

    suggestions.innerHTML = `
        <p class="empty-suggestion">
            Suggestions will appear here after analysis.
        </p>
    `;

    // Reset word count and errors

    wordCount.textContent = "0 words";

    errorMessage.textContent = "";

    promptInput.focus();

});
