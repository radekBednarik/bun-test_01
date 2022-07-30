import fetch from "node-fetch";

const getCatFact = async ({ url = "https://catfact.ninja/fact" }: { url?: string }) => {
    try {
        const response = await fetch(url);
        const body = await response.json()
        if (response.ok) {
            return body;
        }
        console.error(`GET ${url} return error: ${JSON.stringify(body)}`);
        process.exit(1);
    } catch (err) {
        console.error(`Error when trying to GET ${url}: ${err}`);
        process.exit(1)
    }
}

const gimmeFacts = async ({ howMany = 10 }: { howMany?: number }) => {
    const iterable = Array(howMany);
    const promisesContainer = [];
    for (const _ of iterable) {
        promisesContainer.push(getCatFact({}));
    }
    return Promise.allSettled(promisesContainer);
}

const main = async () => {
    const facts = await gimmeFacts({});
    console.log(JSON.stringify(facts, null, 2));
}

main();
