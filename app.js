document.title = "Happy Birthday, " + NAME + "!";
document.getElementById("name").textContent = NAME;
document.getElementById("chartName").textContent = "Name: Michelle";

// days together
const d = Math.max(0, Math.floor((Date.now() - new Date(START_DATE)) / 864e5));
document.getElementById("days").textContent = d + " days together and counting";

// floating hearts / strawberries in hero
const hero = document.querySelector(".hero");
["💗","🍓","✨","🌸","💖","🍓","🎀","💗"].forEach((e,i)=>{
  const s = document.createElement("span");
  s.className = "float"; s.textContent = e; s.setAttribute("aria-hidden","true");
  s.style.cssText = `left:${8+i*12}%;bottom:-30px;animation-duration:${9+i%4*3}s;animation-delay:${i*1.3}s`;
  hero.appendChild(s);
});

// gallery
const dlg = document.getElementById("dlg");
const g = document.getElementById("gallery");
PHOTOS.forEach(p=>{
  const b = document.createElement("button");
  b.className = "polaroid";
  b.innerHTML = `<div class="ph">${p.emoji}<img src="${p.src}" alt="${p.cap}" loading="lazy" decoding="async" onerror="this.remove()"></div><div class="cap">${p.cap}</div>`;
  b.onclick = ()=>{
    document.getElementById("dlgPh").innerHTML = `${p.emoji}<img src="${p.src}" alt="${p.cap}" onerror="this.remove()">`;
    document.getElementById("dlgCap").textContent = p.cap;
    dlg.showModal();
  };
  g.appendChild(b);
});
document.getElementById("dlgClose").onclick = ()=>dlg.close();
dlg.addEventListener("click",e=>{ if(e.target===dlg) dlg.close(); });

// reason cards
const cards = document.getElementById("cards");
REASONS.forEach(r=>{
  const c = document.createElement("button");
  c.className = "flip"; c.setAttribute("aria-pressed","false");
  c.innerHTML = `<span class="f">💌</span><span class="k">${r}</span>`;
  c.onclick = ()=>c.setAttribute("aria-pressed", c.getAttribute("aria-pressed")==="true"?"false":"true");
  cards.appendChild(c);
});

// vitals bars fill when visible
const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  e.target.querySelectorAll("i").forEach(i=>i.style.width = i.dataset.v + "%");
  io.unobserve(e.target);
}),{threshold:.4});
io.observe(document.querySelector(".chart"));

// typewriter letter
let typed = false;
const box = document.getElementById("letterBox");
new IntersectionObserver((es,o)=>{
  if(!es[0].isIntersecting || typed) return;
  typed = true; o.disconnect();
  let i = 0;
  const cur=document.createElement("span");cur.className="cur";
  const sub=box.previousElementSibling;sub.textContent="tap the letter to read it all at once";
  let skip=false;box.addEventListener("click",()=>{skip=true});
  const done=()=>{box.textContent=LETTER;box.appendChild(cur);sub.innerHTML="&nbsp;";document.querySelector(".cake").classList.add("show")};
  (function t(){
    if(skip||i>=LETTER.length){done();return}
    const c=LETTER[i++];box.textContent=LETTER.slice(0,i);box.appendChild(cur);
    setTimeout(t,c==="\n"?320:".!?".includes(c)?420:c===","?200:38);
  })();
},{threshold:.5}).observe(box);

// confetti helper
function party(big){
  if(typeof confetti !== "function") return;
  confetti({zIndex:300,particleCount: big?160:90, spread: 80, origin:{y:.7}, colors:["#ff7eb6","#ffb3d3","#ffe3ee","#86bba5","#ffffff"]});
}

// open gift
document.getElementById("open").onclick = ()=>{
  party(false);
  document.getElementById("chart").scrollIntoView({behavior:"smooth"});
};

// candle
const candle = document.getElementById("candle");
candle.onclick = ()=>{
  if(candle.classList.contains("out")) return;
  candle.classList.add("out");
  document.getElementById("wishNote").textContent = "Your wish is on its way. Happy birthday!";
  party(true); setTimeout(()=>party(true), 400); setTimeout(finale,1500);
};

// ===== gift gate =====
const gate=document.getElementById("gate");
document.getElementById("gateName").textContent="For "+NAME;
document.getElementById("gift").onclick=()=>{
  gate.classList.add("go");
  setTimeout(()=>{document.body.classList.remove("locked");party(true);buddyOn()},450);
  setTimeout(()=>gate.remove(),1100);
};
// ===== Teitei companion =====
const bud=document.getElementById("buddy"),bb=document.getElementById("bud");
bud.insertAdjacentHTML("afterbegin",'<svg viewBox="0 0 120 120" aria-hidden="true">'+document.getElementById("tei").innerHTML+"</svg>");
const bs=bud.querySelector("svg");
bs.querySelectorAll('circle[r="4.5"],circle[r="1.6"]').forEach(e=>e.classList.add("eye"));
bs.querySelectorAll('ellipse[rx="20"],ellipse[rx="11"]').forEach(e=>e.classList.add("ear"));
const eyes=bs.querySelectorAll(".eye");
let bt=0,idle=0,ready=false,heroIn=true;
function budSay(m,ms){bb.textContent=m;bb.classList.add("on");clearTimeout(bt);bt=setTimeout(()=>bb.classList.remove("on"),ms||3500)}
function wake(){bud.classList.remove("zz");clearTimeout(idle);if(ready)idle=setTimeout(()=>{bud.classList.add("zz");budSay("zzz...",2500)},12000)}
function syncBuddy(){bud.classList.toggle("show",ready&&!heroIn)}
function buddyOn(){ready=true;wake();syncBuddy()}
new IntersectionObserver(es=>{heroIn=es[0].isIntersecting;hero.classList.toggle("paused",!heroIn);syncBuddy()},{threshold:.5}).observe(document.querySelector(".hero"));
let pmE=null,pmQ=false;addEventListener("pointermove",e=>{pmE=e;if(pmQ)return;pmQ=true;requestAnimationFrame(()=>{pmQ=false;wake();if(!ready||!bud.classList.contains("show"))return;const e=pmE,r=bs.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),m=Math.hypot(dx,dy)||1,k=Math.min(3,m/60);eyes.forEach(el=>el.style.translate=(dx/m*k)+"px "+(dy/m*k)+"px")})},{passive:true});
let wq=0;addEventListener("scroll",()=>{const n=Date.now();if(n-wq<250)return;wq=n;wake()},{passive:true});
const BL=["Hehe, that tickles!","I love you!","Hug me please","Happy birthday!","Rest well, nurse!","Baby elephant approved"];
bud.onclick=()=>{
  wake();budSay(BL[Math.random()*BL.length|0]);
  const r=bs.getBoundingClientRect();
  for(let i=0;i<6;i++){const h=document.createElement("span");h.className="hrt";h.textContent=["💗","💖","🍓"][i%3];h.style.left=(r.left+r.width/2)+"px";h.style.top=r.top+"px";h.style.setProperty("--dx",(Math.random()*120-60)+"px");h.style.animationDelay=i*70+"ms";document.body.appendChild(h);setTimeout(()=>h.remove(),1900)}
  bs.animate([{transform:"translateY(0)"},{transform:"translateY(-18px) scale(1.06)"},{transform:"translateY(0)"}],{duration:380});
};
const SAY={chart:"Vitals look perfect, nurse!",us:"Aww, look at us!",rx:"Doctor's orders. Follow them!",reasons:"Tap them all, okay?",openwhen:"Open the right one at the right time!",dance:"Dance with us!",letter:"Read it slowly, okay?"},said={};
const sIO=new IntersectionObserver(es=>es.forEach(e=>{
  const id=e.target.id;if(id==="game")bud.classList.toggle("away",e.isIntersecting);
  if(e.isIntersecting&&ready&&SAY[id]&&!said[id]){said[id]=1;budSay(SAY[id],4000)}
}),{threshold:.45});
["chart","us","rx","reasons","openwhen","game","dance","letter"].forEach(k=>sIO.observe(document.getElementById(k)));
// ===== scroll reveals + hero parallax =====
const rvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add("in");rvIO.unobserve(t);setTimeout(()=>t.style.transitionDelay="",1800)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll("section h2,section .sub,.chart,.gallery .polaroid,.rx,.cards .flip,.arena,.stage,.letter,.voice,.envs").forEach(el=>{el.classList.add("rv");rvIO.observe(el)});
document.querySelectorAll(".polaroid,.flip").forEach((el,i)=>el.style.transitionDelay=(i%6)*90+"ms");
const pines=document.querySelector(".pines"),fogs=document.querySelectorAll(".fog");let py=0,pq=false;
addEventListener("scroll",()=>{py=scrollY;if(pq)return;pq=true;requestAnimationFrame(()=>{pq=false;if(py>innerHeight*1.3)return;pines.style.translate="0 "+py*.12+"px";fogs.forEach((f,i)=>f.style.translate="0 "+py*(.25+i*.1)+"px")})},{passive:true});
// ===== birthday finale =====
const fin=document.getElementById("fin");let fw=0;
document.getElementById("finH").textContent="Happy birthday, "+NAME+"!";
function finale(){
  fin.classList.add("on");
  const c=["#ff7eb6","#ffb3d3","#ffe3ee","#86bba5","#fff3a0","#ffffff"];
  const shot=()=>confetti({zIndex:300,particleCount:70,spread:360,startVelocity:28,ticks:70,gravity:.7,scalar:1.1,origin:{x:.15+Math.random()*.7,y:.1+Math.random()*.4},colors:c});
  if(typeof confetti!=="function")return;
  shot();fw=setInterval(shot,520);setTimeout(()=>clearInterval(fw),9000);
}
function closeFin(){fin.classList.remove("on");clearInterval(fw)}
document.getElementById("finX").onclick=closeFin;
addEventListener("keydown",e=>{if(e.key==="Escape")closeFin()});
const store={get(){try{return JSON.parse(localStorage.getItem("bday")||"{}")}catch(e){return{}}},set(o){try{localStorage.setItem("bday",JSON.stringify(Object.assign(this.get(),o)))}catch(e){}}};
fin.querySelectorAll(".cpn").forEach((b,i)=>{
  const use=()=>{b.classList.add("used");b.textContent=b.dataset.msg||"✓ Redeemed, love!"};
  if((store.get().cpn||[]).includes(i))use();
  b.onclick=()=>{if(b.classList.contains("used"))return;use();store.set({cpn:(store.get().cpn||[]).concat(i)});party(false)};
});
// ===== private question gate =====
(function(){
  const inp=document.getElementById("lockIn"),msg=document.getElementById("lockMsg"),skip=document.getElementById("lockSkip");
  document.getElementById("lockQ").textContent=GATE_Q;
  if(!GATE_ON){gate.classList.remove("q");return}
  const MO=["january","february","march","april","may","june","july","august","september","october","november","december"];
  const [y,m,d]=START_DATE.split("-").map(Number),mo=MO[m-1],p2=n=>String(n).padStart(2,"0");
  const OK=[mo+d+y,mo.slice(0,3)+d+y,""+m+d+y,p2(m)+p2(d)+y,d+mo+y,d+mo.slice(0,3)+y,y+p2(m)+p2(d),""+d+m+y,p2(d)+p2(m)+y];
  let tries=0;
  const go=()=>{
    const v=inp.value.toLowerCase().replace(/[^a-z0-9]/g,"");
    if(OK.includes(v)){gate.classList.remove("q");party(false);return}
    tries++;inp.classList.remove("bad");void inp.offsetWidth;inp.classList.add("bad");
    msg.textContent=tries<2?"Hmm, not quite. Try again 💗":tries<4?"Hint: it was in "+mo[0].toUpperCase()+mo.slice(1)+" "+y:"Hint: it was on the "+d+"th. Think back 💗";
    if(tries>=5)skip.hidden=false;
  };
  document.getElementById("lockGo").onclick=go;
  inp.addEventListener("keydown",e=>{if(e.key==="Enter")go()});
  skip.onclick=()=>gate.classList.remove("q");
})();
// ===== open-when envelopes =====
(function(){
  const box=document.getElementById("envs"),seen=store.get().ow||[];
  ENVELOPES.forEach((e,i)=>{
    const b=document.createElement("button");b.className="env";b.setAttribute("aria-expanded","false");
    b.innerHTML='<b><span class="ic"></span><span class="tt"></span></b><span class="nt"><span></span></span>';
    b.querySelector(".ic").textContent=seen.includes(i)?"💌":"✉️";b.querySelector(".tt").textContent=e.t;b.querySelector(".nt span").textContent=e.n;
    b.onclick=()=>{
      const o=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",String(!o));
      if(!o){b.querySelector(".ic").textContent="💌";const ow=store.get().ow||[];if(!ow.includes(i)){store.set({ow:ow.concat(i)});party(false)}}
    };
    box.appendChild(b);
  });
})();
// ===== voice message =====
(function(){
  const voice=document.getElementById("voice");
  if(!(VOICE_FILE||/[?&]dev/.test(location.search)))return;
  voice.hidden=false;document.getElementById("voiceW").innerHTML="<i></i>".repeat(18);
  const va=VOICE_FILE?new Audio(VOICE_FILE):null,vb=document.getElementById("voiceBtn"),vt=document.getElementById("voiceT"),vp=document.getElementById("voiceP");
  let resume=false;const fmt=t=>Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0");
  vb.onclick=()=>{
    if(!va){vt.textContent="(preview) set VOICE_FILE to your recording";return}
    if(va.paused){resume=bgm.on();bgm.stop();va.play().catch(()=>{vt.textContent="Couldn't play the recording"})}else va.pause();
  };
  if(!va)return;
  va.onplay=()=>{voice.classList.add("on");vb.textContent="⏸"};
  const end=()=>{voice.classList.remove("on");vb.textContent="▶";if(resume){resume=false;bgm.start()}};
  va.onpause=end;va.onended=end;
  va.onloadedmetadata=()=>{vt.textContent="0:00 / "+fmt(va.duration)};
  va.ontimeupdate=()=>{vp.style.width=(va.currentTime/(va.duration||1)*100)+"%";vt.textContent=fmt(va.currentTime)+" / "+fmt(va.duration||0)};
})();

(()=>{
const byId=id=>document.getElementById(id);
// Teitei says hi
const lines=["Happy birthday!","Teitei loves you!","Hug me please","You're my favorite nurse!","Remember to rest, okay?","Baby elephant approved"];
let li=0;
byId("heroTei").onclick=function(){
  li=(li+1)%lines.length;
  const b=byId("bubble");b.textContent=lines[li];
  b.style.animation="none";void b.offsetWidth;b.style.animation="fade .4s forwards";
  this.classList.remove("hop");void this.offsetWidth;this.classList.add("hop");
};
byId("candle").addEventListener("click",()=>{document.querySelector(".tei-s").style.animation="hop .6s 2"});

// blow detection with the microphone
const micBtn=byId("micBtn"),note=byId("wishNote"),flame=document.querySelector("#candle .flame"),candle2=byId("candle"),meter=byId("meter");
candle2.addEventListener("click",()=>{micBtn.hidden=true;byId("tapHint").hidden=true;meter.hidden=true});
micBtn.onclick=async()=>{
  if(/FBAN|FBAV|Messenger|Instagram|Line\/|TikTok|Snapchat/i.test(navigator.userAgent)){note.textContent="This in-app browser blocks the mic. Open the link in Chrome or Safari, or tap the flame!";return}
  if(!window.isSecureContext||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){note.textContent="The mic only works on the https link of the site. Tap the flame for now!";return}
  const ctx=new (window.AudioContext||window.webkitAudioContext)(); // made inside the tap so iOS allows it
  try{await ctx.resume()}catch(e){}
  let stream;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}})}
  catch(e){note.textContent="Mic blocked ("+e.name+"). Allow the mic in your browser settings, or tap the flame!";return}
  try{await ctx.resume()}catch(e){}
  const an=ctx.createAnalyser();an.fftSize=1024;
  ctx.createMediaStreamSource(stream).connect(an);
  const buf=new Float32Array(an.fftSize);
  micBtn.hidden=true;meter.hidden=false;note.textContent="Make a wish, then blow on the bottom of your phone!";
  let ambient=0,n=0,loud=0,peak=0,t0=performance.now(),prev=t0;
  (function tick(){
    if(candle2.classList.contains("out")){stream.getTracks().forEach(t=>t.stop());ctx.close();return}
    an.getFloatTimeDomainData(buf);
    let sum=0;for(const v of buf)sum+=v*v;
    const rms=Math.sqrt(sum/buf.length),now=performance.now(),dt=now-prev;prev=now;
    peak=Math.max(peak,rms);
    if(n<20){ambient+=rms;n++;if(n===20)ambient=Math.min(ambient/20,.02)}
    else{
      const th=Math.max(.05,ambient*5); // lower .05 if blowing is missed, raise it if talking sets it off
      byId("meterBar").style.width=Math.min(100,rms/th*100)+"%";
      loud=rms>th?loud+dt:Math.max(0,loud-dt*2);
      flame.style.opacity=Math.max(.25,1-loud/600);
      if(loud>450){flame.style.opacity="";candle2.click();return}
      if(now-t0>6000&&peak<.004)note.textContent="I can't hear anything. Check your mic, or tap the flame!";
    }
    requestAnimationFrame(tick);
  })();
};

// ===== Roblox dancers + whole-site music =====
const BPM=SONG_BPM,BEAT=60/BPM,SD=BEAT/4;
const stage=document.querySelector(".stage"),beatBtn=byId("beatBtn"),fab=byId("musicFab");
stage.style.setProperty("--t",BEAT+"s");document.documentElement.style.setProperty("--b",BEAT+"s");
let ac=null,NB=null,tmr=null,auto=null,stp=0,nxt=0,playing=false,wantPlay=false,tt=0;
function say(m){const t=byId("toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),9000)}
const au=SONG_FILE?new Audio():null;
if(au){au.preload="none";au.src=SONG_FILE;addEventListener("load",()=>setTimeout(()=>{if(au.paused){au.preload="auto";au.load()}},1500))}
if(au){au.loop=true;au.onplay=()=>setPlaying(true);au.onpause=()=>{wantPlay=false;setPlaying(false)}}
// blocky Roblox-style avatars, modelled on your two characters
const OUTC="rgba(30,18,26,.6)";
const rR=(x,y,w,h,r,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OUTC}" stroke-width="2.5" stroke-linejoin="round"/>`;
const rP=(d,f)=>`<path d="${d}" fill="${f}" stroke="${OUTC}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
const rBow=(x,y,s)=>rP(`M${x-14*s} ${y-9*s}L${x} ${y}L${x-14*s} ${y+9*s}Z`,"#a9cfe8")+rP(`M${x+14*s} ${y-9*s}L${x} ${y}L${x+14*s} ${y+9*s}Z`,"#a9cfe8")+`<circle cx="${x}" cy="${y}" r="4.5" fill="#7fb4dc" stroke="${OUTC}" stroke-width="2"/>`;
function avatar(i,c){
const star=(x,y,s)=>`<path class="spk" d="M${x} ${y-s}L${x+s*.3} ${y-s*.3}L${x+s} ${y}L${x+s*.3} ${y+s*.3}L${x} ${y+s}L${x-s*.3} ${y+s*.3}L${x-s} ${y}L${x-s*.3} ${y-s*.3}Z" fill="#c4e4ff" stroke="#8fb8e6" stroke-width="1"/>`;
const arm=n=>{const k=n<0?"L":"R",x=120+n*60-16;return `<g class="arm${k}">${rR(x,100,32,44,10,c.sleeve)}<g class="fore${k}">${rR(x+1,138,30,30,9,c.sleeve)}${rR(x+1,162,30,17,7,c.hand)}</g></g>`};
const leg=n=>{const k=n<0?"L":"R",x=120+n*21-20;return `<g class="leg${k}">${rR(x,174,40,76,9,c.bottom)}${rR(x-1,236,42,17,7,c.shoe)}${rR(x-1,247,42,6,3,c.sole)}</g>`};
const face=`<g class="face"><ellipse cx="107" cy="66" rx="3.4" ry="5.2" fill="#1d1418"/><ellipse cx="133" cy="66" rx="3.4" ry="5.2" fill="#1d1418"/><path d="M106 79Q120 91 134 79" fill="none" stroke="#1d1418" stroke-width="3.4" stroke-linecap="round"/>${c.blush?`<ellipse cx="96" cy="77" rx="6" ry="4" fill="#ff9ab8" opacity=".55"/><ellipse cx="144" cy="77" rx="6" ry="4" fill="#ff9ab8" opacity=".55"/>`:""}</g>`;
return `<svg class="av" viewBox="-20 -34 280 320" aria-hidden="true"><defs><clipPath id="c${i}"><rect x="88" y="36" width="64" height="58" rx="24"/></clipPath></defs><ellipse cx="120" cy="268" rx="68" ry="8" fill="#5a2a3c" opacity=".2"/>${c.sparkle?`<g>${star(34,64,9)}${star(206,78,7)}${star(30,176,7)}${star(212,160,9)}${star(60,14,6)}</g>`:""}${leg(-1)}${leg(1)}<g class="sq"><g class="tor">${c.hairBack||""}${c.torso}${c.skirt||""}${arm(-1)}${arm(1)}<g class="head">${rR(88,36,64,58,24,c.skin)}${face}<image class="ph" x="88" y="36" width="64" height="58" preserveAspectRatio="xMidYMid slice" clip-path="url(#c${i})"/>${c.hairFront}${c.hat||""}</g></g></g></svg>`}
const HIM_C={skin:"#f2c9a4",hand:"#a9a9b0",sleeve:"#1d1d24",bottom:"#202028",shoe:"#17171d",sole:"#fff",
 torso:rR(78,100,84,78,10,"#2c6fd1")+`<circle cx="120" cy="138" r="9" fill="#1b4c9a"/>`+rR(78,100,25,78,9,"#1d1d24")+rR(137,100,25,78,9,"#1d1d24"),
 hairFront:rP("M85 68C78 36 98 20 121 20C146 20 163 38 155 68C151 54 145 47 136 45C128 52 108 50 98 52C92 54 87 60 85 68Z","#e3652b")+`<path d="M96 36C108 25 134 25 147 38M91 47C106 36 138 36 152 49" fill="none" stroke="#b9421a" stroke-width="3" stroke-linecap="round"/>`};
const HER_C={skin:"#f6f8fd",hand:"#f6f8fd",sleeve:"#ffffff",bottom:"#f6f8fd",shoe:"#ffffff",sole:"#a9cfe8",blush:1,sparkle:1,
 hairBack:rP("M84 52C68 104 70 170 86 202L154 202C170 170 172 104 156 52Z","#fafcff"),
 torso:rR(78,100,84,78,12,"#ffffff")+rP("M100 100L120 122L140 100Z","#a9cfe8")+rR(78,166,84,12,5,"#a9cfe8"),
 skirt:rP("M80 168L160 168L178 216Q120 232 62 216Z","#ffffff")+rP("M62 216Q120 232 178 216L174 205Q120 220 66 205Z","#a9cfe8"),
 hairFront:`<circle cx="93" cy="34" r="16" fill="#fafcff" stroke="${OUTC}" stroke-width="2.5"/><circle cx="147" cy="34" r="16" fill="#fafcff" stroke="${OUTC}" stroke-width="2.5"/>`+rP("M85 68C80 40 100 30 120 30C142 30 160 40 155 68C148 54 138 49 120 50C102 50 92 54 85 68Z","#fafcff")+`<path d="M104 40C110 46 116 47 122 44" fill="none" stroke="#cbd9ea" stroke-width="2.5" stroke-linecap="round"/>`+rBow(80,52,.8)+rBow(160,52,.8),
 hat:`<g transform="rotate(8 120 34)">${rP("M108 38L120 6L132 38Z","#ff7eb6")}<circle cx="120" cy="6" r="5" fill="#fff" stroke="${OUTC}" stroke-width="2"/></g>`};
byId("him").innerHTML=avatar("a",HIM_C)+"<figcaption>Me</figcaption>";
byId("her").innerHTML=avatar("b",HER_C)+"<figcaption>"+NAME+"</figcaption>";
if(DANCER_PHOTO){const hf=byId("him"),im=hf.querySelector(".ph"),fc=hf.querySelector(".face");im.setAttribute("href",DANCER_PHOTO);im.addEventListener("error",()=>{im.removeAttribute("href");fc.style.display=""});fc.style.display="none"}

function env(g,t,a,d,peak){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)}
function kick(t){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);env(g,t,.005,.38,1);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.45)}
function noise(t,dur,hp,peak){const s=ac.createBufferSource();s.buffer=NB;const f=ac.createBiquadFilter();f.type="highpass";f.frequency.value=hp;const g=ac.createGain();env(g,t,.002,dur,peak);s.connect(f).connect(g).connect(ac.destination);s.start(t);s.stop(t+dur+.05)}
function snare(t){noise(t,.16,1400,.5);const o=ac.createOscillator(),g=ac.createGain();o.type="triangle";o.frequency.value=185;env(g,t,.002,.1,.35);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.15)}
function bass(t,f,d){const o=ac.createOscillator(),g=ac.createGain(),l=ac.createBiquadFilter();o.type="sawtooth";o.frequency.value=f;l.type="lowpass";l.frequency.value=260;env(g,t,.01,d,.45);o.connect(l).connect(g).connect(ac.destination);o.start(t);o.stop(t+d+.05)}
function stab(t,fs){fs.forEach(f=>{const o=ac.createOscillator(),g=ac.createGain(),l=ac.createBiquadFilter();o.type="triangle";o.frequency.value=f;l.type="lowpass";l.frequency.value=1800;env(g,t,.005,.28,.09);o.connect(l).connect(g).connect(ac.destination);o.start(t);o.stop(t+.35)})}
const ROOT=[55,43.65,65.41,49],CH=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]]; // Am F C G
function play(s,t){
  const bar=(s>>4)&3,k=s&15;
  if(k===0||k===7||k===10)kick(t);
  if(k===4||k===12)snare(t);
  if(k%2===0)noise(k%4===2?t+SD*.25:t,k%4===2?.07:.035,7000,k%4===0?.18:.1); // swung hats
  if(k===0||k===6)bass(t,ROOT[bar],.26);
  if(k===10)bass(t,ROOT[bar]*1.5,.2);
  if(k===0||k===6)stab(t,CH[bar]);
  if(k%4===0)setTimeout(()=>stage.animate([{filter:"brightness(1.1)"},{filter:"brightness(1)"}],{duration:220}),Math.max(0,(t-ac.currentTime)*1000));
}
function sched(){while(nxt<ac.currentTime+.15){play(stp,nxt);nxt+=SD;stp=(stp+1)&63}}
async function musicOn(){ // built-in beat fallback
  ac=new (window.AudioContext||window.webkitAudioContext)();try{await ac.resume()}catch(e){}
  const b=ac.createBuffer(1,ac.sampleRate,ac.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;NB=b;
  stp=0;nxt=ac.currentTime+BEAT/2;tmr=setInterval(sched,25);setPlaying(true)}
function musicOff(){clearInterval(tmr);if(ac)ac.close();ac=null;setPlaying(false)}
function setPlaying(p){
  playing=p;document.body.classList.toggle("music",p);stage.classList.toggle("on",p);fab.setAttribute("aria-pressed",p);
  fab.textContent=p?"🎵 Music on":"🔇 Music off";beatBtn.textContent=p?"⏹ Stop music":"🎵 Play music";
  clearInterval(auto);
  if(p)byId("moveName").textContent="Dance party! 🎉";else byId("moveName").textContent="Press play to start the party 🎉"}
function startMusic(){
  if(playing||wantPlay)return;wantPlay=true;
  if(au){au.play().catch(e=>{if(e.name==="AbortError")return;wantPlay=false;say("Couldn't play the song. Check SONG_FILE in config.js.")});return}
  musicOn()}
function stopMusic(){wantPlay=false;if(au)au.pause();else if(ac)musicOff();setPlaying(false)}
function toggleMusic(){(playing||wantPlay)?stopMusic():startMusic()}
fab.onclick=beatBtn.onclick=toggleMusic;window.bgm={start:startMusic,stop:stopMusic,on:()=>playing||wantPlay};
byId("open").addEventListener("click",startMusic);byId("gift").addEventListener("click",startMusic);
// spawn yourself: selfie becomes your Roblox face
const camDlg=byId("camDlg"),vid=byId("camVid"),snapBtn=byId("snapBtn"),camMsg=byId("camMsg");
let cam=null;
function stopCam(){if(cam)cam.getTracks().forEach(t=>t.stop());cam=null;vid.srcObject=null}
camDlg.addEventListener("close",stopCam);
byId("camCancel").onclick=()=>camDlg.close();
async function openCam(){
  snapBtn.hidden=false;snapBtn.disabled=true;snapBtn.textContent="📸 Snap!";camMsg.textContent="Fill the square with your face, then smile!";camDlg.showModal();
  if(/FBAN|FBAV|Messenger|Instagram|Line\/|TikTok|Snapchat/i.test(navigator.userAgent)||!window.isSecureContext||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){snapBtn.hidden=true;camMsg.textContent="The camera needs an https link (or localhost), so it is off here. Tap “Use a photo” to take or pick one instead.";return}
  try{cam=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:720},height:{ideal:720}},audio:false});vid.srcObject=cam;await vid.play().catch(()=>{});snapBtn.disabled=false}
  catch(e){snapBtn.hidden=true;camMsg.textContent="Camera blocked ("+e.name+"). Allow it in your browser settings, or tap “Use a photo”."}}
function shot(src,w,h){const m=Math.min(w,h),c=document.createElement("canvas");c.width=c.height=320;c.getContext("2d").drawImage(src,(w-m)/2,(h-m)/2,m,m,0,0,320,320);spawn(c.toDataURL("image/jpeg",.88))}
function spawn(url){
  const h=byId("her");h.hidden=false;h.querySelector(".ph").setAttribute("href",url);h.querySelector(".face").style.display="none";
  h.classList.remove("spawn");void h.offsetWidth;h.classList.add("spawn");
  byId("spawnBtn").textContent="📸 Retake";party(true)}
snapBtn.onclick=async()=>{
  snapBtn.disabled=true;
  for(let n=3;n>0;n--){snapBtn.textContent=n;await new Promise(r=>setTimeout(r,800))}
  shot(vid,vid.videoWidth,vid.videoHeight);camDlg.close()};
byId("filePick").onclick=()=>byId("camFile").click();
byId("camFile").onchange=async e=>{
  const f=e.target.files[0];if(!f)return;let b;
  try{b=await createImageBitmap(f,{imageOrientation:"from-image"})}catch(_){b=await new Promise((r,j)=>{const i=new Image;i.onload=()=>r(i);i.onerror=j;i.src=URL.createObjectURL(f)})}
  shot(b,b.width||b.naturalWidth,b.height||b.naturalHeight);camDlg.close();e.target.value=""};
byId("spawnBtn").onclick=()=>{startMusic();openCam()};


// catch game
const arena=byId("arena"),cat=byId("catcher"),btn=byId("play"),sc=byId("score"),tm=byId("time"),res=byId("result");
const GOOD=["💗","🍓","💖"],BAD="🥦";
let x=.5,on=false,score=0,left=20,items=[],last=0,acc=0;
function setX(v){x=Math.min(1,Math.max(0,v));cat.style.left=x*100+"%"}
function move(e){const r=arena.getBoundingClientRect();setX((e.clientX-r.left)/r.width)}
arena.addEventListener("pointermove",move);
arena.addEventListener("pointerdown",move);
arena.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")setX(x-.07);if(e.key==="ArrowRight")setX(x+.07)});
function drop(){
  const bad=Math.random()<.2,el=document.createElement("span");
  el.className="it";el.textContent=bad?BAD:GOOD[Math.random()*3|0];
  const ix=.06+Math.random()*.88;el.style.left=ix*100+"%";
  arena.appendChild(el);
  items.push({el,ix,y:-40,v:120+Math.random()*90+(20-left)*5,bad});
}
function loop(t){
  if(!on)return;
  const dt=Math.min(.05,(t-last)/1000);last=t;left-=dt;acc+=dt;
  if(acc>.55){acc=0;drop()}
  const W=arena.clientWidth,H=arena.clientHeight;
  items=items.filter(o=>{
    o.y+=o.v*dt;o.el.style.transform=`translate(-50%,${o.y}px)`;
    if(o.y>H-90&&o.y<H-25&&Math.abs(o.ix-x)*W<48){
      score=Math.max(0,score+(o.bad?-2:1));sc.textContent=score;
      cat.classList.remove("hop");void cat.offsetWidth;cat.classList.add("hop");
      o.el.remove();return false;
    }
    if(o.y>H){o.el.remove();return false}
    return true;
  });
  tm.textContent=Math.max(0,Math.ceil(left));
  if(left<=0)return end();
  requestAnimationFrame(loop);
}
function end(){
  on=false;items.forEach(o=>o.el.remove());items=[];
  btn.hidden=false;btn.textContent="Play again";
  res.textContent=score>=15?`${score} caught! Teitei is so proud of you, ${NAME}.`:score>=8?`${score} caught! Teitei says one more round?`:`${score} caught. Teitei is cheering for you anyway!`;
  if(score>=15)party(true);
}
btn.onclick=()=>{
  items.forEach(o=>o.el.remove());items=[];
  score=0;left=20;acc=0;sc.textContent=0;tm.textContent=20;res.textContent="";
  btn.hidden=true;on=true;last=performance.now();requestAnimationFrame(loop);
};
})();
