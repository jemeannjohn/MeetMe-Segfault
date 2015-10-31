if (Questions.find().count() === 0) {
  var question1 = Questions.insert({
    title: 'Vote for the time time that suits you ?',
  });

  Answers.insert({
    question_id: question1,
    title: '9 AM',
    count: 0
  });

  Answers.insert({
    question_id: question1,
    title: '12:30 PM',
    count: 0
  });

  Answers.insert({
    question_id: question1,
    title: '2 PM',
    count: 0
  });

  Answers.insert({
    question_id: question1,
    title: '4 PM',
    count: 0
  });


}
