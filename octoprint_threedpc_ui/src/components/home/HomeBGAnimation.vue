<template>
  <div id="home_bg_animation_container"></div>
</template>

<script>
const { PI, cos, sin, abs, sqrt, pow, random, atan2 } = Math
const HALF_PI = 0.5 * PI
const rand = n => n * random()
const fadeInOut = (t, m) => {
  let hm = 0.5 * m
  return abs((t + hm) % m - hm) / (hm)
}
// eslint-disable-next-line
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1)
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2

export default {
  name: 'HomeBGAnimation',
  data () {
    return {
      particleCount: 400,
      particlePropCount: 9,
      baseTTL: 100,
      rangeTTL: 500,
      baseSpeed: 0.1,
      rangeSpeed: 1,
      baseSize: 2,
      rangeSize: 10,
      baseHue: 10,
      rangeHue: 100,
      noiseSteps: 2,
      xOff: 0.0025,
      yOff: 0.005,
      zOff: 0.0005,
      backgroundColor: 'rgba(19, 19, 19, 1)',
      container: null,
      canvas: null,
      ctx: null,
      center: null,
      gradient: null,
      tick: null,
      particleProps: null,
      positions: null,
      velocities: null,
      lifeSpans: null,
      speeds: null,
      sizes: null,
      hues: null
    }
  },
  computed: {
    particlePropsLength: function () {
      return this.particleCount * this.particlePropCount
    }
  },
  methods: {
    /**
     * Setup method
     * @return {void}
     */
    setup: function () {
      this.createCanvas()
      this.resize()
      this.initParticles()
      this.draw()
    },
    /**
     * Initialize all particles
     * @return {void}
     */
    initParticles: function () {
      this.tick = 0
      this.particleProps = new Float32Array(this.particlePropsLength)
      let i
      for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
        this.initParticle(i)
      }
    },
    /**
     * Initialize only one particle
     * @param {number} i - Index
     * @return {void}
     */
    initParticle: function (i) {
      let theta
      let x
      let y
      let vx
      let vy
      let life
      let ttl
      let speed
      let size
      let hue

      x = rand(this.canvas.a.width)
      y = rand(this.canvas.a.height)

      theta = angle(x, y, this.center[0], this.center[1])

      vx = cos(theta) * 6
      vy = sin(theta) * 6

      life = 0

      ttl = this.baseTTL + rand(this.rangeTTL)
      speed = this.baseSpeed + rand(this.rangeSpeed)
      size = this.baseSize + rand(this.rangeSize)
      hue = this.baseHue + rand(this.rangeHue)

      this.particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i)
    },
    /**
     * Draw all particles
     * @return {void}
     */
    drawParticles: function () {
      let i
      for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
        this.updateParticle(i)
      }
    },
    /**
     * Update a particle
     * @param {number} i - Index
     * @return {void}
     */
    updateParticle: function (i) {
      let i2 = 1 + i
      let i3 = 2 + i
      let i4 = 3 + i
      let i5 = 4 + i
      let i6 = 5 + i
      let i7 = 6 + i
      let i8 = 7 + i
      let i9 = 8 + i
      let x
      let y
      let theta
      let vx
      let vy
      let life
      let ttl
      let speed
      let x2
      let y2
      let size
      let hue

      x = this.particleProps[i]
      y = this.particleProps[i2]

      theta = angle(x, y, this.center[0], this.center[1]) + 0.75 * HALF_PI

      vx = lerp(this.particleProps[i3], 2 * cos(theta), 0.05)
      vy = lerp(this.particleProps[i4], 2 * sin(theta), 0.05)

      life = this.particleProps[i5]
      ttl = this.particleProps[i6]
      speed = this.particleProps[i7]

      x2 = x + vx * speed
      y2 = y + vy * speed

      size = this.particleProps[i8]
      hue = this.particleProps[i9]

      this.drawParticle(x, y, theta, life, ttl, size, hue)

      life++

      this.particleProps[i] = x2
      this.particleProps[i2] = y2
      this.particleProps[i3] = vx
      this.particleProps[i4] = vy
      this.particleProps[i5] = life

      life > ttl && this.initParticle(i)
    },
    /**
     * Draw a particle
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} theta - Theta angle
     * @param {number} life - Life duration
     * @param {number} ttl - ..?
     * @param {number} size - Size in pixels
     * @param {number} hue - For color
     * @return {void}
     */
    drawParticle: function (x, y, theta, life, ttl, size, hue) {
      let xRel = x - (0.5 * size)
      let yRel = y - (0.5 * size)

      this.ctx.a.save()
      this.ctx.a.lineCap = 'round'
      this.ctx.a.lineWidth = 1
      // ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
      this.ctx.a.strokeStyle = `hsla(197,71.4%,72.5%,${fadeInOut(life, ttl)})`
      // ctx.a.strokeStyle = 'rgb(135, 206, 235)'
      this.ctx.a.beginPath()
      this.ctx.a.translate(xRel, yRel)
      this.ctx.a.rotate(theta)
      this.ctx.a.translate(-xRel, -yRel)
      this.ctx.a.moveTo(xRel + size * Math.cos(0), yRel + size * Math.sin(0))
      // Draw hexagon
      let side = 0 // Begin at first element
      for (side; side < 7; side++) {
        this.ctx.a.lineTo(xRel + size * Math.cos(side * 2 * Math.PI / 6), yRel + size * Math.sin(side * 2 * Math.PI / 6))
      }
      this.ctx.a.stroke()
      this.ctx.a.closePath()
      this.ctx.a.restore()
    },
    /**
     * Create the canvas
     * @return {void}
     */
    createCanvas: function () {
      this.container = document.querySelector('#home_bg_animation_container')
      this.canvas = {
        a: document.createElement('canvas'),
        b: document.createElement('canvas')
      }
      this.canvas.b.id = 'home_bg_animation_canvas'
      this.container.appendChild(this.canvas.b)
      this.ctx = {
        a: this.canvas.a.getContext('2d'),
        b: this.canvas.b.getContext('2d')
      }
      this.center = []
    },
    /**
     * Resize the canvas to the window size
     * @return {void}
     */
    resize: function () {
      const { innerWidth, innerHeight } = window
      this.canvas.a.width = innerWidth
      this.canvas.a.height = innerHeight
      this.ctx.a.drawImage(this.canvas.b, 0, 0)
      this.canvas.b.width = innerWidth
      this.canvas.b.height = innerHeight
      this.ctx.b.drawImage(this.canvas.a, 0, 0)
      this.center[0] = 0.5 * this.canvas.a.width
      this.center[1] = 0.5 * this.canvas.a.height
    },
    /**
     * Render glow effect
     * @return {void}
     */
    renderGlow: function () {
      this.ctx.b.save()
      this.ctx.b.filter = 'blur(8px) brightness(200%)'
      this.ctx.b.globalCompositeOperation = 'lighter'
      this.ctx.b.drawImage(this.canvas.a, 0, 0)
      this.ctx.b.restore()

      this.ctx.b.save()
      this.ctx.b.filter = 'blur(4px) brightness(200%)'
      this.ctx.b.globalCompositeOperation = 'lighter'
      this.ctx.b.drawImage(this.canvas.a, 0, 0)
      this.ctx.b.restore()
    },
    /**
     * Render
     * @return {void}
     */
    render: function () {
      this.ctx.b.save()
      this.ctx.b.globalCompositeOperation = 'lighter'
      this.ctx.b.drawImage(this.canvas.a, 0, 0)
      this.ctx.b.restore()
    },
    /**
     * Draw
     * @return {void}
     */
    draw: function () {
      this.tick++

      this.ctx.a.clearRect(0, 0, this.canvas.a.width, this.canvas.a.height)

      this.ctx.b.fillStyle = this.backgroundColor
      this.ctx.b.fillRect(0, 0, this.canvas.a.width, this.canvas.a.height)

      this.drawParticles()
      this.renderGlow()
      this.render()

      window.requestAnimationFrame(this.draw)
    }
  },
  mounted () {
    window.addEventListener('load', this.setup)
    window.addEventListener('resize', this.resize)
  }
}

</script>
