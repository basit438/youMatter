
        const breathCircle = document.getElementById('breathCircle');
        const breathText = document.getElementById('breathText');
        const startBtn = document.getElementById('startBtn');
        const techniqueSelect = document.getElementById('techniqueSelect');
        const particlesContainer = document.querySelector('.particles');

        let isExercising = false;
        let currentPhase = 0;

        const techniques = {
            '478': [
                { text: "Inhale", duration: 4000, className: "inhale" },
                { text: "Hold", duration: 7000, className: "" },
                { text: "Exhale", duration: 8000, className: "exhale" }
            ],
            'boxBreathing': [
                { text: "Inhale", duration: 4000, className: "inhale" },
                { text: "Hold", duration: 4000, className: "" },
                { text: "Exhale", duration: 4000, className: "exhale" },
                { text: "Hold", duration: 4000, className: "" }
            ],
            'deepCalm': [
                { text: "Inhale", duration: 4000, className: "inhale" },
                { text: "Hold", duration: 4000, className: "" },
                { text: "Exhale", duration: 6000, className: "exhale" },
                { text: "Hold", duration: 2000, className: "" }
            ],
            'energizing': [
                { text: "Inhale", duration: 6000, className: "inhale" },
                { text: "Exhale", duration: 2000, className: "exhale" }
            ],
            'relaxing': [
                { text: "Inhale", duration: 4000, className: "inhale" },
                { text: "Hold", duration: 7000, className: "" },
                { text: "Exhale", duration: 8000, className: "exhale" }
            ]
        };

        function createParticles() {
            particlesContainer.innerHTML = '';
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 15}s`;
                particlesContainer.appendChild(particle);
            }
        }

        function startExercise() {
            isExercising = true;
            startBtn.textContent = "Stop Exercise";
            createParticles();
            runPhase();
        }

        function stopExercise() {
            isExercising = false;
            currentPhase = 0;
            breathCircle.className = "breath-circle";
            breathText.textContent = "Start";
            startBtn.textContent = "Start Exercise";
            particlesContainer.innerHTML = '';
        }

        function runPhase() {
            if (!isExercising) return;

            const technique = techniqueSelect.value;
            const phase = techniques[technique][currentPhase];
            breathText.textContent = phase.text;
            breathCircle.className = `breath-circle ${phase.className}`;

            setTimeout(() => {
                currentPhase = (currentPhase + 1) % techniques[technique].length;
                runPhase();
            }, phase.duration);
        }

        startBtn.addEventListener('click', () => {
            if (isExercising) {
                stopExercise();
            } else {
                startExercise();
            }
        });

        techniqueSelect.addEventListener('change', () => {
            if (isExercising) {
                stopExercise();
                startExercise();
            }
        });

        // Initialize particles
        createParticles();


        
   