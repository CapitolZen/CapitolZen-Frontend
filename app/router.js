import Ember from "ember";
import config from "./config/environment";
import IntercomRoute from "ember-intercom-io/mixins/intercom-route";

const Router = Ember.Router.extend(IntercomRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce("afterRender", this, () => {
      const page = this.get("url");
      const title = this.getWithDefault("currentRouteName", "unknown");

      Ember.get(this, "metrics").trackPage({ page, title });
    });
  }
});

Router.map(function() {
  //
  // Anon Pages
  this.route("anon.login", { path: "login" });
  this.route("anon.register", { path: "register" });
  this.route("anon.forgot-password", { path: "forgot-password" });
  this.route("anon.reset-password", { path: "/reset/:hash" });

  this.route("app", { resetNamespace: true, path: "" }, function() {
    this.route("dashboard", { resetNamespace: true, path: "" });

    //
    // User Accounts
    this.route("user", { resetNamespace: true }, function() {
      this.route("edit");
    });

    //
    // Organization Management
    this.route("organization", { resetNamespace: true }, function() {
      this.route("team", { path: "/team" });
      this.route("billing", { path: "/billing" });
      this.route("edit", { path: "/:id" });
    });

    //
    // Bills
    this.route("bills", { resetNamespace: true }, function() {
      this.route("detail", { path: "/:id" });
      this.route("saved");
      this.route("add");
      this.route("search");
      this.route("comments", { path: "/:id/comments" });
      this.route("notes", { path: "/:id/notes" });
      this.route("share", { path: "/:id/share" });
      this.route("source", { path: "/:id/source" });
    });

    //
    // Groups
    this.route("groups", { resetNamespace: true, path: "clients" }, function() {
      this.route("detail", { path: "/:id" });
      this.route("edit", { path: "/:id/edit" });
      this.route("add");
      this.route("contacts", { path: "/:id/contacts" });
      this.route("bills", { path: "/:id/bills" });
      this.route("bill", { path: "/:id/bill" }, function() {
        this.route("detail", { path: "/:bill" });
      });
      this.route("message", { path: "/:id/message" });
      this.route("filters", { path: "/:id/filters" });
    });

    //
    // Reports
    this.route(
      "reports",
      { path: "/:group/reports", resetNamespace: true },
      function() {
        this.route("edit", { path: "/:report/edit" });
        this.route("add", { path: "/add" });
        this.route("detail", { path: "/:report" });
      }
    );

    this.route("legislators", { resetNamespace: true }, function() {
      this.route("detail", { path: "/:id" });
    });
  });

  //
  // Administration
  this.route("admin", function() {
    this.route("organizations", function() {
      this.route("detail");
    });

    this.route("users", function() {
      this.route("detail");
    });
  });
  this.route("freestyle");
});

export default Router;
