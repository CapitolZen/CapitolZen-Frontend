import Ember from 'ember';
const { Route } = Ember;
export default Route.extend({
  breadCrumb: {
    title: 'Bills',
    path: 'groups.group.bills'
  }
});
