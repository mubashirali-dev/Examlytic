import { useState, useEffect } from "react";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const TakeExam = ({ exam, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    // Calculate Mock Score
    let calculatedScore = 0;
    exam.questionsList.forEach((q) => {
      if (answers[q.id] === q.correctOption) {
        calculatedScore += q.marks;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  // Mock Timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const currentQuestion = exam.questionsList[currentQuestionIndex];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Exam Submitted!
          </h2>
          <p className="text-gray-500">
            You have successfully completed the exam.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl inline-block w-full">
          <p className="text-sm text-gray-500 uppercase font-bold mb-1">
            Your Score
          </p>
          <p className="text-4xl font-bold text-[#0F6B75]">
            {score}{" "}
            <span className="text-lg text-gray-400 font-medium">
              / {exam.totalMarks}
            </span>
          </p>
        </div>

        <button
          onClick={onFinish}
          className="w-full bg-[#0F6B75] text-white py-3 rounded-lg font-bold hover:bg-[#0c565e] transition-colors"
        >
          Return to Class
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center mb-6 shadow-sm">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">{exam.title}</h2>
          <p className="text-sm text-gray-500">{exam.subject}</p>
        </div>
        <div
          className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg ${
            timeLeft < 300
              ? "bg-red-50 text-red-600"
              : "bg-teal-50 text-[#0F6B75]"
          }`}
        >
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Question Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                Question {currentQuestionIndex + 1} of{" "}
                {exam.questionsList.length}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {currentQuestion.marks} Marks
              </span>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.text}
            </h3>

            <div className="space-y-3 flex-1">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 group ${
                    answers[currentQuestion.id] === idx
                      ? "border-[#0F6B75] bg-teal-50 text-[#0F6B75]"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      answers[currentQuestion.id] === idx
                        ? "border-[#0F6B75] bg-[#0F6B75]"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {answers[currentQuestion.id] === idx && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() =>
                setCurrentQuestionIndex((curr) => Math.max(0, curr - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-white disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {currentQuestionIndex === exam.questionsList.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-[#0F6B75] hover:bg-[#0c565e] shadow-lg shadow-teal-700/20 transition-all hover:scale-105"
              >
                Submit Exam
                <CheckCircle size={20} />
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestionIndex((curr) =>
                    Math.min(exam.questionsList.length - 1, curr + 1),
                  )
                }
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#0F6B75] hover:bg-[#0c565e] shadow-lg shadow-teal-700/20 transition-all hover:scale-105"
              >
                Next Question
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Question Palette (Desktop) */}
        <div className="hidden lg:block w-72 bg-white p-6 rounded-2xl border border-gray-200 sticky top-4">
          <h3 className="font-bold text-gray-900 mb-4">Question Palette</h3>
          <div className="grid grid-cols-4 gap-2">
            {exam.questionsList.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  currentQuestionIndex === idx
                    ? "ring-2 ring-[#0F6B75] ring-offset-2 bg-[#0F6B75] text-white"
                    : answers[q.id] !== undefined
                      ? "bg-teal-100 text-teal-800"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#0F6B75]"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-teal-100"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-100"></div>
              <span>Not Answered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
