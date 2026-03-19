import { cards } from "./tarot";

const WEBHOOK_URL =
  "https://trmnl.sebastian.ws/api/custom_plugins/f08d1dd3-71c0-45ea-946d-c60b75a069af";

export const main = async () => {
  const randomFile = cards[Math.floor(Math.random() * cards.length)];

  if (!randomFile) {
    console.error("No cards found");
    return;
  }

  console.log(`Sending tarot card ${randomFile.name} to webhook`);

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merge_variables: randomFile,
    }),
  });

  console.log(res.status);
  console.log(await res.json());
};

export default {
  async scheduled() {
    await main();
  },
};
