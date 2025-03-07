let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 7000);

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

test("The h1 header content in features page", async () => {
  await page.goto("https://github.com/features");
  await page.waitForSelector("h1");
  const title = await page.title();
  expect(title).toEqual("Features | GitHub · GitHub");
}, 7000);

test("The page contains h1 title", async () => {
  await page.goto("https://github.com/pricing");
  await page.waitForSelector("h1[class='h2-mktg']", {
    visible: true,
  });
  const actual = await page.$eval(
    "h1[class='h2-mktg']",
    (link) => link.textContent
  );
  expect(actual).toContain("Get the complete developer platform.");
}, 7000);

test("The h1 header content in pricing page", async () => {
  await page.goto("https://github.com/pricing");
  await page.waitForSelector("h1");
  const title = await page.title();
  expect(title).toEqual("Pricing · Plans for every developer · GitHub");
}, 7000);
