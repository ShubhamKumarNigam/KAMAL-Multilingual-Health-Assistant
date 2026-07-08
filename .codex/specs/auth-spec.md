# KAMAL — Login & Signup Authentication Spec
### v1: Email + Password + Email OTP Verification

> This replaces §6.1 of the main `.codex` for now. The original spec assumed phone OTP as the primary login method — this file documents the actual v1 decision: **email-based auth**, with phone OTP planned as a later addition, not a replacement. Keep the data model below forward-compatible with that.

---

## 1. Why email OTP for v1

Phone OTP (SMS) needs a paid SMS gateway and DLT/template registration in India, which takes time to set up. Email OTP gets a secure signup flow live now, with no external account approval needed, while reusing the same transactional email service KAMAL already needs for the diagnosis report. Phone OTP can be added later as a second identifier on the same `users` table — design the schema below so that's a clean addition, not a rewrite.

---

## 2. Auth flows

### 2.1 Sign Up
1. Patient enters: **name, email, password** (confirm password field too).
2. Server validates input (see §5), creates a `users` row with `email_verified = false`, hashes the password — **never stores it in plain text.**
3. Server generates a 6-digit numeric OTP, stores a **hashed** version of it with an expiry, and emails it to the address entered.
4. Patient is taken to an "Enter the code we emailed you" screen.
5. On correct OTP: `email_verified = true`, account is now active, patient is logged in automatically and routed to language selection / onboarding (per main `CLAUDE.md` IA).
6. On wrong OTP: show a clear, calm error, allow retry (see attempt limits in §4).

### 2.2 Login
1. Patient enters **email + password**.
2. If `email_verified = false` (they started signup but never finished), don't log them in — instead resend an OTP and send them back to the verification screen. Don't make them re-enter name/password.
3. If credentials are correct and email is verified, issue a session token and log them in.
4. If credentials are wrong, show one generic message ("Email or password is incorrect") — never reveal which of the two was wrong, that leaks whether an email is registered.

### 2.3 Forgot Password
1. Patient enters their email.
2. Always show the same confirmation message ("If that email is registered, we've sent a code") whether or not the email exists — don't leak account existence here either.
3. If the email exists, send an OTP (same mechanism as signup, different `purpose` — see §3).
4. Patient enters the OTP + a new password in one screen.
5. On success: password updated, all existing sessions for that user invalidated, patient logged in fresh.

### 2.4 Resend OTP
- Available on both the signup-verification screen and the forgot-password screen.
- Cooldown: **120 seconds** between sends, shown as a visible countdown so the patient isn't confused about why the button is disabled.
- Each resend invalidates the previous OTP for that purpose.

---

## 3. Data model

```
users {
  id               uuid, primary key
  name             text, not null
  email            text, unique, not null
  password_hash    text, not null
  email_verified   boolean, default false
  phone            text, nullable        -- reserved for the later phone-OTP addition
  phone_verified   boolean, default false
  created_at       timestamp
  updated_at       timestamp
}

otp_codes {
  id            uuid, primary key
  user_id       uuid, foreign key -> users.id, nullable
                 -- nullable because at signup-time, depending on implementation order,
                 -- you may generate the OTP before or right after the user row exists;
                 -- pick one approach and keep it consistent
  email         text, not null        -- store the email directly too, so forgot-password
                                        -- flows work even if user_id linkage gets complicated
  code_hash     text, not null        -- hash the OTP the same way you'd hash a password,
                                        -- never store the raw 6-digit code
  purpose       enum('signup_verification', 'password_reset'), not null
  expires_at    timestamp, not null    -- created_at + 10 minutes
  attempts      integer, default 0     -- failed verification attempts against this code
  consumed      boolean, default false
  created_at    timestamp
}

sessions {
  id            uuid, primary key
  user_id       uuid, foreign key -> users.id
  token_hash    text, not null
  created_at    timestamp
  expires_at    timestamp
  revoked       boolean, default false
}
```

---

## 4. OTP rules

- **Format:** 6 digits, numeric only (easiest to read aloud / type for low-literacy users, and consistent with the SMS-OTP UX they'll eventually also see once phone auth is added).
- **Expiry:** 10 minutes from generation.
- **Max verification attempts:** 5 per code. On the 6th wrong attempt, invalidate the code and require a resend — don't let a code be brute-forced indefinitely.
- **Storage:** hash the code (e.g. same bcrypt/argon2 hashing used for passwords) before storing — if the `otp_codes` table ever leaks, raw codes shouldn't be sitting in it.
- **One active code per purpose:** generating a new OTP for the same user + purpose invalidates any prior unconsumed one.

---

## 5. Password & input validation

- **Password minimum:** 8 characters. Require at least one letter and one number — don't demand special-character complexity rules that frustrate low-literacy users typing on a phone keyboard; length + a number is a reasonable v1 bar.
- **Hashing:** bcrypt or argon2, never anything reversible, never plain text, ever — including in logs.
- **Email validation:** standard format check server-side; don't rely on client-side validation alone.
- **Name field:** free text, but support all the app's scripts (Devanagari, Bengali, Tamil, Urdu/Arabic script) — don't restrict to Latin characters only, since this is a multilingual healthcare app and many patients will naturally type their name in their own script.
- **Duplicate signup:** if the email already exists and is verified, reject signup with a clear "an account with this email already exists — try logging in instead" message (with a direct link to login). If it exists but is *unverified*, treat a new signup attempt as "resend the OTP," not as an error — people abandon the verification step and come back later.

---

## 6. Session handling

- On successful login or OTP verification, issue a session token; store its hash server-side in `sessions`, set as a secure, httpOnly, SameSite cookie (or equivalent secure storage for mobile).
- Session expiry: reasonable default (e.g. 30 days) with silent refresh while active — this audience won't tolerate re-logging-in constantly on a flaky connection.
- Password reset must revoke all existing sessions for that account (§2.3 step 5) — if someone's password was compromised, old sessions shouldn't survive a reset.

---

## 7. UI requirements

- Follow the design tokens already defined in `CLAUDE.md` §4 — teal/blue primary palette, large touch targets, Noto Sans for multi-script support, voice-input mic icon on every text field including the OTP entry box (a patient should be able to speak the 6 digits if typing is hard).
- OTP entry screen: 6 separate large boxes (one digit each) is the clearest pattern for low-literacy users — auto-advance focus per digit, auto-submit when all 6 are filled.
- Every screen and every email (OTP email included) must be localizable — the OTP email subject and body should render in the patient's selected language, not just the app UI. If language hasn't been selected yet (signup happens before language selection in the current IA), default the OTP email to English + Hindi side by side.
- Show the resend cooldown timer visibly, and show remaining OTP attempts only if it helps reduce confusion — don't expose exact attempt counts in a way that helps an attacker time a brute force, but do tell a genuinely confused patient "that code didn't match — you have a few more tries" rather than a cold error.
- Error states use `--color-warning` (amber), never `--color-emergency` (red is reserved for the medical emergency flow per `CLAUDE.md` §4 rule 1) — a wrong password is not an emergency, visually or tonally.

---

## 8. API endpoints (suggested)

```
POST /auth/signup            { name, email, password }            → triggers OTP email
POST /auth/verify-otp        { email, code, purpose }             → activates account / resets password
POST /auth/resend-otp        { email, purpose }                   → rate-limited, 60s cooldown
POST /auth/login             { email, password }                  → returns session token
POST /auth/forgot-password   { email }                            → always returns generic success message
POST /auth/reset-password    { email, code, new_password }        → invalidates old sessions
POST /auth/logout            { }                                  → revokes current session
```

---

## 9. Acceptance criteria

- A new email cannot log in until the OTP from signup is verified.
- A wrong password and a non-existent email produce the identical error message at login.
- An OTP cannot be reused after it's been consumed once, and stops working after 10 minutes or 5 wrong attempts, whichever comes first.
- Resetting a password immediately invalidates every other active session on that account.
- Re-attempting signup with an unverified email resends an OTP instead of throwing a "duplicate" error.
- No password or OTP code ever appears in plain text in the database or in application logs.

---

## 10. Deferred to a later phase (don't build now, but don't design against it either)

- Phone number + SMS OTP as an alternative or primary login method (schema already has nullable `phone`/`phone_verified` fields reserved for this).
- Social login (Google/etc.) if ever requested.
- Multi-factor auth beyond the signup/reset OTP (e.g. OTP-on-every-login) — not needed for v1, this audience needs frictionless re-entry, not extra friction.
