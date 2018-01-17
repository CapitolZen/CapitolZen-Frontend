import Component from '@ember/component';
import EmberObject, { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { filterBy } from '@ember/object/computed';

const Question = EmberObject.extend({
  answered: false,
  questionType: 'Multiple',
  question: '',
  category: '',
  choices: [],
  answer: ''
});

export default Component.extend({
  ajax: service(),
  questionStore: A(),
  init() {
    this._super(...arguments);
    get(this, 'loadQuestions').perform();
  },
  loadQuestions: task(function*() {
    try {
      let results = yield get(this, 'ajax').request('/trivia/');
      results.forEach(r => {
        let question = Question.create({
          questionType: r.questionType,
          question: r.question,
          category: r.category,
          choices: r.choices,
          answer: r.answer
        });

        get(this, 'questionStore').addObject(question);
      });
    } catch (err) {
      console.log(err);
      set(this, 'isError', true);
    }
  }),
  availableQuestions: filterBy('questionStore', 'answered', false),
  currentQuestion: computed('availableQuestions.[]', function() {
    return get(this, 'availableQuestions').firstObject();
  })
});
