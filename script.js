function switchTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  btn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function showType(id, btn) {
  document.querySelectorAll('.type-detail').forEach(t => t.classList.remove('show'));
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('sel'));
  document.getElementById('type-'+id).classList.add('show');
  btn.classList.add('sel');
}
const explanations = {
  q1: {correct:'b', text:'Friction at the die–workpiece interface opposes outward radial flow at the contact surfaces, causing the material at mid-height to bulge outward more than at the ends — creating the barrel shape.'},
  q2: {correct:'a', text:'Kf = 1 + (0.4μD/h) — this accounts for both friction (μ) and the D/h ratio. As D/h increases (workpiece gets wider and flatter), Kf increases and force rises substantially.'},
  q3: {correct:'c', text:'Flash is NOT simply waste — it RESTRICTS outward metal flow by creating high friction resistance in the thin gap, building internal pressure that forces the material into intricate die cavity details.'},
  q4: {correct:'c', text:'Hydraulic presses are "load limited" — they stop when the required load exceeds their capacity. Mechanical presses are stroke-limited; hammers and screw presses are energy-limited.'},
  q5: {correct:'d', text:'Kf = 10.0 for very complex shapes with flash. Simple shapes with flash: Kf = 6. Complex with flash: Kf = 8. This table is directly tested in exams.'},
  q6: {correct:'b', text:'In flashless forging, there is no overflow path. If the blank is too large, the dies/press experience excessive pressure and may be damaged. This is why precision volume control is essential.'},
  q7: {correct:'c', text:'L/D ratio must be < 3:1 to prevent buckling. With special dies (cavity diameter ≤ 1.5× bar diameter), higher ratios can be accommodated.'},
  q8: {correct:'b', text:'Since dies are at the same temperature as the workpiece, no heat transfers to the dies. The workpiece stays at uniform temperature → lower flow stress → lower forging load → better cavity filling → complex near-net-shape parts possible in one stroke.'},
  q9: {correct:'c', text:'True strain ε = ln(h₀/h). Since h < h₀ (compression), the ratio h₀/h > 1, so ε > 0 as expected. Maximum strain at final height h = hf.'},
  q10: {correct:'c', text:'Edging uses concave die surfaces to gather/concentrate metal into a localized region. Fullering uses convex surfaces to spread metal away. Cogging uses flat surfaces for sequential length reduction.'},
};
let answered = 0;
let correct = 0;
function checkQ(qname, answer, btn) {
  const info = explanations[qname];
  const selected = document.querySelector(`input[name="${qname}"]:checked`);
  const revealEl = document.getElementById('ans-'+qname);
  if (!selected) { revealEl.style.display='block'; revealEl.className='answer-reveal incorrect'; revealEl.textContent='Please select an answer first.'; return; }
  btn.disabled = true;
  document.querySelectorAll(`input[name="${qname}"]`).forEach(r => r.disabled = true);
  const isCorrect = selected.value === info.correct;
  revealEl.style.display = 'block';
  if (isCorrect) {
    revealEl.className = 'answer-reveal correct';
    revealEl.innerHTML = '✓ Correct! ' + info.text;
    correct++;
  } else {
    const correctLetter = info.correct.toUpperCase();
    revealEl.className = 'answer-reveal incorrect';
    revealEl.innerHTML = '✗ Incorrect. Correct answer: ' + correctLetter + '. ' + info.text;
  }
  answered++;
  if (answered === 10) {
    const sc = document.getElementById('score-display');
    sc.style.display = 'block';
    document.getElementById('score-num').textContent = correct + '/10';
    const msgs = ['Keep studying — review the formula sheet!', 'Good start — revise defects and equipment!', 'Not bad — focus on Kf values and press types!', 'Good work — review die design details!', 'Very good — nearly exam-ready!', 'Excellent! Outstanding result!'];
    document.getElementById('score-msg').textContent = msgs[Math.min(5, Math.floor(correct/2))];
  }
}
// Progress bar
window.addEventListener('scroll', () => {
  const el = document.documentElement;
  const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  document.getElementById('prog').style.width = pct + '%';
});