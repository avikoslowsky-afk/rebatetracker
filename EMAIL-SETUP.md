# Customer email setup

Built: email verification, email password reset, backup recovery-code fallback, in-portal notifications, customer emails for document requests and new service scopes, and a staff retry queue.

Email sending is OFF until configured. No real messages were sent while building this feature. Local test addresses and the isolated integration provider are synthetic.

## Configure server secrets

Use a Resend account and a verified sender domain you control. Add these on the server, never to browser code or chat:

- EMAIL_ENABLED=true (enable only after the sender and other settings work)
- RESEND_API_KEY — Resend sending API key
- EMAIL_FROM — approved sender, such as RebateHarbor <updates@your-domain.example>
- EMAIL_REPLY_TO — optional real support mailbox
- AUTH_ORIGIN — exact public HTTPS origin (localhost HTTP is permitted for local tests only)
- AUTH_SESSION_SECRET — existing strong server secret; keep stable because queued payloads are encrypted with a derived key

Apply migration 0007_grey_gargoyle.sql before deploying the new app. Existing email accounts start unverified; Google users need one successful Google login to register the provider-verified email for notifications. Stored application contact emails are never used as notification destinations.

When EMAIL_ENABLED=true, unverified email accounts can log in and view saved work, but must verify before starting an application, uploading application documents, submitting for review or signing. Account & email provides the resend link. Do not enable this gate before email delivery is ready.

## Flows

- Signup creates an account and queues a 24-hour verification link when sending is configured.
- The verification email opens /verify-email with its token in the URL fragment. A button confirms verification; opening or prefetching the link does not consume it. The fragment is removed from browser history by the page.
- /recover requests a 30-minute, single-use reset link. Unknown accounts get the same successful response. Google-only users use Google recovery.
- A successful reset rotates the password and backup recovery code, invalidates previous password sessions and links, and queues a password-change alert. It does not automatically sign the user in.
- Team status “More information needed” creates a private document-request update and queues its email.
- Preparing a new service scope creates a private scope-review update and queues its email. No email signs a scope or submits an application.
- /notifications lists the customer's own updates. /account-security shows verification and setup status.
- /team → Customer email queue shows delivery attempts and allows staff to retry a small pending batch.

## Reliability and privacy

Tokens are cryptographically random; only their hashes are stored in email_tokens. Queued message bodies (including links) are encrypted using AES-GCM and cleared after provider acceptance or expiry. Passwords and private uploads never appear in notification email bodies. Resend receives the registered recipient and message contents.

Project updates survive email failures. Delivery starts in a Workers waitUntil task after the message has been stored. Failed/uncertain sends retain a stable provider idempotency key. Staff can retry; items older than 23 hours from first attempt or at the attempt limit stop for reconciliation to avoid duplicates beyond the provider's idempotency window. There is no unattended retry scheduler yet. Check the queue operationally.

“Accepted” means accepted by the provider, not confirmed inbox delivery. Bounce/complaint/delivery webhooks and automated suppression handling are not implemented yet; configure provider monitoring and complete those before public launch. A sending task interrupted by a worker crash can be reclaimed from the staff retry queue after a minute. Do not clear or resend needs-review items without reconciling them with the provider.

## Verify before launch

1. Add a real sender and secrets, then test to a mailbox you control. Check spam placement and sender DNS.
2. Verify signup, existing-account resend, expired/used links, reset, old-session sign-out and recovery-code fallback.
3. Request a document and prepare a scope using a synthetic project. Check the private portal link and destination mailbox.
4. Test provider failure and staff retry. Verify a customer can still see the in-app update.
5. Confirm production migrations, HTTPS, privacy terms, support/retention policy and provider monitoring.

Automated fixture: node --experimental-strip-types tests/email-integration.mjs (requires a current production build). The fixture intercepts all email provider requests and sends nothing externally.

Official references: https://resend.com/docs/api-reference/emails/send-email and https://developers.cloudflare.com/changelog/post/2025-08-08-add-waituntil-cloudflare-workers/
