import { ANALYZE_TEXT, EDIT_TEXT } from './../actions/ActionTypes'

const initialState = {
  currentText: "",
  phrase: {},
};

function calculateNewPhraseData(phrase){

  let sentences = phrase.split(/[\\.!\?]/);
  let new_data = [];

  for(var i = 0; i < sentences.length; i++) {
    let current = sentences[i];
    let tokens = current.split(' ');

    let pos = Math.random();
    let neut = Math.random();
    let neg = Math.random();

    new_data.push(
      {
        tokens: tokens,
        sentiment: [pos,neut,neg],
        sentiment_attention_1: createWeights(tokens),
        sentiment_attention_2: createWeights(tokens),
        sentiment_attention_3: createWeights(tokens),
        sentiment_attention_4: createWeights(tokens),
        sentiment_attention_5: createWeights(tokens)
      }
    )
  }

  //Actual data
  /*
  new_data = [
    {
      tokens: [
        "The",
        "new",
        "Fantastic",
        "Four",
        "movie",
        "is",
        "n't",
        "that",
        "bad",
        "at",
        "all",
        "!",
        "Tomorrow",
        "I",
        "'m",
        "going",
        "to",
        "watch",
        "Ant",
        "-",
        "Man",
        "!",
        ":)"
      ],
      sentiment: [
        0.004862529691308737,
        0.016079267486929893,
        0.9790582060813904
      ],
      sentiment_attention_1: [
        0,
        0.16889454424381256,
        1,
        0.06551221758127213,
        0.19995658099651337,
        0.07623304426670074,
        0.42451876401901245,
        0.1383928656578064,
        0.9087145924568176,
        0,
        0.19078239798545837,
        0.3511417806148529,
        0.23281225562095642,
        0.20413848757743835,
        0.20229314267635345,
        0.3192959427833557,
        0,
        0.29990482330322266,
        0.17187516391277313,
        0,
        0.1479671597480774,
        0.3511417806148529,
        0.6227324604988098
      ],
      sentiment_attention_2: [
        0,
        0.5587397535169146,
        1,
        0.4412602464830854,
        0.010396097948944959,
        0.2758181090477974,
        0.41294892098042263,
        0.6093440985292915,
        0.7940934471797411,
        0.3322762585320197,
        0.21359221441795767,
        0.34551582568263484,
        0.13192361126467717,
        0.0010481675285289305,
        0.16186068662807732,
        0.2317769493795028,
        0.07783214632915006,
        0.01196741463018079,
        0.005099698580985149,
        0,
        0.15083915789075444,
        0.5064270896138154,
        0.355587931723061
      ],
      sentiment_attention_3: [
        0.13749447629291212,
        0.46561544397387006,
        0.9682886100681054,
        0.45440556766097673,
        0.32427953163620526,
        0.30889209248183996,
        0.49865669958748,
        0.4695311137217154,
        0.8257844920337497,
        0.3138905931103443,
        0.29170696363181553,
        0.3058382980322704,
        0.15735907001826654,
        0.1138543949751722,
        0.20702072748271438,
        0.32089892337128545,
        0.15487997619869892,
        0.2051710623857046,
        0.1090118798423535,
        0.051448356336496005,
        0.17418963566668097,
        0.33506414654214306,
        0.3690641380288982
      ],
      sentiment_attention_4: [
        0.3328770077019209,
        0.6486979328238561,
        0.8969876799202013,
        1,
        0.7544845147224473,
        0.7124487743772254,
        0.6212179399396736,
        0.7007854998914654,
        0.8821977081035796,
        0.634767685085123,
        0.47772155868806543,
        0.29514167865647495,
        0.06033103602437035,
        0.10347599921581783,
        0.2914923579803743,
        0.41983339371688005,
        0.3858703057125024,
        0.31637018076279805,
        0.17502965155809305,
        0.18573258003305393,
        0.18573258003305393,
        0.18573258003305393,
        0.13904396421146664
      ],
      sentiment_attention_5: [
        0.28851629494072223,
        0.47704558568121863,
        0.7303537911811775,
        0.8316282751250651,
        1,
        0.8939364262642723,
        0.7999984128402793,
        0.7250028425988102,
        0.7866760979790877,
        0.6183043731041528,
        0.4358516518991582,
        0.362208552351725,
        0.2582397160522391,
        0.22603162407244512,
        0.3780779239224203,
        0.4712860244754264,
        0.47291429338570945,
        0.40148138977409986,
        0.4014669948516001,
        0.24942069500162498,
        0.15621259444861882,
        0.1336361477692656,
        0.13072525242187133
      ]
    }
  ]
  */
  /*
    new_data = [
      {
        tokens: [
          "Gov.Ventura",
          "is",
          "right",
          "Abortion",
          "is",
          "premeditated",
          "murder",
          "in",
          "the",
          "1",
          "st",
          "degree",
          "Scott",
          "Walker",
          "'s",
          "law",
          "is",
          "stupid",
          "Who",
          "shed",
          "'s",
          "man",
          "'s",
          "blood",
          "By",
          "man",
          "hisBshed"
        ],
        sentiment:  [
          0.7983659505844116,
          0.19024601578712463,
          0.011388067156076431
        ],
        sentiment_attention_1: [
          0.01242995448410511,
          0.08260729908943176,
          0.32072409987449646,
          0.384628027677536,
          0.08260729908943176,
          0.5813501477241516,
          0.6191361546516418,
          0,
          0,
          0,
          0,
          0.2300669401884079,
          0.17422543466091156,
          0.42366117238998413,
          0.00022817583521828055,
          0.4287656843662262,
          0.08260729908943176,
          1,
          0.12583617866039276,
          0.11101634055376053,
          0.00022817583521828055,
          0.28005507588386536,
          0.00022817583521828055,
          0.27201828360557556,
          0,
          0.28005507588386536,
          0.01242995448410511
        ],
        sentiment_attention_2: [
          0.005456052371618707,
          0.20738336253961048,
          0.38578729518626625,
          0.2420063033000626,
          0.39013731607337654,
          0.8297456712467983,
          0.597317232072614,
          0.09956255861740403,
          0,
          0,
          0,
          0.02354513615300864,
          0.22118669895848747,
          0.24457591269077025,
          0.22733577154626147,
          0.20245484160056393,
          0.5858496712955926,
          1,
          0.4362037486440013,
          0,
          0.08135499192189205,
          0.12031040604871625,
          0.121473848837273,
          0.0825184347104488,
          0,
          0.061553373766495244,
          0.061553373766495244
        ],
        sentiment_attention_3: [
          0.12129641828938674,
          0.2718106218150054,
          0.4140527931989448,
          0.46865597789591773,
          0.42261682787951727,
          0.7639196036147147,
          0.6640631707532612,
          0.16812441295297084,
          0.045993088927666556,
          0.019382289121683646,
          0.013291518850125434,
          0.14078236990626433,
          0.23866607730619263,
          0.4391806989211482,
          0.29815300018625673,
          0.5469862129116997,
          0.5514334923503006,
          0.9560045079952294,
          0.36939329635781637,
          0.0741735615495623,
          0.026790291613056093,
          0.1363542134907516,
          0.044127038178843135,
          0.12433563033514244,
          0.0010708909458562602,
          0.10976592496568718,
          0.0205575511657671
        ],
        sentiment_attention_4: [
          0.35275425909343555,
          0.38096068177791276,
          0.38289909737741057,
          0.7766797388238984,
          0.6045032536683597,
          0.6985657654992888,
          0.7334953095360699,
          0.339714668089582,
          0.1591368941516852,
          0.03686795963627877,
          0.03155933002244523,
          0.05115567479606559,
          0.2881879847424347,
          0.40200771411203445,
          0.6324980585833933,
          1,
          0.8687508254511913,
          0.7549310960815916,
          0.4928814215877875,
          0.10578313539756042,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        sentiment_attention_5: [
          0.2517604861570046,
          0.3823805066864048,
          0.6079365117345528,
          0.8464979088343012,
          0.9906628320497809,
          0.8359290996141914,
          0.705309079084791,
          0.4797530740366431,
          0.24119167693689475,
          0.21699841755269714,
          0.13625412270699103,
          0.21502463368734603,
          0.3582693961399655,
          0.7769012111000092,
          0.9365149082461973,
          1,
          0.9915327515743639,
          0.8482879891217444,
          0.42965617416170065,
          0.15007081318423046,
          0.07529352733218177,
          0.004990264777462793,
          0.004990264777462793,
          0.004990264777462793,
          0.004990264777462793,
          0,
          0
        ]
      }
    ];
*/

  console.log(new_data);
  return new_data;
}

function createWeights(input){
  let weights = [];
  let max = 1;
  let min = 0;

  for(var i = 0; i < input.length; i++ ) {
    weights[i] = Math.random() * (max - min) + min;
  }
  return weights;
}

export default function EntrySection(state = initialState, action) {
  switch(action.type){
    case ANALYZE_TEXT:
      return { ...state,
        phrase: calculateNewPhraseData(action.payload)
    }
    case EDIT_TEXT:
      return { ...state, currentText: action.payload }
    default:
      return state;
  }
}
