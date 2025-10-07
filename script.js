// Simple snacks menu data — edit as needed
const MENU = [
{id:1, name:'Premium Kesar Kajukatri', price:120},
{id:2, name:'Royal Dryfruit Khajurpak', price:90},
{id:3, name:'Masala Samosa (2 pcs)', price:45},
{id:4, name:'Paneer Pakoda (serv)', price:80},
{id:5, name:'Masala Pav bhaji (serv)', price:110}
];


const ITEMS = document.getElementById('items');
const summaryList = document.getElementById('summaryList');
let cart = JSON.parse(localStorage.getItem('snacks_cart') || '[]');


function renderMenu(){
ITEMS.innerHTML='';
MENU.forEach(it => {
const el = document.createElement('div'); el.className='item';
el.innerHTML = `<h3>${it.name}</h3><div class="muted">₹${it.price}</div>
<div class="row" style="margin-top:8px">
<button onclick="addToCart(${it.id})">Add</button>
<button class="secondary" onclick="decrease(${it.id})">-</button>
<span id="qty-${it.id}">0</span>
</div>`;
ITEMS.appendChild(el);
});
}


function saveCart(){ localStorage.setItem('snacks_cart', JSON.stringify(cart)); renderSummary(); }


function addToCart(id){
const item = MENU.find(m=>m.id===id);
const existing = cart.find(c=>c.id===id);
if(existing) existing.qty++;
else cart.push({id, name:item.name, price:item.price, qty:1});
saveCart();
}
function decrease(id){ const idx = cart.findIndex(c=>c.id===id); if(idx>-1){ cart[idx].qty--; if(cart[idx].qty<=0) cart.splice(idx,1); saveCart(); }}


function renderSummary(){
summaryList.innerHTML='';
let total=0;
cart.forEach(c=>{
total += c.price*c.qty;
const row = document.createElement('div'); row.innerHTML = `${c.name} — ${c.qty} × ₹${c.price} = ₹${c.price*c.qty}`;
summaryList.appendChild(row);
const qtySpan = document.getElementById('qty-'+c.id);
if(qtySpan) qtySpan.innerText = c.qty;
});
if(cart.length===0) summaryList.innerHTML='<small class="muted">No items added</small>';
const tot = document.createElement('div'); tot.style.marginTop='8px'; tot.innerHTML=`<strong>Total: ₹${total}</strong>`;
summaryList.appendChild(tot);
}


function clearCart(){ cart=[]; saveCart(); }


function generateToken(){
renderMenu(); renderSummary();