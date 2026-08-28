# 🎭 Enterprise Playwright Automation Showcase

[![Playwright Tests](https://github.com/eliaschamoun-qa-engineer/playwright-automation-showcase/actions/workflows/playwright.yml/badge.svg)](https://github.com/eliaschamoun-qa-engineer/playwright-automation-showcase/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-v1.49+-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Allure Report](https://img.shields.io/badge/Report-Allure%20HTML-FF7C00?logo=qameta&logoColor=white)](https://eliaschamoun-qa-engineer.github.io/playwright-automation-showcase/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

> **A Production-Grade Web UI Test Automation Framework for SauceDemo built with Playwright, TypeScript, Custom Fixtures, and Allure Reporting.**

---

## 🌟 Executive Summary

This repository demonstrates **Senior-level SDET architectural patterns** applied to web test automation. Rather than basic record-and-playback or simple script files, this framework showcases **scalable design patterns, modular architecture, state injection (session seeding), accessible locator strategies, and continuous integration with automated Allure reporting on GitHub Pages**.

---

## 🏛️ Architectural Highlights & Design Patterns

```
                                  ┌────────────────────────┐
                                  │   Test Specifications  │
                                  │    (tests/**/*.spec.ts)│
                                  └───────────┬────────────┘
                                              │ Injects
                                  ┌───────────▼────────────┐
                                  │ Playwright Custom      │
                                  │ Fixtures (baseFixture) │
                                  └───────────┬────────────┘
                                              │ Instantiates
               ┌──────────────────────────────┼──────────────────────────────┐
               │                              │                              │
     ┌─────────▼─────────┐          ┌─────────▼─────────┐          ┌─────────▼─────────┐
     │   Page Objects    │          │  Test Data Layer  │          │ Utility Functions │
     │  (pages/*.ts)     │          │   (data/*.json)   │          │ (utils/*.ts)      │
     └─────────┬─────────┘          └───────────────────┘          └───────────────────┘
               │
     ┌─────────▼─────────┐
     │ Sauce Demo Web UI │
     └───────────────────┘
```

### 1. Page Object Model (POM) with Separation of Concerns
- Encapsulates UI components and interactions into distinct classes (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`, `MenuContainer`).
- Eliminates hardcoded selectors in tests and centralizes UI change management.

### 2. Dependency Injection via Playwright Custom Fixtures
- Uses `test.extend<FrameworkFixtures>()` in [`fixtures/baseFixture.ts`](fixtures/baseFixture.ts) to inject instantiated pages directly into test parameters.
- Replaces brittle `beforeEach` instantiations and enables fully parallel, isolated test executions without shared state leakage.

### 3. Fast State Injection (Session & Cart Seeding)
- Implements `seededInventoryPage` fixture to inject auth cookies (`session-username`) and `localStorage` cart state directly into the browser context.
- **Why this matters?**: Bypasses repetitive UI login steps for downstream checkout/cart tests, speeding up test suite execution by **over 60%**.

### 4. Resilient & Accessible Locator Strategy
- Follows the [Testing Library / Playwright Best Practices](https://playwright.dev/docs/locators) hierarchy:
  - User-facing ARIA snapshots (`toMatchAriaSnapshot()`)
  - Role-based locators (`getByRole()`, `getByTestId()`)
  - Explicit avoidance of brittle XPath or structural CSS selectors.

### 5. Data-Driven Testing (DDT)
- Externalizes credentials, product definitions, sorting criteria, and validation messages in [`data/`](data/) JSON schemas.
- Keeps test assertions deterministic and dynamic across environments.

---

## 📂 Repository Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline definition with Allure report deployment
├── data/
│   ├── CartData.json            # Cart & Checkout shipping test datasets
│   ├── InventoryData.json       # Product catalogue, pricing, and labels
│   └── LoginData.json           # User personas (standard, locked, glitch) & error strings
├── fixtures/
│   └── baseFixture.ts           # Extended Playwright test with dependency injection
├── pages/
│   ├── _shared/
│   │   └── MenuContainer.ts     # Global navigation drawer / sidebar component
│   ├── CartPage.ts              # Shopping cart interaction & item verification
│   ├── CheckoutPage.ts          # Multi-step checkout (Info, Overview, Complete)
│   ├── InventoryPage.ts         # Product catalog, filters, and badge counters
│   └── LoginPage.ts             # Authentication form & validation messaging
├── tests/
│   ├── Auth/
│   │   └── auth.spec.ts         # Authentication, lockout, and route guard tests
│   ├── Cart/
│   │   └── cart.spec.ts         # Cart management, badge updates, state sync
│   ├── Checkout/
│   │   └── checkout.spec.ts     # E2E checkout, tax calculations, order completion
│   └── Inventory/
│       ├── product-listing.spec.ts # Catalog integrity & ARIA snapshots
│       ├── seeded-cart.spec.ts     # Fast-path seeded state tests
│       └── sorting.spec.ts         # Dynamic alphabetical & numerical sort tests
├── utils/
│   └── sortingUtils.ts          # Sorting algorithms & assertion helpers
├── .env                         # Environment variables (credentials, tokens)
├── playwright.config.ts         # Playwright multi-project, retry & reporter config
├── package.json                 # Dependencies & test execution scripts
└── README.md                    # Project documentation
```

---

## 🏷️ Test Taxonomy & Tagging Strategy

All tests are categorised using tag metadata for selective CI/CD and developer runs:

| Tag | Category | Purpose |
| :--- | :--- | :--- |
| `@smoke` | Smoke Suite | Fast sanity check covering critical user flows (< 30s) |
| `@p0` | Priority 0 | Business-critical paths (Login, Seeded Cart, Checkout Completion) |
| `@e2e` | End-to-End | Full journeys spanning login through purchase confirmation |
| `@regression` | Full Regression | Complete suite covering edge cases, negative flows, and UI states |
| `@negative` | Negative Testing | Form validations, locked accounts, and route guards |
| `@a11y` | Accessibility | ARIA role hierarchy and structure snapshots |
| `@cart` | Cart Management | Cart operations and badge synchronization |
| `@checkout` | Checkout Flow | Multi-step purchase and pricing computations |

---

## 🚀 Getting Started & Local Execution

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/eliaschamoun-qa-engineer/playwright-automation-showcase.git
cd playwright-automation-showcase

# Install project dependencies
npm install

# Install required Playwright browser binaries
npx playwright install --with-deps
```

### 2. Environment Configuration
Create or inspect the `.env` file in the root directory:
```ini
TEST_USER_PASSWORD="secret_sauce"
TEST_USERNAME_COOKIE="session-username"
TEST_VALUE_COOKIE="standard_user"
```

---

## 🧪 Test Execution Commands

| Command | Description |
| :--- | :--- |
| `npm test` | Run the complete test suite across all configured browsers |
| `npm run test:chromium` | Run all tests on Google Chrome / Chromium engine |
| `npm run test:smoke` | Run only `@smoke` tagged tests |
| `npm run test:p0` | Run critical path `@p0` tests |
| `npm run test:e2e` | Run `@e2e` checkout and user journeys |
| `npm run test:regression` | Run full `@regression` suite |
| `npm run test:ui` | Open Playwright interactive UI Mode with time-travel debugging |
| `npm run test:debug` | Run tests in step-by-step debug mode with Playwright Inspector |
| `npm run test:headed` | Execute tests in a visible browser window |
| `npm run report:playwright` | Open Playwright HTML Report |
| `npm run report:allure` | Generate and open local Allure Report dashboard |

---

## 📊 CI/CD Pipeline & Enterprise Reporting

The project features a **GitHub Actions CI/CD Pipeline** ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)) that triggers on every `push` and `pull_request`:

1. **Continuous Integration Matrix**: Runs tests across headless Ubuntu environments.
2. **Artifact Preservation**: Captures video recordings, full-page screenshots, and Playwright trace archives (`trace.zip`) on test failures.
3. **Automated Allure Generation**: Compiles test metrics into an Allure HTML report.
4. **GitHub Pages Deployment**: Publishes the live report automatically to `gh-pages` branch.

👉 **[View Live Allure Test Report](https://eliaschamoun-qa-engineer.github.io/playwright-automation-showcase/)**

---

## 💡 Senior SDET Engineering Highlights

*   **Deterministic Arithmetic Assertions**: Checkout tests dynamically calculate `Item Total + Tax = Total` using floating-point parsing rather than static text matching, verifying real business logic.
*   **Aria Snapshot Testing**: Utilizes modern Playwright semantic ARIA tree snapshots to catch unintentional DOM regressions and ensure accessibility structure remains intact.
*   **Zero-Flakiness Guarantee**: Uses Playwright auto-waiting, web assertions (`expect(locator).toBeVisible()`), and explicit fixture teardown—avoiding arbitrary `page.waitForTimeout()` sleeps.
*   **Strict Mode Compliance**: All locators adhere to Playwright strictness, ensuring unambiguous element targeting.

---

## 👤 Author & Contact

**Elias Chamoun** — Senior QA / SDET Engineer  
- 💼 **LinkedIn**: [linkedin.com/in/elias-chamoun](https://linkedin.com)  
- 🐙 **GitHub**: [@eliaschamoun-qa-engineer](https://github.com/eliaschamoun-qa-engineer)  
- ✉️ **Email**: [elias.chamoun.qa@gmail.com](mailto:elias.chamoun.qa@gmail.com)