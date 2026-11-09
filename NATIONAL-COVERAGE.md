# National program coverage — September 23, 2026

## Available in the local preview

- All 50 U.S. states and Washington, DC have a state-specific NASEO energy-office directory link.
- Results offer DSIRE lookup and the appropriate EPA household or commercial equipment search. Household and multifamily users also see DOE Home Energy Rebates information.
- Thirteen new, curated program-directory routes cover California, Connecticut, Maine, Massachusetts, New Hampshire, Oregon, Vermont, Washington and Wisconsin. The existing New York catalog is preserved.
- Routes filter by state, audience and selected work. Provider-specific entries require an exact known utility name or a listed alias. The Washington Energy Trust route requires NW Natural gas service.
- Results separate lookup sources from program leads, display research dates and include availability warnings. Copy results includes the source links.
- No national dollar estimates are generated. State selection cannot apply New York rates outside New York.

## Incomplete

This is not a comprehensive utility rebate database. Most states currently have lookup sources only. Municipality, cooperative, territory, household income, equipment model and project timing checks still require administrator review. Program-directory matches are not eligibility determinations.

Automatic program-data refresh is not connected. The current DSIRE API is offered to subscribers, and the legacy public JSON endpoint returned HTTP 403 during research. No subscription was purchased, no account was created and no credentials were requested or stored. Access to an authorized feed, its documentation and applicable usage rights is needed before implementing a live DSIRE integration. Even a feed must be checked for freshness, utility territory, exclusions and overlapping incentives before enabling dollar calculations.

## Sources and maintenance

- NASEO state-office directory: https://www.naseo.org/seos
- DSIRE programs: https://programs.dsireusa.org/system/program
- DSIRE subscriber API information: https://dsireusa.org/dsire-api/
- DSIRE legacy data page: https://dsireusa.org/resources/data-and-tools/
- EPA household rebate search: https://www.energystar.gov/rebate-finder
- EPA commercial rebate searches: https://www.energystar.gov/buildings/save-energy-commercial-buildings/finance-projects/find-rebates
- DOE state home-rebate information: https://www.energy.gov/cmei/scep/home-energy-rebates-program

Each curated route's administrator URL, scope and confirmation requirements are stored in `lib/national.ts`. State-office links were extracted from the NASEO directory into `lib/state-offices.ts`. Research dates indicate a source review, not approval of current funding or a complete rate audit. These dates must not be advanced automatically merely because a URL responds.

Notable availability finding: California's official docket reported HEEHRA Phase I single-family rebates fully reserved in February 2026. The route points to current state information and warns users to check availability. Wisconsin's posted residential page included August 31, 2026 application deadlines for some insulation and solar offers; the directory route does not assume those offers remain open.

## Verification

53 automated tests passed, including state coverage, audience separation, provider/fuel matching, missing inputs, funding warnings and prevention of out-of-state New York calculations. TypeScript and the local preview build passed. Browser checks covered California household results and Texas commercial lookup sources. This update is local preview work; production deployment remains unverified.
