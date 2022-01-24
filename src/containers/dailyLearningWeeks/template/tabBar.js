import balanceIcon from '../../../assets/images/balanceIcon.svg';
import expectIcon from '../../../assets/images/expectIcon.svg';
import PiggyIcon from '../../../assets/images/PiggyIcon.svg';
import flag from '../../../assets/images/flag.svg';
import pen from '../../../assets/images/pen.svg';
import starIcon from '../../../assets/images/startIcon.svg';
import diversity from '../../../assets/images/diversity.svg';
import thermometer from '../../../assets/images/thermometer.svg';
import trophy from '../../../assets/images/trophy.svg';
const tabBar = [
  {
    id: 1,
    template_id: '1',
    template_icon: null,
    template_title: 'Welcome',
    template_time: '1 minute',
    template_userName: 'Hello Shailja!',
    template_description_one:
      'Welcome to Stella-Prevent! This program aims to promote your emotional well-being and psychological health, while also helping to prevent depression in the postpartum period.',
    template_description_two:
      'The Stella-Prevent was developed by clinical psychologists and researchers in cooperation between the university of Coimbra abd Maternity Daniel de Matos (Chuc).',
  },
  {
    _id: 2,
    template_id: '2',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'What is Stella-Prevent?',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'My Name is Sofia, I am Psychologist and I will accompany you throughout the modules of a Mom, offering you some exercises or reflection and summarise the most important messages in each module. ',
    template_description_two:
      'In addition to me , three mothers will share their experience with you on the different topics covered.',
    template_description_third:
      'Want to know we are going to talk about in th forst module?',
  },
  {
    _id: 3,
    template_id: '3',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'What is Stella-Prevent?',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'In the first Stella-Prevent module we will talk about three themes:',
    template_description_two: 'The changes in this phase of life',
    template_description_third: 'The perfect moms myth',
    template_description_fourth:
      'The diversity of emotions felt in this period',
    template_description_five:
      'Throughout the module,we will learn about some strategies to help you better deal with the changes and emotions associated with your experience of being a mother.',
    template_description_six: 'Lets start?',
  },
  {
    _id: 4,
    template_id: '4',
    template_icon: flag,
    template_name: 'Theme One',
    template_title: 'The Changes',
    template_time: null,
    template_greeting: null,
  },
  {
    _id: 5,
    template_id: '5',
    template_icon: null,
    template_name: 'Expectations and reality',
    template_title: 'Expectations and reality',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'During pregnancy, did you imagine.....',
    template_description_two: ' What your baby would like (eye color, hair)? ',
    template_description_third:
      '..... How would your relationship with him be?',
    template_description_fourth:
      ' ..... What would change in your life after having your child?',
    template_description_five:
      'Most women create a set of ideas about what their experience of "being mother" will be like - this is what we call expectations about motherhood',
  },
  {
    _id: 6,
    template_id: '6',
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
    _id: 7,
    template_id: '7',
    template_icon: balanceIcon,
    template_name: null,
    template_title: 'The Balance',
    template_time: '3 minute',
    template_greeting: null,
    template_description_one:
      "Many of the changes are positive, but it is normal for there to be things that you no longer have or cannot do, and that you miss - it's like to scales on a scale!",
    template_description_two:
      'Can you identify good things (gains) and things you miss (losses) in your life with the arrival of your child?',
    template_description_third:
      'The scale has some examples of good things or things that mothers may miss after the baby arrives. If you do not identify yourself with these examples, you can delete them by clicking on      . To add your "good things" or "things that you miss" wright an example of a time in the text boxes and click on . each time you change the information you on your scale, click SAVE. See which way your scalp tilts!',
  },
  {
    _id: 8,
    template_id: '8',
    template_icon: null,
    template_name: null,
    template_title: 'The experience of other mothers',
    template_time: '2 minute',
    template_greeting: null,
    template_description_one:
      'See what Ines and Clara shared with each other in this regard.',
    template_description_two:
      "I didn't think that having a child but changed my life so much... I can't get my house organised, I get tired at the end of the day and I seem to have done nothing! whenever I leave the house I have to think that the baby has to sleep, eat and I have to prepare everything... it is difficult! I should be happy to have my child but the truth is that I often feel sad!",
    template_description_third:
      'I understand perfectly what you say... there are things that may seem insignificant but that are sorely missed... I miss you so much being the owner of my time! Sometimes when I think about it, I also feel guilty. But then, I try to remember what my daughter brought me good... we won very good and unique things!',
    template_description_fourth:
      'Sometimes, the scale can seem unbalanced: it is normal not to be able to recover all the things we need, but it is also important not to miss seeing and enjoying all the good things that motherhood brings us!',
  },
  {
    _id: 9,
    template_id: '9',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Important!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'As much as imaging what your life will be like with the arrival of the baby, there is no crystal ball that allows you to predict everything.',
    template_description_two:
      'Many of the changes are positive, but other can be costly because you no longer have or do things that were important to you.',
    template_description_third:
      "Next, we'll talk a little bit about some strategies that can help you deal with the changes in the phase of your life.",
    template_description_fourth: "Let's start?",
  },
  {
    _id: 10,
    template_id: '10',
    template_icon: pen,
    template_name: 'Theme One',
    template_title: 'Strategies',
    template_time: '2 minute',
    template_userName: null,
    template_description_one:
      'Think about other important changes in your life (for example, when you started work, when you left your parents house).',
    template_description_two:
      'Did you feel any doubts and difficult in the first days? Did it cross your mind that yo might not be able to?',
  },
  {
    _id: 11,
    template_id: '11',
    template_icon: PiggyIcon,
    template_name: 'Stella-Prevent',
    template_title: 'The Piggy Bank of Good Experience',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Try to identify, everyday, a good experience in your relationship with your child. Put that experience in your piggy bank! ',
    template_description_two:
      'Write in that textbox a good experience you had with your baby this day (a smile, a fixed look on your face) and click save a good experience. you can view the experiences stored in your piggy bank in the experiences and reading section.',
  },
  {
    _id: 12,
    template_id: '12',
    template_icon: flag,
    template_name: 'Theme 2',
    template_title: 'The Perfect Mother Myth ',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Try to identify, everyday, a good experience in your relationship with your child. Put that experience in your piggy bank! ',
  },
  {
    _id: 13,
    template_id: '13',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Myths about motherhood',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Does my baby need a "perfect mother"?',
    template_description_two:
      'The society (family and friends, the media) conveys messages that help to strengthen Myths about the "Perfect Meternity".',
  },
  {
    _id: 14,
    template_id: '14',
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
  {
    _id: 15,
    template_id: '15',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Unrealistic Expectations',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'How do I know if what I expect from me or my child is unrealistic? ',
    template_description_two:
      'Expectations are usually unrealistic when they are too rigid and inflexible (include expressions like "always" or "never"). See the examples described below:',
    template_description_third:
      'In addition, if you are often frustrated and blamed for failing to deliver what you set out to do, your expectations may be unrealistic.',
  },
  {
    _id: 16,
    template_id: '16',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Unrealistic Expectations',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: "'Perfect mothers' don't exist!",
    template_description_two:
      'Some mothers feel that they have to fulfill all these Expectations to be "perfect mothers".As these expectations are very difficult to fulfill, as they are unrealistic, these mothers often feel devalued and failed in their role as mothers.',
    template_description_third: 'Think a little about your experience.',
    template_description_fourth:
      'Are your expectations about you and your child unrealistic? Do you feel you have been trying to be the "perfect mother"? How has that made you feel',
  },
  {
    _id: 17,
    template_id: '17',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'The experience of other mothers',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: 'See what Ines and Clara have to say about this:',
    template_description_two:
      "I don't do anything well... I thought I would be able to take care of my son, keep the house in order, go back to work... I can't do any of this, everything is going wrong! My house is disarray, most days I despair until I can get Joao to fall asleep, I'm not a good mother... Why do other mothers do it and I can't?",
    template_description_third:
      "Sometimes I also look at the other mothers and wonder how they manage... One day I had a a crying fit,  I was so tired and vented with a friend who ended up sharing with me the difficulties she also had when her daughter was born. This conversation helped me to realize that I cannot demand from my self the same thing that I demanded before Maria was born, because now I also to do many other things that I didn't do before",
    template_description_fourth:
      'If your expectations are unrealistic, it is important to try to reduce the demand on yourself and try to adjust those expectations to the current reality.',
  },
  {
    _id: 18,
    template_id: '18',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Important!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Your baby does not need a "Perfect Mother": he need a human mother!',
    template_description_two: '"Perfect mother" do not exist',
    template_description_third:
      'Then, we talked about the importance of being a "human mother"',
    template_description_fourth: "Let's continue?",
  },
  {
    _id: 19,
    template_id: '19',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Strategies',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: 'Be a  “human mother”!',
    template_description_two:
      'If it is available for your baby and if it meets your needs (for example: feeding, reassuring, communicating, and playing with it, ensuring its hygiene, giving it affection), then it is being what your son needs it to be: human mother. ',
    template_description_third:
      'Read each of the following sentences, which remained us that we are all human, vulnerable, and that we all make mistakes.',
    template_description_fourth:
      "As a mother, I don't know everything and I don't always have to have all the answers.",
    template_description_five:
      ' I am learning to be a mother and to know my son.',
    template_description_six:
      'Being a good mother is not doing everything well it is trying to do the best in a process of constant learning and personal growth',
  },
  {
    _id: 20,
    template_id: '20',
    template_icon: flag,
    template_name: 'Theme 3',
    template_title: 'The emotions',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: 'Be a  “human mother”!',
    template_description_two:
      'If it is available for your baby and if it meets your needs (for example: feeding, reassuring, communicating, and playing with it, ensuring its hygiene, giving it affection), then it is being what your son needs it to be: human mother. ',
    template_description_third:
      'Read each of the following sentences, which remained us that we are all human, vulnerable, and that we all make mistakes.',
    template_description_fourth:
      "As a mother, I don't know everything and I don't always have to have all the answers.",
    template_description_five:
      ' I am learning to be a mother and to know my son.',
    template_description_six:
      'Being a good mother is not doing everything well it is trying to do the best in a process of constant learning and personal growth',
  },
  {
    _id: 21,
    template_id: '21',
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
    _id: 22,
    template_id: '22',
    template_icon: null,
    template_name: 'Theme 3',
    template_title: 'Emotional diversity',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Emotions felt in the postpartum',
    template_description_two: 'They can very quickly between...',
    template_description_third:
      'During pregnancy, how did you imaging you feel after your baby arrived?',
    template_description_fourth: '(select the emotions that apply)',
    firstImgTitle: ' Positive emotions (joy, happiness, love)',
    secondImgTitle: 'Negative emotions(anxiety, sadness, frustration)',
    thirdImgTitle: 'For brief moments',
    fourthImgTitle: 'Intensely (It looks like they take care of us) ',
    centerText: 'Can be felt...',
  },
  {
    _id: 23,
    template_id: '23',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Important!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'It is normal to experience very different emotions since your child was born!',
    template_description_two:
      'Unfortunately, the negative emotions (sadness, irritation anxiety) felt during this period are often kept secret by women, who prefer not to share them with family, friends. Mothers often think that they should not feel these emotions, which make them feel guilty, that they consider themselves bad mothers or that something is wrong with them! ',
    template_description_third:
      "Next, we'll talk a little bit about some strategies that can help you deal with the different emotions you feel at the stage in your life.",
  },
  {
    _id: 24,
    template_id: '24',
    template_icon: null,
    template_name: 'Stella-Prevent',
    template_title: 'Strategies',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one:
      'Accept that iit is normal to feel different emotions, positive and negative, in this period.',
    template_description_two:
      'By better understanding the different factors that influence how you feel (for example: changes in this period, hormonal changes), it becomes easier to recognize that you are not to blame for feeling these emotions.',
    template_description_third:
      'Remember: There are many factors that influence how you feel.',
    template_description_fourth:
      "If I can lelt go of guilt, it will be easier to try to think, I didn't choose to feel this way, but since I do, what I do to to feel better?",
  },
  {
    _id: 25,
    template_id: '25',
    template_icon: pen,
    template_name: 'Stella-Prevent',
    template_title: 'Strategies',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one:
      'Suffering is a universal characteristics of our conditin as human beings: we all suffer, we are all vulnerable and we all make mistakes...',
    template_description_third:
      'It is normal that sometimes you feel that being a mother is being a more difficult experience than you thought and that you feel that you are the only - but we can assure you that the difficulties are shared by many women.',
    template_description_fourth:
      'It can help you to think of a friend who has just had a baby and who shares with you the difficulties you are experiencing. If I had a message, what would I say?',
  },
  {
    _id: 26,
    template_id: '26',
    template_icon: thermometer,
    template_name: 'The Emotion Thermometer',
    template_title: 'The Emotion Thermometer',
    template_time: '2 minutes',
    template_greeting: null,
    template_description_one: 'Know your emotions better! ',
    template_description_two:
      'To deal with your emotions, it is important to know them.',
    template_description_third:
      'Measure the intensity of your emotions. Each thermometer corresponds to an emotion. For each thermometer, click on the thermometer area (or on the symbols or) that best reflects the intensity with which you felt that emotion. At the end click SAVE. The temperature of your emotions will be recorded in the exercises & readings section.',
    template_description_fourth:
      'It can help you to think of a friend who has just had a baby and who shares with you the difficulties you are experiencing. If I had a message, what would I say?',
  },
  {
    _id: 27,
    template_id: '27',
    template_icon: null,
    template_name: 'Strategies',
    template_title: 'Strategies',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Share what you feel!',
    template_description_third:
      'Talking openly about your emotions to people you trust can help you. Choose two or three people with whom you feel comfortable to share what you feel.',
    template_description_fourth:
      'Try to create some moments of your day-to-day share what you feel with these people.',
  },
  {
    _id: 28,
    template_id: '28',
    template_icon: null,
    template_name: 'Strategies',
    template_title: 'What influence emotions? ',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Why am I not always happy as I thought? ',
    template_description_two:
      'You may find that it is only your everyday situations that influences your emotions. However, the way we interpret situations - our thoughts - can also influence the way we feel and our behaviours.',
    // template_description_fourth:
    //   'Try to create some moments of your day-to-day share what you feel with these people.',
  },

  {
    _id: 29,
    template_id: '29',
    template_icon: null,
    template_name: 'Strategies',
    template_title: 'The experience of other mothers ',
    template_time: '3 minutes',
    template_greeting: null,
    template_description_one: '',
    template_description_two:
      'See the reactions of Ines and Clara to the information, on the part of the doctor, that after having had to breast infections they should considered the possibility of stopping breastfeeding.',
  },

  {
    _id: 30,
    template_id: '30',
    template_icon: null,
    template_name: 'Important',
    template_title: 'Important',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one:
      'Your emotions are influenced not only by what happens to you on a daily basis, but also by the thoughts that arise in your head, which are always changing and are not under your control.',
    template_description_two:
      'Remember: slowly, try to start using some of the strategies we talked about in this module.',
    // template_description_fourth:
    //   'Try to create some moments of your day-to-day share what you feel with these people.',
  },
  {
    _id: 31,
    template_id: '31',
    template_icon: diversity,
    template_name: 'Strategies',
    template_title: 'Was the module useful for you? Share with us!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_two:
      'After reading each question, click on one of the two icons on the right. If your answer is yes click on  + . If your answer is no click on     . At the end, click SAVE.',
  },
  {
    _id: 32,
    template_id: '32',
    template_icon: trophy,
    template_name: 'Strategies',
    template_title: 'Was the module useful for you? Share with us!',
    template_time: '1 minute',
    template_greeting: null,
    template_description_one: 'Congratulations! Completed the 1st module!',
    template_description_two:
      'Then, a new module will be made available.Stay with us!',
  },
];

export default tabBar;
