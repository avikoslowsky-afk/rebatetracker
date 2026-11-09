# Nationwide source refresh

The GitHub workflow `.github/workflows/national-rebate-refresh.yml` imports the
public EPA ENERGY STAR directory daily at 09:23 UTC and supports manual runs.
It runs after this source is pushed to the repository default branch with Actions
enabled. It is not running merely because the local file exists.

Successful runs produce a downloadable data snapshot and change report. Failed
or incomplete crawls do not replace the existing data. The report flags added,
removed and changed rates, dates, URLs and sponsor details. A fresh snapshot is
not evidence that funding is available or eligibility rules are verified.

The workflow does not deploy the website. Review changed program rules, run the
full checks/build, and deploy the refreshed source using the production hosting
workflow. This checkout has no configured production publishing credentials.
The website withholds snapshots older than seven days. The runtime preview
must be rebuilt to use new imported data.

Local command: node scripts/refresh-national-rebates.mjs
Windows: set REBATE_PYTHON to your Python executable before running the command.
No provider API key is needed for this public source.

Reviewed calculation coverage now includes the Efficiency Maine clothes-washer
pathway as well as the supported PSE&G retail pathways. The Maine application
uses a six-calendar-month deadline, an installation-address annual claim limit,
and a business W-9 requirement. No other Maine incentive inherits these rules.
