import { route } from "./router";

route("/sucess", "sucess", function () {
  this.token = JSON.parse(localStorage.getItem("token"));
  if (localStorage.getItem("token") !== null) {
    this.text = `Witaj ${this.token.user}`;
    this.$on(".log-out", "click", () => {
      localStorage.removeItem("token");
      document.location = "/";
    });
  } else {
    this.text = "Brak autoryzacji";
  }
});

route("/", "home", function () {
  this.title = "Panel logowania";
  this.validationField = "";
  this.$on(".form", "submit", async (e) => {
    e.preventDefault();
    let login = document.getElementById("loginField").value;
    let password = document.getElementById("password").value;
    if (validation(login, password))
      await fetch("https://zwzt-zadanie.netlify.app/api/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.validationField = data.message;
            this.$refresh();
          }
          if (data.token) {
            localStorage.setItem(
              "token",
              JSON.stringify({ token: data.token, user: login })
            );
            document.location = "#/sucess";
          }
        });
  });
  const validation = (login, password) => {
    if (!login || !password) {
      this.validationField = "Pola nie mogą być puste !";
      this.$refresh();
      return false;
    } else return true;
  };
});

route("*", "404", function () {});
