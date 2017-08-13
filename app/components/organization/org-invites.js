import Ember from "ember";
import { task } from "ember-concurrency";
const { get, set, Component, computed, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  request: service(),
  flashMessages: service(),
  inviteModal: false,
  inviteEmail: null,
  inviteSortDesc: ["name:desc"],
  sortedInvites: computed.sort("invites", "inviteSortDesc"),
  revokeInvite: task(function*(invite) {
    let res = yield get(this, "request").post(`${invite.get("id")}/actions/`, {
      data: {
        actions: "revoke"
      }
    });

    invite.set("status", "revoked");
    get(this, "flashMessages").success(
      `Invite to ${invite.get("email")} is revoked.`
    );
  }),
  resendInvite: task(function*(invite) {
    let res = yield get(this, "request").post(`${invite.get("id")}/actions/`, {
      data: {
        actions: "resend"
      }
    });

    get(this, "flashMessages").success("Resent Invite");
  }).drop(),
  actions: {
    inviteUser() {
      let invite = get(this, "store").createRecord("invite", {
        email: get(this, "inviteEmail"),
        organization: get(this, "org")
      });
      invite
        .save()
        .then(() => {
          get(this, "flashMessages").success(
            `${get(this, "inviteEmail")} invited!`
          );
        })
        .catch(() => {
          get(this, "flashMessages").danger(
            "An error occurred. Please try again."
          );
        })
        .finally(() => {
          set(this, "inviteEmail", null);
          set(this, "inviteModal", false);
        });
    }
  }
});
