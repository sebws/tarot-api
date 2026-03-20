import { cards } from "./tarot";

const WEBHOOK_URL =
  "https://trmnl.sebastian.ws/api/custom_plugins/f08d1dd3-71c0-45ea-946d-c60b75a069af";

export const main = async (file?: (typeof cards)[number]) => {
  const randomFile = file ?? cards[Math.floor(Math.random() * cards.length)];

  if (!randomFile) {
    console.error("No cards found");
    return;
  }

  const body = {
    ...randomFile,
    reversed: Math.random() < 0.5,
  };

  console.log("Sending to webhook");
  console.log(body);

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merge_variables: body,
    }),
  });

  console.log(res.status);
  console.log(await res.json());

  return body;
};

export default {
  async scheduled() {
    await main();
  },
};
