/* =====================================================================
   ★★★  EDIT YOUR INFORMATION HERE  ★★★
   Everything on the website comes from this CONFIG object.
   Only change the text inside the "quotes". Keep the commas and brackets.
   To add an item to a list, copy one { ... }, line and paste it below it.
   To remove an item, delete its whole { ... }, line.
   ===================================================================== */
const CONFIG = {
  name: "Alexa Faye G. Abad",
  tagline: "Aspiring Network Designer",
  age: "19",
  school: "Nueva Vizcaya State University",
  course: "Bachelor of Science in Information Technology",
  profilePicture: "54e23073-03a7-4300-9d89-db2b66cb186c.jpg",   // e.g. "me.jpg" (put the image in the same folder). Leave "" for a placeholder.

  // College achievements. Leave the last one as a template or delete it.
  achievements: [
    { title: "NCII Passer & Holder", org: "ICT batch 2023", text:" trains students to assemble, configure, maintain, and repair computer systems and networks"}
  ],

  // Education timeline. 'academic' items appear in the expandable area.
  education: [
    { level: "Elementary", schools: ["Bayombong Central School SPED Center"], academic: ["Honor Student"] },
    { level: "Junior High School", schools: ["Saint Mary's University", "Nueva Vizcaya General Comprehensive High School"], academic: ["Honor Student"] },
    { level: "Senior High School", schools: ["Nueva Vizcaya General Comprehensive High School"], academic: ["Honor Student & NCII Holder"] }
  ],

  // Skills: icon is a short symbol shown in the box. Replace or remove any.
  skills: [
    { name: "Network Design", icon: "NT" }, { name: "JavaScript", icon: "JS" },
    { name: "Java", icon: "Jv" }, { name: "C++", icon: "C+" },
    { name: "Git", icon: "git" }, { name: "[Add more]", icon: "+" }
  ],

  // Projects. Set github/demo to a real link (e.g. "https://github.com/you/repo") or "" to hide the button.
  projects: [
    { name: "Attendance", text: "Attendance monitoring system", tech: ["[Tech]", "[Tech]"], github: "", demo: "" },
  ],

  // Contact. 'link' is where the card goes when clicked ("" = does nothing yet).
  contact: [
    { label: "Email", value: "abadalexa86@gmail.com", link: "mailto:abadalexa86@gmail.com", icon:"E" },       // e.g. "mailto:you@example.com"
    { label: "GitHub", value: "Alexa Abad", link: "https://github.com/venn-motherboard", icon:"G"},
    { label: "Facebook", value: "Lexa Abad", link: "https://www.facebook.com/alexa.abad.7399/", icon:"F"}
  ]
};
/* ★★★  END OF EDIT AREA — you shouldn't need to change anything below  ★★★ */


/* ---------- tiny helpers ---------- */
const $ = id => document.getElementById(id);
// Escape text so special characters can't break the page
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- build the page from CONFIG ---------- */
const C = CONFIG;
document.title = C.name + " | Developer Portfolio";
$('hName').innerHTML = "Hi, I'm <em>" + esc(C.name) + "</em>";
$('hTag').textContent = C.tagline;
$('hCourse').textContent = C.course;
$('hSchool').textContent = C.school;
$('fName').textContent = C.name + " © 2026";
$('hAvatar').innerHTML = C.profilePicture
  ? '<img src="' + esc(C.profilePicture) + '" alt="Profile photo of ' + esc(C.name) + '">'
  : '<div class="ph" role="img" aria-label="Profile photo placeholder">👤</div>';

// Personal info cards
$('infoGrid').innerHTML = [
  ['👤', 'Name', C.name], ['🎂', 'Age', C.age], ['🏫', 'Currently Studying At', C.school], ['💻', 'Course', C.course]
].map(i => `<div class="card" tabindex="0"><span class="ico">${i[0]}</span><span class="lbl">${i[1]}</span><span class="val">${esc(i[2])}</span></div>`).join('');

// Achievements
$('achGrid').innerHTML = C.achievements.map(a => `
  <article class="card ach ${a.featured ? '' : 'empty'}" tabindex="0">
    ${a.featured ? '<span class="badge">★ LEADERSHIP</span>' : ''}
    <h3>${a.featured ? '<span class="ico">🏁</span> ' : ''}${esc(a.title)}</h3>
    <strong>${esc(a.org)}</strong><p>${esc(a.text)}</p>
  </article>`).join('');

// Education timeline with expandable academic achievements
$('timeline').innerHTML = C.education.map((e, i) => `
  <article class="node card">
    <span class="badge">${esc(e.level)}</span>
    <ul>${e.schools.map(s => `<li><strong style="color:#fff">${esc(s)}</strong></li>`).join('')}</ul>
    <button class="toggle" aria-expanded="false" aria-controls="ap${i}"><span class="arr">▸</span> Academic Achievements</button>
    <div class="panel" id="ap${i}"><div><ul>${e.academic.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div></div>
  </article>`).join('');
document.querySelectorAll('.toggle').forEach(b => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!open));
  $(b.getAttribute('aria-controls')).classList.toggle('open', !open);
}));

// Skills
$('skillGrid').innerHTML = C.skills.map(s => `<div class="card skill" tabindex="0"><span class="g">${esc(s.icon)}</span><span>${esc(s.name)}</span><span class="dot"></span></div>`).join('');

// Projects
$('projGrid').innerHTML = C.projects.map((p, i) => `
  <article class="card proj">
    <span class="num mono">PROJECT ${String(i + 1).padStart(2, '0')}</span>
    <h3>${esc(p.name)}</h3><p>${esc(p.text)}</p>
    <div class="tech">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
    ${p.github ? `<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
    ${p.demo ? `<a class="btn ghost" href="${esc(p.demo)}" target="_blank" rel="noopener">Live Demo</a>` : ''}
  </article>`).join('');

// Contact
$('contactGrid').innerHTML = C.contact.map(c => {
  const inner = `<div><span class="lbl" style="margin:0">${esc(c.label)}</span><span class="val">${esc(c.value)}</span></div><span class="arrow">→</span>`;
  return c.link ? `<a class="card" href="${esc(c.link)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="card" tabindex="0">${inner}</div>`;
}).join('');

/* ---------- intro control ---------- */
const intro = $('intro');
let introDone = false;
function endIntro() {
  if (introDone) return; introDone = true;
  intro.classList.add('done');
  setTimeout(() => intro.remove(), 600);
}
$('skip').addEventListener('click', endIntro);
setTimeout(endIntro, 3100);   // total intro length ≈ 3 seconds

/* ---------- scroll reveal + active nav link ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

const links = [...document.querySelectorAll('#navLinks a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('header[id],section[id]').forEach(s => spy.observe(s));
