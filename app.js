import { GOOSEART } from './data.js';
const app = document.getElementById('app');
const loader = document.getElementById('loader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const link = (href,label,cls='btn') => `<a class="${cls}" href="${href}">${label}</a>`;
const normalizeAssetPath = path => {
  const value = String(path ?? '');
  if (!value) return '';
  if (/^(?:https?:|data:|blob:|\/)/i.test(value)) return value;
  return '/' + value.replace(/^\.\//, '').replace(/^\//, '');
};

function shell(title, body){
  document.title = `${title} — GooseART`;
  return `<div class="page">${body}</div>`;
}
function pageTitle(kicker,title,desc=''){
  return `<section class="page-title"><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1>${desc?`<p>${esc(desc)}</p>`:''}</section>`;
}
function categoryCards(){
  return Object.entries(GOOSEART.portfolio).map(([slug,c],i)=>`<a class="category-card" href="#/portfolio/${slug}"><span class="category-num">0${i+1}</span><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><span class="arrow">↗</span></a>`).join('');
}
function home(){
  return shell('Home',`
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">GOOSEART / PAIGE</p>
        <img class="wordmark" src="/assets/paige-wordmark.png" alt="Paige">
        <h1>Artist <em>&</em> Designer</h1>
        <p>${esc(GOOSEART.intro)}</p>
        <div class="actions">${link('#/portfolio','View Portfolio','btn dark')}${link('#/pricing','View Pricing','btn light')}${link('#/contact','Contact Paige','btn light')}</div>
      </div>
      <div class="hero-art"><div class="art-orbit"><div class="art-card"><div class="art-card-inner"></div></div><div class="art-card"><div class="art-card-inner"></div></div><div class="art-card"><div class="art-card-inner"></div></div></div></div>
    </section>
    <section class="section alt"><div class="section-head"><div><p class="eyebrow">THE STUDIO</p><h2>Make it<br>memorable.</h2></div><p>GooseART is a personal creative studio for visual work that feels expressive, polished and distinctly its own. Browse by discipline to see exactly what Paige creates.</p></div><div class="mini-grid">${categoryCards()}</div></section>
    <section class="section"><div class="section-head"><div><p class="eyebrow">FEATURED / RECENT</p><h2>The work<br>comes first.</h2></div><p>Portfolio spaces are built to grow with Paige. Add projects later without redesigning the site.</p></div><div class="featured"><div class="feature-tile large"><span class="tag">01 / FEATURED ARTWORK</span><h3>Your next favorite piece.</h3><p>Placeholder space for a standout project. Replace this with a real artwork image whenever you're ready.</p></div><div class="feature-tile"><span class="tag">02 / RECENT WORK</span><h3>New ideas live here.</h3><p>Flexible portfolio space for recent commissions and experiments.</p></div><div class="feature-tile"><span class="tag">03 / COMMISSIONS</span><h3>Let's make something.</h3><p>Ready to commission Paige? Start with pricing or send an inquiry.</p></div></div></section>
    <section class="section alt"><div class="section-head"><div><p class="eyebrow">SELECTED EXPERIENCE</p><h2>Worked<br>with.</h2></div><p>A selection of servers, creators, brands, and agencies Paige has worked with.</p></div><div class="worked-with">${GOOSEART.workedWith.map((name,i)=>`<div class="worked-item"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(name)}</strong></div>`).join('')}</div></section>
    <section class="section"><div class="contact-wrap"><div class="contact-copy"><p class="eyebrow">READY WHEN YOU ARE</p><h2>Interested in working with Paige?</h2><p>Browse the services, look through the portfolio, then send over the details of your idea.</p></div><div class="actions">${link('#/pricing','View Pricing','btn dark')}${link('#/contact','Start a Commission','btn light')}</div></div></section>`);
}
function portfolio(){
  return shell('Portfolio',pageTitle('Portfolio / 00','The Portfolio','Explore GooseART by creative discipline. Every major area has its own categories and dedicated portfolio spaces.')+`<section class="section"><div class="category-grid">${categoryCards()}</div></section>`);
}
function discipline(slug){
  const c=GOOSEART.portfolio[slug]; if(!c) return notFound();
  return shell(c.title,pageTitle(c.kicker,c.title,c.description)+`<section class="section"><div class="category-grid">${c.categories.map(([s,t,d],i)=>`<a class="category-large" href="#/portfolio/${slug}/${s}"><span class="index">${String(i+1).padStart(2,'0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span>↗</span></a>`).join('')}</div></section>`);
}
function galleryPage(parent,catSlug){
  const c=GOOSEART.portfolio[parent]; const cat=c?.categories.find(x=>x[0]===catSlug); if(!cat) return notFound();
  const [slug,title,desc]=cat; const items=GOOSEART.projects[slug]||[];
  const gallery=items.length?`<div class="gallery">${items.map((p,i)=>`<article class="project" data-project="${i}" data-slug="${esc(slug)}"><div class="project-art">${p.image?`<img src="${esc(normalizeAssetPath(p.image))}" alt="${esc(p.title||title)}">`:''}</div><div class="project-info"><h3>${esc(p.title||'Untitled Project')}</h3><p>${esc(p.description||'Portfolio project')}</p></div></article>`).join('')}</div>`:`<div class="empty-state"><img src="/assets/goose-p-mark.jpg" alt="GooseART logo"><h3>Portfolio Image Placeholder</h3><p>This gallery is ready for Paige's ${esc(title.toLowerCase())} work. Add project entries in <strong>data.js</strong> and they will appear here automatically.</p></div>`;
  return shell(title,pageTitle(`${c.title} / ${catSlug}` ,title,desc)+`<section class="section"><div class="section-head"><div><p class="eyebrow">FEATURED WORK</p><h2>Gallery</h2></div><p>Each project can include an image, title, description, client, date, tools and external link.</p></div>${gallery}</section>`);
}
function pricing(){
  const groups=[...new Set(GOOSEART.pricing.map(x=>x.group))];
  return shell('Pricing',pageTitle('Commissions / Pricing','Pricing','Current commission packages based on the supplied pricing sheet. Prices may vary where noted.')+`<section class="section"><div class="price-groups">${groups.map(g=>`<div class="price-group"><h2>${esc(g)}</h2><div class="price-grid">${GOOSEART.pricing.filter(x=>x.group===g).map(p=>`<article class="price-card"><h3>${esc(p.name)}</h3><div class="details">${esc(p.details)}</div><div class="price">${esc(p.price)}</div></article>`).join('')}</div></div>`).join('')}</div><div class="price-note"><strong>Price may vary.</strong> For a custom project, send Paige the details of what you need and the scope can be discussed before starting.</div><div class="actions">${link('#/contact','Commission Paige','btn dark')}</div></section>`);
}
function contact(){
  return shell('Contact',pageTitle('Commission / Contact','Let’s make something.','Tell Paige what you have in mind. Include as much detail as you can so she can get back to you with the right information.')+`<section class="section"><div class="contact-wrap"><div class="contact-copy"><p class="eyebrow">COMMISSION INQUIRIES</p><h2>Start the conversation.</h2><p>Share what you need, the style you're after, your deadline, and anything else that will help Paige understand the project.</p><div class="contact-list"><a class="btn dark contact-discord" href="${esc(GOOSEART.contact.discord)}" target="_blank" rel="noopener">Join the GooseART Discord ↗</a><a class="contact-email" href="mailto:${esc(GOOSEART.contact.email)}">${esc(GOOSEART.contact.email)}</a></div></div><form class="contact-form" id="contactForm" action="${esc(GOOSEART.contact.formEndpoint)}" method="POST" novalidate><div class="field"><label>Name *</label><input required name="name" placeholder="Your name..." autocomplete="name"></div><div class="field"><label>Contact Information *</label><input required name="contact" placeholder="Your email address / Discord ..." autocomplete="email"></div><div class="field"><label>Phone Number</label><input name="phone" type="tel" placeholder="Optional phone number..." autocomplete="tel"></div><div class="field"><label>Title *</label><input required name="title" placeholder="Your title..."></div><div class="field"><label>Message *</label><textarea required name="message" placeholder="Tell Paige about your project..."></textarea></div><input type="hidden" name="_subject" value="New GooseART Commission Inquiry"><input class="contact-ref" name="_gotcha" tabindex="-1" autocomplete="off"><button class="btn dark" type="submit">Send Message ↗</button><div class="success" id="formSuccess" role="status" aria-live="polite"></div></form></div></section>`);
}
function socialCards(){
  const list=[['X','x','𝕏'],['Instagram','instagram','◎'],['BuiltByBit','builtbybit','B'],['MCModels','mcmodels','M']];
  return list.map(([name,key,icon])=>GOOSEART.socials[key]?`<a class="social-card" href="${esc(GOOSEART.socials[key])}" target="_blank" rel="noopener"><div><h3>${name}</h3><small>Visit GooseART on ${name}</small></div><span class="social-icon">${icon} ↗</span></a>`:`<div class="social-card disabled"><div><h3>${name}</h3><small>URL not connected yet</small></div><span class="social-icon">${icon}</span></div>`);
}
function socials(){return shell('Socials',pageTitle('GooseART / Socials','Find the artist.','Social profiles are intentionally left unlinked until the correct Paige/GooseART URLs are supplied.')+`<section class="section"><div class="social-grid">${socialCards().join('')}</div></section>`)}
function notFound(){return shell('Not Found',pageTitle('404','That page wandered off.','Try heading back to the portfolio and pick another creative corner.')+`<section class="section">${link('#/portfolio','Back to Portfolio','btn dark')}</section>`)}

function render(){
  const raw=location.hash.replace(/^#\/?/,'')||'home'; const parts=raw.split('/').filter(Boolean);
  if(parts[0]==='home') app.innerHTML=home();
  else if(parts[0]==='portfolio' && parts.length===1) app.innerHTML=portfolio();
  else if(parts[0]==='portfolio' && parts.length===2) app.innerHTML=discipline(parts[1]);
  else if(parts[0]==='portfolio' && parts.length===3) app.innerHTML=galleryPage(parts[1],parts[2]);
  else if(parts[0]==='pricing') app.innerHTML=pricing();
  else if(parts[0]==='contact') app.innerHTML=contact();
  else if(parts[0]==='socials') app.innerHTML=socials();
  else app.innerHTML=notFound();
  window.scrollTo({top:0,behavior:'instant'});
  mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
  bindPageEvents();
}
function bindPageEvents(){
  const form=document.getElementById('contactForm');
  if(form) form.addEventListener('submit', async e=>{
    e.preventDefault();
    const success=document.getElementById('formSuccess');
    const button=form.querySelector('button[type="submit"]');
    if(form._submitting) return;
    if(!form.reportValidity()) return;
    if(form.querySelector('[name="_gotcha"]').value) return;

    if(!GOOSEART.contact.formEndpoint){
      success.textContent='The contact form is ready, but its submission service still needs to be connected. Please email Paige directly at '+GOOSEART.contact.email+' for now.';
      success.classList.add('show');
      return;
    }

    form._submitting=true;
    button.disabled=true;
    button.textContent='Sending…';
    success.classList.remove('show');

    try{
      const response=await fetch(GOOSEART.contact.formEndpoint,{
        method:'POST',
        headers:{'Accept':'application/json'},
        body:new FormData(form)
      });
      if(!response.ok) throw new Error('Submission failed');
      form.reset();
      success.textContent='Thank you! Your inquiry has been sent to Paige successfully.';
      success.classList.add('show');
    }catch(err){
      success.textContent='Something went wrong while sending your inquiry. Please email '+GOOSEART.contact.email+' directly instead.';
      success.classList.add('show');
    }finally{
      form._submitting=false;
      button.disabled=false;
      button.textContent='Send Message ↗';
    }
  });
  document.querySelectorAll('.project').forEach(card=>card.addEventListener('click',()=>openLightbox(card)));
}
function openLightbox(card){
  const img=card.querySelector('img'); const title=card.querySelector('h3')?.textContent||'Project';
  const el=document.createElement('div'); el.className='lightbox open'; el.innerHTML=`<div class="lightbox-inner"><button class="lightbox-close" aria-label="Close">×</button><div class="lightbox-art">${img?`<img src="${img.src}" alt="${esc(title)}">`:`<div style="font-family:Barlow Condensed;font-size:60px;font-weight:900;color:#f6f2dd;text-align:center">PORTFOLIO<br>PLACEHOLDER</div>`}</div><div style="padding:14px 4px 0;font-family:'Barlow Condensed';font-size:30px;text-transform:uppercase">${esc(title)}</div></div>`;
  document.body.appendChild(el); el.querySelector('.lightbox-close').onclick=()=>el.remove(); el.addEventListener('click',e=>{if(e.target===el)el.remove()});
}
menuToggle.addEventListener('click',()=>{mobileMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',mobileMenu.classList.contains('open'))});
window.addEventListener('hashchange',render);
window.addEventListener('load',()=>{setTimeout(()=>loader.classList.add('done'),500);render()});
