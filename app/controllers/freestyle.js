import Ember from "ember";
import FreestyleController from "ember-freestyle/controllers/freestyle";

const { inject } = Ember;

export default FreestyleController.extend({
  emberFreestyle: inject.service(),

  colorPalette: {
    primary: {
      name: "green",
      base: "#009e83"
    },
    accent: {
      name: "navy",
      base: "#343239"
    },
    secondary: {
      name: "cz-grey",
      base: "#666564"
    },
    foreground: {
      name: "blackish",
      base: "#212121"
    },
    background: {
      name: "cz-white",
      base: "#FBF9FB"
    }
  }
});
