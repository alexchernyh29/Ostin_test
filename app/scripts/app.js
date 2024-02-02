import $ from "jquery";
import DATA from "./data";

let activeIndex = 0;
let correctAnswers = 0;

const { questions, results } = DATA;


$(() => {
	function showQuestion() {
		$(".test").attr("data-id", activeIndex);
		$(".test__item").each((id, item) => {
			$(item).attr("data-id", id);
			$(item)
				.find(".test__text")
				.html(questions[activeIndex].answers[id].text);
    });
	$(".test__counter span").html(activeIndex + 1);
	$(".test__title").html(questions[activeIndex].title);
}

	$(".test").on("click", ".test__item", function (e) {
		const id = $(e.target).closest(".test__item").data("id");
		const isRightAnswer = questions[activeIndex].answers[id].isRightAnswer;
		if (isRightAnswer) {
			correctAnswers++;
    	}
		activeIndex += 1;;
		if (activeIndex >= questions.length) {
			$(".result").addClass("is-active");
			$(".result__text").text("Вы правильно ответили на " + correctAnswers + " из " + questions.length + " вопросов");
			if (correctAnswers <= 4){
				$(".result__title").html(results[0].info);
				$(".result__img").html(`<img src="${results[0].image}" />`);
			} else {
				$(".result__title").html(results[1].info);
				$(".result__img").html(`<img src="${results[1].image}" />`);
			}
			$(".result__button").on("click", function () {
				$(".result").removeClass("is-active");
				resetQuiz();
			});
		}
		if (activeIndex >= questions.length) {
			activeIndex = 0;
		}
		showQuestion();
	});

	function resetQuiz() {
		activeIndex = 0;
		correctAnswers = 0;
		showQuestion();
	}

	showQuestion();
});
