# RebateHarbor transfer — November 9, 2026

This is the current full-stack RebateHarbor source, including Oregon/Washington small-attached tankless, South Carolina Santee Cooper multifamily heat-pump water-heater, Wisconsin custom and the earlier reviewed calculators. It supersedes older static-export instructions in TRANSFER-NOTES.txt and START-HERE.md. This is not a static-only website.

## Move to another Codex workspace

1. Extract RebateHarbor-Service-Portal.zip into a project directory.
2. Extract RebateHarbor-Private-Configuration.zip into that same directory, so `.dev.vars` is at the project root next to package.json. The private ZIP contains the currently configured credentials. Never publish it, commit it, or put it in public website assets. Keep `.dev.vars` ignored by Git.
3. Open that directory in Codex. Ask it to read this file, NATIONAL-REFRESH-SETUP.md, the setup files below and the latest research notes before changing anything.
4. Use Node 22.13 or newer and the pinned pnpm version in package.json. Install dependencies with `pnpm install --frozen-lockfile`. Do not copy node_modules between computers.
5. Run `pnpm check` and `pnpm build`, then `pnpm dev`. Open the printed local HTTP address (normally http://localhost:5173). A different workspace may need network permission for the providers.
6. Configure the execution profile with the installed Sites skill if needed. Original machine-specific cache paths and ignored `.sites-runtime` helpers are not portable and are not included.

Credentials alone do not move application data. Local D1/database records, customer accounts/projects, uploads, cookies and sessions are excluded. On a fresh local database, apply the included migrations using the project's supported D1 tooling. Do not point a new checkout at a production database or publish under the original `.openai/hosting.json` identity without deliberately configuring that destination. No new deployment was made for this transfer.

Google OAuth still depends on the Cloud project's allowed origins, callback and test-user settings. For localhost, retain the configured origin/port and `/api/auth/google/callback`. Copying credentials does not open Google login to all users or grant administrator status to a new account. Public hosting requires its own HTTPS origin, Google configuration and secure host secret storage.

## Services and limits

- Private configuration includes only values already configured here. Missing Stripe, Resend or other credentials are not invented. Inspect the private CONFIGURATION-STATUS.txt for presence only; never paste secret values into a chat or log.
- See AUTH-SETUP.txt, EMAIL-SETUP.md, BILLING-SETUP.md and MEMBERSHIP-SETUP.md. Subscription price is $29.99/month; optional application service is 18% of rebate money actually received. Provider setup and end-to-end payment/email validation remain required.
- Nationwide directory was refreshed November 9. It is not proof of complete utility coverage, current funds or verified formulas. Read NATIONAL-REFRESH-SETUP.md before refreshing; preserve the last complete dataset on failure.
- Latest additions: research/multifamily-or-wa-sc-2026-11-09.md. Only narrowly supported cases calculate; larger buildings, shared systems, unverified model variants and material unresolved conditions remain held. Review windows expire safely.
- Automation configuration belongs to the original Codex workspace and does not transfer merely by extracting this ZIP. Recreate or reconnect maintenance in the destination workspace if needed.

## Verification at transfer

27 targeted calculation/search tests, TypeScript and production build passed before the final transfer packaging. Oregon browser screening showed the current card, document checklist and $350 cost-capped subtotal for a synthetic example. This did not submit a utility application or move real customer documents. Other provider/account/payment flows were not re-tested end to end in this pass.

Suggested message for the other Codex: “Read CODEX-TRANSFER-2026-11-09.md. Set up this existing RebateHarbor source locally using the private configuration without exposing it. Preserve existing changes, verify live lookup and continue the multifamily review queue using current official forms. Do not deploy automatically.”
