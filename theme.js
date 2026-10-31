(function(){
  var d=document,h=d.documentElement,K='theme',mq=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)');
  function stored(){try{var v=localStorage.getItem(K);return v==='light'||v==='dark'?v:null}catch(e){return null}}
  function current(){return h.getAttribute('data-theme')||(mq&&mq.matches?'dark':'light')}
  function apply(t){
    h.setAttribute('data-theme',t);
    var bg=t==='dark'?'#0B0B0D':'#EEEEF1';
    [].forEach.call(d.querySelectorAll('meta[name="theme-color"]'),function(m,i){if(i)m.parentNode.removeChild(m);else{m.removeAttribute('media');m.setAttribute('content',bg)}});
    var cs=d.querySelector('meta[name="color-scheme"]');if(cs)cs.setAttribute('content',t);
  }
  var s=stored();if(s)apply(s);
  var SUN='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  function init(){
    var st=d.createElement('style');
    st.textContent='.theme-toggle{position:fixed;left:max(16px,env(safe-area-inset-left,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:150;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;padding:0;cursor:pointer;background:var(--card,#fff);color:var(--ink,#131316);border:1px solid var(--line,#D6D6DC);box-shadow:0 8px 24px -8px rgba(0,0,0,.25);transition:transform .2s}.theme-toggle:hover{transform:scale(1.07)}.theme-toggle:focus-visible{outline:2px solid #FFD21F;outline-offset:3px}@media print{.theme-toggle{display:none}}';
    d.head.appendChild(st);
    var b=d.createElement('button');b.type='button';b.className='theme-toggle';
    function paint(){var dark=current()==='dark';b.innerHTML=dark?SUN:MOON;b.setAttribute('aria-label',dark?'Включить светлую тему':'Включить тёмную тему');b.title=dark?'Светлая тема':'Тёмная тема'}
    b.addEventListener('click',function(){var t=current()==='dark'?'light':'dark';apply(t);try{localStorage.setItem(K,t)}catch(e){}paint()});
    paint();d.body.appendChild(b);
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
