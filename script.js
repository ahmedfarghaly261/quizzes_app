
// select elements 
let Counter = document.querySelector(".question_count span");
let question_content = document.querySelector(".question_content");
let answers_content = document.querySelector(".answers_content");
let submit_button = document.getElementById("butt");
let the_final_result = document.querySelector(".score span");

// setters
let currant_index = 0;
let rightAnswers = 0;

// response function
function gitQuiz() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let Q_object = JSON.parse(this.responseText);
            let Q_count = Q_object.length;

            Counter_Q(Q_count);
            add_data(Q_object[currant_index], Q_count);

            submit_button.onclick = () => {
                let right_answer = Q_object[currant_index].right_a;

                // console.log(right_answer)
                
                // check the selected answer
                check_answer(right_answer, Q_count);

                currant_index++;
                // console.log(currant_index)

                question_content.innerHTML = ``;
                answers_content.innerHTML = ``;

                if (currant_index < Q_count) {
                    add_data(Q_object[currant_index], Q_count);
                    handel_spans();
                }

                // show results
                show_results(Q_count);
            };
        }
    };
    myRequest.open("GET", "./Q_data.json", true);
    myRequest.send();
}
gitQuiz();

// function to count number of questions in json file
function Counter_Q(num) {
    Counter.innerHTML = num;
}

// function to add the question from json to DOM
function add_data(obj, count) {
    if (currant_index < count) {
        // block to add title area
        let question_title = document.createElement("h2");
        let question_text = document.createTextNode(obj.title);
        question_title.appendChild(question_text);
        question_content.appendChild(question_title);

        // block to add answers area
        for (let i = 1; i <= 4; i++) {
            let main_div = document.createElement("div");
            main_div.className = "answer";

            // radio
            let radio_input = document.createElement("input");
            radio_input.name = "question";
            radio_input.type = "radio";
            radio_input.id = `a_${i}`;
            radio_input.dataset.answer = obj[`a_${i}`];

            // label
            let answer_label = document.createElement("label");
            answer_label.htmlFor = `a_${i}`;
            let label_text = document.createTextNode(obj[`a_${i}`]);
            answer_label.appendChild(label_text);

            // append radio and label to main div
            main_div.appendChild(radio_input);
            main_div.appendChild(answer_label);

            // append child to selector
            answers_content.appendChild(main_div);
        }
    }
}

// check answers function
function check_answer(r_answer, Count) {
    let answers = document.getElementsByName("question");
    let user_choose;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            user_choose = answers[i].dataset.answer;
        }
    }

    if (user_choose === r_answer) {
        rightAnswers++;  
        
        console.log(rightAnswers)
        console.log("right chose")
    }else{
        console.log("bad")
    }
    // console.log(user_choose)
    // console.log(r_answer)
} 

// handel spans function
function handel_spans() {
    let spans = document.querySelectorAll(".left_questions span");
    let arr_spans = Array.from(spans);
    arr_spans.forEach((span, index) => {
        if (currant_index === index) {
            span.className = "current";
        }
    });
}

// show result function
function show_results(count) {
    let theResult;
    if (currant_index === count) {
        answers_content.remove();
        question_content.remove();
        submit_button.remove();

        if (rightAnswers > (count / 2) && rightAnswers < count) {
            theResult = `<h2 class="not_bad">Not Bad!</h2> You got ${rightAnswers} out of ${count}.`;
        } else if (rightAnswers === count) {
            theResult = `<h2 class="good">Excellent!</h2> You got all ${count} correct.`;
        } else {
            theResult = `<h2 class="bad">Better luck next time!</h2> You got only ${rightAnswers} out of ${count}.`;
        }
    console.log()
        // console.log(rightAnswers)

        the_final_result.innerHTML = theResult;
    }
}


