const mode=document.querySelector('#mode');mode.onclick=()=>{document.body.classList.toggle('dark-board');mode.textContent=document.body.classList.contains('dark-board')?'Светлый фон':'Темный фон'};
const modal=document.querySelector('.modal'),content=document.querySelector('.modal-content');
document.querySelectorAll('.frame').forEach(frame=>{const open=()=>{content.replaceChildren(frame.cloneNode(true));modal.classList.add('open');modal.setAttribute('aria-hidden','false')};frame.onclick=open;frame.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}});
function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');content.replaceChildren()}
modal.querySelector('button').onclick=close;modal.onclick=e=>{if(e.target===modal)close()};addEventListener('keydown',e=>{if(e.key==='Escape')close()});
