const menu = [
  {name:'A Moda da Casa',category:'Tradicional',price:68.50},
  {name:'A Moda do Paulista',category:'Tradicional',price:71.50},
  {name:'Americana',category:'Tradicional',price:68.50},
  {name:'Atum à Moda da Casa',category:'Tradicional',price:68.50},
  {name:'Atum à Moda Paulista',category:'Tradicional',price:68.50},
  {name:'Atum à Peruana',category:'Tradicional',price:68.50},
  {name:'Atum Ralado',category:'Tradicional',price:65.50},
  {name:'Australiana',category:'Tradicional',price:71.50},
  {name:'Baiana',category:'Tradicional',price:65.50},
  {name:'Brasileira',category:'Tradicional',price:68.50},
  {name:'Caipira',category:'Tradicional',price:65.50},
  {name:'Calabresa',category:'Tradicional',price:65.50},
  {name:'Canadense',category:'Tradicional',price:68.50},
  {name:'Carmela',category:'Tradicional',price:68.50},
  {name:'Catarina',category:'Tradicional',price:65.50},
  {name:'Cubana',category:'Tradicional',price:71.50},
  {name:'Dois Queijos',category:'Tradicional',price:65.50},
  {name:'Espanhola',category:'Tradicional',price:65.50}
];
const grid=document.querySelector('#product-grid'), tabs=[...document.querySelectorAll('.filter-chip')], search=document.querySelector('#search');
const drawer=document.querySelector('#list-drawer'), backdrop=document.querySelector('#drawer-backdrop'), selected=new Map(); let category='Tudo',toastTimer;
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function render(){const q=search.value.trim().toLocaleLowerCase('pt-BR');const list=menu.filter(x=>(category==='Tudo'||x.category===category)&&x.name.toLocaleLowerCase('pt-BR').includes(q));grid.innerHTML=list.map((x,i)=>`<article class="product-card"><div class="product-top"><span>${x.category}</span><span class="price">${money(x.price)}</span></div><h3>${x.name}</h3><p>Consulte tamanho, ingredientes e disponibilidade.</p><button class="add-button" type="button" data-add="${x.name}" aria-label="Adicionar ${x.name} à seleção">+</button></article>`).join('')||'<p class="empty-list">Nenhum sabor encontrado. Tente outra busca.</p>';document.querySelector('#result-count').textContent=`${list.length} ${list.length===1?'sabor':'sabores'} para explorar`;grid.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{const x=menu.find(m=>m.name===b.dataset.add);selected.set(x.name,x);updateBag();notify(`${x.name} entrou na sua seleção.`)}))}
function updateBag(){const n=selected.size;document.querySelector('#bag-count').textContent=n;document.querySelector('#drawer-total').textContent=n;document.querySelector('#drawer-items').innerHTML=n?[...selected.values()].map(x=>`<div class="drawer-product"><div><h3>${x.name}</h3><small>${x.category} · referência ${money(x.price)}</small></div><button class="remove-item" data-remove="${x.name}" aria-label="Remover ${x.name}">×</button></div>`).join(''):'<div class="empty-list"><span>＋</span>Escolha sabores para montar sua consulta.<br>Os valores são referências do cardápio enviado.</div>';document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{selected.delete(b.dataset.remove);updateBag()})}
function toggle(open){drawer.hidden=!open;backdrop.hidden=!open;document.body.style.overflow=open?'hidden':'';if(open)document.querySelector('#close-bag').focus()}
function notify(t){const el=document.querySelector('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
tabs.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;tabs.forEach(t=>t.classList.toggle('active',t===b));render()}));search.addEventListener('input',render);search.addEventListener('keydown',e=>{if(e.key==='Escape')search.value='',render()});document.querySelector('#open-bag').onclick=()=>toggle(true);document.querySelector('#close-bag').onclick=()=>toggle(false);backdrop.onclick=()=>toggle(false);document.querySelector('#clear-list').onclick=()=>{selected.clear();updateBag()};document.querySelector('#send-list').onclick=()=>{if(!selected.size){notify('Escolha ao menos um sabor para consultar.');return}const items=[...selected.values()].map(x=>`${x.name} (referência ${money(x.price)})`).join(', ');const msg=`Oi! Vi o cardápio da Nova Delícia e queria consultar: ${items}. Podem confirmar tamanhos, valores e disponibilidade?`;location.href=`https://wa.me/5512981576204?text=${encodeURIComponent(msg)}`};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!drawer.hidden)toggle(false);if(e.key==='/'&&document.activeElement!==search&&document.activeElement.tagName!=='INPUT'){e.preventDefault();search.focus()}});render();updateBag();
