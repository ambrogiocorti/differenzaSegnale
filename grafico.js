document.addEventListener('DOMContentLoaded', function () {
    const svg = document.getElementById('grafico-svg');
    const slider = document.getElementById('beamwidthSlider');
    const valueDisplay = document.getElementById('beamwidthValue');

    // Configurazione
    const CONFIG = {
        centerX: 150,
        centerY: 150,
        radius: 120,
        colors: {
            primary: '#00ffff',
            secondary: '#8800ff',
            axis: 'rgba(255, 255, 255, 0.3)',
            grid: 'rgba(255, 255, 255, 0.1)'
        }
    };

    function init() {
        // Inizializza slider
        slider.addEventListener('input', function () {
            const n = parseInt(this.value);
            valueDisplay.textContent = n;
            updateGraph(n);
        });

        // Disegna elementi base
        drawBaseElements();
        updateGraph(6); // Valore iniziale
    }

    function drawBaseElements() {
        // Griglia polare
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup
            .classList
            .add('base-element');

        // Cerchi concentrici (3 livelli)
        [0.33, 0.66, 1.0].forEach(ratio => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', CONFIG.centerX);
            circle.setAttribute('cy', CONFIG.centerY);
            circle.setAttribute('r', CONFIG.radius * ratio);
            circle.setAttribute('stroke', CONFIG.colors.grid);
            circle.setAttribute('stroke-dasharray', '3,3');
            circle.setAttribute('fill', 'none');
            gridGroup.appendChild(circle);
        });

        // Assi cartesiani
        const axisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        ['horizontal', 'vertical'].forEach(type => {
            const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            axis.setAttribute(
                'x1',
                type === 'horizontal'
                    ? 0
                    : CONFIG.centerX
            );
            axis.setAttribute(
                'y1',
                type === 'horizontal'
                    ? CONFIG.centerY
                    : 0
            );
            axis.setAttribute(
                'x2',
                type === 'horizontal'
                    ? 300
                    : CONFIG.centerX
            );
            axis.setAttribute(
                'y2',
                type === 'horizontal'
                    ? CONFIG.centerY
                    : 300
            );
            axis.setAttribute('stroke', CONFIG.colors.axis);
            axis.setAttribute('stroke-width', '1');
            axisGroup.appendChild(axis);
        });

        svg.appendChild(gridGroup);
        svg.appendChild(axisGroup);
        addLabels();
    }

    function updateGraph(n) {
        // Rimuovi il pattern precedente
        const oldPattern = document.querySelector('.radiation-pattern');
        if (oldPattern) 
            oldPattern.remove();
        
        // Calcola nuovi punti
        const points = [];
        for (let angle = 0; angle <= 360; angle += 2) { // Maggiore precisione
            const rad = angle * (Math.PI / 180);
            const gain = Math.max(0, Math.pow(Math.cos(rad), n));
            const r = CONFIG.radius * gain;
            const x = CONFIG.centerX + r * Math.cos(rad);
            const y = CONFIG.centerY - r * Math.sin(rad); // Y invertito in SVG
            points.push(`${x},${y}`);
        }

        // Crea nuovo pattern
        const pattern = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'polygon'
        );
        pattern.setAttribute('points', points.join(' '));
        pattern.setAttribute('fill', `rgba(0, 204, 255, ${ 0.2 + n / 40})`); // Opacità dinamica
        pattern.setAttribute('stroke', CONFIG.colors.primary);
        pattern.setAttribute('stroke-width', '1.5');
        pattern
            .classList
            .add('radiation-pattern');

        // Effetto glow
        pattern.style.filter = `drop-shadow(0 0 5px ${CONFIG.colors.primary})`;
        svg.appendChild(pattern);
    }

    function addLabels() {
        const labels = [
            {
                angle: 0,
                text: '0°',
                x: CONFIG.centerX + CONFIG.radius + 15,
                y: CONFIG.centerY + 5
            }, {
                angle: 90,
                text: '90°',
                x: CONFIG.centerX - 10,
                y: CONFIG.centerY - CONFIG.radius - 5
            }, {
                angle: 180,
                text: '180°',
                x: CONFIG.centerX - CONFIG.radius - 25,
                y: CONFIG.centerY + 5
            }, {
                angle: 270,
                text: '270°',
                x: CONFIG.centerX - 10,
                y: CONFIG.centerY + CONFIG.radius + 15
            }
        ];

        labels.forEach(label => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', label.x);
            text.setAttribute('y', label.y);
            text.setAttribute('fill', 'rgba(255, 255, 255, 0.8)');
            text.setAttribute('font-size', '12');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = label.text;
            svg.appendChild(text);
        });
    }

    init();
});