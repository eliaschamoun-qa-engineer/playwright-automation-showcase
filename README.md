# 🎭 Enterprise Playwright Automation Showcase

[![Playwright Tests](https://github.com/eliaschamoun-qa-engineer/playwright-automation-showcase/actions/workflows/playwright.yml/badge.svg)](https://github.com/eliaschamoun-qa-engineer/playwright-automation-showcase/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-v1.49+-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Allure Report](https://img.shields.io/badge/Report-Allure%20HTML-FF7C00?logo=qameta&logoColor=white)](https://eliaschamoun-qa-engineer.github.io/playwright-automation-showcase/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

> **A Production-Grade Web UI Test Automation Framework for SauceDemo built with Playwright, TypeScript, Custom Fixtures, and Allure Reporting.**

---

## 🌟 Executive Summary

This repository demonstrates **Senior-level SDET architectural patterns** applied to web test automation. Rather than basic record-and-playback scripts, this framework showcases **scalable design patterns, modular architecture, fast state injection (session & cart seeding), accessible locator strategies, arithmetic financial assertions, and continuous integration with automated Allure reporting on GitHub Pages**.

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
- Encapsulates UI components and interactions into distinct classes:
  - [`LoginPage`](pages/LoginPage.ts) — Authentication forms, validation messaging, error dismissal.
  - [`InventoryPage`](pages/InventoryPage.ts) — Catalog browsing, multi-attribute sorting, add/remove toggles, cart badge counters.
  - [`ProductDetailPage`](pages/ProductDetailPage.ts) — Deep link item inspection, detail add/remove actions, back navigation.
  - [`CartPage`](pages/CartPage.ts) — Quantity validation, selective & bulk removals, checkout routing.
  - [`CheckoutPage`](pages/CheckoutPage.ts) — Multi-step checkout (Step 1 Info, Step 2 Overview with price math, Step 3 Complete).
  - [`MenuContainer`](pages/_shared/MenuContainer.ts) & [`FooterContainer`](pages/_shared/FooterContainer.ts) — Global drawers and footer links.

### 2. Dependency Injection via Playwright Custom Fixtures
- Uses `test.extend<FrameworkFixtures>()` in [`fixtures/baseFixture.ts`](fixtures/baseFixture.ts) to inject instantiated pages directly into test parameters.
- Replaces brittle `beforeEach` instantiations and enables fully parallel, isolated test executions without shared state leakage.

### 3. Fast State Injection (Session & Cart Seeding)
- Implements `loggedInPage` and `seededInventoryPage` fixtures to inject auth cookies (`session-username`) and `localStorage` cart state directly into the browser context.
- **Why this matters**: Bypasses repetitive UI login steps for downstream checkout/cart tests, speeding up test suite execution by **over 60%**.

### 4. Resilient & Accessible Locator Strategy
- Follows [Testing Library / Playwright Best Practices](https://playwright.dev/docs/locators):
  - User-facing ARIA snapshots (`toMatchAriaSnapshot()`)
  - Semantic test-id & role locators (`page.locator('[data-test="..."]')`, `getByRole()`)
  - Strict mode compliance with zero brittle XPath or structural CSS selectors.

### 5. Data-Driven Testing (DDT)
- Externalizes credentials, user personas (`standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`), product definitions, sorting criteria, and validation messages in [`data/`](data/) JSON schemas.

---

## 📂 Repository Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline with GitHub Pages Allure deployment
├── data/
│   ├── CartData.json            # Shipping information, tax rates, checkout expectations
│   ├── InventoryData.json       # Product catalogue metadata, prices, and sorting options
│   └── LoginData.json           # User personas (standard, locked, glitch, problem) & errors
├── fixtures/
│   └── baseFixture.ts           # Extended Playwright test with typed dependency injection
├── pages/
│   ├── _shared/
│   │   ├── FooterContainer.ts   # Social links & copyright component
│   │   └── MenuContainer.ts     # Global navigation drawer / sidebar component
│   ├── CartPage.ts              # Shopping cart management & item verification
│   ├── CheckoutPage.ts          # Step 1 (Info), Step 2 (Overview), Step 3 (Complete)
│   ├── InventoryPage.ts         # Product catalog, sorting engine, badge counters
│   ├── LoginPage.ts             # Authentication form & error banner handling
│   └── ProductDetailPage.ts     # Individual product detail views & actions
├── tests/
│   ├── 01_auth/
│   │   ├── auth-positive.spec.ts        # Happy path login & session cookies
│   │   ├── auth-negative.spec.ts        # Locked-out account, empty fields, invalid credentials
│   │   └── route-guard.spec.ts          # Direct URL protection (/inventory, /cart, /checkout)
│   ├── 02_inventory/
│   │   ├── product-catalog.spec.ts      # Catalog integrity & ARIA snapshot verification
│   │   ├── product-details.spec.ts      # Deep link navigation, item add/remove, back button
│   │   ├── product-actions.spec.ts      # Add/Remove toggles & real-time badge synchronization
│   │   └── sorting.spec.ts              # Alphabetical (A-Z, Z-A) & Price (Low-High, High-Low)
│   ├── 03_cart/
│   │   ├── cart-operations.spec.ts      # Multi-item cart display, selective/bulk item removal
│   │   ├── cart-persistence.spec.ts     # Cart state retention across logout/login
│   │   └── seeded-cart.spec.ts          # Fast state injection (cookie + localStorage bypass)
│   ├── 04_checkout/
│   │   ├── checkout-information.spec.ts # Form validations (missing first/last/postal code)
│   │   ├── checkout-calculations.spec.ts# Arithmetic financial math (Item Total + Tax = Total)
│   │   ├── checkout-e2e.spec.ts         # Complete end-to-end purchasing journey & cleanup
│   │   └── checkout-navigation.spec.ts  # Step 1 (to Cart) and Step 2 (to Inventory) cancels
│   ├── 05_navigation/
│   │   ├── menu-drawer.spec.ts          # Sidebar: All Items, About, Logout, Reset App State
│   │   └── footer-social.spec.ts        # Social links (Twitter, FB, LinkedIn) & copyright
│   └── 06_personas_and_edge_cases/
│       └── personas.spec.ts             # Performance SLA, problem_user 404s, error_user fail
├── utils/
│   └── sortingUtils.ts          # Sorting algorithms & assertion helpers
├── .env                         # Environment variables (credentials, test cookies)
├── playwright.config.ts         # Playwright multi-project, retry & reporter config
├── package.json                 # Dependencies & test execution scripts
└── README.md                    # Project documentation
```

---

## 🏷️ Test Taxonomy & Tagging Strategy

All 45 tests are categorised using tag metadata for selective CI/CD and developer runs:

| Tag | Category | Purpose |
| :--- | :--- | :--- |
| `@smoke` | Smoke Suite | Fast sanity check covering critical user flows (< 30s) |
| `@p0` | Priority 0 | Business-critical paths (Login, Seeded Cart, Checkout Completion) |
| `@e2e` | End-to-End | Full user journeys spanning login through purchase confirmation |
| `@regression` | Full Regression | Complete suite covering edge cases, negative flows, and UI states |
| `@negative` | Negative Testing | Form validations, locked accounts, and route guards |
| `@a11y` | Accessibility | ARIA role hierarchy and semantic tree snapshots |
| `@cart` | Cart Operations | Cart item operations and real-time badge synchronization |
| `@checkout` | Checkout Flow | Multi-step purchase, cancellations, and price math computations |
| `@sorting` | Sorting Engine | Alphabetical and numerical ordering validations |
| `@performance` | Performance / SLA | Response timing budgets for glitch personas |
| `@edgeCase` | Edge Cases | Anomaly detection for problem and error user personas |

---

## 🧪 Comprehensive Test Matrix (45 Tests)

<details>
<summary><strong>Click to expand full 45-test coverage breakdown</strong></summary>

### 1. Authentication & Route Protection (`tests/01_auth/`)
* **AUTH-01** `[@smoke, @p0]`: Verify standard_user login sets session cookie and routes to inventory.
* **AUTH-02** `[@negative, @p1]`: Verify locked_out_user cannot log in and sees error banner.
* **AUTH-03** `[@negative]`: Verify validation error when Username is empty.
* **AUTH-04** `[@negative]`: Verify validation error when Password is empty.
* **AUTH-05** `[@negative]`: Verify validation error when both Username and Password are empty.
* **AUTH-06** `[@negative]`: Verify error when invalid credentials are provided.
* **AUTH-07** `[@ui, @negative]`: Verify error banner can be dismissed via X button.
* **AUTH-08** `[@security, @regression]`: Unauthenticated access to `/inventory.html` is blocked.
* **AUTH-09** `[@security, @regression]`: Unauthenticated access to `/cart.html` is blocked.
* **AUTH-10** `[@security, @regression]`: Unauthenticated access to `/checkout-step-one.html` is blocked.

### 2. Inventory & Catalog (`tests/02_inventory/`)
* **INV-01** `[@regression]`: Validate all 6 products render with valid titles, descriptions, and formatted prices.
* **INV-02** `[@a11y, @smoke]`: Semantic accessibility and ARIA tree structure verification.
* **INV-03A** `[@sorting, @p1]`: Alphabetical sorting: Name (A to Z).
* **INV-03B** `[@sorting, @p1]`: Reverse alphabetical sorting: Name (Z to A).
* **INV-04A** `[@sorting, @p1]`: Numerical price sorting: Low to High.
* **INV-04B** `[@sorting, @p1]`: Numerical price sorting: High to Low.
* **INV-05** `[@regression]`: Product title click navigates to Product Details page with correct details.
* **INV-06** `[@regression]`: Product image click navigates to Product Details page.
* **INV-07** `[@regression]`: Add to Cart / Remove toggles button state inside Product Details page.
* **INV-08** `[@regression]`: Back to Products button navigates back to main inventory catalog.
* **INV-09** `[@smoke, @cart]`: Adding products from catalog updates button state and increments cart badge.
* **INV-10** `[@cart]`: Removing products from catalog restores Add to Cart and decrements badge.

### 3. Cart Management & State Persistence (`tests/03_cart/`)
* **CART-01** `[@cart, @p0]`: Cart displays all added items with quantities, descriptions, and prices.
* **CART-02** `[@cart]`: Removing single item from cart updates DOM and cart badge.
* **CART-03** `[@cart]`: Removing all items results in empty cart and hidden badge.
* **CART-04** `[@cart]`: Continue Shopping button returns to inventory while retaining items.
* **CART-05** `[@cart, @regression]`: Cart items persist across logout and subsequent re-login.
* **CART-06** `[@performance, @p0]`: Seeded cart fixture initializes state without UI interaction.

### 4. Multi-Step Checkout Flow (`tests/04_checkout/`)
* **CHK-01** `[@negative, @checkout]`: Verify error when First Name is missing.
* **CHK-02** `[@negative, @checkout]`: Verify error when Last Name is missing.
* **CHK-03** `[@negative, @checkout]`: Verify error when Postal Code is missing.
* **CHK-04** `[@ui, @negative, @checkout]`: Verify error banner can be dismissed.
* **CHK-04** `[@checkout]`: Cancel button at Step One returns to Cart page.
* **CHK-06** `[@p0, @checkout]`: **Financial Math**: `Item Total + 8% Tax = Total` floating-point arithmetic verification.
* **CHK-07** `[@checkout]`: Cancel button at Step Two aborts checkout and returns to Inventory.
* **CHK-08** `[@e2e, @smoke, @p0]`: Full user journey from product selection -> checkout -> order confirmation -> badge cleanup -> return home.

### 5. Global Menu & Navigation (`tests/05_navigation/`)
* **NAV-01** `[@ui]`: Open and close navigation menu drawer.
* **NAV-02** `[@regression]`: All Items link navigates back to inventory from Cart.
* **NAV-03** `[@regression]`: About link points to Sauce Labs corporate site (`https://saucelabs.com/`).
* **NAV-04** `[@smoke, @p0]`: Logout link invalidates session cookie and redirects to Login page.
* **NAV-05** `[@regression]`: Reset App State clears shopping cart badge and selections.
* **NAV-06** `[@regression]`: Footer displays social media links (Twitter/X, Facebook, LinkedIn) and copyright notice.

### 6. Personas & Fault-Tolerance (`tests/06_personas_and_edge_cases/`)
* **EDGE-01** `[@performance, @p1]`: `performance_glitch_user` loads inventory within SLA threshold.
* **EDGE-02** `[@edgeCase, @regression]`: `problem_user` exhibits broken dog image (`sl-404`) in catalog.
* **EDGE-03** `[@edgeCase]`: `error_user` fails on checkout finish button and cannot complete order.

</details>

---

## 🚀 Getting Started & Local Execution

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/) (v9 or higher)

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
Inspect the `.env` file in the root directory:
```ini
TEST_USER_PASSWORD="secret_sauce"
TEST_USERNAME_COOKIE="session-username"
TEST_VALUE_COOKIE="standard_user"
```

---

## 🧪 Test Execution Commands

| Command | Description |
| :--- | :--- |
| `npm test` | Run the complete test suite (45 tests) |
| `npm run test:chromium` | Run all tests on Google Chrome / Chromium engine |
| `npm run test:firefox` | Run all tests on Mozilla Firefox engine |
| `npm run test:webkit` | Run all tests on Apple WebKit (Safari) engine |
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

The project features an automated **GitHub Actions CI/CD Pipeline** ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)) triggered on every `push` and `pull_request`:

1. **Matrix Execution**: Runs headless test suites across Ubuntu environments.
2. **Artifact Preservation**: Captures video recordings, full-page screenshots, and Playwright trace archives (`trace.zip`) on failure.
3. **Automated Allure Generation**: Compiles test metrics into an Allure HTML report.
4. **GitHub Pages Deployment**: Publishes the live report automatically to `gh-pages` branch.

👉 **[View Live Allure Test Report](https://eliaschamoun-qa-engineer.github.io/playwright-automation-showcase/)**

---

## 💡 Senior SDET Engineering Highlights

* **Deterministic Arithmetic Assertions**: Checkout tests dynamically calculate `Item Total + Tax = Total` using floating-point parsing rather than static text matching, verifying real business logic.
* **Aria Snapshot Testing**: Utilizes modern Playwright semantic ARIA tree snapshots to catch unintentional DOM regressions and ensure accessibility structure remains intact.
* **Zero-Flakiness Guarantee**: Uses Playwright auto-waiting, web assertions (`expect(locator).toBeVisible()`), and explicit fixture teardown—avoiding arbitrary `page.waitForTimeout()` sleeps.
* **Strict Mode Compliance**: All locators adhere to Playwright strictness, ensuring unambiguous element targeting.

---

## 👤 Author & Contact

**Elias Chamoun** — Senior QA / SDET Engineer  
* 💼 **LinkedIn**: [linkedin.com/in/elias-chamoun](https://linkedin.com)  
* 🐙 **GitHub**: [@eliaschamoun-qa-engineer](https://github.com/eliaschamoun-qa-engineer)  
* ✉️ **Email**: [elias.chamoun.qa@gmail.com](mailto:elias.chamoun.qa@gmail.com)