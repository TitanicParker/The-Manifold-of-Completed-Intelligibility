const essays = [
  {n:1,part:'I',title:'The Structure Already at Work',file:'essay_01_the_structure_already_at_work.html',summary:'The unnoticed operation of completed intelligibility and the evidential role of the mathematical corpus.'},
  {n:2,part:'I',title:'The Sentence as Completed Settlement',file:'essay_02_the_sentence_as_completed_settlement.html',summary:'The local event through which an unsettled condition becomes a completed and inheritable landing.'},
  {n:3,part:'I',title:'The Fifty-Four Forms',file:'essay_03_the_fifty_four_forms.html',summary:'The finite 6 × 3 × 3 manifold, its periodic structure, and the claim of pairwise discreteness.'},
  {n:4,part:'II',title:'Recovering the Landing',file:'essay_04_recovering_the_landing.html',summary:'The multilingual recovery method, semantic exhaustion, and full-cell confirmation.'},
  {n:5,part:'II',title:'Neighboring Sentences, Different Survivors',file:'essay_05_neighboring_sentences_different_survivors.html',summary:'Close contrasts that isolate changes in work, settlement orientation, and survivor-mode.'},
  {n:6,part:'III',title:'The Theorem as Traversal',file:'essay_06_the_theorem_as_traversal.html',summary:'How local settlements compose into proof and preserve both results and paths.'},
  {n:7,part:'III',title:'Eleven Movements of Mathematical Availability',file:'essay_07_eleven_movements_of_mathematical_availability.html',summary:'Carrier transformation and continuity across the internal history of the derivation.'},
  {n:8,part:'III',title:'A Corpus Under Sustained Load',file:'essay_08_a_corpus_under_sustained_load.html',summary:'What 615 dependency-ordered theorems can reveal about stability, recurrence, and composition.'},
  {n:9,part:'IV',title:'From Mathematical Inheritance to Shared Reality',file:'essay_09_from_mathematical_inheritance_to_shared_reality.html',summary:'The extension from mathematical inheritance into law, science, education, institutions, and civilisation.'},
  {n:10,part:'IV',title:'When the Manifold Becomes Known',file:'essay_10_when_the_manifold_becomes_known.html',summary:'The historical meaning of explicit recognition and the possibility of reflexive control.'}
];

const parts = [
  {id:'I',label:'Part I',title:'Foundations',description:'What completed intelligibility is, how it operates, and why its local forms may be finite.'},
  {id:'II',label:'Part II',title:'Method and Discrimination',description:'How a coordinate is recovered and how neighboring landings are distinguished.'},
  {id:'III',label:'Part III',title:'Proof and Evidence',description:'How settlements compose into theorems, movements, and a dependency-ordered corpus.'},
  {id:'IV',label:'Part IV',title:'Shared Reality and Recognition',description:'How survivors become public, historical, institutional, and reflexively available.'}
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

const series = document.querySelector('#essay-series');
if (series) {
  series.innerHTML = parts.map(part => {
    const rows = essays.filter(essay => essay.part === part.id).map(essay => `
      <a class="essay-row" href="reader.html?chapter=${essay.n}">
        <span class="essay-index">${String(essay.n).padStart(2,'0')}</span>
        <span class="essay-copy">
          <strong>${essay.title}</strong>
          <small>${essay.summary}</small>
        </span>
        <span class="essay-arrow" aria-hidden="true">→</span>
      </a>`).join('');

    return `
      <section class="series-part" aria-labelledby="series-part-${part.id}">
        <header class="series-part-header">
          <p>${part.label}</p>
          <h3 id="series-part-${part.id}">${part.title}</h3>
          <span>${part.description}</span>
        </header>
        <div class="essay-list">${rows}</div>
      </section>`;
  }).join('');
}
