import Ember from "ember";
import TableCommon from "../../mixins/table-common";

const { computed, Component, get } = Ember;

export default Component.extend(TableCommon, {
  model: "wrappers",
  recordType: "wrapper",
  tableHeight: "100vh",
  pager: false,
  columns: computed(function() {
    let cols = [
      {
        label: "State ID",
        valuePath: "bill.stateId",
        sortable: true
      },
      {
        label: "Position",
        cellComponent: "wrappers/wrapper-table-position",
        sortable: true
      },
      {
        label: "Sponsor",
        valuePath: "bill.sponsor.fullName",
        sortable: true,
        breakpoints: ["desktop"]
      },
      {
        label: "Committee",
        valuePath: "bill.currentCommittee",
        sortable: true,
        breakpoints: ["tablet", "desktop"]
      },
      {
        label: "Last Action",
        valuePath: "bill.lastActionDate",
        cellComponent: "bills/bill-table-date",
        sortable: true,
        breakpoints: ["tablet", "desktop"]
      },
      {
        label: "Status",
        valuePath: "bill.status",
        cellComponent: "bills/bill-table-status",
        sortable: true,
        breakpoints: ["tablet", "desktop"]
      },
      {
        label: "More",
        cellComponent: "wrappers/wrapper-table-actions",
        sortable: false
      }
    ];

    if (get(this, "displayGroups")) {
      let group = {
        label: "Client",
        valuePath: "wrapper.group.title",
        sortable: true
      };
      cols.splice(2, 0, group);
    }

    return cols;
  })
});
