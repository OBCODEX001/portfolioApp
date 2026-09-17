/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

// const toggler = document.getElementById("toggler").addEventListener("click", (e)=>{
//    document.body.classList.toggle("show")
// })

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/
const homeText = document.getElementById("home-text"),
      letters = homeText.textContent.trim().split(""), // converts text into an array of characters
      angleStep = 360 / letters.length  // Angle  for each Character; length counts the number of characters

      homeText.textContent = " "  // Clears the orginal content

      // iterates through each character
      letters.forEach((char, i)=>{
         const span = document.createElement("span") // Creates a span for each letter
         span.textContent = char // Inserts each character into the span
         span.style.transform = `rotate(${i * angleStep}deg)` // Rotates each letter based on its index to form the circle
         homeText.appendChild(span)// Appends the span to the main container
      })
/*=============== HOME TYPED JS ===============*/
const typedHome = new Typed("#home-typed",{
   strings: ["Freelancer", "Web Developer", "Graphics Designer"], // Inserts professions
   typeSpeed: 60,
   backSpeed: 30, 
   backDelay: 2000,
   loop: true,
})

/*=============== CHANGE HEADER STYLES ===============*/

const scrollHeader = ()=>{
   const header = document.getElementById("header")
   // Add the scroll-header class if the bottom scroll of the viewport is greater than 50
   this.scrollY >= 50 ? header.classList.add("scroll-header")
                     :header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)
/*=============== SWIPER WORK ===============*/ 
const swiperWork = new Swiper(".work__swiper", {
   loop: true,
   spaceBetween: 24,
   slidesPerView: "auto",
   grabCursor: true,
   speed: 600,

   // if we need pagination
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },

   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   }
  
})

/*=============== SERVICES ACCORDION ===============*/ 
const servicesCards = document.querySelectorAll(".services__card"),
      servicesButtons = document.querySelectorAll(".services__button")
// It iterates over each button found
servicesButtons.forEach(button =>{
   button.addEventListener('click', ()=>{
      const currentCard = button.closest(".services__card"),// gets the class of the clicked button (.services__card)//
             isOpen = currentCard.classList.contains("services-open")// check already  has the services-open class returns true or false

      // Close all other services data
      servicesCards.forEach(card =>{
         card.classList.replace("services-open", "services-close")
      })

      // if the clicked card was closed, it opens it
      if(!isOpen){
         currentCard.classList.replace("services-close", "services-open")
      }
   })
})
/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/ 
// Get all testimonial sliders
const tracks = document.querySelectorAll(".testimonials__content")

tracks.forEach(track =>{
// Get the child testimonial sliders and create a copy of all cards
const cards = [...track.children] // (... spread operato), converts the collection into an array
// Get all the testimonial sliders
for(const card of cards){
   // Duplicate the card and append it at the end
   track.appendChild(card.cloneNode(true))
}
})

/*=============== CONTACT EMAIL JS ===============*/ 
const contactForm = document.getElementById("contact-form"),
      contactMessage = document.getElementById("contact-message")

      const sendEmail = async (e)=>{
         // prevent the page from reloading
         e.preventDefault()

         try {
            // serviceID - templateID - #form - publicKey
            await emailjs.sendForm("service_055c169","template_0wy98wc","#contact-form","eDr48aptak1jqVG-1")
            // Show sent message
            contactMessage.textContent = " Message sent successfully ✅"
            // clear input fields
            contactForm.reset()
         } catch (error) {
            // show error message
           contactMessage.textContent= "  Message not sent (service error) ❌"
         } finally{
            // remove message after five seconds
            setTimeout(()=> contactMessage.textContent = "", 5000)
         }
      }

      contactForm.addEventListener("submit", sendEmail)
/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = ()=>{
   const scrollUp = document.getElementById("scroll-up")
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
   window.scrollY >= 350 ? scrollUp.classList.add("show-scroll") : scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]")

// Link the id of each section (section id="home") to each link (a href="home")
// and activate the link with the class .active-link
const scrollActive = ()=>{
   // we get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section =>{
      const id = section.id, // id of each section
            top = section.offsetTop - 50, // Distance from the top edge
            height = section.offsetHeight, // Element Height
            link = document.querySelector('.nav__menu a[href="#' + id + '"]') // id nav link

            if(!link) return
            link.classList.toggle("active-link", scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener("scroll", scrollActive)
scrollActive()

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0 // Store mouse position

const cursorMove = ()=>{
   cursor.style.left = `${mouseX}px`// Horizontal position (X-axis)
   cursor.style.top = `${mouseY}px` // Vertical position (Y-axis)
   cursor.style.transform = `translate(-50%, -50%)`// Centers the element at the pointer

   // Repeats the fuction with each movement
   requestAnimationFrame(cursorMove)
}

// Detects mouse movement and updates positions
document.addEventListener("mousemove", (e)=>{
   mouseX = e.clientX // Save position X
   mouseY = e.clientY // Save position Y
})

cursorMove()

// Hide custom cursor on links
const a = document.querySelectorAll("a")

a.forEach(item =>{
   // Mouse enters the link and hides the cursor
   item.addEventListener("mouseover", ()=>{
      cursor.classList.add("hide-cursor")
   })
   // Mouse exits the link and shows the cursor
   item.addEventListener("mouseleave", ()=>{
      cursor.classList.remove("hide-cursor")
   })
})
/*=============== SCROLLREVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: "bottom",
   distance: "60px",
   duration: 1200,
   delay: 300,
   easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
   // reset: true, 
   // Animations repeat
})
sr.reveal(`.home__subtitle`)
sr.reveal(`.home__title`, {delay: 600})
sr.reveal(`.home__description`, {delay: 900})
sr.reveal(`.home__box-1`, {delay: 1200, rotate:{z:-20}})
sr.reveal(`.home__box-2`, {delay: 1300, rotate:{z:-30}})
sr.reveal(`.home__box-3`, {delay: 1400, rotate:{z:-40}})
sr.reveal(`.home__img`, {delay: 1700, distance: "-60px"})
sr.reveal(`.home__circle`, {delay: 2000, distance: "-100px"})

sr.reveal(`.about__title`)
sr.reveal(`.about__description`, {delay: 600})
sr.reveal(`.about__button`, {delay: 900})


sr.reveal(`.work__swiper`)
sr.reveal(`.services__card:nth-child(odd)`, {interval:200, origin: "left", distance: "100px"})
sr.reveal(`.services__card:nth-child(even)`, {interval:200, origin: "right", distance: "100px"})

sr.reveal(`.skills__description`)
sr.reveal(`.skills__card`, {delay: 600, interval: 200})
sr.reveal(`.skills__profession`, {delay: 900})
sr.reveal(`.skills__list`, {delay: 1200, interval: 200})

sr.reveal(`.testimonials__container`)

sr.reveal(`.contact__form`)
sr.reveal(`.contact__link`, {delay: 600, interval:200})

sr.reveal(`.footer__container`)



