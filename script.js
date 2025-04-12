document.addEventListener("DOMContentLoaded", () => {
    // Countdown elements
    const daysEl = document.getElementById("days")
    const hoursEl = document.getElementById("hours")
    const minutesEl = document.getElementById("minutes")
    const secondsEl = document.getElementById("seconds")
  
    // Target date - April 13, 2025
    const monthsaryDate = new Date("2025-04-13T01:40:00").getTime()
  
    // Countdown timer functionality
    function updateCountdown() {
      const now = new Date().getTime()
      const difference = monthsaryDate - now
  
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  
        // Update with animation if value changes
        updateWithAnimation(daysEl, days)
        updateWithAnimation(hoursEl, hours)
        updateWithAnimation(minutesEl, minutes)
        updateWithAnimation(secondsEl, seconds)
      } else {
        // If the date has passed
        daysEl.textContent = "00"
        hoursEl.textContent = "00"
        minutesEl.textContent = "00"
        secondsEl.textContent = "00"
      }
    }
  
    // Function to update element with animation if value changes
    function updateWithAnimation(element, value) {
      const formattedValue = value.toString().padStart(2, "0")
      if (element.textContent !== formattedValue) {
        // Add scale animation
        element.classList.add("scale-animation")
  
        // Update the value
        element.textContent = formattedValue
  
        // Remove animation class after animation completes
        setTimeout(() => {
          element.classList.remove("scale-animation")
        }, 300)
      }
    }
  
    // Add CSS for scale animation
    const style = document.createElement("style")
    style.textContent = `
          .scale-animation {
              animation: scale-pulse 0.3s ease;
          }
          
          @keyframes scale-pulse {
              0% {
                  transform: scale(1);
              }
              50% {
                  transform: scale(1.1);
              }
              100% {
                  transform: scale(1);
              }
          }
      `
    document.head.appendChild(style)
  
    // Initial countdown update
    updateCountdown()
  
    // Update countdown every second
    setInterval(updateCountdown, 1000)
  
    // Responsive adjustments based on screen size
    function adjustForScreenSize() {
      const countdownCards = document.querySelectorAll(".countdown-card")
      const windowWidth = window.innerWidth
  
      if (windowWidth < 360) {
        countdownCards.forEach((card) => {
          card.style.width = "3rem"
        })
      } else if (windowWidth < 480) {
        countdownCards.forEach((card) => {
          card.style.width = "3.5rem"
        })
      } else if (windowWidth < 768) {
        countdownCards.forEach((card) => {
          card.style.width = "4rem"
        })
      } else if (windowWidth < 1024) {
        countdownCards.forEach((card) => {
          card.style.width = "5rem"
        })
      } else {
        countdownCards.forEach((card) => {
          card.style.width = "5.5rem"
        })
      }
    }
  
    // Initial adjustment
    adjustForScreenSize()
  
    // Adjust on window resize
    window.addEventListener("resize", adjustForScreenSize)
  })
  
  // Email sending function using mailto
  function sendEmail() {
    const email = document.getElementById("sender-email").value;
    const message = document.getElementById("message-content").value;
    const formStatus = document.getElementById("form-status");

    // Receiver email address
    const yourEmail = "marcdanielmilano@gmail.com";

    // Validate input fields
    if (!email || !message) {
      formStatus.textContent = "Please fill in both the email and message fields.";
      formStatus.className = "form-status error";
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.className = "form-status error";
      return false;
    }

    // Create subject line
    const subject = "Message from Monthsary Website";

    // Format the body of the email
    const body = `Message from: ${email}\n\n${message}`;

    // Create the mailto link
    const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      // Open the email client
      window.location.href = mailtoLink;

      // Show success message
      formStatus.textContent = "Your email client has been opened. Please send the email to complete.";
      formStatus.className = "form-status success";

      // Reset the form after a delay
      setTimeout(() => {
        document.getElementById("message-form").reset();
      }, 2000);
    } catch (error) {
      // Show error message
      formStatus.textContent = "Could not open email client. Please try again or send email manually.";
      formStatus.className = "form-status error";
      console.error("Error opening email client:", error);
    }

    // Return false to prevent form submission
    return false;
  }
