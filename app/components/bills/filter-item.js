import Ember from "ember";

export default Ember.Component.extend({
  filterOptions: [
    {
      id: "last_action_date",
      name: "Date of Last Action",
      type: "date"
    },
    {
      id: "sponsor",
      name: "Sponsor",
      type: "text"
    },
    {
      id: "keyword",
      name: "Keyword",
      type: "text"
    }
  ]
});
