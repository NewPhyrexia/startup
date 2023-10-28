function login1() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "play.html";
}



function login() {

  const nameEl = document.querySelector("#name");

  let playerObject = {
      name: nameEl.value,
      lifetimeHighScore: 0
      };

    localStorage.setItem(nameEl.value, JSON.stringify(playerObject));
    // JSON.parse(localStorage.getItem('playerObject')));
}