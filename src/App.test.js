import { APP_FULL_NAME, APP_NAME } from "./config/constants";

test("RestateFi branding constants", () => {
  expect(APP_NAME).toBe("RestateFi");
  expect(APP_FULL_NAME).toMatch(/RestateFi/i);
});
