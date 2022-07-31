import fetch from "node-fetch";

const getCatFact = async ({ url = "https://catfact.ninja/fact" }: { url?: string }) => {
  try {
    const response = await fetch(url);
    const body = await response.json();
    if (response.ok) {
      return body;
    }
    console.error(`GET ${url} return error: ${JSON.stringify(body)}`);
    return { error: JSON.stringify(body) };
  } catch (err) {
    console.error(`Error when trying to GET ${url}: ${err}`);
    return { error: JSON.stringify(err) };
  }
};

const gimmeFacts = async ({ howMany = 10 }: { howMany?: number }) => {
  const promisesContainer = [];

  for (let i = 0; i < howMany; i++) {
    promisesContainer.push(getCatFact({}));
  }

  return await Promise.allSettled(promisesContainer);
};

const main = async () => {
  const facts = await gimmeFacts({});
  console.log(JSON.stringify(facts, null, 2));
};

main();
