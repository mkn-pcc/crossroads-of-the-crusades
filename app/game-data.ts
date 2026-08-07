export type LocationId =
  | "byzantine"
  | "pope"
  | "knights"
  | "merchants"
  | "commoners"
  | "muslims";

export type Motivation = "Religious" | "Political" | "Economic" | "Social";

export type DialogueQuestion = {
  id: string;
  prompt: string;
  answer: string[];
};

export type Perspective = {
  id: LocationId;
  mapPosition: string;
  mapLabel: string;
  location: string;
  character: string;
  role: string;
  initials: string;
  sceneClass: string;
  introduction: string;
  questions: DialogueQuestion[];
  checkpoint: {
    worksheet: string;
    evidence: string[];
  };
  journal: {
    strongest: Motivation[];
    supporting: Motivation[];
    note: string;
  };
};

export const perspectives: Perspective[] = [
  {
    id: "byzantine",
    mapPosition: "map-north-west",
    mapLabel: "BYZ",
    location: "Byzantine Embassy",
    character: "Niketas",
    role: "Byzantine envoy",
    initials: "NK",
    sceneClass: "scene-byzantine",
    introduction:
      "You enter a tiled reception chamber. Niketas has come west seeking military help for a pressured empire.",
    questions: [
      {
        id: "byz-loss",
        prompt: "What danger brought you here?",
        answer: [
          "Our empire has lost much of **Asia Minor** to Seljuk Turkish forces. Emperor **Alexios I** needs trained soldiers from western Europe to help recover territory and strengthen the Byzantine Empire.",
          "**Jerusalem had not been under Byzantine rule for centuries**. Alexios's request focused on Seljuk expansion into Byzantine lands, especially in Asia Minor."
        ]
      },
      {
        id: "byz-faith",
        prompt: "How will you persuade western Europe to help?",
        answer: [
          "We are eastern Christians asking western Christians for aid. Alexios appealed to our **shared Christian faith** when he asked Pope Urban II for military support in 1095.",
          "The appeal to shared faith supported a mainly **political** goal: secure allies, regain territory and shore up imperial power."
        ]
      },
      {
        id: "byz-result",
        prompt: "Did the First Crusade help your empire?",
        answer: [
          "The crusaders captured Jerusalem in 1099, while Byzantine forces recovered some western Anatolian territory. But the crusaders also created their own states instead of simply returning every conquest to Byzantium.",
          "For Byzantium, the alliance brought assistance and some recovered land, but also tension with crusader leaders pursuing **their own interests**."
        ]
      }
    ],
    checkpoint: {
      worksheet: "Use this interview for Task 1, question 6 and Task 2, question 1.",
      evidence: [
        "Alexios I requested military aid to recover Byzantine territory and strengthen the empire.",
        "He appealed to shared Christianity to secure western European support."
      ]
    },
    journal: {
      strongest: ["Political"],
      supporting: ["Religious"],
      note: "Shared faith helped the empire pursue military aid, territory and security."
    }
  },
  {
    id: "pope",
    mapPosition: "map-north",
    mapLabel: "CATH",
    location: "Cathedral",
    character: "Brother Odo",
    role: "Papal legate",
    initials: "BO",
    sceneClass: "scene-pope",
    introduction:
      "Bells fade above the cathedral steps. Brother Odo explains why Pope Urban II called western Christians to crusade.",
    questions: [
      {
        id: "pope-call",
        prompt: "Why did the Pope support a Crusade?",
        answer: [
          "Urban II presented the expedition as a defence of eastern Christians and a mission to reclaim **Jerusalem and other holy places**. Religion gave the call enormous power.",
          "He also had **political** aims: increase papal influence, direct Europe's warriors towards a shared cause and perhaps bring the divided Catholic and Orthodox churches closer together."
        ]
      },
      {
        id: "pope-promise",
        prompt: "What did he promise people who joined?",
        answer: [
          "Crusading preachers spoke of the **forgiveness of sins** and the hope of **heaven**. That language motivated knights and ordinary people who took their faith seriously.",
          "Urban's formal promise was the remission of required **penance** for those who went from religious devotion. The familiar language of forgiveness and heaven summarises this spiritual reward, but it was not a simple guarantee that every fighter would enter heaven."
        ]
      },
      {
        id: "pope-power",
        prompt: "Was this only about faith?",
        answer: [
          "No. Faith and power were tangled together. A successful campaign could defend Christian interests, extend the western Church's influence and raise the Pope's authority among European rulers.",
          "The Pope's aims combined **religion and politics**."
        ]
      }
    ],
    checkpoint: {
      worksheet: "Use this interview for Task 1, questions 3-4; Task 2, question 5; and Task 3, question 1.",
      evidence: [
        "Urban II rallied European Christians around Jerusalem, eastern Christian aid and Church unity.",
        "The words you need for Task 3.1 are forgiveness and heaven."
      ]
    },
    journal: {
      strongest: ["Religious", "Political"],
      supporting: [],
      note: "Urban's religious call also strengthened papal leadership and influence."
    }
  },
  {
    id: "knights",
    mapPosition: "map-north-east",
    mapLabel: "YARD",
    location: "Knight's Training Yard",
    character: "Sir Hugues",
    role: "Western European knight",
    initials: "SH",
    sceneClass: "scene-knights",
    introduction:
      "Wooden swords crack against shields. Sir Hugues pauses his training to explain why a knight might take the cross.",
    questions: [
      {
        id: "knight-faith",
        prompt: "Why would a knight leave home to fight?",
        answer: [
          "For some knights, joining was an act of **religious devotion**. The promise of forgiveness and the hope of heaven made the danger seem spiritually worthwhile.",
          "A knight might also believe he was defending Christianity and helping pilgrims reach sacred places."
        ]
      },
      {
        id: "knight-feudal",
        prompt: "What does the Feudal System have to do with it?",
        answer: [
          "Knights lived within networks of loyalty and service often described as the **Feudal System**. If a lord joined, his followers could face strong obligations and pressure to go too.",
          "Those arrangements varied across medieval Europe, but loyalty to a higher lord helps explain why joining could feel like a **social and military duty**."
        ]
      },
      {
        id: "knight-honour",
        prompt: "What could a knight gain personally?",
        answer: [
          "A crusade offered a public test of courage. A knight could hope to prove **bravery**, protect his honour and meet society's expectations of knighthood.",
          "Some also hoped for land or wealth, adding material ambition to **faith, feudal loyalty and honour**."
        ]
      }
    ],
    checkpoint: {
      worksheet: "Use this interview for Task 1, question 1; Task 2, question 6; Task 3, question 2; and Task 4, question 3.",
      evidence: [
        "Knights could be motivated by religion, loyalty to lords and expectations of bravery and honour.",
        "The system named in Task 3.2 is the Feudal System."
      ]
    },
    journal: {
      strongest: ["Religious", "Social"],
      supporting: ["Economic"],
      note: "Faith, obligations to lords and the honour culture of knighthood could overlap."
    }
  },
  {
    id: "merchants",
    mapPosition: "map-south-west",
    mapLabel: "GUILD",
    location: "Merchant Guildhall",
    character: "Marco Ziani",
    role: "Venetian merchant",
    initials: "MZ",
    sceneClass: "scene-merchants",
    introduction:
      "Ledgers, contracts and cargo lists cover a long table. Marco measures a crusade in ships, debts and trading opportunities.",
    questions: [
      {
        id: "merchant-profit",
        prompt: "How could merchants benefit from the Crusades?",
        answer: [
          "Armies needed ships, food, equipment and credit. Merchants could earn money by transporting crusaders and supplies across the Mediterranean.",
          "Crusader states also opened access to eastern markets. Italian trading cities sought valuable contracts, ports and control of **trade routes**."
        ]
      },
      {
        id: "merchant-fourth",
        prompt: "How did merchants shape the Fourth Crusade?",
        answer: [
          "Venice built a fleet for the Fourth Crusade, but the crusaders could not pay the full bill. To settle part of the debt, they helped Venice attack the Christian city of **Zara**.",
          "The expedition was later diverted to **Constantinople** through further political and financial bargaining. Crusaders and Venetians captured and looted the Christian Byzantine capital in 1204."
        ]
      },
      {
        id: "merchant-priority",
        prompt: "What does that reveal about priorities?",
        answer: [
          "The Fourth Crusade shows that declared religious goals could be overtaken by **economic and political interests**. Venice gained payment, influence and commercial advantages.",
          "Merchant interests were not the only influence, but profit, debt and control of trade clearly helped redirect the campaign."
        ]
      }
    ],
    checkpoint: {
      worksheet: "Use this interview for Task 1, question 5; Task 2, question 3; Task 3, question 3; and Task 4, question 2.",
      evidence: [
        "Merchants profited from transport, contracts, ports and trade routes.",
        "For Task 3.3, connect merchants with trade routes."
      ]
    },
    journal: {
      strongest: ["Economic"],
      supporting: ["Political"],
      note: "Shipping, debt and commercial control could redirect even a religious campaign."
    }
  },
  {
    id: "commoners",
    mapPosition: "map-south-east",
    mapLabel: "INN",
    location: "Village Inn",
    character: "Aelis",
    role: "Tenant farmer",
    initials: "AE",
    sceneClass: "scene-commoners",
    introduction:
      "The inn is crowded with rumours from the road. Aelis has heard promises of salvation, travel and a different life.",
    questions: [
      {
        id: "commoner-faith",
        prompt: "Why would ordinary people join?",
        answer: [
          "Religion shaped daily life. The promise of **forgiveness of sins** and hope of heaven could speak as powerfully to commoners as it did to knights.",
          "Some genuinely believed they were supporting a holy cause and protecting fellow Christians or sacred places."
        ]
      },
      {
        id: "commoner-life",
        prompt: "What might they hope to change at home?",
        answer: [
          "For people facing taxes, debt or obligations to a lord, departure could look like a rare chance to improve their lives. Some hoped to delay debts, earn money or seek **freedom**.",
          "Joining did not automatically free every serf. Experiences differed, but the possibility of negotiating release or escaping restrictions could still be a powerful attraction."
        ]
      },
      {
        id: "commoner-adventure",
        prompt: "Was adventure really a motivation?",
        answer: [
          "For someone who had rarely travelled beyond nearby villages, a journey across Europe and the Mediterranean promised danger, novelty and **adventure**.",
          "That hope sat beside fear, hardship and religious duty. Commoners could carry **religious, social and economic** motives at the same time."
        ]
      }
    ],
    checkpoint: {
      worksheet: "Use this interview for Task 1, question 2; Task 2, question 4; Task 3, question 4; and Task 4, question 3.",
      evidence: [
        "Commoners could seek adventure, relief from debts or obligations, money, freedom and spiritual reward.",
        "The word needed in Task 3.4 is freedom."
      ]
    },
    journal: {
      strongest: ["Religious", "Social"],
      supporting: ["Economic"],
      note: "Faith mixed with hopes for adventure, freedom and improved circumstances."
    }
  },
  {
    id: "muslims",
    mapPosition: "map-gate",
    mapLabel: "GATE",
    location: "Eastern Gate",
    character: "Ibn Yusuf",
    role: "Muslim chronicler",
    initials: "IY",
    sceneClass: "scene-muslims",
    introduction:
      "At the eastern gate, a traveller records news from Syria. Ibn Yusuf asks you to view the Crusades from the lands being invaded.",
    questions: [
      {
        id: "muslim-view",
        prompt: "How did Muslims view the Crusaders?",
        answer: [
          "Muslim communities were diverse, but the arriving European armies could be seen as **invaders** attacking cities, farms and people in their homelands.",
          "From this perspective, the struggle was not a heroic journey to a distant holy land. It was a defence of territory, families, culture and faith."
        ]
      },
      {
        id: "muslim-impact",
        prompt: "What did invasion mean for local people?",
        answer: [
          "War could mean villages damaged, farmland ruined, people killed or captured, and control of cities changing hands. Jerusalem mattered to **Muslims, Christians and Jews**, not only to western crusaders.",
          "The same campaign could be sacred recovery to one group and violent conquest to another; the observer's **perspective** shaped the description."
        ]
      },
      {
        id: "muslim-unity",
        prompt: "How did Muslim resistance change over time?",
        answer: [
          "Muslim rulers did not begin as one united force. Rivalries continued. Over time, leaders built broader coalitions to resist crusader states and recover territory.",
          "**Saladin** united power across Egypt and Syria, recaptured Jerusalem in 1187 and faced the Third Crusade. His example fits the worksheet idea of leaders working to **unite** different Muslim groups."
        ]
      }
    ],
    checkpoint: {
      worksheet: "Use this interview for Task 2, question 2; Task 3, question 5; and Task 4, question 4.",
      evidence: [
        "Muslim defenders viewed crusaders as invaders threatening homeland, culture and religion.",
        "For Task 3.5, use Saladin and unite."
      ]
    },
    journal: {
      strongest: ["Political", "Religious", "Social"],
      supporting: [],
      note: "Defence of territory, people, culture and faith shaped Muslim resistance."
    }
  }
];

export const wordBank = [
  { term: "forgiveness", clue: "promised in crusading preaching; pairs with heaven" },
  { term: "heaven", clue: "the spiritual reward many participants hoped for" },
  { term: "Feudal System", clue: "linked knights to lords through duties and loyalty" },
  { term: "merchants", clue: "the group seeking contracts, ports and profit" },
  { term: "trade routes", clue: "commercial links merchants wanted to access or control" },
  { term: "freedom", clue: "what some serfs and commoners hoped to gain" },
  { term: "Saladin", clue: "the Muslim leader associated with Egypt, Syria and Jerusalem" },
  { term: "unite", clue: "what leaders sought to do with different Muslim groups" }
];

export const synthesisPrompts = [
  {
    task: "Task 4.1 - Religion",
    prompt: "Why was religion powerful?",
    guide:
      "Compare the Pope, knights and commoners: beliefs about sin, penance, heaven and sacred places shaped choices. Then add the Muslim perspective: faith also motivated defence of homeland and holy places."
  },
  {
    task: "Task 4.2 - Merchants",
    prompt: "How did merchants influence the Fourth Crusade?",
    guide:
      "Use Venice's fleet, the crusaders' unpaid debt, the attack on Zara and the later diversion to Constantinople. Explain what those decisions reveal about profit, payment, trade and power."
  },
  {
    task: "Task 4.3 - Medieval society",
    prompt: "How did society contribute to participation?",
    guide:
      "Connect knights' loyalty to lords and expectations of honour with commoners' restrictions, debts and hopes for freedom or a better life."
  },
  {
    task: "Task 4.4 - Different perspectives",
    prompt: "How did Muslim and European views differ?",
    guide:
      "Contrast a western Christian story of holy mission and recovery with a Muslim story of invasion and defence. A strong answer also notes that Jerusalem was sacred to several faiths."
  }
];

export const sources = [
  {
    label: "Class materials",
    detail:
      "Perspectives of the Crusades PowerPoint, reading, information cards, information chart and Activity Option 2 worksheet supplied for this lesson."
  },
  {
    label: "Fordham Medieval Sourcebook",
    detail:
      "Accounts of Urban II's 1095 speech and the Council of Clermont privilege were used to clarify Alexios I's request and remission of penance.",
    href: "https://sourcebooks.fordham.edu/source/urban2-5vers.asp"
  },
  {
    label: "The Metropolitan Museum of Art",
    detail:
      "The Heilbrunn Timeline was used to check the transition from Byzantine to Islamic rule in the eastern Mediterranean.",
    href: "https://www.metmuseum.org/toah/ht/06/wae.html"
  },
  {
    label: "Cambridge University Press",
    detail:
      "Its summary of the Fourth Crusade at Venice was used to check the debt and attack on Zara.",
    href: "https://www.cambridge.org/core/books/journal-of-medieval-military-history/unintended-consumption-the-interruption-of-the-fourth-crusade-at-venice-and-its-consequences/71CA34B6E14C18915887C405CE3B7AB1"
  }
];

export const getPerspective = (id: LocationId) =>
  perspectives.find((perspective) => perspective.id === id)!;
