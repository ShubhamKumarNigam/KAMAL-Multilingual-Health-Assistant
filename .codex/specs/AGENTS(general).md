# KAMAL — Multilingual AI Medical Diagnosis Assistant
### Spec-Driven Build File for Claude Code

> Drop this file as `AGENTS(general).md` in your project root. Claude Code will read it automatically at the start of every session and use it as the source of truth for architecture, design, and feature behavior. Update this file (not your memory) whenever scope changes.

---

## 1. Project Overview

**KAMAL** is a multi-turn, multilingual, voice-and-text AI medical diagnosis assistant built for underserved populations in India — rural patients, low-literacy users, and people without easy access to a doctor.

The product is **not** a chatbot that answers one question at a time. It behaves like a careful clinician taking a history: it asks one thing at a time, listens (literally, via speech), adapts its next question to the previous answer, and only commits to a diagnosis once it has enough information — with a visible confidence level and clinical reasoning attached.

**Core design principle:** Every screen must work for someone who has never used a smartphone app before, who may be speaking Hindi, Urdu, Bengali, or Tamil, and who may be scared. Clarity and calm beat cleverness everywhere in this product.

---

## 2. Target Users

- Rural and semi-urban patients in India with limited digital literacy
- Patients who are more comfortable speaking than typing
- Patients who mix languages mid-sentence (Hindi-English code-switching is common — design for it, don't fight it)
- Caregivers/family members filling the form on behalf of an elderly or illiterate patient
- A doctor on the receiving end of the emailed report (a secondary but important audience — that report must read like a clinical handoff note, not a chat transcript)

---

## 3. Tech Stack (assumed defaults — adjust if you already have a stack)

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (React) + TypeScript | SSR for slow rural connections, easy i18n routing |
| Styling | Tailwind CSS | fast to theme, easy to enforce the design tokens below |
| Backend | FastAPI (Python) | best ecosystem for LLM orchestration, speech, and image inference |
| LLM orchestration | multi-turn via Messages API with conversation state stored server-side | structured multi-turn reasoning, tool use for emergency flag / diet plan generation |
| Speech-to-text | Whisper (multilingual) or cloud STT with Hindi/Urdu/Bengali/Tamil support | needs to handle code-switching |
| Image analysis | Claude vision (wound/rash/report photos) behind a dedicated `/diagnose/image` endpoint | |
| Database | PostgreSQL | relational; patient, session, diagnosis, reminder tables map cleanly |
| Auth | email OTP |
| Notifications | email or WhatsApp Business API or SMS for reminders (push notifications assume a habitual app-opener, which this audience often isn't) | |
| Email | Transactional email service (e.g. Postmark/SendGrid) for the structured report | |

If codex finds an existing stack in this repo, **defer to the existing stack** and only use the above as a fallback for greenfield setup.

---

## 4. Design System — Color Scheme

The palette is built around **trust + calm**, with a **deliberately rationed red** so that when something is actually an emergency, it stands out instantly because the user has never seen that color anywhere else in the app.

### Primary Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0F766E` (deep teal) | headers, primary buttons, active nav, AI message bubbles |
| `--color-primary-dark` | `#0B5A54` | pressed states, dark mode primary |
| `--color-secondary` | `#0EA5E9` (sky blue) | links, secondary buttons, info badges, progress indicators |
| `--color-accent` | `#65A30D` (sage green) | "healthy / on track" states, diet plan, medication taken |
| `--color-warning` | `#F59E0B` (amber) | "needs attention soon" — e.g. missed medication, follow-up due |
| `--color-emergency` | `#DC2626` (red) | **reserved exclusively for the Emergency Flagging feature.** Never use red for form validation errors, destructive buttons, or anything else. |
| `--color-bg` | `#FAFAF8` (warm off-white) | app background |
| `--color-surface` | `#FFFFFF` | cards, modals |
| `--color-text-primary` | `#1E293B` (slate 800) | body text |
| `--color-text-secondary` | `#64748B` (slate 500) | captions, metadata |
| `--color-border` | `#E2E8F0` | dividers, input borders |

### Rules
1. **Red = emergency, full stop.** A destructive "delete account" button should be a neutral gray-bordered button with a confirmation step, not red — red must stay rare so it keeps its alarm value.
2. Minimum contrast ratio **4.5:1** everywhere (WCAG AA), and **7:1** for any text under 16px, since many users have low literacy and may also have uncorrected vision issues.
3. Touch targets minimum **48x48px** — rural users on older Android devices, often with cracked screens.
4. Icons must always be paired with text labels (never icon-only), and the language of that label follows the user's selected session language.
5. Dark mode is optional for v1; if built, swap `--color-bg` to `#0F172A` and `--color-surface` to `#1E293B`, keep teal/blue/green hues, do not invert the emergency red.

### Typography
- Use a typeface with strong Devanagari, Bengali, Tamil, and Arabic-script (Urdu) support — e.g. **Noto Sans** family across all scripts, so the UI doesn't visually break when the user switches languages mid-session.
- Base size 16px minimum; allow a user-controlled "large text" toggle that scales up to 22px, defaulting to large text on first launch (don't make low-literacy users hunt for an accessibility setting).

---

## 5. Information Architecture

```
/login                  → Phone OTP entry
/onboarding/language    → Language selection (can be changed anytime later)
/onboarding/history     → Pretext / medical history input
/session                → Main multi-turn diagnosis conversation
/session/image-upload   → Inline modal/step within a session
/diagnosis/[id]         → Diagnosis result screen (justification, confidence)
/emergency              → Full-screen emergency takeover (see §6.6)
/reminders              → Medication + consultation reminders list
/reports/[id]           → Full structured report (mirrors the emailed PDF)
/profile                → Patient profile, language preference, linked doctor email
```

---

## 6. Feature Specifications

Each feature below should be built as an independently testable unit. Claude Code should implement them roughly in the order listed — later features (Emergency Flagging, Email Report) depend on data structures established in earlier ones (Dialogue, Diagnosis).

### 6.1 Login & Authentication
**Goal:** Secure, frictionless entry for patients who may be unfamiliar with apps.

- Primary method: **phone number + OTP** (SMS). No password to remember.
- Optional secondary: email + magic link, for users (or doctors) who prefer it.
- Session token stored server-side; refresh token in a secure, httpOnly cookie.
- On first login, immediately route to language selection — don't bury it in settings.
- Accessibility: OTP input should auto-read digits aloud if the "voice assistance" preference is on.

**Acceptance criteria:**
- A new phone number creates an account automatically after OTP verification (no separate "sign up" flow — reduces steps).
- Returning users skip onboarding and land on `/session` or their last incomplete session.

### 6.2 Pretext / Medical History Input
**Goal:** Capture existing conditions, medications, allergies, and basic demographics *before* the AI starts asking questions, so the diagnostic dialogue is informed from question one.

- Fields: age, sex, known chronic conditions (multi-select + free text), current medications, known allergies, prior surgeries, family history (optional).
- Must be fillable **by voice** — every field has a mic icon and accepts spoken input parsed into structured data.
- Can be skipped ("I'll add this later") but the AI dialogue should explicitly ask "Do you have any existing conditions I should know about?" as its first question if this is skipped.
- Store as structured `patient_history` record linked to the patient profile (persists across sessions, not just this visit) — editable later from `/profile`.

**Data model sketch:**
```
patient_history {
  patient_id, age, sex, chronic_conditions[], medications[],
  allergies[], surgeries[], family_history, last_updated
}
```

### 6.3 Multi-turn Multilingual Dialogue
**Goal:** The heart of the product. The AI asks one intelligent follow-up question at a time, adapting to prior answers, in the patient's language of choice — with the ability to switch languages mid-session without losing context.

- Supported languages at launch: **Hindi, Urdu, Bengali, Tamil, English.**
- Conversation state (all turns, structured symptom data extracted so far, history from §6.2) is held server-side and passed to the model on every turn — never rely on the frontend to hold clinical state.
- **Language switching mid-session:** detect language per-message (don't require an explicit toggle, though one should also exist in the UI). If the patient switches from Hindi to English mid-sentence, the next AI question should be asked in whichever language the patient just used, and prior turns should still summarize correctly across languages.
- Each AI turn should:
  1. Acknowledge what was just said (briefly — don't over-validate, this isn't a therapy bot)
  2. Ask exactly one focused follow-up question
  3. Internally update a structured symptom/severity model used later for diagnosis
- Avoid medical jargon in questions; phrase like a careful nurse, not a textbook.
- Cap the number of questions sensibly (e.g. soft target 6–12 turns) before moving toward a diagnosis or explicitly telling the patient more information is needed.

**Acceptance criteria:**
- A session conducted entirely in Hindi, then switched to English for the last two turns, produces a coherent final diagnosis report in the patient's *currently selected* language.

### 6.4 Speech Input
**Goal:** Full voice operation for low-literacy and rural users — speech should be a first-class input method, not an accessibility afterthought.

- Mic button present on every text input across the app (history form, dialogue, diet plan questions, everything).
- Multilingual speech-to-text covering all five supported languages, including common code-switching.
- Push-to-talk and tap-to-toggle both supported (don't assume one interaction model works for everyone).
- Provide live waveform/visual feedback while recording so non-literate users get confirmation the app is listening.
- Text-to-speech reads AI questions aloud automatically when "voice mode" is on (toggle should be easy to find and should be **suggested automatically** if the user's typed input shows signs of struggle — e.g. many corrections/short fragments — rather than buried in settings).

### 6.5 Image Upload
**Goal:** Let the patient upload a photo of a wound, rash, or lab report for visual analysis as part of the diagnostic dialogue.

- Upload entry point appears contextually — e.g. if the patient mentions a rash/wound, the AI should explicitly ask "Can you share a photo?" with an inline camera/upload button, rather than only being available in a generic menu.
- Accept camera capture directly (most rural users will photograph on the spot, not select from gallery).
- Client-side compression before upload (rural bandwidth).
- Backend: route to vision-capable model analysis; results feed back into the same structured symptom model as the text dialogue — **not** a separate disconnected "image result" screen.
- Lab report photos should attempt OCR + structured extraction of values (not just descriptive captioning) where the image is a printed/typed report rather than a wound/rash photo.
- Always show the patient what was uploaded with a clear "remove and retake" option before it's submitted — image-based health data is sensitive, confirm intent.

### 6.6 Diagnosis with Justification
**Goal:** Present a diagnosis the patient (and their doctor) can actually trust, not a black-box answer.

- Output structure:
  - **Likely condition(s)** — ranked if more than one is plausible
  - **Confidence level** — shown visually (e.g. a clear bar/label: Low / Moderate / High) — never present a diagnosis without one
  - **Clinical reasoning** — a short, plain-language explanation of *why*, referencing the specific symptoms/answers that led here
  - **Recommended next step** — see a doctor / home care / monitor / emergency
- All of the above rendered in the patient's session language, in plain words — avoid unexplained medical terminology; if a clinical term must appear, follow it with a one-line lay explanation.
- This screen is explicitly **not** a final medical diagnosis — include a clear, non-alarming disclaimer that this is an AI-assisted assessment and a doctor should confirm, every single time, without exception.

### 6.7 Emergency Flagging
**Goal:** Catch dangerous symptom patterns immediately and get the patient to real help, fast.

- Runs as a continuous check **during** the dialogue (§6.3), not just at the end — a single alarming answer mid-conversation should trigger this immediately rather than waiting for the full diagnostic flow to complete.
- Example trigger patterns to design for (the AI's emergency-detection logic should be tuned by a clinician/mentor before launch — do not ship a hardcoded keyword list as the sole mechanism):
  - Chest pain with radiating arm/jaw pain
  - Sudden severe difficulty breathing
  - Signs of stroke (facial drooping, sudden slurred speech, one-sided weakness)
  - Severe uncontrolled bleeding
  - Signs of anaphylaxis
- On trigger: **immediately interrupt the normal flow** with a full-screen takeover (using `--color-emergency` for the first and only time in the product) that:
  1. States in large, simple text, in the patient's language, that this needs urgent help
  2. Shows a one-tap "Call emergency services" action (pre-filled with the relevant local emergency number)
  3. Shows basic immediate guidance only if safe and well-established (e.g. "sit upright," "keep calm") — never delay the call-for-help action behind extra steps
  4. Logs the flag against the session for the eventual doctor-facing report
- This feature must be the most heavily tested in the entire app — false negatives here are the highest-stakes failure mode in the whole product. Build a test suite of symptom-pattern transcripts and require them to pass before any release.

### 6.8 Medication Reminders
**Goal:** Automatic, low-effort reminders for prescribed medicines.

- Once a diagnosis includes a recommended medication/dosage, auto-generate a reminder schedule (e.g. "twice daily for 5 days") — patient can adjust times to fit their routine.
- Delivery channel: SMS/WhatsApp preferred over push notification for this audience (see §3) — confirm the channel during onboarding.
- Each reminder message: medicine name, dose, and a simple "✅ Taken" / "Snooze" reply option where the channel supports it.
- Missed-dose tracking feeds into the doctor-facing report (§6.10) as adherence data.

### 6.9 Next Consultation Reminder
**Goal:** Book and remind the patient of a follow-up visit.

- After diagnosis, the AI suggests a follow-up window (e.g. "see a doctor within 3 days if no improvement") and offers to set a reminder for that date.
- If the clinic/doctor integration exists, allow actual appointment booking; otherwise this is a calendar-style reminder only — be explicit in the UI about which of these it is, don't imply a real booking happened if it didn't.
- Reminder delivered via the same SMS/WhatsApp channel, with a simple reschedule option.

### 6.10 Diagnosis Report via Email
**Goal:** A complete, clinically structured report sent automatically at session end.

- Recipients: the patient always; the patient's linked doctor optionally (opt-in, with the doctor's email captured during onboarding or profile setup).
- Report sections: patient demographics + history (§6.2) → full symptom timeline from the dialogue → diagnosis + confidence + reasoning (§6.6) → emergency flags if any were raised during the session → medication plan (§6.8) → diet plan (§6.11) → next consultation date (§6.9).
- Format: clean PDF attachment + plain-text email body summary. The PDF should read like a clinical handoff note — neutral, structured, no chat-bubble styling — since a doctor is a likely reader.
- Report should default to the **patient's session language** for the patient's own copy; if sent to a doctor, offer an English version alongside (doctors across India's regions can't be assumed to share the patient's language).

### 6.11 Personalised Diet Plan
**Goal:** A diet plan tailored to the diagnosis *and* local food culture — not a generic Western nutrition template.

- Input: diagnosed condition + patient history (allergies, chronic conditions like diabetes) + a quick prompt about regional cuisine/state if not already known (e.g. "What does your typical day's meals look like?" via voice is fine).
- Output: a short, practical plan using locally available, affordable foods and familiar dishes — not packaged "superfoods" the patient can't access or afford in a rural market.
- Clearly mark anything to **avoid** given the diagnosis (e.g. high-sodium foods for hypertension) using the warning amber color, not red.
- Included directly in the emailed report (§6.10) as its own section, and also viewable any time from `/reports/[id]`.

---

## 7. Non-Functional Requirements

- **Offline resilience:** form inputs (history, dialogue answers already given) should persist locally and sync when connectivity returns — rural connectivity drops are the norm, not the edge case.
- **Low-bandwidth mode:** images compressed aggressively before upload; avoid heavy animations; lazy-load anything below the fold.
- **Data privacy:** health data is sensitive under India's Digital Personal Data Protection Act (DPDP) — store minimal data, encrypt at rest, get explicit consent before sharing any report with a doctor, and give patients a way to delete their data and account.
- **Performance target:** dialogue turn round-trip (speech-to-text → AI reasoning → text-to-speech response) under ~4 seconds on a 3G-equivalent connection, so the conversation still feels responsive.
- **Localization correctness:** dates, numerals, and units should follow locale conventions per selected language, not just translated UI strings.

---

## 8. Build Order for Claude Code

1. Auth (§6.1) + base app shell with the design tokens in §4
2. Pretext/history input (§6.2) — establishes the core patient data model
3. Multi-turn multilingual dialogue engine (§6.3) — the architectural core everything else hooks into
4. Speech input/output (§6.4) layered onto the dialogue
5. Image upload + vision analysis (§6.5)
6. Diagnosis output screen (§6.6)
7. Emergency flagging (§6.7) — build and test thoroughly before anything ships
8. Medication + consultation reminders (§6.8, §6.9)
9. Email report generation (§6.10)
10. Diet plan generation (§6.11)

Each step should ship with its own tests before moving to the next — this is a health product; correctness matters more than speed of delivery at every stage.
