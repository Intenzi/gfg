document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("menu-icon").addEventListener("click", function () {
		document.getElementById("mobile-menu").classList.toggle("active")
	})

	// Close mobile menu when any link is clicked
	document.querySelectorAll(".mobile-menu a").forEach((link) => {
		link.addEventListener("click", function () {
			document.getElementById("mobile-menu").classList.remove("active")
		})
	})

	function updateDateTime() {
		const now = new Date()
		document.getElementById("date").innerText = now.toLocaleDateString(
			"en-US",
			{ weekday: "long", month: "long", day: "numeric" }
		)
		document.getElementById("time").innerText = now.toLocaleTimeString()
	}

	setInterval(updateDateTime, 1000)
	updateDateTime()

	document.querySelectorAll(".scroll-link").forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault()
			const sectionId = this.getAttribute("href").substring(1)
			const sectionElement = document.getElementById(sectionId)
			if (sectionElement) {
				sectionElement.scrollIntoView({ behavior: "smooth" })
			}
		})
	})

	// gfg about us
	setTimeout(() => {
		const description = document.getElementById("description")
		description.textContent =
			"Hey, CGC Landran! Think you’re ready to join the most happening tech crew on campus? Welcome to the GeeksforGeeks Student Chapter—where coding meets creativity, and late-night brainstorming turns into the next big thing.  We’re here to bring you the most exciting events, hackathons, and workshops that will sharpen your skills and maybe even turn you into the next campus superstar. Stay tuned, because we’re about to make 'geeky' the new cool. Big ideas, bold moves, and a lot of fun—are you in? Let’s make it happen!"
	}, 3000) // Change to actual description after 3 seconds
})

// gfg circles
function scrollToSection(id) {
	const section = document.getElementById(id)
	if (section) {
		section.scrollIntoView({ behavior: "smooth" })
	}
}

// gfg about team
const teamMembers = [
	{
		id: 1,
		name: "Palak",
		role: "Vice President",
		status: "Active",
		img: "an1.jpg",
	},
	{
		id: 2,
		name: "Sourav",
		role: "Social Media Head",
		status: "Active",
		img: "an2.jpg",
	},
	{
		id: 3,
		name: "Gourav",
		role: "President",
		status: "Active",
		img: "an2.jpg",
	},
	{
		id: 4,
		name: "Aastha",
		role: "Event Head",
		status: "Active",
		img: "an2.jpg",
	},
	{
		id: 5,
		name: "Anonymous One",
		role: "Vacant",
		status: "Coming Soon",
		img: "an2.jpg",
	},
	{
		id: 6,
		name: "Anonymous Two",
		role: "Vacant",
		status: "Coming Soon",
		img: "an2.jpg",
	},
]

class TeamCarousel {
	constructor(containerId, members) {
		this.container = document.getElementById(containerId)
		this.prevButton = document.getElementById("prevButton")
		this.nextButton = document.getElementById("nextButton")
		this.members = members
		this.currentIndex = 0
		this.init()
	}

	init() {
		this.renderCards()
		this.setupNavigation()
		this.setupTouchEvents()
	}

	renderCards() {
		this.container.innerHTML = ""
		this.members.forEach((member, index) => {
			const card = document.createElement("div")
			card.className = this.getCardClass(index)
			card.dataset.index = index
			card.innerHTML = `
                <img class="team-member-card-image" src="assets/members/${member.img}" alt="${member.name}">
                <div class="team-member-info">
                    <div>${member.name}</div>
                    <div>${member.role}</div>
                </div>
            `
			this.container.appendChild(card)
		})
	}

	setupNavigation() {
		this.prevButton.addEventListener("click", () => this.navigate(-1))
		this.nextButton.addEventListener("click", () => this.navigate(1))
	}

	setupTouchEvents() {
		let startX = 0
		let endX = 0

		this.container.addEventListener("touchstart", (e) => {
			startX = e.touches[0].clientX
		})

		this.container.addEventListener("touchend", (e) => {
			endX = e.changedTouches[0].clientX
			const diff = startX - endX
			if (Math.abs(diff) > 50) {
				diff > 0 ? this.navigate(1) : this.navigate(-1)
			}
		})
	}

	navigate(direction) {
		this.currentIndex =
			(this.currentIndex + direction + this.members.length) %
			this.members.length
		this.updateCardPositions()
	}

	updateCardPositions() {
		const cards = this.container.children
		Array.from(cards).forEach((card, index) => {
			card.className = this.getCardClass(index)
		})
	}

	getCardClass(index) {
		const { currentIndex: i } = this
		const len = this.members.length
		const diff = (index - i + len) % len

		if (diff === 0) return "team-member-card active"
		if (diff === 1) return "team-member-card next"
		if (diff === len - 1) return "team-member-card prev"
		return "team-member-card"
	}
}

const carousel = new TeamCarousel("teamCardContainer", teamMembers)
