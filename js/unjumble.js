const pythonExercises = [
  {
    title: "If-Else Statement",
    code: [
      "x = 10",
      "if x > 5:",
      "&nbsp;&nbsp;&nbsp;&nbsp;print('x este mai mare decât 5')",
      "else:",
      "&nbsp;&nbsp;&nbsp;&nbsp;print('x este mai mic sau egal cu 5')",
    ],
  },
  {
    title: "For Loop",
    code: [
      "for i in range(1, 6):",
      "&nbsp;&nbsp;&nbsp;&nbsp;print(f'Număr: {i}')",
    ],
  },
  {
    title: "While Loop",
    code: [
      "n = 5",
      "while n > 0:",
      "&nbsp;&nbsp;&nbsp;&nbsp;print(n)",
      "&nbsp;&nbsp;&nbsp;&nbsp;n -= 1",
    ],
  },
  {
    title: "List Comprehension",
    code: ["numbers = [x for x in range(10) if x % 2 == 0]", "print(numbers)"],
  },
  {
    title: "Dictionar și Iterare",
    code: [
      "student = {'name': 'Alex', 'age': 20, 'grade': 9.5}",
      "for key, value in student.items():",
      "&nbsp;&nbsp;&nbsp;&nbsp;print(f'{key}: {value}')",
    ],
  },
  {
    title: "Funcție cu Parametri",
    code: [
      "def greet(name):",
      "&nbsp;&nbsp;&nbsp;&nbsp;print(f'Hello, {name}!')",
      "greet('Ana')",
    ],
  },
  {
    title: "Recursivitate - Factorial",
    code: [
      "def factorial(n):",
      "&nbsp;&nbsp;&nbsp;&nbsp;if n == 0:",
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 1",
      "&nbsp;&nbsp;&nbsp;&nbsp;return n * factorial(n - 1)",
      "print(factorial(5))",
    ],
  },
  {
    title: "Clasa și Obiecte",
    code: [
      "class Car:",
      "&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, brand, model):",
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.brand = brand",
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.model = model",
      "",
      "&nbsp;&nbsp;&nbsp;&nbsp;def info(self):",
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return f'Car: {self.brand} {self.model}'",
      "",
      "my_car = Car('Toyota', 'Corolla')",
      "print(my_car.info())",
    ],
  },
  {
    title: "Gestionarea Excepțiilor",
    code: [
      "try:",
      "&nbsp;&nbsp;&nbsp;&nbsp;num = int(input('Introdu un număr: '))",
      "&nbsp;&nbsp;&nbsp;&nbsp;print(f'Numărul este: {num}')",
      "except ValueError:",
      "&nbsp;&nbsp;&nbsp;&nbsp;print('Te rog introdu un număr valid!')",
    ],
  },
  {
    title: "Fișiere - Citire",
    code: [
      "with open('file.txt', 'r') as file:",
      "&nbsp;&nbsp;&nbsp;&nbsp;content = file.read()",
      "&nbsp;&nbsp;&nbsp;&nbsp;print(content)",
    ],
  },
  {
    title: "Fișiere - Scriere",
    code: [
      "with open('file.txt', 'w') as file:",
      "&nbsp;&nbsp;&nbsp;&nbsp;file.write('Salut, lume!')",
    ],
  },
];

// Funcție pentru a amesteca un array fără a modifica originalul
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const container = document.querySelector(".container");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("prev");

let currentExercise = 0;

// Funcție pentru a genera exercițiul în container
const renderExercise = () => {
  const { title, code } = pythonExercises[currentExercise];
  container.innerHTML = `<h3>${title}</h3>`;

  // Amestecăm liniile de cod
  shuffleArray(code).forEach((line) => {
    const element = document.createElement("div");
    element.className = "draggable";
    element.dataset.correctIndex =
      pythonExercises[currentExercise].code.indexOf(line);
    element.innerHTML = line;
    container.appendChild(element);
  });

  new Sortable(container, {
    animation: 150,
    onEnd: checkOrder,
  });
};

// Verifică dacă ordinea este corectă
const checkOrder = () => {
  const elements = [...container.children].slice(1); // Excludem titlul
  let allCorrect = elements.every(
    (el, index) => parseInt(el.dataset.correctIndex) === index
  );

  elements.forEach((el, index) => {
    el.style.backgroundColor = parseInt(el.dataset.correctIndex) === index ? "green" : "red";
  });

  if (allCorrect) {
    alert("Felicitări! Codul este corect!");
  }
};

// Navigare între exerciții
nextButton.addEventListener("click", () => {
  currentExercise = (currentExercise + 1) % pythonExercises.length;
  renderExercise();
});

previousButton.addEventListener("click", () => {
  currentExercise =
    (currentExercise - 1 + pythonExercises.length) % pythonExercises.length;
  renderExercise();
});

// Inițializare
renderExercise();

