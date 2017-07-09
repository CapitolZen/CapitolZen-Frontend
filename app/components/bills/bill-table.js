import Ember from "ember";
import TableCommon from "../../mixins/table-common";

const { computed } = Ember;
export default Ember.Component.extend(TableCommon, {
  model: "bills",
  tableHeight: "100vh",
  pager: true,
  page: 0,
  init() {
    this._super(...arguments);
    this.send("setPage", 0);
  },
  columns: computed(function() {
    return [
      {
        label: "State ID",
        valuePath: "stateId",
        width: "100px",
        sortable: true
      },
      {
        label: "Sponsor",
        valuePath: "sponsor",
        sortable: true,
        breakpoints: ["desktop"]
      },
      {
        label: "Committee",
        valuePath: "currentCommittee",
        sortable: true,
        breakpoints: ["tablet", "desktop"]
      },
      {
        label: "Last Action",
        valuePath: "lastActionDate",
        cellComponent: "bills/bill-table-date",
        sortable: true,
        breakpoints: ["mobile", "tablet", "desktop"]
      },
      {
        label: "Status",
        valuePath: "status",
        cellComponent: "bills/bill-table-status",
        sortable: true,
        breakpoints: ["mobile", "tablet", "desktop"]
      },
      {
        label: "Actions",
        cellComponent: "bills/bill-table-actions",
        sortable: false
      }
    ];
  })
});
