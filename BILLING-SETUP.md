# Invoice and payment setup

The customer reports a received rebate payment and uploads private evidence. An authorized reviewer verifies the receipt and issues an immutable, itemized invoice for 18% of that payment. Approval alone never creates an invoice. Distinct partial payments can be reported separately. Normalized payment references prevent duplicate reports within an application; reviewers must also check evidence for duplicates entered under a different reference.

New service scopes must use the receipt-based fee and be signed before reporting a payment. Existing fixed-fee scopes are preserved and cannot be used for this billing workflow.

Configure these server variables in the hosting environment (and ignored .dev.vars only for local testing):

- BILLING_BUSINESS_NAME: real invoicing business name
- BILLING_SUPPORT_EMAIL: monitored billing support email
- STRIPE_SECRET_KEY: Stripe test or live secret; secret storage only
- STRIPE_WEBHOOK_SECRET: endpoint signing secret; secret storage only
- BILLING_ENABLED: true only after Stripe test validation and real business details are configured
- AUTH_ORIGIN: the exact HTTPS production site origin (live keys require HTTPS)

Create a Stripe snapshot webhook destination for checkout.session.completed at:
https://YOUR-SITE/api/billing/webhook

Checkout accepts card payments in USD through Stripe-hosted Checkout. The customer starts payment from their invoice in the site and returns to it afterward. No card data passes through RebateHarbor. No automatic debit occurs. The server validates the webhook signature and retrieves the checkout session from Stripe, checking amount, currency, invoice reference and live/test mode before marking paid. Duplicate events are harmless. Failed or cancelled checkout remains unpaid. The success URL never marks an invoice paid.

First use Stripe test credentials and a test webhook. Confirm success, cancellation, invalid signatures, duplicate events and wrong-amount rejection. Do not use real cards in test mode. This source has automated fixture tests, not a verified connection to an actual merchant account.

Invoices are available in the signed-in customer portal and printable using Print / save invoice. Email invoice delivery, refunds, credit notes, disputes and tax determination are not automated. A fee below Stripe's USD minimum needs manual handling; the site must not inflate the agreed fee. Payment provider reconciliation is required if a checkout creation response remains unknown beyond 23 hours. Subscription purchases remain disabled pending Stripe setup. The chosen full-access membership price is $29.99 per month; the 18% received-rebate application service is separate.
