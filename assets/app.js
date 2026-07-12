const essays = [
  {n:1,title:'The Structure Already at Work',file:'essay_01_the_structure_already_at_work.html',summary:'The unnoticed operation of completed intelligibility and the evidential role of the mathematical corpus.'},
  {n:2,title:'The Sentence as Completed Settlement',file:'essay_02_the_sentence_as_completed_settlement.html',summary:'The local X → movement → Y → orientation → survivor structure.'},
  {n:3,title:'The Fifty-Four Forms',file:'essay_03_the_fifty_four_forms.html',summary:'The 6 × 3 × 3 field, periodicity, pairwise discreteness, and finite local form.'},
  {n:4,title:'Recovering the Landing',file:'essay_04_recovering_the_landing.html',summary:'The multilingual recovery method, semantic exhaustion, and full-cell confirmation.'},
  {n:5,title:'Neighboring Sentences, Different Survivors',file:'essay_05_neighboring_sentences_different_survivors.html',summary:'Close contrasts that isolate changes in work, orientation, and survivor-mode.'},
  {n:6,title:'The Theorem as Traversal',file:'essay_06_the_theorem_as_traversal.html',summary:'How local settlements compose into proof and preserve results and paths.'},
  {n:7,title:'Eleven Movements of Mathematical Availability',file:'essay_07_eleven_movements_of_mathematical_availability.html',summary:'Carrier transformation and continuity across the derivation’s internal history.'},
  {n:8,title:'A Corpus Under Sustained Load',file:'essay_08_a_corpus_under_sustained_load.html',summary:'What 615 dependency-ordered theorems can reveal about stability and recurrence.'},
  {n:9,title:'From Mathematical Inheritance to Shared Reality',file:'essay_09_from_mathematical_inheritance_to_shared_reality.html',summary:'Law, science, education, archives, institutions, AI, and civilisation.'},
  {n:10,title:'When the Manifold Becomes Known',file:'essay_10_when_the_manifold_becomes_known.html',summary:'The historical meaning of explicit recognition and reflexive availability.'}
];

window.MCI_ESSAYS = essays;

const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const grid = document.querySelector('#essay-grid');
if (grid) {
  grid.innerHTML = essays.map(e => `
    <article class="essay-card">
      <span class="essay-number">Essay ${String(e.n).padStart(2,'0')}</span>
      <h3>${e.title}</h3>
      <p>${e.summary}</p>
      <a href="reader.html?chapter=${e.n}">Read essay ${e.n} →</a>
    </article>`).join('');
}