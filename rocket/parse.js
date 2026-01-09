const fs = require("fs");

const allData = {
  "01": [
    "Basic introductions",
    "Where are you from?",
    "Making friends",
    "Introducing yourself",
    "To like & not like",
    "Describing things",
  ],
  "02": `Survival Phrases
Tea Time
Making Plans
Getting Directions
Japanese Numbers
Telling the Time
Making Sentences with Verbs
Joining Words
Saying Where You're From
To Be and To Have`
    .split("\n")
    .map((x) => x.trim()),
};

const run = () => {
  const finalResult = {};

  Object.entries(allData).forEach(([key, val]) => {
    const innerResult = [];
    finalResult[key] = innerResult;
    for (let i = 1; i <= val.length; i++) {
      const filePath = `./rocket/raw/${key}/${i.toString()}.txt`;
      const data = fs.readFileSync(filePath, "utf8");
      const chunks = data.split("\n\n");
      const rows = chunks.map((chunk) => {
        const [full, hiragana, romaji, translation] = chunk.split("\n");
        return { full, hiragana, romaji, translation };
      });
      innerResult.push({ rows, module: key, lesson: i, title: val[i - 1] });
    }
  });

  fs.writeFileSync(
    "./rocket/parsed.js",
    `const data = ${JSON.stringify(finalResult)}`
  );
};

run();

// NOTE: This path needs to be relative to where the code is run FROM. (not where it lives.)
// fs.readFile("./rocket/raw/01/1_1.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }
//   const chunks = data.split("\n\n");
//   //   console.log(chunks[0], chunks.length);

//   const result = chunks.map((chunk) => {
//     const [full, hiragana, romaji, translation] = chunk.split("\n");
//     return { full, hiragana, romaji, translation };
//   });

//   console.log(result.slice(0, 3));
// });
