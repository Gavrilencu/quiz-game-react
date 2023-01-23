import "./index.scss";
import React from "react";
//an array of objects (questions)
const questions = [
  {
    title: "Cite zile are un an bisect ?",
    variants: ["364 zile", "365 zile", "366 zile"],
    correct: 2,
  },
  {
    title: "Cine a pictat renumitul tablou Mona Lisa ?",
    variants: ["Leonardo Da Vinci", "Pablo Picasso", "Michelangelo"],
    correct: 0,
  },
  {
    title: "Cine a scris Romeo si Julieta ?",
    variants: ["Sheakespeare", "Homer", "Herodot"],
    correct: 0,
  },
  {
    title: "In ce galaxie se afla planeta noastra ?",
    variants: ["Calea Lactee", "Andromeda", "Tera"],
    correct: 0,
  },
  {
    title: "Cite laturi are un hexagon? ",
    variants: [
      "4 laturi",
      "5 laturi",
      "6 laturi",
    ],
    correct: 2,
  },
  {
    title: "Citi ani a durat razboiul de o suta de ani ?",
    variants: [
      "100 ani",
      "94 ani",
      "116 ani",
    ],
    correct: 2,
  },
];
//result page
function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        Ati raspuns corect la: {correct} intrebari din: {questions.length}
      </h2>
      <a href="/">
        <button>Incearca din nou</button>
      </a>
    </div>
  );
}
//quiz page
function Game({ step, question, onClickVariant }) {
  const percentage = Math.round((step / questions.length) * 100);
  //{question} = params from <Game question={question} />
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map(
          (
            text,
            index //it's very important to declare keys for every map element
          ) => (
            <li onClick={() => onClickVariant(index)} key={text}>
              {/* console logs for example "0 1", which is question index + answer index   ---    question's index will be printed without the line above*/}
              {text}
            </li>
          )
        )}
      </ul>
    </>
  );
}

function App() {
  //declaring a state (We will declare Step today, meaning the index of our question.)
  const [step, setStep] = React.useState(0); // 0 = 1st question (index)
  const [correct, setCorrect] = React.useState(0); //checking if the answer you chose is right
  const question = questions[step];
  // console.log(question); //1-3 (current question) calculated by questions indexes
  //
  //
  // Let's create a function that will know when the answer is clicked
  const onClickVariant = (index) => {
    //index = any parameter
    console.log(step, index);
    setStep(step + 1); //now whenever i click on an answer, we will immediately move to the next question.

    if (index === question.correct) {
      setCorrect(correct + 1); //now lets "send" this info to Result page. (below)
    }
  }; //Now let's not forget to assign this function (to <Game> below). Then, once it assigned = we will be able to use it as a parameter/prompt value in our Game function.

  //
  return (
    <div className="App">
      {step != questions.length ? (
        <Game question={question} step={step} onClickVariant={onClickVariant} />
      ) : (
        <Result correct={correct} /> //now we ara able to set right answer props to the result page and get this info there.
        // ? = then, : = more like else, if 1st statement is not working anymore.
      )}
      {/* when we write question={question}, we give this component an access to specific func/array, but we have to set the params in the Game function and only then we will be able to use it. */}
      {/* <Result /> */}
    </div>
  );
}

export default App;
