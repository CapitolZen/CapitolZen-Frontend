import Ember from "ember";

const StatusMap = {
  "referral-committee": "In Committee",
  "committee-passage": "Passed Committee",
  "executive-receipt": "On Gov's Desk",
  "reading-1": "First Reading",
  "reading-2": "Second Reading",
  "reading-3": "Third Reading",
  passed: "Signed Into Law",
  adopted: "Passed First Chamber"
};

export function billStatus(params /*, hash*/) {
  return StatusMap[params[0]];
}

export default Ember.Helper.helper(billStatus);
