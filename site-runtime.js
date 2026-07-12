const progress=document.querySelector('.progress');
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h?scrollY/h*100:0)+'%'},{passive:true});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-button');
menu?.addEventListener('click',()=>header.classList.toggle('open'));
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));
const lightbox=document.querySelector('.lightbox'),lightImg=lightbox?.querySelector('img');
document.querySelectorAll('.story-media img').forEach(img=>img.addEventListener('click',()=>{lightImg.src=img.src;lightImg.alt=img.alt;lightbox.classList.add('open')}));
function closeLightbox(){lightbox?.classList.remove('open')}
lightbox?.querySelector('button').addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
if(document.body.dataset.theme==='monolith'){
 const canvas=document.createElement('canvas');canvas.className='field';document.body.prepend(canvas);const c=canvas.getContext('2d');let pts=[];
 function size(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;c.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:50},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}
 function draw(){c.clearRect(0,0,innerWidth,innerHeight);c.strokeStyle='#d7ff3f18';pts.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;pts.slice(i+1).forEach(q=>{const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<140){c.globalAlpha=1-d/140;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke()}})});c.globalAlpha=1;requestAnimationFrame(draw)}size();draw();addEventListener('resize',size);
}
