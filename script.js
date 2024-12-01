// script.js

// Self-Executing Anonymous Function to Avoid Global Scope Pollution
(function() {
    // Select the Snowfall Canvas
    const canvas = document.getElementById('snowfall-canvas');
    const ctx = canvas.getContext('2d');
  
    // Set Canvas Size to Full Window Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Update Canvas Size on Window Resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeSnowflakes(); // Reinitialize snowflakes on resize
    });
  
    // Mouse Position Tracking for Interactivity
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  
    window.addEventListener('mousemove', function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  
    // Snowflake Class Definition
    class Snowflake {
      constructor() {
        this.reset();
      }
  
      // Initialize or Reset Snowflake Properties
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.radius = Math.random() * 4 + 1; // Snowflake size: 1px to 5px
        this.speed = Math.random() * 2 + 0.5; // Falling speed: 0.5 to 2.5
        this.wind = Math.random() * 1 - 0.5; // Horizontal movement: -0.5 to +0.5
        this.color = '#ffffff'; // Snowflake color: white
        this.interactiveRadius = 100; // Radius for cursor interaction
      }
  
      // Update Snowflake Position and Interaction
      update() {
        // Move Snowflake Downward and Horizontally
        this.y += this.speed;
        this.x += this.wind;
  
        // Calculate Distance from Mouse Cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        // If Within Interactive Radius, Move Snowflake Towards Cursor
        if (distance < this.interactiveRadius) {
          // Adjust movement strength as needed (0.5 can be modified)
          this.x += (dx / distance) * 0.5;
          this.y += (dy / distance) * 0.5;
        }
  
        // Reset Snowflake if It Moves Beyond the Bottom or Sides
        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
          this.reset();
        }
      }
  
      // Draw Snowflake on Canvas
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
  
    // Array to Hold Snowflake Instances
    let snowflakes = [];
    let numberOfSnowflakes;
  
    // Initialize Snowflakes Based on Screen Width
    function initializeSnowflakes() {
      snowflakes = []; // Clear Existing Snowflakes
  
      if (window.innerWidth < 600) {
        numberOfSnowflakes = 100; // Fewer snowflakes on small screens
      } else {
        numberOfSnowflakes = 200; // More snowflakes on larger screens
      }
  
      for (let i = 0; i < numberOfSnowflakes; i++) {
        snowflakes.push(new Snowflake());
      }
    }
  
    // Initial Snowflake Setup
    initializeSnowflakes();
  
    // Animation Loop for Snowfall Effect
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear Canvas
  
      // Update and Draw Each Snowflake
      snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
      });
  
      requestAnimationFrame(animate); // Continue Animation
    }
  
    // Start the Animation
    animate();
  
  })();