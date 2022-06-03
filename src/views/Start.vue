<template>
    <div class="container" id ='parent'>
        <section id="energy-start" class="pictures">
            <b-row class= "reveal">
                <b-col>
                    <b-card><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text></b-card>
                </b-col>
                <b-col>
                    <b-card><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text></b-card>
                </b-col>
            </b-row>
        </section>
        <section id = "buildings" class="pictures">
            <StickyNavbar />
            <b-row class= "reveal">
                <b-col>
                    <b-card><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </section>
        <section id = "management" class="pictures">
            <StickyNavbar />
            <b-row class= "reveal">
                <b-col>
                    <b-card><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text></b-card>
                </b-col>
                <b-col>
                    <b-card><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text></b-card>
                </b-col>
            </b-row>
        </section>
        <section id = "sustain" class="pictures">
            <StickyNavbar />
            <b-row class= "reveal">
                <b-col>
                    <b-card  title="Energiemanagementsystem"><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text>
                    <b-button to="/ems" variant="secondary">Energiemanagement</b-button>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Performance Monitoring"><b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </b-card-text>
                    <b-button to="/performance" variant="secondary">Performance Monitoring</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </section>
    </div>
</template>

<script>
import StickyNavbar from '@/components/StickyNavbarStart.vue'

export default {
  components: { StickyNavbar },
  data () {
    return {
      inMove: false,
      activeSection: 0,
      offsets: [],
      touchStartY: 0
    }
  },
  mounted () {
    this.calculateSectionOffsets()
  },
  methods: {
    calculateSectionOffsets () {
      const sections = document.querySelectorAll('section')
      // const length = sections.length
      const length = 4
      console.log(sections)

      for (let i = 0; i < length; i++) {
        const sectionOffset = sections[i].offsetTop
        this.offsets.push(sectionOffset)
      }
      console.log(this.offsets)
    },
    handleMouseWheel: function (e) {
      if (e.wheelDelta < 30 && !this.inMove) {
        this.moveUp()
      } else if (e.wheelDelta > 30 && !this.inMove) {
        this.moveDown()
      }

      e.preventDefault()
      return false
    },
    handleMouseWheelDOM: function (e) {
      if (e.detail > 0 && !this.inMove) {
        this.moveUp()
      } else if (e.detail < 0 && !this.inMove) {
        this.moveDown()
      }

      return false
    },
    moveDown () {
      this.inMove = true
      this.activeSection--

      if (this.activeSection < 0) this.activeSection = this.offsets.length - 1

      this.scrollToSection(this.activeSection, true)
    },
    moveUp () {
      this.inMove = true
      this.activeSection++

      if (this.activeSection > this.offsets.length - 1) this.activeSection = 0

      this.scrollToSection(this.activeSection, true)
    },
    scrollToSection (id, force = false) {
      if (this.inMove && !force) return false

      this.activeSection = id
      this.inMove = true

      document.getElementsByTagName('section')[id].scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        this.inMove = false
      }, 400)
    },
    touchStart (e) {
      e.preventDefault()

      this.touchStartY = e.touches[0].clientY
    },
    touchMove (e) {
      if (this.inMove) return false
      e.preventDefault()

      const currentY = e.touches[0].clientY

      if (this.touchStartY < currentY) {
        this.moveDown()
      } else {
        this.moveUp()
      }

      this.touchStartY = 0
      return false
    }
  },
  created () {
    // this.calculateSectionOffsets()

    window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM) // Mozilla Firefox
    window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }) // Other browsers

    window.addEventListener('touchstart', this.touchStart, { passive: false }) // mobile devices
    window.addEventListener('touchmove', this.touchMove, { passive: false }) // mobile devices
  },
  destroyed () {
    window.removeEventListener('mousewheel', this.handleMouseWheel, { passive: false }) // Other browsers
    window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM) // Mozilla Firefox

    window.removeEventListener('touchstart', this.touchStart) // mobile devices
    window.removeEventListener('touchmove', this.touchMove) // mobile devices
  }
}
window.addEventListener('load', reveal)
window.addEventListener('scroll', reveal)
window.addEventListener('scroll', nextPicture)
/*
document.addEventListener('DOMContentLoaded', function (event) {
  const observer = new MutationObserver(addedActive)
  const test = document.getElementById('buildings')
  observer.observe(test, options)
})

// const btn = document.getElementById('app')
const options = {
  attributes: true
}

function addedActive (mutationList, observer) {
  mutationList.forEach(function (mutation) {
    // if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target.className === 'pictures active') {
    if (mutation.target.className === 'pictures active') {
      console.log(mutation.target.className)
      const element = document.getElementById('buildings')
      element.scrollIntoView(false)
      // observer.disconnect()
      // window.scrollBy(0, 500)
    }
  })
}
*/
// const observer = new MutationObserver(addedActive)
// observer.observe(btn, options)

function nextPicture () {
  var pictures = document.querySelectorAll('.pictures')
  for (var i = 1; i < pictures.length; i++) {
    // console.log(pictures.length)
    var windowheight = window.innerHeight
    var revealtop = pictures[i].getBoundingClientRect().top
    // console.log(revealtop)
    var revealpoint = 600

    if (revealtop < windowheight - revealpoint) {
      pictures[i].classList.add('active')
      // const picture = pictures[i]
      // window.scrollBy(0, 10)
      // console.log(picture)
      // picture.scrollIntoView(true)
    } else {
      pictures[i].classList.remove('active')
    }
  }
}

function reveal () {
  var reveals = document.querySelectorAll('.reveal')
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight
    var revealtop = reveals[i].getBoundingClientRect().top
    var revealpoint = 150

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('active')
    } else {
      reveals[i].classList.remove('active')
    }
  }
}
</script>

<style scoped>

section {
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
}

section#energy-start {
    background: url('../assets/green-energy.jpeg') no-repeat center center/cover;
}
section#buildings {
    background: url('../assets/buildings.jpeg') no-repeat center center/cover;
}
section#management {
    background: url('../assets/building2.jpeg') no-repeat center center/cover;
}
section#sustain {
    background: url('../assets/sustain.jpeg') no-repeat center center/cover;
}
.container {
    width: 100%;
    max-width: 100%;
    padding-right: 0px;
    padding-left: 0px;
}
.card {
    display:flex;
    justify-content: center;
    background: rgba(247, 251, 253, 0.8);
    max-width: 25rem;
    margin: 40px;
}
.reveal {
    position: relative;
    transform: translateY(200px);
    opacity: 0;
    transition: all 2s ease;
}

.reveal.active {
    transform: translateY(0px);
    opacity: 1;
}
</style>
