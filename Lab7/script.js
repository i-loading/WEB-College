function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const GUESSED_WORD = "Hello"; // Отгадываемое слово
const LETTER_CLASS_NAME = "letter"; // Класс для букв
const wordContainer = document.getElementById("word"); // <div id="word" class="word-container"></div>
const resultContainer = document.getElementById("result"); //  <div class="result" id="result"></div>

const startBtn = document.getElementById("start-game-btn"); // Кнопка для начала игры
const letterBtn = document.getElementById("letter-btn"); // Кнопка для отгадывания буквы
const newGameBtn = document.getElementById("new-game-btn"); // Кнопка для начала новой игры

// Вспомогательная функция которая создает элемент <p/>
// c указанным текстом и классом и возвращает этот элемент что бы мы его могли добавить в DOM
const createInfoText = (text, className) => {
  const element = document.createElement("p");
  element.classList.add(className);
  element.textContent = text;
  return element;
};

// Вспомогательная функция создает элемент <div/> с классом LETTER_CLASS_NAME
// и возвращает элемент что бы могли генерировать поля для слово динамически (например в цикле)
const createLetterBox = () => {
  const container = document.createElement("div");
  container.classList.add(LETTER_CLASS_NAME);
  return container;
};

function startGame() {
  // На каждой итерации цикла для каждой буквы генерируем поле
  for (let i = 0; i < GUESSED_WORD.length; i++) {
    wordContainer.appendChild(createLetterBox());
  }
  startBtn.style.display = "none"; // Скрытие кнопки начать игру
  letterBtn.style.display = "block"; // Показ кнопки угадать букву
}
startBtn.addEventListener("click", startGame);

let countGuessedWords = 0;
function guessLetter() {
  const word = prompt("Введите букву"); // Вводимая буква
  resultContainer.innerHTML = ""; // очищаем контейнер каждый раз перед тем как ввести новую букву
  if (word !== null) {
    // Логика реализации игры
    if (GUESSED_WORD[countGuessedWords].toLowerCase() === word.toLowerCase()) {
      // получаем все буквы по имени класс LETTER_CLASS_NAME и обращаемся по индексу
      const element = document.querySelectorAll(`.${LETTER_CLASS_NAME}`)[
        countGuessedWords
      ];
      element.classList.add("letter--guessed");
      element.textContent = GUESSED_WORD[countGuessedWords];
      countGuessedWords++;

      resultContainer.appendChild(
        createInfoText(
          `${this.players[this.randomPlayer].name}'s turn`,
          "current-player"
        )
      );
    } else {
      resultContainer.appendChild(
        createInfoText("You are wrong! ❌", "red-text")
      ); // Сообщение об ошибке, если буква не отгадана
      resultContainer.appendChild(
        createInfoText(
          `${this.players[this.nextPlayer()].name}'s turn`,
          "next-player"
        )
      );
    }
  }

  // Если кол-во отгаданных букв равно длине строки значит слово отгадано, следует вывести сообщение
  if (countGuessedWords === GUESSED_WORD.length) {
    resultContainer.innerHTML = "";
    resultContainer.appendChild(
      createInfoText(
        `${this.players[this.randomPlayer].name} wins!! 🎉 🎉 🎉 `,
        "win-text"
      )
    );
    newGameBtn.style.display = "block"; // Показ кнопки начала новой игры
    letterBtn.style.display = "none"; // Скрытие кнопки угадывания буквы
  }
}

// Перезагрузка страницы по нажатию на кнопку новой игры
newGameBtn.addEventListener("click", () => {
  window.location.reload();
});

class Player {
  constructor(name) {
    this.name = name;
  }
}

class Game {
  constructor(players) {
    this.players = players;
    this.randomPlayer = randomIntFromInterval(0, this.players.length - 1);

    this.nextPlayer = function () {
      if (this.randomPlayer < this.players.length - 1) return this.randomPlayer++;
      else return (this.randomPlayer = 0);
    };
  }

  playerCheck() {
    resultContainer.append(
      createInfoText(`${this.players[this.randomPlayer].name}'s turn`)
    );
  }
}

const playersArr = [new Player("John"), new Player("Ivan"), new Player("Lisa")];
const gameInit = new Game(playersArr);

startBtn.onclick = function () {
  gameInit.playerCheck();
};

letterBtn.addEventListener("click", guessLetter.bind(gameInit));

/*
  Задание 2
  Сделать таблицу умножения, используя DOM createElement и innerText
  Подсветить ячейку над которой находится курсор мыши
*/
const table = document.createElement("table");
for (let i = 0; i <= 9; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j <= 9; j++) {
    const col = document.createElement("td");
    let val = i * j;
    if (val === 0) {
      val = i || j;
      val = val ? val : "";
      col.classList.add("header");
    }
    col.innerHTML = val;
    row.appendChild(col);
  }
  table.appendChild(row);
}
document.getElementById("table_wrapper").appendChild(table);

const tds = table.querySelectorAll("td");
tds.forEach((td) => {
  td.addEventListener("mouseover", (e) => {
    td.style.cursor = "pointer";
    if (td.classList.contains("header")) td.style.background = "#ccf";
    else td.style.background = "yellow";
  });
  td.addEventListener("mouseout", (e) => {
    if (td.classList.contains("header")) td.style.background = "#ccf";
    else td.style.background = "none";
  });
});
