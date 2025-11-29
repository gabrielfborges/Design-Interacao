export default function registerComponents(){
if(customElements.get('site-header')) return;


class SiteHeader extends HTMLElement{
constructor(){
super();
const shadow = this.attachShadow({mode:'open'});
shadow.innerHTML = `
<style>
:host{display:block;background:linear-gradient(90deg,#ffffff,#f4f8ff);border-bottom:1px solid #e6ecff}
.shell{max-width:900px;margin:0 auto;padding:0.75rem;display:flex;align-items:center;justify-content:space-between}
.brand{font-weight:700}
</style>
<div class="shell">
<div class="brand">Trabalho Web Components</div>
</div>
`;
}
}


class SiteMenu extends HTMLElement{
constructor(){
super();
const current = this.getAttribute('current') || '';
const shadow = this.attachShadow({mode:'open'});
shadow.innerHTML = `
<style>
nav{max-width:900px;margin:0 auto;padding:.5rem}
ul{display:flex;gap:.5rem}
a{padding:.4rem .6rem;border-radius:6px;text-decoration:none;color:inherit}
</style>
<nav class="site-shell">
<ul>
<li><a href="./index.html" 'aria-current="page"' : ''}>Página 1</a></li>
<li><a href="./page2.html" 'aria-current="page"' : ''}>Página 2</a></li>
</ul>
</nav>
`;
}
}


class SiteFooter extends HTMLElement{
constructor(){
super();
const shadow = this.attachShadow({mode:'open'});
shadow.innerHTML = `
<style>
:host{display:block;border-top:1px solid #eef2ff;background:#fff}
.shell{max-width:900px;margin:0 auto;padding:1rem;text-align:center;font-size:.9rem;color:#666}
</style>
<div class="shell">&copy; ${new Date().getFullYear()} - Trabalho de Web Components.</div>
`;
}
}


customElements.define('site-header', SiteHeader);
customElements.define('site-menu', SiteMenu);
customElements.define('site-footer', SiteFooter);
}