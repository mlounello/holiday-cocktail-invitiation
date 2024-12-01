// RSVP Form Handling
// Remove or comment out the RSVP form alert
/*document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if(name && email){
      // For simplicity, we'll just show an alert. 
      // For real-world usage, integrate with a service like Formspree.
      alert(`Thank you for your RSVP, ${name}! We look forward to celebrating with you.`);
      
      // Reset the form
      e.target.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
  */
  
  // Countdown Timer
  const eventDate = new Date('2024-12-21T18:00:00').getTime();
  
  const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
      clearInterval(countdownFunction);
      document.getElementById('timer').innerText = "The party has started!";
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }, 1000);
  
  // Pure JavaScript Snowfall Effect
  (function() {
    const canvas = document.getElementById('snowfall-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Handle window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // Snowflake class
    class Snowflake {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.radius = Math.random() * 4 + 1;
        this.speed = Math.random() * 3 + 1;
        this.wind = Math.random() * 2 - 1;
      }
      
      update() {
        this.y += this.speed;
        this.x += this.wind;
        
        if (this.y > canvas.height) {
          this.reset();
        }
        
        if (this.x < 0 || this.x > canvas.width) {
          this.x = (this.x + canvas.width) % canvas.width;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00bcd4';
        ctx.fill();
      }
    }
    
    // Create snowflakes
    const snowflakes = [];
    const numberOfSnowflakes = 100;
    for (let i = 0; i < numberOfSnowflakes; i++) {
      snowflakes.push(new Snowflake());
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  })();