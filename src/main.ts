import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<svg id="svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
</svg>
`
const svg =  document.querySelector("svg") /* canvas element */, 
			width = svg.offsetWidth /* edge length of canvas square */, 
			tl = -.5*width /* top left corner coord if 0,0 is in the middle */, 
			hlfDignl = width/Math.SQRT2 /* half diagonal of canvas square */, 
			polyRadius = 30 /* polygon circumradius */, 
			unitAngle = 2*Math.PI/360 /* unit angle = 1 degree */, 
			
			POLY = [] /* array to fill with polygons */, 
			N = 1 /* total number of polygons */, 
			
			/* hex values for paint buckets */
			THEME = ['#c76cd8', '#ee4198', '#c9244e', '#e57442', '#f9c240'],
			NT = THEME.length /* number of paint buckets */, 
			
			OPTS = ['fill', 'stroke'], 
			NO = OPTS.length, 
			
			FN = ['line', 'move'];
console.log(width)
function rand(max = 1, min = 0, dec = 0) {
	return +(min + (max - min)*Math.random()).toFixed(dec)
};

class RandPoly {
	constructor() {
		/* SHAPE PROPERTIES */
		this.sides = 6; /* number of vertices */
		this.angle = 2*Math.PI/this.sides; /* base angle corresp to an edge */
		this.XCord = 500;
		this.YCord = 500;	
	}
	
	get coords() {
		let vx = [];		
			
		for(let i = 0; i < this.sides; i++) {
			let ca = i*this.angle;
			vx.push([
				Math.round(this.YCord/2 + polyRadius*Math.cos(ca)), 
				Math.round(this.XCord/2 + polyRadius*Math.sin(ca))
			])
		}
		
		return vx
	}
};

function draw() {
			const svg = document.querySelector("#svg")

		 POLY.forEach(p => {
				let vx = p.coords;
				console.log(p)
					let points = ""
					vx.forEach(e => {
						const point = `${e[0]},${e[1]}`
						points = points.concat(' ', point)
					});
					const hex = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
					hex.setAttribute("points", points);
					console.log(points)
				svg?.append(hex)

			});

	
	// requestAnimationFrame(draw);
};

function init() {

	for(let i = 0; i < N; i++) {
		let p = new RandPoly();
		
		POLY.push(p);
	}

	draw()
};

init();