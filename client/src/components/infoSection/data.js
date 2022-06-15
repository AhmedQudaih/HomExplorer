export const homeObjOne = {
    id: 'recommendations',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Recommendations',
    headline:'Just For You',
    description:
    'Press the button and start your picking home journey with custom selected estates just for you',
    buttonLabel: 'Get started',
    imgStart: false,
    img: require('../../images/svg-1.svg').default,
    alt: 'Home',
    dark: true,
    primary: true,
    darkText: false,
    to:'products',
    state:"Recommendation"
};

export const homeObjTwo = {
    id: 'auction',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Auction',
    headline:'Bid It To Win It',
    description:
    'Seeking for auctions!! you are in the right place press the button and view all the auctions in one place  ',
    buttonLabel: 'Start Now',
    imgStart: true,
    img: require('../../images/svg-2.svg').default,
    alt: 'Home',
    dark: false,
    primary: false,
    darkText: true,
    to:'products',
   state:"Auction"
};

export const homeObjThree = {
    id: 'signup',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Join Our Team',
    headline:'Creating an account is extremely easy',
    description:
    "Get everything set up and ready in under 10 minutes. All you need to do is add your information and you're ready to go",
    buttonLabel: 'Start Now',
    imgStart: false,
    img: require('../../images/svg-3.svg').default,
    alt: 'Paper',
    dark: true,
    primary: true,
    darkText: false,
    to:"authPage"
};

export const homeObjFour = {
    id: 'prediction',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Prediction',
    headline:'Predict Price',
    description:
    'The best way to predict the future is to study the past, we will help you to predict any estate price. just press the button, fill out the form and keep the rest on us.',
    buttonLabel: 'Start Now',
    imgStart: false,
    img: require('../../images/svg-1.svg').default,
    alt: 'Paper',
    dark: false,
    primary: false,
    darkText: true,
    to:"#"
};
