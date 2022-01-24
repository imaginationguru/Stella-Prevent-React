import balanceIcon from '../../assets/images/balanceIcon.svg';
import expectIcon from '../../assets/images/expectIcon.svg';
import PiggyIcon from '../../assets/images/PiggyIcon.svg';
import flag from '../../assets/images/flag.svg';
import pen from '../../assets/images/pen.svg';
import starIcon from '../../assets/images/startIcon.svg';
import diversity from '../../assets/images/diversity.svg';
import thermometer from '../../assets/images/thermometer.svg';
import trophy from '../../assets/images/trophy.svg';
import squareCheck from '../../assets/images/squareCheck.svg';
import play from '../../assets/images/play.svg';
import bookIcon from '../../assets/images/bookIcon.svg';
import compass from '../../assets/images/compass.svg';
const dummyData = [
  {
    id: 1,
    template_id: '1',
    template_icon: null,
    template_title: 'Welcome',
    template_time: '1 minute',
    template_userName:
      'Hello Shailja! Welcome to the second module of Stella-Prevent !',
    template_description_one:
      'In this module we will talk about three themes :',
    template_description_third: 'What are thoughts;',
    template_description_four:
      'The power of negative thoughts and what to do to deal with them;',
    template_description_five: 'The consequences of self - criticism;',
    template_description_six:
      'Throughout the module, we will learn about some useful strategies for dealing with negative and self-critical thoughts that may arise at this stage of your life.',
    template_description_seven: "Let's Start ?",
  },
  // {
  //   _id: 2,
  //   template_id: '2',
  //   template_icon: flag,
  //   template_name: 'Theme 1',
  //   template_title: 'The Thoughts',
  //   template_time: '1 minute',
  //   template_greeting: null,
  //   template_description_one:
  //     'My Name is Sofia, I am Psychologist and I will accompany you throughout the modules of a Mom, offering you some exercises or reflection and summarise the most important messages in each module. ',
  //   template_description_two:
  //     'In addition to me , three mothers will share their experience with you on the different topics covered.',
  //   template_description_third:
  //     'Want to know we are going to talk about in the first module?',
  // },
  {
    _id: 2,
    template_id: '2',
    template_icon: expectIcon,
    template_name: 'Expectations and reality',
    template_title: 'Expectations and reality',
    template_time: '3 minute',
    template_greeting: null,
    template_description_one:
      'After the birth of your baby, how has the changes in the following areas of your life felt?',
    template_description_two:
      'The gray box correspond to the different areas of your life where you may have felt changes. Click on earth gray box and drag it to the colored box that best describe the changes you felt after your baby was born. At the end, click SAVE.',
  },
  {
    _id: 3,
    template_id: '3',
    template_icon: null,
    template_name: 'Theme 1',
    template_title: 'What are thoughts? ',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Is it normal to have “negative thoughts” at this stage in my life?',
    template_description_two:
      'The thoughts influence how we feel - can be our best allies or our worst enemies!',
    template_description_third:
      'What do we think about the situation?How do we interpret it?',
    template_description_four: 'How do we feel in the situation?',
  },
  {
    _id: 4,
    template_id: '4',
    template_icon: null,
    template_name: 'Theme 1',
    template_title: 'What are thoughts? ',
    template_time: '3 minutes',
    template_greeting: null,
    template_description_one:
      'Try to be attentive, in the next 2 minutes, to the different thoughts, images or even emotions that arise in your head, when you say a word. The word is: MILK .',
  },
  {
    _id: 5,
    template_id: '5',
    template_icon: null,
    template_name: 'Theme 1',
    template_title: 'What are thoughts? ',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Thoughts are "conversations that take place inside our head".',
  },
  {
    _id: 6,
    template_id: '6',
    template_icon: null,
    template_name: 'Theme 1',
    template_title: 'The experience of other mothers ',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'See what Inês and Clara want to share with you:',
    template_description_two:
      "Last night I was desperate for yet another of my son's crying attacks! It just crossed my mind that I was incompetent, because I couldn't even calm him down… I know that is not what I really want, but believe me that at one point I thought I shouldn't have gotten pregnant! I'm sure other mothers shouldn't think like that, I felt so bad!",
    template_description_third:
      "You can believe that very similar things have crossed my mind, especially when Maria had those horrible cramps and nothing calmed her down ... I remember perfectly well that I just thought I was completely useless as a mother. I thought I couldn't go on like this, I had to do something; I went to my health center and talked to the nurse about colic. It is not that I have completely resolved the situation, but she gave me some tips and above all it made me feel that I was not the only one going through this!The thoughts may arise in our minds , even if, as told Agnes , are not our true opinion about a subject and do not help us deal with the situation. These thoughts are called negative thoughts.",
    template_description_four: 'How do we feel in the situation?',
  },
  {
    _id: 7,
    template_id: '7',
    template_icon: null,
    template_name: 'Theme 1',
    template_title: 'Useful thoughts vs. negative thoughts',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'See the differences between thoughts that are useful for our day-to-day and negative or useless thoughts .',
  },
  {
    _id: 8,
    template_id: '8',
    template_icon: pen,
    template_name: 'Theme 1',
    template_title: 'Useful thoughts vs. negative thoughts',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'It is important to note your thoughts in different situations and, for that, you can record them in a diary: the Diary of Thoughts.',
    template_description_two:
      'Think of a situation in the past few weeks when you have felt most sad, angry or anxious and fill in the different fields in the table below.',
    template_description_third:
      'After completing the table, answer each question by clicking on one of the two icons on the right . If your answer is YES click on      , if your answer is NO click on      . At the end, click SAVE.',
  },
  {
    _id: 9,
    template_id: '9',
    template_icon: starIcon,
    template_name: 'Stella-Prevent',
    template_title: 'Myths about motherhood',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Have I let bi self be influenced by the "perfect mother" myths?',
    template_description_two:
      'After reading each question, click on one of the two icons on the right. If your answer is yes click on  + . If your answer is no click on x . At the end, click SAVE.',
  },
  // {
  //   _id: 9,
  //   template_id: '9',
  //   template_icon: null,
  //   template_name: 'Theme 1',
  //   template_title: 'Important',
  //   template_time: '1 minute',
  //   template_greeting: null,
  //   template_description_one:
  //     'It is normal to have negative thoughts at all stages of life.',
  //   template_description_two:
  //     'Your head is always thinking automatically: some thoughts are useful for you, but even without realizing it, it is possible that some negative thoughts may also arise , related to your experience of motherhood or other everyday situations -day.',
  //   template_description_third:
  //     "We usually pay more attention to thoughts that refer to topics that are more important to us , or that are more frequent - so when negative thoughts about motherhood are noticed, some women may feel worried and guilty because they think they shouldn't think like that",
  //   template_description_four:
  //     "It is important to realize that most of your negative thoughts arise automatically in your head - you don't choose to think that way!",
  // },
  // {
  //   _id: 10,
  //   template_id: '10',
  //   template_icon: null,
  //   template_name: 'Theme 1',
  //   template_title: 'Strategies',
  //   template_time: '1 minute',
  //   template_greeting: null,
  //   template_description_one:
  //     'Try to notice your thoughts and distinguish useful thoughts from thoughts that are negative or useless .',
  //   template_description_two:
  //     'Your head is always thinking automatically: some thoughts are useful for you, but even without realizing it, it is possible that some negative thoughts may also arise , related to your experience of motherhood or other everyday situations -day.',
  //   template_description_third:
  //     "We usually pay more attention to thoughts that refer to topics that are more important to us , or that are more frequent - so when negative thoughts about motherhood are noticed, some women may feel worried and guilty because they think they shouldn't think like that",
  //   template_description_four:
  //     "It is important to realize that most of your negative thoughts arise automatically in your head - you don't choose to think that way!",
  // },
  {
    _id: 10,
    template_id: '10',
    template_icon: diversity,
    template_name: 'Theme 3',
    template_title: 'Emotional diversity',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'What emotions have I felt?',
    template_description_two:
      'In the box below, click on all the emotions you imagined you would feel after your baby arrived. The selected emotions will turn green. When you have selected all that apply, click NEXT STEP. Then click on the emotions you usually feel after your baby is born. The selected emotions will turn yellow. Click COMPARE to see your answers. At the end, click SAVE.',
    template_description_third:
      'During pregnancy, how did you imaging you feel after your baby arrived?',
    template_description_fourth: '(select the emotions that apply)',
  },
  {
    _id: 11,
    template_id: '11',
    template_icon: flag,
    template_name: 'Theme 2',
    template_title: 'The Power Thoughts',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'It is normal to have negative thoughts at all stages of life.',
    template_description_two:
      'Your head is always thinking automatically: some thoughts are useful for you, but even without realizing it, it is possible that some negative thoughts may also arise , related to your experience of motherhood or other everyday situations -day.',
    template_description_third:
      "We usually pay more attention to thoughts that refer to topics that are more important to us , or that are more frequent - so when negative thoughts about motherhood are noticed, some women may feel worried and guilty because they think they shouldn't think like that",
    template_description_four:
      "It is important to realize that most of your negative thoughts arise automatically in your head - you don't choose to think that way!",
  },
  {
    _id: 12,
    template_id: '12',
    template_icon: squareCheck,
    template_name: 'Theme 2',
    template_title: 'Thoughts vs. reality',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Why are my thoughts so powerful?',
    template_description_two:
      'For each sentence, click on the rectangle that best describes your opinion. You can only choose one option for each sentence. At the end, click SAVE.',
  },
  {
    _id: 13,
    template_id: '13',
    template_icon: null,
    template_name: 'Theme 2',
    template_title: 'The experience of other mothers',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one:
      'Our thoughts have a lot of power because we believe they are the reality!',
    template_description_two: 'See the example of Isabel :',
    template_description_third:
      'Yesterday I was with my daughters at the shopping center and, suddenly, I felt a great anxiety, with nothing special having happened. I remember it crossed my mind: “So many people are here, if something bad happens I will not be able to get out of here with the girls…, we will not be able to escape and we still die here”! I was in a panic just thinking that something bad could happen to my daughters, is a thought that scares me a lot ...',
  },
  {
    _id: 14,
    template_id: '14',
    template_icon: pen,
    template_name: 'Theme 2',
    template_title: 'Thoughts vs. reality',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one:
      'Think about your everyday situations, which sometimes make you feel sad, angry or anxious. Has it ever happened to you, like Isabel, to believe “blindly” in the story that your head was telling you about a given situation, preventing you from seeing the facts of the real situation ?',
    template_description_two:
      'If you wish, describe some situations in your day-to-day, in which this happened.',
  },
  {
    _id: 15,
    template_id: '15',
    template_icon: null,
    template_name: 'Theme 2',
    template_title: 'Thoughts vs. reality',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_two:
      'It is very important to realize that these thoughts do not define you or define how much you like your baby ; they are just thoughts produced by our head, which may or may not be true!',
  },
  {
    _id: 16,
    template_id: '16',
    template_icon: play,
    template_name: 'Theme 2',
    template_title: 'Control thoughts',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one:
      'If you feel guilty about having negative thoughts at this stage in your life, you may try to control them .',
    template_description_two:
      'In this exercise I asked you not to think about the image of a yellow car with white spots.',
    template_description_third:
      'During the two minutes, did you manage to avoid that thought?',
    template_description_fourth:
      'Has it ever happened to you, in other situations, to have a negative thought and try not to think about it? How did it work?',
    template_description_five:
      'Remember: when you try not to have a given thought (for example, "my son is not going to fall asleep again tonight"), you are implicitly thinking "I cannot think that my son is not going to fall asleep again tonight" - you are thinking about the very thought you want to avoid and increasing its intensity!',
  },
  {
    _id: 17,
    template_id: '17',
    template_icon: null,
    template_name: 'Theme 2',
    template_title: 'Control thoughts',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: '',
    template_description_two:
      'Even if you can stop thinking about a thought for a period of time , at some point it will occur again and, in some cases, even more intensely!',
  },
  {
    _id: 18,
    template_id: '18',
    template_icon: null,
    template_name: 'Theme 2',
    template_title: 'Important!',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: 'Thoughts are not facts.',
    template_description_two:
      "Thinking is not the same as doing (it's not because I have the thought “today I wouldn't want to be trying to put my son to sleep” that I don't actually do it) and Thinking is not the same as happening (it's not because I have the thought that “My son will get sick” that he will actually get sick). Our thoughts gain even more power when we try to control them.",
    template_description_third:
      'In order for negative thoughts to lose strength, it is important to question them and stop trying to control them , and it is precisely how to do this that we will talk about next.',
    template_description_fourth: 'Do we continue?',
  },
  {
    _id: 19,
    template_id: '19',
    template_icon: null,
    template_name: 'Theme 2',
    template_title: 'Strategies',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: 'Question your thoughts! ',
    template_description_two:
      'My thoughts are not absolute truths! How do I question my thoughts?',
    template_description_third:
      'My thoughts are not absolute truths! How do I question my thoughts?',
    template_description_fourth: '(select the emotions that apply)',
    firstImgTitle: ' Is this thought being useful to me?',
    secondImgTitle:
      'Is there any other way for me to interpret this situation?',
    thirdImgTitle:
      'Another person, in the same situation ... what interpretation could he have?',
    fourthImgTitle:
      'What would I say to a friend, who in the same situation, thought the same thing as I thought?',
    centerText: '',
  },
  {
    _id: 20,
    template_id: '20',
    template_icon: bookIcon,
    template_name: 'Theme 1',
    template_title: 'Strategies',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'See how Isabel filled out her Diary of Thoughts about the situation we shared with you recently. Help her find alternative interpretations for the situation.',
    template_description_two:
      ' Isabel started filling in the Alternative Interpretations field in her diary. Help her complete this field and fill in the Alternative Behaviors field . At the end, click SAVE.',
  },
  {
    _id: 21,
    template_id: '21',
    template_icon: bookIcon,
    template_name: 'Theme 1',
    template_title: 'Diary of Thoughts',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Start using your Thoughts Diary to get to know your negative thoughts and to question them , contradicting the idea that they are absolute truths.',
    template_description_two:
      'Think of a situation in which you felt negative emotions (sadness, anxiety, guilt, anger) and describe it, filling in all the fields in the diary. Question your thoughts by filling in the Alternative Interpretations and Alternative Behaviors fields . At the end, click SAVE. Whenever you add a situation to your Diary, it will be recorded in the Exercises & Readings section .',
  },
  {
    _id: 22,
    template_id: '22',
    template_icon: play,
    template_name: 'Theme 3',
    template_title: 'Strategies',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: "Don't get confused with your thoughts!",
    template_description_third:
      'A thought is just a thought. If it’s useful, we’ll listen to you. If it is not useful , we do not have to control it: we are going to let it go through our head, without listening to it !',
    template_description_fourth:
      'Listen to the following exercise, which can help you to practice observing and detaching your thoughts . You can put it into practice whenever you want!',
  },
  {
    _id: 23,
    template_id: '23',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'Strategies',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Try to distance yourself from your thoughts, identifying them as what they really are: THOUGHTS about a situation, not facts.',
    template_description_third:
      'When a negative thought arises, say to yourself, out loud: "I notice that I am thinking that ..." . For example, if your negative thought is "I do not do anything well", say to yourself, out loud, I notice that I am thinking that I do not do anything well. See how you feel afterwards.',
    template_description_fourth:
      'Try to start putting this strategy into practice when you notice some useless or negative thoughts.',
  },
  // {
  //   _id: 24,
  //   template_id: '24',
  //   template_icon: flag,
  //   template_name: 'Theme 3',
  //   template_title: 'Self-criticism',
  //   template_time: '1 minute',
  //   template_greeting: null,
  //   template_description_one:
  //     'Start using your Thoughts Diary to get to know your negative thoughts and to question them , contradicting the idea that they are absolute truths.',
  //   template_description_two:
  //     'Think of a situation in which you felt negative emotions (sadness, anxiety, guilt, anger) and describe it, filling in all the fields in the diary. Question your thoughts by filling in the Alternative Interpretations and Alternative Behaviors fields . At the end, click SAVE. Whenever you add a situation to your Diary, it will be recorded in the Exercises & Readings section .',
  // },
  {
    _id: 24,
    template_id: '24',
    template_icon: squareCheck,
    template_name: 'Theme 1',
    template_title: 'What makes us act?',
    template_time: '3 minutes',
    template_greeting: null,
    template_description_one:
      'How do I deal with unpleasant thoughts and emotions?',
    template_description_two:
      'For each sentence, click on the rectangle that best describes your opinion. You can only choose one option for each sentence. At the end, click SAVE.',
  },
  {
    _id: 25,
    template_id: '25',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'What is self-criticism?',
    template_time: '1 minute',
    template_greeting: null,
    template_description_two:
      'Now that you know the way the mind works a little better, it is not difficult to realize that it is constantly evaluating everything and everyone, including itself: many of the thoughts that cross our minds concern judgments or criticisms about the way we do things - we are very critical of ourselves and we usually call that self- criticism .',
    template_description_third:
      'Yesterday I was giving João a bottle and had left rice to make, in the kitchen… he was restless and didn’t suck afterwards, then with the cramps he started to cry and I never remembered the rice again… I burned everything… That voice that is in my head, she immediately started saying to me "You are useless ...", "You can not handle anything ...", "You were not made to be a mother ..."',
    template_description_one: 'Why are we so critical of us?',
  },
  {
    _id: 26,
    template_id: '26',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'What is self-criticism?',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Does self-criticism help us?',
    template_description_two:
      'Try to think of a time when you felt sad, guilty or frustrated with yourself for not doing something:',
    template_description_third:
      'Try to notice what you said to yourself in this situation. What words did you use? What was the tone of your voice - cold, angry, harsh ...?',
    template_description_fourth:
      'Now, try to think about how that self-critical voice made you feel. What emotions did you feel? What did you feel in your body? Did that voice help and encourage you to achieve what you wanted? Did that voice make you a better person?',
    template_description_five:
      'Remember: Although it is important to analyze and try to improve what does not seem so good, contrary to what we think, our self-critical voice can make us feel small, unmotivated and frustrated , moving away from our goals and making us give up trying again.',
  },
  {
    _id: 27,
    template_id: '27',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'What is self-criticism?',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Is there an alternative to self-criticism?',
    template_description_third:
      'Try to think of the teacher you would like your child to have when learning a new topic at school. Would you prefer that he had a critical teacher or a wise and kind teacher (who was firm but moved by a sincere desire to help his son grow and develop)? Which teacher would you think would most help you achieve your goals? Remember: We are all human and it is normal for us to not always be able to handle all tasks, at least at the same time or on the same day. If this happens to you, instead of your self-critical voice, try to listen to a wiser and kinder voice that will help you improve .',
  },
  // {
  //   _id: 28,
  //   template_id: '28',
  //   template_icon: null,
  //   template_name: 'Theme 3',
  //   template_title: 'Important!',
  //   template_time: '1 minute',
  //   template_greeting: null,
  //   template_description_one:
  //     'We are usually much more critical of ourselves than of others!',
  //   template_description_two:
  //     'It is important to recognize that sometimes it is precisely this self-critical stance that prevents you from doing things better.',
  //   template_description_third:
  //     'So it can be helpful to adopt a more kind posture with yourself , as you will see below.',
  // },
  {
    _id: 28,
    template_id: '28',
    template_icon: compass,
    template_name: 'Strategies',
    template_title: 'Strategies',
    template_time: '1 minute',
    template_greeting: null,
    //template_description_one: 'Identify what is really important to you!',
    template_description_one:
      'Think a little about what it means to you to be a mother. What are the values ​​that are important to you in this area of ​​your life?',
    template_description_two:
      'Try to complete the following fields with your Values in relation to parenting (for example: “ my child can trust me ”) and the Behaviors you may have to act according to what is important to you (the values ). There are no right or wrong answers - they are your answers. At the end, click SAVE.',
    template_description_four:
      "It is important to realize that most of your negative thoughts arise automatically in your head - you don't choose to think that way!",
  },
  {
    _id: 29,
    template_id: '29',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'Strategies',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Try to have a kinder posture with you!',
    template_description_two:
      'Having a kinder posture towards you does not mean being “friendly”, but having a posture that helps you to improve and grow , accepting that circumstances are sometimes difficult.',
    template_description_third:
      'Try to remember the last time you comforted a close friend who had a hard time. Do you remember what I told you? What words did you use? What was the tone of your voice? What was your body posture?',
    template_description_fourth:
      'Now try to think of a difficult situation that you have recently experienced. How would it be if, at that time, you had talked to yourself using a kinder posture? Imagine talking to yourself, using that kinder posture. What do you think would change: in your tone of voice? In your body posture? In what words would you use?',
    template_description_five:
      'The next time you go through a difficult situation, try to talk to yourself using the same posture, the same tone of voice and the same type of words that you would use with your friend.',
  },
  {
    _id: 30,
    template_id: '30',
    template_icon: trophy,
    template_name: 'Theme 3',
    template_title: 'Ending...',
    template_time: '1 minute',
    template_greeting: null,
    template_description_third:
      "During the next few days, if you have situations where you feel more sad or irritated, try to question your negative thoughts with the help of O Diário dos Pensamentos and don't worry about controlling them: let them pass.",
    template_description_fourth:
      'Whenever you can, try to apply some of the strategies we talked about in your day-to-day.',
  },
  {
    _id: 31,
    template_id: '31',
    template_icon: trophy,
    template_name: 'Theme 3',
    template_title: 'Ending...',
    template_time: '4 minutes',
    template_greeting: null,
  },
  {
    _id: 32,
    template_id: '32',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'Was the module useful for you? Share with us!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: '',
    template_description_two:
      'After reading each question, click on one of the two icons on the right . If your answer is YES click on, if your answer is NO click on . At the end, click SAVE.',
  },
  {
    _id: 33,
    template_id: '33',
    template_icon: trophy,
    template_name: 'Theme 3',
    template_title: 'Congratulations!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Congratulations!',
    template_description_two:
      'Then, a new module will be made available.Stay with us!',
  },
];

export default dummyData;
