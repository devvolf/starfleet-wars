import { test, expect } from '@playwright/test';

const AWAIT_COMPONENT_VISIBLE_TIMEOUT = 10000;

const PORT = 4200;
const URL = `http://localhost:${PORT}`;

// Loader
const LOADER = 'loader';
const LOADER_SPINNER = 'loader-spinner';
const LOADER_TEXT = 'loader-text';

// Match component
const MATCH_VIEW_ROOT = 'match-view-root';
const PLAYER_ONE = 'player-one';
const PLAYER_TWO = 'player-two';
const STARSHIP_CHANGE_BUTTON = 'starship-change-button';
const FIGHT_BUTTON = 'fight-button';

// Starship component
const STARSHIP_CARD = 'starship-card';
const STARSHIP_CARD_TITLE = 'starship-card-title';
const STARSHIP_CARD_SUBTITLE = 'starship-card-subtitle';
const STARSHIP_CARD_INFO_NAME = 'starship-card-info-name';
const STARSHIP_CARD_INFO_MODEL = 'starship-card-info-model';
const STARSHIP_CARD_INFO_CLASS = 'starship-card-info-class';
const STARSHIP_CARD_INFO_POWER = 'starship-card-info-power';

// Starship selection component
const STARSHIP_SELECTION_LIST_ROOT = 'starship-selection-list-root';

// Snackbar
const FAILURE_SNACKBAR_ROOT = 'failure-snackbar-root';
const INFO_SNACKBAR_ROOT = 'info-snackbar-root';
const INFO_SNACKBAR_MESSAGE = 'info-snackbar-message';

test('init loader visible', async ({ page }) => {
  await page.goto(URL);

  const loader = page.getByTestId(LOADER);
  const loaderSpinner = page.getByTestId(LOADER_SPINNER);
  const loaderText = page.getByTestId(LOADER_TEXT);

  await expect(loader).toBeVisible();
  await expect(loaderSpinner).toBeVisible();
  await expect(loaderText).toBeVisible();
});

test('init loader error visible', async ({ page }) => {
  await page.route('*/**/api/starships/**', async (route) => {
    await route.abort();
  });

  await page.goto(URL);

  const loader = page.getByTestId(LOADER);
  const loaderSpinner = page.getByTestId(LOADER_SPINNER);
  const loaderText = page.getByTestId(LOADER_TEXT);
  const failureSnackbarRoot = page.getByTestId(FAILURE_SNACKBAR_ROOT);

  await expect(loader).toBeVisible();
  await expect(loaderSpinner).toBeVisible();
  await expect(loaderText).toBeVisible();
  await expect(failureSnackbarRoot).toBeVisible();
});

test('init match visible', async ({ page }) => {
  await page.goto(URL);

  const matchViewRoot = page.getByTestId(MATCH_VIEW_ROOT);

  await matchViewRoot.waitFor({
    state: 'visible',
    timeout: AWAIT_COMPONENT_VISIBLE_TIMEOUT,
  });

  const playerOne = page.getByTestId(PLAYER_ONE);
  const playerTwo = page.getByTestId(PLAYER_TWO);
  const playerOneStarshipCard = playerOne.getByTestId(STARSHIP_CARD);
  const playerTwoStarshipCard = playerOne.getByTestId(STARSHIP_CARD);

  const fightButton = page.getByTestId(FIGHT_BUTTON);

  await expect(matchViewRoot).toBeVisible();
  await expect(playerOne).toBeVisible();
  await expect(playerTwo).toBeVisible();
  await expect(playerOneStarshipCard).toBeVisible();
  await expect(playerTwoStarshipCard).toBeVisible();
  await expect(fightButton).toBeVisible();
});

test('change player one starship', async ({ page }) => {
  await page.goto(URL);

  const matchViewRoot = page.getByTestId(MATCH_VIEW_ROOT);

  await matchViewRoot.waitFor({
    state: 'visible',
    timeout: AWAIT_COMPONENT_VISIBLE_TIMEOUT,
  });

  const player = page.getByTestId(PLAYER_ONE);
  const playerChangeStrashipButton = player.getByTestId(STARSHIP_CHANGE_BUTTON);

  await playerChangeStrashipButton.click();

  const starshipSelectionListRoot = page.getByTestId(
    STARSHIP_SELECTION_LIST_ROOT
  );

  await expect(starshipSelectionListRoot).toBeVisible();

  const starships = await starshipSelectionListRoot.locator('.item').all();
  const starshipToChoose = starships[2];
  await starshipToChoose.click();

  await expect(starshipSelectionListRoot).not.toBeVisible();

  const starshipToChooseTitle =
    starshipToChoose.getByTestId(STARSHIP_CARD_TITLE);
  const starshipToChooseSubtitle = starshipToChoose.getByTestId(
    STARSHIP_CARD_SUBTITLE
  );
  const starshipToChooseName = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_NAME
  );
  const starshipToChooseModel = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_MODEL
  );
  const starshipToChooseClass = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_CLASS
  );
  const starshipToChoosePower = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_POWER
  );

  const playerStarshipCard = player.getByTestId(STARSHIP_CARD);
  const playerStarshipCardTitle =
    playerStarshipCard.getByTestId(STARSHIP_CARD_TITLE);
  const playerStarshipCardSubtitle = playerStarshipCard.getByTestId(
    STARSHIP_CARD_SUBTITLE
  );
  const playerStarshipCardName = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_NAME
  );
  const playerStarshipCardModel = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_MODEL
  );
  const playerStarshipCardClass = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_CLASS
  );
  const playerStarshipCardPower = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_POWER
  );

  expect(starshipToChooseTitle.innerText).toBe(
    playerStarshipCardTitle.innerText
  );
  expect(starshipToChooseSubtitle.innerText).toBe(
    playerStarshipCardSubtitle.innerText
  );
  expect(starshipToChooseName.innerText).toBe(playerStarshipCardName.innerText);
  expect(starshipToChooseModel.innerText).toBe(
    playerStarshipCardModel.innerText
  );
  expect(starshipToChooseClass.innerText).toBe(
    playerStarshipCardClass.innerText
  );
  expect(starshipToChoosePower.innerText).toBe(
    playerStarshipCardPower.innerText
  );
});

test('change player two starship', async ({ page }) => {
  await page.goto(URL);

  const matchViewRoot = page.getByTestId(MATCH_VIEW_ROOT);

  await matchViewRoot.waitFor({
    state: 'visible',
    timeout: AWAIT_COMPONENT_VISIBLE_TIMEOUT,
  });

  const player = page.getByTestId(PLAYER_TWO);
  const playerChangeStrashipButton = player.getByTestId(STARSHIP_CHANGE_BUTTON);

  await playerChangeStrashipButton.click();

  const starshipSelectionListRoot = page.getByTestId(
    STARSHIP_SELECTION_LIST_ROOT
  );

  await expect(starshipSelectionListRoot).toBeVisible();

  const starships = await starshipSelectionListRoot.locator('.item').all();
  const starshipToChoose = starships[2];
  await starshipToChoose.click();

  await expect(starshipSelectionListRoot).not.toBeVisible();

  const starshipToChooseTitle =
    starshipToChoose.getByTestId(STARSHIP_CARD_TITLE);
  const starshipToChooseSubtitle = starshipToChoose.getByTestId(
    STARSHIP_CARD_SUBTITLE
  );
  const starshipToChooseName = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_NAME
  );
  const starshipToChooseModel = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_MODEL
  );
  const starshipToChooseClass = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_CLASS
  );
  const starshipToChoosePower = starshipToChoose.getByTestId(
    STARSHIP_CARD_INFO_POWER
  );

  const playerStarshipCard = player.getByTestId(STARSHIP_CARD);
  const playerStarshipCardTitle =
    playerStarshipCard.getByTestId(STARSHIP_CARD_TITLE);
  const playerStarshipCardSubtitle = playerStarshipCard.getByTestId(
    STARSHIP_CARD_SUBTITLE
  );
  const playerStarshipCardName = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_NAME
  );
  const playerStarshipCardModel = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_MODEL
  );
  const playerStarshipCardClass = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_CLASS
  );
  const playerStarshipCardPower = playerStarshipCard.getByTestId(
    STARSHIP_CARD_INFO_POWER
  );

  expect(starshipToChooseTitle.innerText).toBe(
    playerStarshipCardTitle.innerText
  );
  expect(starshipToChooseSubtitle.innerText).toBe(
    playerStarshipCardSubtitle.innerText
  );
  expect(starshipToChooseName.innerText).toBe(playerStarshipCardName.innerText);
  expect(starshipToChooseModel.innerText).toBe(
    playerStarshipCardModel.innerText
  );
  expect(starshipToChooseClass.innerText).toBe(
    playerStarshipCardClass.innerText
  );
  expect(starshipToChoosePower.innerText).toBe(
    playerStarshipCardPower.innerText
  );
});

test('fight with single winner', async ({ page }) => {
  await page.goto(URL);

  const matchViewRoot = page.getByTestId(MATCH_VIEW_ROOT);

  await matchViewRoot.waitFor({
    state: 'visible',
    timeout: AWAIT_COMPONENT_VISIBLE_TIMEOUT,
  });

  const starshipSelectionListRoot = page.getByTestId(
    STARSHIP_SELECTION_LIST_ROOT
  );
  let starships;

  // setup player one.
  const playerOne = page.getByTestId(PLAYER_ONE);
  const playerOneChangeStarshipButton = playerOne.getByTestId(
    STARSHIP_CHANGE_BUTTON
  );

  await playerOneChangeStarshipButton.click();

  await expect(starshipSelectionListRoot).toBeVisible();

  starships = await starshipSelectionListRoot.locator('.item').all();
  const playerOneStarship = starships[1];
  await playerOneStarship.click();

  await expect(starshipSelectionListRoot).not.toBeVisible();

  // setup player two.
  const playerTwo = page.getByTestId(PLAYER_TWO);
  const playerTwoChangeStarshipButton = playerTwo.getByTestId(
    STARSHIP_CHANGE_BUTTON
  );

  await playerTwoChangeStarshipButton.click();

  await expect(starshipSelectionListRoot).toBeVisible();

  starships = await starshipSelectionListRoot.locator('.item').all();
  const playerTwoStarship = starships[3];
  await playerTwoStarship.click();

  await expect(starshipSelectionListRoot).not.toBeVisible();

  const fightButton = page.getByTestId(FIGHT_BUTTON);

  // fight
  await fightButton.click();

  const infoSnackbarRoot = page.getByTestId(INFO_SNACKBAR_ROOT);
  const infoSnackbarMessage = infoSnackbarRoot.getByTestId(
    INFO_SNACKBAR_MESSAGE
  );
  const infoSnackbarMessageText = await infoSnackbarMessage.textContent();

  await expect(infoSnackbarRoot).toBeVisible();
  await expect(infoSnackbarMessageText).not.toBe('It is a draw!');
});

test('fight with draw', async ({ page }) => {
  await page.goto(URL);

  const matchViewRoot = page.getByTestId(MATCH_VIEW_ROOT);

  await matchViewRoot.waitFor({
    state: 'visible',
    timeout: AWAIT_COMPONENT_VISIBLE_TIMEOUT,
  });

  const starshipSelectionListRoot = page.getByTestId(
    STARSHIP_SELECTION_LIST_ROOT
  );
  let starships;

  // setup player one.
  const playerOne = page.getByTestId(PLAYER_ONE);
  const playerOneChangeStarshipButton = playerOne.getByTestId(
    STARSHIP_CHANGE_BUTTON
  );

  await playerOneChangeStarshipButton.click();

  await expect(starshipSelectionListRoot).toBeVisible();

  starships = await starshipSelectionListRoot.locator('.item').all();
  const playerOneStarship = starships[1];
  await playerOneStarship.click();

  await expect(starshipSelectionListRoot).not.toBeVisible();

  // setup player two.
  const playerTwo = page.getByTestId(PLAYER_TWO);
  const playerTwoChangeStarshipButton = playerTwo.getByTestId(
    STARSHIP_CHANGE_BUTTON
  );

  await playerTwoChangeStarshipButton.click();

  await expect(starshipSelectionListRoot).toBeVisible();

  starships = await starshipSelectionListRoot.locator('.item').all();
  const playerTwoStarship = starships[1];
  await playerTwoStarship.click();

  await expect(starshipSelectionListRoot).not.toBeVisible();

  const fightButton = page.getByTestId(FIGHT_BUTTON);

  // fight
  await fightButton.click();

  const infoSnackbarRoot = page.getByTestId(INFO_SNACKBAR_ROOT);
  const infoSnackbarMessage = infoSnackbarRoot.getByTestId(
    INFO_SNACKBAR_MESSAGE
  );
  const infoSnackbarMessageText = await infoSnackbarMessage.textContent();

  await expect(infoSnackbarRoot).toBeVisible();
  await expect(infoSnackbarMessageText).toBe('It is a draw!');
});
