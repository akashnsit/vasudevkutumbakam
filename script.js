// Global variables
let banyantreeImg;
let leaves = [];
let pollutionData = {
    pm25: null,
    pm10: null,
    no2: null,
    so2: null,
    co: null,
    o3: null
};
let mitigationRate = 0;
let lastUpdated = null;
let dataFetchError = false;
let p5Canvas;

// Constants
const REFRESH_INTERVAL = 60000; // 1 minute in milliseconds
const LEAF_COUNT = 200;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initial data fetch
    fetchPollutionData();
    
    // Set up auto-refresh
    setInterval(fetchPollutionData, REFRESH_INTERVAL);
});

// Fetch pollution data (using mock data for demonstration)
async function fetchPollutionData() {
    try {
        // Get mock data with random variation
        const mockData = getMockDataWithVariation();
        
        // Process the mock data
        pollutionData.pm25 = mockData.pm25.value;
        pollutionData.pm10 = mockData.pm10.value;
        pollutionData.no2 = mockData.no2.value;
        pollutionData.so2 = mockData.so2.value;
        pollutionData.co = mockData.co.value;
        pollutionData.o3 = mockData.o3.value;
        
        // Calculate mitigation rate based on PM2.5
        // Formula: 100 - (PM2.5 / 35.4) * 100
        // 35.4 µg/m³ is the WHO guideline for 24-hour mean PM2.5
        mitigationRate = Math.max(0, Math.min(100, 100 - (pollutionData.pm25 / 35.4) * 100));
        
        // Update the UI
        updateUI();
        
        // Update last fetched time
        lastUpdated = new Date();
        document.getElementById('last-updated').textContent = `Last updated: ${lastUpdated.toLocaleTimeString()}`;
        
        // Reset error flag
        dataFetchError = false;
        
    } catch (error) {
        console.error('Error with pollution data:', error);
        dataFetchError = true;
        
        // Show error message
        const pollutionDataElement = document.getElementById('pollution-data');
        pollutionDataElement.innerHTML = `
            <div class="error-message">
                <p>Unable to process pollution data. Please try again later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
        
        // Update last attempt time
        lastUpdated = new Date();
        document.getElementById('last-updated').textContent = `Last attempt: ${lastUpdated.toLocaleTimeString()} (failed)`;
    }
}

// Update the UI with the latest data
function updateUI() {
    // Update pollution data display
    const pollutionDataElement = document.getElementById('pollution-data');
    
    pollutionDataElement.innerHTML = `
        <div class="pollutant-card">
            <div class="pollutant-name">PM2.5</div>
            <div class="pollutant-value">${pollutionData.pm25 !== null ? pollutionData.pm25.toFixed(2) : 'N/A'}</div>
            <div class="pollutant-unit">µg/m³</div>
        </div>
        <div class="pollutant-card">
            <div class="pollutant-name">PM10</div>
            <div class="pollutant-value">${pollutionData.pm10 !== null ? pollutionData.pm10.toFixed(2) : 'N/A'}</div>
            <div class="pollutant-unit">µg/m³</div>
        </div>
        <div class="pollutant-card">
            <div class="pollutant-name">NO₂</div>
            <div class="pollutant-value">${pollutionData.no2 !== null ? pollutionData.no2.toFixed(2) : 'N/A'}</div>
            <div class="pollutant-unit">µg/m³</div>
        </div>
        <div class="pollutant-card">
            <div class="pollutant-name">SO₂</div>
            <div class="pollutant-value">${pollutionData.so2 !== null ? pollutionData.so2.toFixed(2) : 'N/A'}</div>
            <div class="pollutant-unit">µg/m³</div>
        </div>
        <div class="pollutant-card">
            <div class="pollutant-name">CO</div>
            <div class="pollutant-value">${pollutionData.co !== null ? pollutionData.co.toFixed(2) : 'N/A'}</div>
            <div class="pollutant-unit">µg/m³</div>
        </div>
        <div class="pollutant-card">
            <div class="pollutant-name">O₃</div>
            <div class="pollutant-value">${pollutionData.o3 !== null ? pollutionData.o3.toFixed(2) : 'N/A'}</div>
            <div class="pollutant-unit">µg/m³</div>
        </div>
    `;
    
    // Update mitigation rate
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = `${mitigationRate}%`;
    progressText.textContent = `${mitigationRate.toFixed(1)}%`;
    
    // Update progress bar color based on mitigation rate
    if (mitigationRate >= 70) {
        progressBar.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';
    } else if (mitigationRate >= 40) {
        progressBar.style.background = 'linear-gradient(90deg, #f39c12, #f1c40f)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #c0392b, #e74c3c)';
    }
}

// p5.js sketch for the banyan tree visualization
function sketch(p) {
    p.preload = function() {
        banyantreeImg = p.loadImage('banyan.jpg');
    };
    
    p.setup = function() {
        const container = document.getElementById('visualization-container');
        const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
        canvas.parent('visualization-container');
        
        // Initialize leaves
        for (let i = 0; i < LEAF_COUNT; i++) {
            leaves.push(new Leaf(p));
        }
    };
    
    p.draw = function() {
        p.clear();
        
        // Draw the banyan tree image
        const imgRatio = banyantreeImg.width / banyantreeImg.height;
        const canvasRatio = p.width / p.height;
        
        let imgWidth, imgHeight;
        
        if (imgRatio > canvasRatio) {
            imgHeight = p.height;
            imgWidth = imgHeight * imgRatio;
        } else {
            imgWidth = p.width;
            imgHeight = imgWidth / imgRatio;
        }
        
        p.image(
            banyantreeImg, 
            (p.width - imgWidth) / 2, 
            (p.height - imgHeight) / 2, 
            imgWidth, 
            imgHeight
        );
        
        // Update and draw leaves
        for (let leaf of leaves) {
            leaf.update(mitigationRate);
            leaf.display();
        }
    };
    
    p.windowResized = function() {
        const container = document.getElementById('visualization-container');
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
    
    // Leaf class
    class Leaf {
        constructor(p) {
            this.p = p;
            this.resetPosition();
            this.size = p.random(5, 15);
            this.color = p.color(0, 255, 0); // Start with green
            this.targetColor = p.color(0, 255, 0);
            this.colorTransitionSpeed = p.random(0.01, 0.05);
            this.angle = p.random(0, p.TWO_PI);
            this.rotationSpeed = p.random(-0.02, 0.02);
        }
        
        resetPosition() {
            // Position leaves in a circular pattern to form the tree canopy
            const angle = this.p.random(0, this.p.TWO_PI);
            const radius = this.p.random(50, Math.min(this.p.width, this.p.height) * 0.4);
            this.x = this.p.width / 2 + this.p.cos(angle) * radius;
            this.y = this.p.height / 2 + this.p.sin(angle) * radius * 0.8 - 50; // Slightly elliptical, shifted up
        }
        
        update(mitigationRate) {
            // Update leaf color based on mitigation rate
            if (mitigationRate >= 70) {
                this.targetColor = this.p.color(0, 255, 0); // Green
            } else if (mitigationRate <= 30) {
                this.targetColor = this.p.color(139, 69, 19); // Brown
            } else {
                // Mix of green and brown
                const greenAmount = (mitigationRate - 30) / 40; // 0 to 1
                this.targetColor = this.p.lerpColor(
                    this.p.color(139, 69, 19), // Brown
                    this.p.color(0, 255, 0),   // Green
                    greenAmount
                );
            }
            
            // Gradually transition to target color
            this.color = this.p.lerpColor(this.color, this.targetColor, this.colorTransitionSpeed);
            
            // Gentle rotation
            this.angle += this.rotationSpeed;
        }
        
        display() {
            this.p.push();
            this.p.translate(this.x, this.y);
            this.p.rotate(this.angle);
            this.p.fill(this.color);
            this.p.noStroke();
            
            // Draw a simple leaf shape
            this.p.beginShape();
            this.p.vertex(0, -this.size / 2);
            this.p.bezierVertex(
                this.size / 2, -this.size / 2,
                this.size, 0,
                0, this.size
            );
            this.p.bezierVertex(
                -this.size, 0,
                -this.size / 2, -this.size / 2,
                0, -this.size / 2
            );
            this.p.endShape(this.p.CLOSE);
            
            this.p.pop();
        }
    }
}

// Initialize p5.js sketch
p5Canvas = new p5(sketch);

