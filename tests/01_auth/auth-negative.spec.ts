import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';

test.describe('Authentication - Negative Flows & Form Validations', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('AUTH-02: Verify locked_out_user cannot log in and sees error banner @negative @p1', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(
      loginData.users.locked_out_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.locked_out_user);
    await expect(page).toHaveURL('/');
  });

  test('AUTH-03: Verify validation error when Username is empty @negative', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login('', process.env.TEST_USER_PASSWORD || loginData.users.valid_password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.username_required);
    await expect(page).toHaveURL('/');
  });

  test('AUTH-04: Verify validation error when Password is empty @negative', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(loginData.users.standard_user, '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.password_required);
    await expect(page).toHaveURL('/');
  });

  test('AUTH-05: Verify validation error when both Username and Password are empty @negative', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.username_required);
    await expect(page).toHaveURL('/');
  });

  test('AUTH-06: Verify error when invalid credentials are provided @negative', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(loginData.users.invalid_user, loginData.users.invalid_password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.wrong_credentials);
    await expect(page).toHaveURL('/');
  });

  test('AUTH-07: Verify error banner can be dismissed via X button @ui @negative', async ({
    loginPage,
  }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();

    await loginPage.dismissErrorMessage();
    await expect(loginPage.errorMessage).toBeHidden();
  });
});
