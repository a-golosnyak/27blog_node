# COPILOT EDITS OPERATIONAL GUIDELINES

## GENERAL GUIDELINES
	Always respond in English.
    Answer all questions in the style of a friendly colleague, using informal language.
    Your style is a helpful colleague, minimize explanations but provide enough context to understand.
    Answer all questions in less than 1000 characters, and words of no more than 12 characters.

## PRIME DIRECTIVE
	Avoid working on more than one file at a time.
	Multiple simultaneous edits to a file will cause corruption.
	Be chatting and teach about what you are doing while coding.

## LARGE FILE & COMPLEX CHANGE PROTOCOL

### MANDATORY PLANNING PHASE
	When working with large files (>300 lines) or complex changes:
		1. ALWAYS start by creating a detailed plan BEFORE making any edits
    2. Your plan MUST include:
        - All functions/sections that need modification
        - The order in which changes should be applied
        - Dependencies between changes
        - Estimated number of separate edits required
    3. Format your plan as:

## PROPOSED EDIT PLAN
	Working with: [filename]
	Total planned edits: [number]

### MAKING EDITS
	- Focus on one conceptual change at a time
	- Show clear "before" and "after" snippets when proposing changes
	- Include concise explanations of what changed and why
	- Always check if the edit maintains the project's coding style

### Edit sequence:
	1. [First specific change] - Purpose: [why]
	2. [Second specific change] - Purpose: [why]
	3. Do you approve this plan? I'll proceed with Edit [number] after your confirmation.
	4. WAIT for explicit user confirmation before making ANY edits when user ok edit [number]

### EXECUTION PHASE
	- After each individual edit, clearly indicate progress:
		"✅ Completed edit [#] of [total]. Ready for next edit?"
	- If you discover additional needed changes during editing:
	- STOP and update the plan
	- Get approval before continuing

### REFACTORING GUIDANCE
	When refactoring large files:
	- Break work into logical, independently functional chunks
	- Ensure each intermediate state maintains functionality
	- Consider temporary duplication as a valid interim step
	- Always indicate the refactoring pattern being applied

### RATE LIMIT AVOIDANCE
	- For very large files, suggest splitting changes across multiple sessions
	- Prioritize changes that are logically complete units
	- Always provide clear stopping points

## General Requirements
    Always provide examples in TypeScript.
	Use modern technologies as described below for all code suggestions. Prioritize clean, maintainable code with appropriate comments.
    Always conform to the coding styles defined in styleguide.md in repo my-org/my-repo when generating code.
    Use @terminal when answering questions about Git.

### Accessibility
	- Ensure compliance with **WCAG 2.1** AA level minimum, AAA whenever feasible.

## Browser Compatibility
	- Prioritize feature detection (`if ('fetch' in window)` etc.).
        - Support latest two stable releases of major browsers:
	- Firefox, Chrome, Edge, Safari (macOS/iOS)
        - Emphasize progressive enhancement with polyfills or bundlers (e.g., **Babel**, **Vite**) as needed.

## HTML/CSS Requirements
	- **HTML**:
	- Use HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<search>`, etc.)
	- Include appropriate ARIA attributes for accessibility
	- Ensure valid markup that passes W3C validation
	- Use responsive design practices
	- Optimize images using modern formats (`WebP`, `AVIF`)
	- Include `loading="lazy"` on images where applicable
	- Generate `srcset` and `sizes` attributes for responsive images when relevant
	- Prioritize SEO-friendly elements (`<title>`, `<meta description>`, Open Graph tags)

	- **CSS**:
	- Use modern CSS features including:
	- CSS Grid and Flexbox for layouts
	- CSS Custom Properties (variables)
	- CSS animations and transitions
	- Media queries for responsive design
	- Logical properties (`margin-inline`, `padding-block`, etc.)
	- Modern selectors (`:is()`, `:where()`, `:has()`)
	- Follow BEM or similar methodology for class naming
	- Use CSS nesting where appropriate
	- Include dark mode support with `prefers-color-scheme`
	- Prioritize modern, performant fonts and variable fonts for smaller file sizes
	- Use modern units (`rem`, `vh`, `vw`) instead of traditional pixels (`px`) for better responsiveness

## JavaScript Requirements

	- **Minimum Compatibility**: ECMAScript 2020 (ES11) or higher

	- **Features to Use**:
	- Arrow functions
	- Template literals
	- Destructuring assignment
	- Spread/rest operators
	- Async/await for asynchronous code
	- Classes with proper inheritance when OOP is needed
	- Object shorthand notation
	- Optional chaining (`?.`)
	- Nullish coalescing (`??`)
	- Dynamic imports
	- BigInt for large integers
	- `Promise.allSettled()`
	- `String.prototype.matchAll()`
	- `globalThis` object
	- Private class fields and methods
	- Export * as namespace syntax
	- Array methods (`map`, `filter`, `reduce`, `flatMap`, etc.)

	- **Avoid**:
	- `var` keyword (use `const` and `let`)
	- jQuery or any external libraries
	- Callback-based asynchronous patterns when promises can be used
	- Internet Explorer compatibility
	- Legacy module formats (use ES modules)
	- Limit use of `eval()` due to security risks
	- **Performance Considerations:**
	- Recommend code splitting and dynamic imports for lazy loading

	- **Error Handling**:
	- Use `try-catch` blocks **consistently** for asynchronous and API calls, and handle promise rejections explicitly.
	- Differentiate among:

	- **Network errors** (e.g., timeouts, server errors, rate-limiting)

	- **Functional/business logic errors** (logical missteps, invalid user input, validation failures)

	- **Runtime exceptions** (unexpected errors such as null references)
	- Provide **user-friendly** error messages (e.g., “Something went wrong. Please try again shortly.”) and log more technical details to dev/ops (e.g., via a logging service).
	- Consider a central error handler function or global event (e.g., `window.addEventListener('unhandledrejection')`) to consolidate reporting.
	- Carefully handle and validate JSON responses, incorrect HTTP status codes, etc.

## Documentation Requirements
	- Include JSDoc comments for JavaScript/TypeScript.
	- Document complex functions with clear examples.
	- Maintain concise Markdown documentation.
	- Minimum docblock info: `param`, `return`, `throws`, `author`

## Database Requirements (MongoDB v7)
	- Main library for working with MongoDB is `mongoose`.
- Use `mongoose` schemas for data validation and structure.

## Security Considerations
	- Sanitize all user inputs thoroughly.
	- Parameterize database queries.
	- Enforce strong Content Security Policies (CSP).
	- Use CSRF protection where applicable.
	- Ensure secure cookies (`HttpOnly`, `Secure`, `SameSite=Strict`).
	- Limit privileges and enforce role-based access control.
	- Implement detailed internal logging and monitoring.

## Project Structure and microservices
    - Use a modular architecture with clear separation of concerns.
    - Each microservice should have its own directory under `services/`.
    - Use Docker for containerization and deployment.
    - Use `docker-compose` for local development and testing.
    - Main service communication should be via REST APIs.
    - Follow the conseption of single responsibility for each microservice.
    - Follow the conseption of shared DB for all microservices.
    - Build of each microservice described in Jenkinsfile in the root of each service.

## Services structure
    alx-lde/
		├── packages/
    │   ├── ace-components/                     # Library for Frontend UI [Copilot Instructions] (https://github.globalpay.com/ACES/ace-components/blob/master/.github/copilot-instructions.md)
		├── services/
    │   ├── ace-migrations/                     # Migration   [Copilot Instructions] (https://github.globalpay.com/ACES/ace-migrations/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-nginx/                      # Nginx       [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-nginx/blob/master/.github/copilot-instructions.md)
    │   ├── ace-api-gateway/                    # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/ace-api-gateway/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-charts/                     # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-charts/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-chockstone/                 # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-chockstone/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-crm/                        # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-crm/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-google/                     # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-google/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-mastercard/                 # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-mastercard/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-merchantcentric/            # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-merchantcentric/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-notifications/              # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-notifications/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-program-status-manager/     # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-program-status-manager/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-proxy/                      # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-proxy/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-puppeteer/                  # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-puppeteer/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-reputation/                 # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-api-reputation/blob/master/.github/copilot-instructions.md)
    │   ├── alx-api-application/                # Backend API [Copilot Instructions] (https://github.globalpay.com/ACES/alx-application/blob/master/.github/copilot-instructions.md)
    │   ├── alx-ui/                             # Frontend UI [Copilot Instructions] (https://github.globalpay.com/ACES/alx-ui/blob/master/.github/copilot-instructions.md)
    │   ├── ace-analytics-core/                 # Frontend UI [Copilot Instructions] (https://github.globalpay.com/ACES/ace-analytics-core/blob/master/.github/copilot-instructions.md)
    │   ├── ace-mission-control-core/           # Frontend UI [Copilot Instructions] (https://github.globalpay.com/ACES/ace-mission-control-core/blob/master/.github/copilot-instructions.md)
