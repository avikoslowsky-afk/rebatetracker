# Efficiency Plus — upgraded calculator

This source project extends the supplied calculator and preserves its measure catalogue, automatic models, saved projects, editable rebate rates and green desktop/mobile design.

## Added
- Required facility, utility, 12-month usage, equipment and pricing evidence.
- Ten-document checklist with Missing / Requested / Received / Verified states.
- Weighted 0–100% confidence, missing-items copy list and automatic project statuses.
- All eight engineering-review triggers, reviewer/date sign-off, and dated installation/payment milestones.
- Validation for rates, hours, efficiency, savings, prices and utility rebate limits.
- Customer proposal with scope, equipment, financial summary, confidence, status, assumptions, missing information, review reasons and next steps.
- Customer copy/print reports use an explicit allowlist: internal costs, fees, profit and margin are excluded.
- Browser draft autosave and checklist updates to saved projects; legacy projects migrate without crediting planning defaults as confirmed evidence.

## Run on a normal development machine
Node.js 22.13+ and pnpm are required. Keep the supplied lockfile.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm lint
pnpm test
pnpm build
pnpm dev
```

`pnpm build` runs the existing Vinext/Cloudflare production build. Open the local address printed by `pnpm dev`.

## Verification in this session
- TypeScript check: passed.
- ESLint: passed, zero warnings.
- Automated review/calculation tests: 16 passed.
- Production build: attempted, BLOCKED by this Windows execution environment (`spawn EPERM` while Vite resolves its configuration and launches a child process).
- Dependency files downloaded and linked, but a required postinstall process was also blocked. Run the install command above in a normal terminal before building.
- Browser QA: passed for calculation updates, multiple measures, saving/reopening/reload, document scoring, validation, rate persistence, checklist copy, customer proposal copy/privacy, and 390px / 1440px layouts. The proposal modal was corrected to stay on-screen.
- Print-report preview opens correctly; an actual print/PDF export was not executed.
- Deployment remains blocked; no live site was changed.

## Decisions and use
Confidence means evidence completeness, not approval probability. Received and Verified documents get full evidence credit except written preapproval, which earns credit only when Verified. Missing and Requested earn no credit. Subchecks split each supplied weight equally; the displayed score is rounded down. A score of 85 or more stays at Ready for Engineering Review if submission blockers remain. All ten documents, including receipt of written preapproval, are required for submission readiness, following the requested checklist literally. Verified written approval sets Utility Preapproved independently of score; it does not certify the accuracy of calculations.

An engineering review must be signed off when automatically required. Evidence and rate edits clear its sign-off. Installation/payment milestones require verified written approval and dates in chronological order no later than today.

Total project price is the sum of installed measure prices, inclusive of the Efficiency Plus fee. The fee is not added twice. Profit is selling price minus equipment, labor, engineering, permit and other costs.

Whole-facility savings compare kWh and therms in common MMBtu units. Manual calculations need explicit physical-energy savings; heat pumps require displaced gas usage for the comparison (zero when displacing another fuel). Only recorded electric and gas usage is included in the facility baseline. Unknown or unconfirmed model inputs remain preliminary. Efficiency comparisons require the same metric and units; choose whether higher or lower values are more efficient.

Program maximums are shared by utility and program source across the project's measures, rather than incorrectly applying the full maximum independently to every line. The inherited National Grid enhanced cost cap remains 85%. The supplied rate catalogue and program assumptions were preserved, not independently reverified against current utility publications.

Projects and account details remain in this browser's local storage. The document checklist tracks evidence status; it does not upload or store actual bills or approval files. For editing internal profitability, expand the internal section in the results panel. Print through the customer proposal, or browser Print; both exclude internal financial fields.

## Main files
- app/page.tsx — existing calculator, project/rate management and report integration.
- app/review-panel.tsx — required fields, checklist and engineering review interface.
- lib/review.ts — model, migration, confidence, validation, caps and customer report allowlist.
- lib/rates.ts — preserved utility catalogue.
- app/globals.css — preserved theme, responsive additions and print isolation.
- tests/review.test.mjs — confidence/status boundaries, triggers, caps, migration and privacy checks.

## Proposal and calculation audit — September 22, 2026

The customer proposal now has a structured investment summary, per-upgrade pricing table, equipment comparison, assumptions, validation and outstanding-information sections. The same document is used in the customer modal and print layout. Internal financial amounts are excluded.

Corrected National Grid annual incentives to use engineer-calculated eligible annual MMBtu saved, not annual heat delivered. ERV/DOAS now uses engineered net kWh/therm savings rather than the generic heat-pump model. PTHP incentives use tons. National Grid cost caps now require eligible material/installation labor cost and exclude unsupported costs; blank eligible cost or annual savings produces no rebate. Saved catalog units are migrated while preserving edited rates. National Grid and enhanced incentives require recorded eligibility confirmation before submission readiness.

Con Edison pipe insulation uses the normal 50% cap, increasing to 70% only when the enhanced offer is selected. The enhanced offer still requires confirmation of eligibility, deadlines, participant limits, funding and utility approval. This calculator does not track a contractor's bonus usage across other projects.

Official reference documents checked:
- https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/national-grid-commercial-building-heating-electrification-program-guidebook_mar-2-2026.pdf
- https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/commercial-and-industrial-program/incentive-fact-sheet.pdf
- https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades

To validate a real project, supply 12 consecutive months of full electric/gas bills (including supply, delivery, usage and demand pages), the contractor quote, existing/proposed equipment specifications, operating schedules and any utility incentive letter. The document checklist tracks evidence; it does not upload or parse bills. Avoidable energy rates must exclude fixed/demand charges unless modeled separately. Savings are planning calculations, not a calibrated engineering model. Confirm the service territory, rate class, system size, eligible measures, interaction between measures and program path with the utility. Zero-year payback is displayed correctly when a positive-savings project is fully subsidized.

Validation: 22 calculation/regression tests; TypeScript and ESLint; local browser proposal totals, financial privacy and 390px responsive layout. Production Vinext build remains unverified because this Windows environment blocks a required child process (spawn EPERM). The local browser preview is not a published deployment. Print-specific pagination has not been verified in a generated PDF.

## Testing workflow update

- Try sample project / Reset demo opens a clearly labeled synthetic scenario. Demo reports and clipboard summaries are marked; demos cannot become utility-approved or submission-ready.
- Starting, importing or opening another project preserves the current project in the local library.
- Enter the first billing month to label all 12 months. A real assessment requires this date; incomplete histories remain available for testing.
- No gas service hides gas account/rate requirements, disables gas history and excludes stale gas usage from annual totals. Gas-saving measures still present create a blocking warning. Existing gas entries are preserved when toggling back.
- Project backup JSON can be downloaded or selected/copied from the export dialog. Import validates the known shape, previews the project, creates new IDs, preserves existing records, and clears engineering sign-off. Calculations use the current rate catalog. Backups include internal pricing; attachments are excluded.
- PDF/PNG/JPG bill attachments are stored in IndexedDB on this device, limited to 24 files/project and 10 MB/file. They are not transmitted, parsed or automatically verified. Automatic bill extraction and cross-device file storage remain future work. Keep original files; clearing browser data loses local attachments.
- Customer proposals now group missing information by category; the detailed internal checklist remains available.
- Rate guidance separates avoidable energy rates from fixed and demand charges. Demand savings are not modeled.

Validation: 29 regression tests and TypeScript passed. Browser-tested sample totals, no-gas fields, month labels, attachment storage, import review, preserved library and demo proposal. Native downloads could not be confirmed in the embedded preview; the export dialog includes selectable backup text as a fallback. Full production build/deployment and generated PDF pagination remain unverified as described above.

## Workspace design refresh

The calculator now uses a three-section workflow (Choose upgrades, Project details, Review & finish), a compact expandable tools drawer, a light navigation header, consistent input/card styling, visible estimate cards, and a desktop estimate sidebar. Continue actions scroll to the next section and respect reduced-motion settings. Section switches preserve entered data. Mobile navigation and form layouts were visually checked at 390px; desktop was checked at 1440px. The existing calculation model is unchanged. TypeScript validation passes; production and PDF limitations above still apply.

## New York business program finder

The Find programs tab now opens a four-step questionnaire covering business type, region, separate electric/gas delivery utilities, project stage, ownership, SBC status, demand and planned upgrades. It screens 29 curated utility, NYSERDA and NYPA program/directory routes. Results explain the match, link to official sources and list remaining eligibility checks. Answers are saved with projects and included in JSON backups.

Coverage is not an exhaustive or automatically refreshed statewide eligibility database. Sources were researched September 22, 2026. National Fuel's referenced page still labels its rates 2025 and is explicitly flagged for current-year confirmation. Municipal, cooperative and other unmatched utility programs require manual review. Directory matches are leads, not approvals. Financing and power allocations are distinguished from rebates. No unverified incentive is added to the estimate.

The calculation engine still covers selected Con Edison and National Grid measures only; matching another utility does not make its rebate rates available. Bills are not required for initial screening, but current bills, account/service class and project documents are needed to validate eligibility and savings.

Validation: 36 regression tests and TypeScript passed. Browser checks verified split electric/gas utility matching, Long Island results, saved answers after reload and mobile layout without horizontal overflow. No browser warnings/errors were observed. Production build/deployment and PDF limitations above remain.

## Con Edison priority and understandable screening

Results now begin with a plain-language project assessment, a suggested starting point and specific evidence requests. Matching Con Edison routes sort first, including added electrification, multifamily, EV, demand-response and distributor pathways. The catalog has 34 curated routes, with an official Con Edison full directory link; this is not a claim that every individual offering has automated eligibility rules. Conflicting fuel/service or upstate/NYC answers and invalid negative/non-numeric demand/employee values stop matching. Missing demand is explicitly flagged before distinguishing Con Edison small-business and C&I routes. Multifamily routes are separated from C&I. Assessment text is also included in copied results. Sources checked September 22, 2026. Forty regression tests passed; TypeScript and browser checks passed. Prior production-build limitations remain.

## Home and business questionnaire — September 23, 2026

The finder now starts with Homeowner, Renter, Multifamily owner/manager, Small business/nonprofit, or Commercial/industrial. Home questions exclude commercial demand and employee fields. Thirteen residential program/directory routes are screened separately from the existing business catalog. EmPower+ is limited in this screening to confirmed 1–4-family buildings; income eligibility is deferred to the official county/household screening. The legacy RG&E residential rebate is explicitly marked closed and linked only for alternatives. No residential award amount or income eligibility is calculated.

Results describe the project, relevant programs, official next steps and missing evidence. Uncalculated amounts display as unknown, not zero. Residential, multifamily and unsupported utility selections cannot open unrelated business estimates. Existing supported commercial calculations remain planning estimates; inputs and current rates require verification. This is not exhaustive all-utility/program coverage or a guarantee of financial accuracy. The app remains a local testing preview, not a production deployment.

Validation: 48 regression tests, TypeScript, local preview compilation and browser checks of the homeowner flow and calculator guard.

## Nationwide intake update — September 23, 2026

The questionnaire now accepts all 50 U.S. states and Washington, DC. The live summary updates as answers change. Changing states clears incompatible utility, territory and eligibility answers.

Detailed program matching remains limited to the New York catalog. Other states display a coverage gap and links to DSIRE and DOE; they do not inherit New York rebate amounts. National program ingestion, verified state-specific eligibility and automatic source refresh are not implemented. No nationwide dollar estimates are available.

Validation: 49 automated tests passed, including state coverage and prevention of New York calculations outside New York. TypeScript check passed. Browser testing verified California selection and the explicit coverage notice. Local preview only; production deployment remains unverified.

## National sources and initial program routes — September 23, 2026

The all-state intake now links to state-specific energy-office contacts and household/business rebate lookup tools. Thirteen additional curated routes cover nine states beyond New York. Results distinguish lookup sources from program leads and flag funding uncertainty. See NATIONAL-COVERAGE.md for the exact scope, verification and data-access limitation. This supersedes the earlier note that every non-New-York state had no matching routes. Nationwide coverage is still partial; automatic updates and national dollar calculations are not implemented.

## Multi-page website update

Added a redesigned home page and separate URLs: /rebates, /estimate, /applications, /projects, and /rates. Navigation supports browser history and direct-page refresh in the local preview. Shared draft data remains stored on this device.

Applications supports project details, local PDF/image attachments and a downloadable preparation summary. It is not an official program application, does not embed attachments, and cannot submit to utilities. No submitted/approved status is fabricated. The original limited calculation catalog and partial national program coverage remain; comprehensive active-only rebate verification still needs implementation and a current data source.

Validation: TypeScript, preview build and all 53 existing tests passed. Browser verification covered navigation to /applications, reload, retained project data and home-page appearance. This is a local testing preview, not a production launch.


## Simple homeowner experience (September 23, 2026)
The home page now has a For my home entry point. It preserves the previous project before starting a home project. The home flow asks for state, electric utility and upgrade. The selected ACE NJ heat pump water heater rule estimates one unit at the lower of $750 or equipment cost, after quote/date and contractor confirmations. The rule is limited to planned replacements; fossil-fuel conversions are excluded. Unknown utilities/measures do not return zero. Rates are hidden after the local review deadline (October 23, 2026); this is a conservative review gate, not live funding verification. See lib/home-estimate.ts for dated official sources. Quote details are temporary and can be copied; the utility application is linked, not submitted. Nationwide coverage remains partial.


## Guided applications and membership preview
Applications now use five steps with local project persistence, missing-field review, document preparation, a text packet download and self-recorded external submission receipt. No official PDF is auto-filled and no application is submitted. The ACE homeowner result links into the supported preparation pathway. /membership describes homeowner one-time support and recurring professional plans; prices are unpublished, no checkout starts, and there is no paid entitlement or customer authentication. Live payments require approved prices, a merchant payment integration, secure customer accounts and verified subscription lifecycle handling. Live application handling also requires program-specific forms and supported utility submission access. Do not launch this browser-local preview as a paid service.


## Website redesign
Rebuilt the homepage with distinct home/business entry points, functional upgrade shortcuts, a preparation overview and project continuation. Applied navy/blue/white styling across finder, estimate, applications, membership, projects and rates. Added collapsible mobile navigation with page selection state. Verified desktop and 390px mobile layouts; preserved program calculations, saved-project formats and existing local-only integration limits.


## Address-first search
Homepage and /start now use POST /api/address-lookup. The server sends the entered address to the Census geographies API, then sends coordinates only to the public ArcGIS HIFLD electric retail territory layer. Geographic state is used rather than mailing state. Candidates and source validation dates are displayed; nothing is saved to a project until the customer confirms address/electric service and continues. Map coverage may be incomplete or old, overlaps are not automatically resolved, and gas matching is not connected. Do not treat a territory candidate as account verification or rebate eligibility. Manual entry remains available. The local preview server now imports TypeScript route code: node --experimental-strip-types work/scripts/serve-preview.mjs. Outbound network access to Census and services3.arcgis.com is required. Live test used only the Census documentation sample address.


## Plain-language project guide
After address confirmation or starting from a state page, /project-guide asks about building/permission, planned upgrades, current heating and project timing. It explains why each question matters, includes unknown answers, preserves responses in the project finder, blocks the no-gas/natural-gas contradiction on the heating step, and opens existing program results with those answers. It summarizes unknowns and next actions without inventing rebate amounts or eligibility.
