const essays = [
  {n:1,title:'The Structure Already at Work',file:'essay_01_the_structure_already_at_work.html',summary:'How a constitutive structure may operate through language and thought before becoming explicitly known.'},
  {n:2,title:'The Sentence as Completed Settlement',file:'essay_02_the_sentence_as_completed_settlement.html',summary:'What happens when a specific unsettled condition becomes a completed and inheritable landing.'},
  {n:3,title:'The Fifty-Four Forms',file:'essay_03_the_fifty_four_forms.html',summary:'The finite 6 × 3 × 3 manifold and the claim that its coordinates are pairwise discrete.'},
  {n:4,title:'Recovering the Landing',file:'essay_04_recovering_the_landing.html',summary:'A multilingual procedure for recovering X-pressure, answering movement, Y, orientation, and survivor.'},
  {n:5,title:'Neighboring Sentences, Different Survivors',file:'essay_05_neighboring_sentences_different_survivors.html',summary:'Close sentence contrasts that reveal changes in work, settlement, and survivor-mode.'},
  {n:6,title:'The Theorem as Traversal',file:'essay_06_the_theorem_as_traversal.html',summary:'How local settlements compose into proof and preserve both results and paths.'},
  {n:7,title:'Eleven Movements of Mathematical Availability',file:'essay_07_eleven_movements_of_mathematical_availability.html',summary:'The transformation of mathematical carriers across the internal history of the derivation.'},
  {n:8,title:'A Corpus Under Sustained Load',file:'essay_08_a_corpus_under_sustained_load.html',summary:'What 615 dependency-ordered theorems can reveal about recurrence, stability, and composition.'},
  {n:9,title:'From Mathematical Inheritance to Shared Reality',file:'essay_09_from_mathematical_inheritance_to_shared_reality.html',summary:'The extension from mathematical inheritance into law, science, institutions, archives, and civilisation.'},
  {n:10,title:'When the Manifold Becomes Known',file:'essay_10_when_the_manifold_becomes_known.html',summary:'The historical meaning of explicit recognition and the possibility of reflexive control.'}
];

window.MCI_ESSAYS = essays;

const essayList = document.querySelector('#essay-list');
if (essayList) {
  essayList.innerHTML = essays.map(essay => `
    <li>
      <a href="reader.html?chapter=${essay.n}">
        <span class="series-number">${String(essay.n).padStart(2, '0')}</span>
        <span class="series-entry">
          <strong>${essay.title}</strong>
          <small>${essay.summary}</small>
        </span>
      </a>
    </li>`).join('');
}
