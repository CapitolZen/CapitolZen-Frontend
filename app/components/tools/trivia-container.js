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
  loadQuestions: task(function*() {
    try {
      let { data } = yield get(this, 'ajax').request('/trivia/');
      data.forEach(r => {
        let question = Question.create({
          question: r.question,
          category: r.category.title,
          value: r.value,
          answer: r.answer
        });
        get(this, 'questionStore').addObject(question);
      });
    } catch (err) {
      console.log(err);
      set(this, 'isError', true);
    }
  }).on('init'),
  availableQuestions: filterBy('questionStore', 'answered', false),
  currentQuestion: computed('availableQuestions.[]', function() {
    return get(this, 'availableQuestions.firstObject');
  }),
  actions: {
    checkAnswer() {
      let answer = get(this, 'userAnswer'),
        currentQuestion = get(this, 'currentQuestion');
      let rightAnswer = currentQuestion.get('answer');
      rightAnswer = rightAnswer.toLowerCase();

      let answerResponse = '';
      if (rightAnswer.includes(answer.toLowerCase())) {
        answerResponse = `Correct! ${currentQuestion.get('answer')}`;
        set(this, 'modalTitle', 'Correct Answer!');
      } else {
        answerResponse = `The right answer is: ${rightAnswer}`;
        set(this, 'modalTitle', 'Sorry, Incorrect.');
      }

      set(this, 'answerResponse', answerResponse);
      currentQuestion.set('answered', true);
      set(this, 'openAnswerModal', true);
    },
    closeModal() {
      set(this, 'userAnswer', null);
      set(this, 'openAnswerModal', false);
    }
  }
});
