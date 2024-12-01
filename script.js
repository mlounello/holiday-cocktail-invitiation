// RSVP Form Handling
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
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
  
  // Initialize Snowfall Effect
  $(document).ready(function(){
    $(document).snowfall({
      flakeCount: 100,
      maxSpeed: 5,
      maxSize: 5,
      minSize: 2,
      round: true,
      shadow: true,
      color: '#00bcd4'
    });
  });