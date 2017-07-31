import Ember from "ember";

const { inject: { service }, get, set, computed, RSVP, Service } = Ember;

export default Service.extend({
  ajax: service(),
  session: service(),
  store: service(),
  intercom: service(),
  user: null,
  organization: null,
  intercomUserProps: ["email", "user_id", "name"],
  intercomCompanyProps: ["company_id", "company_name"],
  email: computed("user.username", function() {
    return get(this, "user.username");
  }),

  user_id: computed("user.id", function() {
    return get(this, "user.id");
  }),

  name: computed("user.name", function() {
    return get(this, "user.name");
  }),

  company_name: computed("organization.name", function() {
    return get(this, "organization.name");
  }),

  company_id: computed("organization.id", function() {
    return get(this, "organization.id");
  }),

  intercomData: computed("user", "organization", function() {
    let user = this.getProperties(get(this, "intercomUserProps"));
    let company = this.getProperties(get(this, "intercomCompanyProps"));

    user.companies = [company];
    return user;
  }),

  load() {
    if (get(this, "session.isAuthenticated")) {
      return get(this, "store")
        .queryRecord("user", { currentUser: true })
        .then(user => {
          get(user, "organizations").then(orgs => {
            set(this, "user", user);
            set(this, "organization", orgs.get("firstObject"));
            get(this, "intercom").set("user", get(this, "intercomData"));
          });
        });
    } else {
      return RSVP.resolve();
    }
  }
});
