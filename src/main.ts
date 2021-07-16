import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<canvas height="800" width="800"></canvas>
`
const canvas = document.querySelector("canvas") /* canvas element */, 
			ctx = canvas.getContext('2d') /* 2L canvas context */, 
			width = canvas.width /* edge length of canvas square */, 
			tl = -.5*width /* top left corner coord if 0,0 is in the middle */, 
			hlfDignl = width/Math.SQRT2 /* half diagonal of canvas square */, 
			polyRadius = .05*width /* polygon circumradius */, 
			unitAngle = 2*Math.PI/360 /* unit angle = 1 degree */, 
			
			POLY = [] /* array to fill with polygons */, 
			N = 1 /* total number of polygons */, 
			
			/* hex values for paint buckets */
			THEME = ['#c76cd8', '#ee4198', '#c9244e', '#e57442', '#f9c240'],
			NT = THEME.length /* number of paint buckets */, 
			
			OPTS = ['fill', 'stroke'], 
			NO = OPTS.length, 
			
			FN = ['line', 'move'];

function rand(max = 1, min = 0, dec = 0) {
	return +(min + (max - min)*Math.random()).toFixed(dec)
};

class RandPoly {
	constructor() {
		/* SHAPE PROPERTIES */
		this.sides = 6; /* number of vertices */
		this.angle = 2*Math.PI/this.sides; /* base angle corresp to an edge */		
		/* POSITION PROPERTIES */
		/* polar coordinates */
		this.posRadius = 206; /* position radius */
		this.posAngle = 10; /* position angle */	
	}
	
	get coords() {
		let vx = [];		
			
		for(let i = 0; i < this.sides; i++) {
			let ca = this.posAngle + i*this.angle;
			vx.push([
				Math.round(this.posRadius*Math.cos(this.posAngle) + polyRadius*Math.cos(ca)), 
				Math.round(this.posRadius*Math.sin(this.posAngle) + polyRadius*Math.sin(ca))
			])
		}
		
		return vx
	}
};

function draw() {
	ctx.clearRect(tl, tl, width, width);

			
      ctx.fillStyle = '#f00';
			ctx.beginPath();

		 POLY.forEach(p => {
				let vx = p.coords;
				console.log(p)
				for(let k = 0; k <= p.sides; k++) {
					ctx[k ? 'lineTo' : 'moveTo'](...vx[k%p.sides])
					
				}
			});

			ctx.closePath();
      ctx.fill();

	
	// requestAnimationFrame(draw);
};

function init() {
	ctx.translate(-tl, -tl);

	for(let i = 0; i < N; i++) {
		let p = new RandPoly();
		
		POLY.push(p);
	}

	draw()
};

init();