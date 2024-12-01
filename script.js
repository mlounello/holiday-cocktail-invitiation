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
  
    // Optional: Mouse Position Tracking for Interactive Snowflakes
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
  
    // Countdown Timer Functionality
    function updateCountdown() {
      const eventDate = new Date('December 21, 2024 18:00:00').getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;
  
      // Time calculations for days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Display the result in the respective elements
      document.getElementById('days').innerText = days < 10 ? '0' + days : days;
      document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
      document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
  
      // Update progress circles
      updateProgressCircles(days, hours, minutes, seconds);
  
      // If the countdown is finished, display some text
      if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('#timer-heading').innerText = "The Party Has Started!";
        document.querySelector('.countdown').style.display = 'none';
      }
    }
  
    // Function to update progress circles
    function updateProgressCircles(days, hours, minutes, seconds) {
      // Define total values for percentage calculations
      const daysTotal = 365; // Total days in a year (adjust as needed)
      const hoursTotal = 24;
      const minutesTotal = 60;
      const secondsTotal = 60;
  
      // Calculate percentage remaining for each unit
      const daysProgress = Math.min((days / daysTotal) * 283, 283);
      const hoursProgress = Math.min((hours / hoursTotal) * 283, 283);
      const minutesProgress = Math.min((minutes / minutesTotal) * 283, 283);
      const secondsProgress = Math.min((seconds / secondsTotal) * 283, 283);
  
      // Update stroke-dashoffset
      document.querySelector('#days').parentElement.querySelector('circle').style.strokeDashoffset = 283 - daysProgress;
      document.querySelector('#hours').parentElement.querySelector('circle').style.strokeDashoffset = 283 - hoursProgress;
      document.querySelector('#minutes').parentElement.querySelector('circle').style.strokeDashoffset = 283 - minutesProgress;
      document.querySelector('#seconds').parentElement.querySelector('circle').style.strokeDashoffset = 283 - secondsProgress;
    }
  
    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
  
    // Initial call to display countdown immediately
    updateCountdown();
  
    // Note: Since Google Forms handles form submissions, additional JavaScript for form handling is not required.
  
  })();