# Membership billing setup

Checkout remains disabled until these server-only settings are configured:
BILLING_ENABLED=true, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
BILLING_BUSINESS_NAME, BILLING_SUPPORT_EMAIL, AUTH_ORIGIN and
STRIPE_MEMBERSHIP_PRICE_ID. Never put secrets in browser code.

Create a Stripe recurring price: USD 29.99, monthly, quantity one. Configure
Stripe's customer portal to allow payment updates and cancellation. Apply
0008_membership.sql to production D1 before deploying the updated worker.
Keep the existing signed invoice webhook at /api/billing/webhook.

Membership status is fetched directly from Stripe when customers open or
refresh membership; it is not granted by a success URL or browser storage.
No access paywall has been enabled. Free discovery stays accessible while
member benefits and verified program coverage are finalized. The customer
portal handles cancellation; the website does not store card details.

Test before enabling live purchases: account isolation, repeated checkout,
cancellation, payment failure, recovery, and monthly renewal. Configure tax
and customer terms for the business before enabling live billing. This work
does not configure a Stripe account or send real email.
