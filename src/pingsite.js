// Primary site ping functions go here
const Discord = require("discord.js");
 

const match = (expected, actual) => {
  if (Array.isArray(expected)) return expected.includes(actual);
  return actual === expected;
};

// Hanging somewhere on the notify await call. Debug.

const pingSite = async (site, page) => {
  const { url, xPath, expected, description } = site;

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto(url);

  try {
    const handleEl = await page.$x(xPath);
    const targetText = await page.evaluate(
      (element) => element.textContent,
      handleEl[0]
    );

    const value = String(targetText).replace(/^\s+|\s+$/g, "");
    if (!match(value, expected)) {
      console.log(
        `Success! I expected ${description} to be ${expected}, but instead found that it's ${value}. You should check out ${url} right away!`
      );

      // await notify({
      //   to: "+16319880913",
      //   from: "+16572981228",
      //   body: `Success! I expected ${description} to be ${expected}, but instead found that it's ${value}. You should checck out ${url} right away!`,
      // });
    } else {
      console.log(`I'm sorry, but ${description} is ${expected} Keep at it!`);
      // await notify({
      //   to: "+16319880913",
      //   from: "+16572981228",
      //   body: `I'm sorry, but ${description} is ${expected} Keep at it!` ,
      // })
    }
  } catch (error) {
    //notify user that the node couldn't be reached.
    console.log(
      `Sorry, but I couldn't find that item. The listing might have changed, or the website may have changed its layout. Let my creator know!`
    );
    // await notify({
    //   to: "+16319880913", //Amplify user call
    //   from: "+16572981228",
    //   body: `Sorry, but I couldn't find that item. The listing might have changed, or the website may have changed its layout. Please notify BotDock so we can look into this!`,
    // });
  }
};

module.exports = {
  pingSite,
};
