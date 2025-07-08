// Music functionality
let isPlaying = false
const music = document.getElementById("backgroundMusic")

function playMusic() {
  const playButton = document.querySelector(".play-button")

  if (!isPlaying) {
    music
      .play()
      .then(() => {
        isPlaying = true
        playButton.innerHTML = "⏸️"
        playButton.style.background = "rgba(139, 195, 74, 0.4)"
      })
      .catch((error) => {
        console.log("Error playing music:", error)
        // Fallback: show a message or alternative action
        showNotification("Música no disponible en este momento")
      })
  } else {
    music.pause()
    isPlaying = false
    playButton.innerHTML = "▶️"
    playButton.style.background = "rgba(139, 195, 74, 0.2)"
  }
}

// Location functionality
function viewLocation() {
  // Replace with actual coordinates or address
  const address = "Eventos Palmera Real"
  const encodedAddress = encodeURIComponent(address)

  // Try to open in Google Maps app first, then fallback to web
  const googleMapsApp = `comgooglemaps://?q=${encodedAddress}`
  const googleMapsWeb = `https://maps.app.goo.gl/p3Wa529tNRL3riUi6?g_st=aw`

  // For mobile devices, try to open the app
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = googleMapsApp
    // Fallback to web version after a short delay
    setTimeout(() => {
      window.open(googleMapsWeb, "_blank")
    }, 1000)
  } else {
    // For desktop, open web version
    window.open(googleMapsWeb, "_blank")
  }

  showNotification("Abriendo ubicación en Google Maps...")
}

// RSVP functionality
function confirmAttendance() {
  // You can integrate with a form service, email, or WhatsApp
  const phoneNumber = "+573168292417" // Replace with actual phone number
  const message = encodeURIComponent(
    "¡Hola! Confirmo mi asistencia a la quinceañera de Maria Alejandra el 13 de Septiembre de 2025. ¡Nos vemos ahí! 🎉",
  )

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  // Alternative: open email client
  // const emailSubject = encodeURIComponent("Confirmación de asistencia - Quinceañera Zoe Antonella");
  // const emailBody = encodeURIComponent("Confirmo mi asistencia a la quinceañera de Zoe Antonella el 10 de mayo de 2025.");
  // const emailUrl = `mailto:example@email.com?subject=${emailSubject}&body=${emailBody}`;

  window.open(whatsappUrl, "_blank")
  showNotification("Abriendo WhatsApp para confirmar asistencia...")
}

// Notification system
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #8bc34a;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(139, 195, 74, 0.3);
        z-index: 1000;
        font-size: 0.9rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to decorative elements
  const hearts = document.querySelectorAll(".heart")
  hearts.forEach((heart) => {
    heart.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(10deg)"
      this.style.transition = "all 0.3s ease"
    })

    heart.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Add click effect to crown
  const crown = document.querySelector(".crown")
  crown.addEventListener("click", function () {
    this.style.animation = "none"
    setTimeout(() => {
      this.style.animation = "pulse 1s ease-in-out 3"
    }, 10)
  })

  // Add parallax effect to background decorations
  window.addEventListener("scroll", () => {
    const decorations = document.querySelectorAll(".bg-decoration")
    const scrolled = window.pageYOffset

    decorations.forEach((decoration, index) => {
      const rate = scrolled * -0.5 * (index + 1)
      decoration.style.transform = `translateY(${rate}px)`
    })
  })
})

// Add touch gestures for mobile
let touchStartY = 0
let touchEndY = 0

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY
})

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartY - touchEndY

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could add some effect
      console.log("Swiped up")
    } else {
      // Swipe down - could add some effect
      console.log("Swiped down")
    }
  }
}

// Add loading animation
window.addEventListener("load", () => {
  const container = document.querySelector(".invitation-container")
  container.style.opacity = "0"
  container.style.transform = "translateY(20px)"
  container.style.transition = "all 0.8s ease"

  setTimeout(() => {
    container.style.opacity = "1"
    container.style.transform = "translateY(0)"
  }, 100)
})

function updateCountdown() {
    const targetDate = new Date("2025-09-13T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById("countdown").innerHTML = "¡El gran día ha llegado!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("countdown").innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente
