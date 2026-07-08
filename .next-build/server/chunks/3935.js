"use strict";exports.id=3935,exports.ids=[3935],exports.modules={68167:(a,b,c)=>{c.d(b,{Kr:()=>m,M4:()=>j,g9:()=>f,vt:()=>k});var d=c(22080);function e(a){return String(a||"").replace(/[<>&"]/g,a=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[a])}async function f({to:a,code:b,purpose:c}){let e=process.env.RESEND_API_KEY,f=process.env.RESEND_FROM_EMAIL;if(!e||!f)return{ok:!1,status:503,message:"Email OTP is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL."};let g=new d.u(e),h="password_reset"===c?"Use this code to reset your KAMAL password.":"Use this code to verify your KAMAL account.",i="password_reset"===c?"Your KAMAL password reset code":"Your KAMAL verification code",{error:j}=await g.emails.send({from:f,to:[a],subject:i,text:`${h}

Code: ${b}

This code expires in 10 minutes.`,html:`
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="color: #324C4A;">${i}</h1>
        <p>${h}</p>
        <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #324C4A;">${b}</p>
        <p>This code expires in 10 minutes.</p>
        <p>Hindi: KAMAL code: <strong>${b}</strong></p>
      </div>
    `});return j?(console.error("Resend OTP email failed",j),{ok:!1,status:502,message:"We could not send the email code. Please try again."}):{ok:!0}}function g(a){return Array.isArray(a)?a.map(a=>String(a||"").trim()).filter(Boolean):"string"==typeof a&&a.trim()?a.split(/\n|,(?=\s*[A-Z])/).map(a=>a.replace(/^[-*\s]+/,"").trim()).filter(Boolean):[]}function h(a,b,c="#F3F4F6",d="#10231F"){let f=g(a);return f.length?`<ul style="list-style: none; margin: 0; padding: 0;">
      ${f.map(a=>`<li style="margin: 0 0 10px; border-radius: 12px; background: ${c}; padding: 12px 14px; color: ${d}; font-weight: 700;">${e(a)}</li>`).join("")}
    </ul>`:`<p style="margin: 0; color: #5B605D;">${e(b)}</p>`}function i({title:a,children:b,background:c="#ffffff"}){return`
      <div style="margin-top: 18px; border: 1px solid rgba(50, 76, 74, 0.16); border-radius: 16px; background: ${c}; padding: 18px;">
        <p style="margin: 0 0 12px; font-size: 12px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: #324C4A;">${e(a)}</p>
        ${b}
      </div>
    `}async function j({to:a,name:b,medicineName:c,scheduledAt:f,details:g}){let h=process.env.RESEND_API_KEY,i=process.env.RESEND_FROM_EMAIL;if(!h||!i)return{ok:!1,status:503,message:"Reminder email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL."};let j=new Intl.DateTimeFormat("en-IN",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Kolkata"}).format(new Date(f)),k=new d.u(h),l=`KAMAL reminder: ${c}`,m=g?`
Details: ${g}`:"",{error:n}=await k.emails.send({from:i,to:[a],subject:l,text:`KAMAL reminder

Hello ${b},

Reminder: ${c}
Scheduled time: ${j}${m}

Open KAMAL when complete and mark the reminder as taken or done.

This reminder is not medical advice. Follow your clinician's instructions for medicines, appointments, and care plans.`,html:function({name:a,medicineName:b,scheduledAt:c,details:d}){let f=new Intl.DateTimeFormat("en-IN",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Kolkata"}).format(new Date(c)),g=d?`<div style="margin-top: 18px; border-radius: 14px; background: #F3F4F6; padding: 14px 16px;">
            <p style="margin: 0 0 6px; font-size: 12px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: #324C4A;">Details</p>
            <p style="margin: 0; color: #111827; white-space: pre-wrap;">${e(d)}</p>
          </div>`:"";return`
      <div style="margin: 0; padding: 32px 18px; background: #DAF8EF; font-family: Arial, sans-serif; color: #111827;">
        <div style="max-width: 620px; margin: 0 auto; overflow: hidden; border-radius: 22px; background: #ffffff; box-shadow: 0 18px 45px rgba(50, 76, 74, 0.14);">
          <div style="background: #324C4A; padding: 24px 28px; color: #ffffff;">
            <p style="margin: 0; font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #ADF8EF;">KAMAL Health Assistant</p>
            <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2;">Reminder due</h1>
          </div>
          <div style="padding: 28px;">
            <p style="margin: 0 0 16px; font-size: 16px;">Hello ${e(a)},</p>
            <p style="margin: 0 0 18px; color: #5B605D;">This is your scheduled KAMAL reminder.</p>
            <div style="border: 1px solid rgba(50, 76, 74, 0.16); border-radius: 16px; padding: 18px;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: #324C4A;">Reminder</p>
              <p style="margin: 0; font-size: 24px; font-weight: 800; color: #10231F;">${e(b)}</p>
              <p style="margin: 16px 0 0; color: #5B605D;">Scheduled time</p>
              <p style="margin: 4px 0 0; font-size: 18px; font-weight: 800; color: #10231F;">${f}</p>
            </div>
            ${g}
            <div style="margin-top: 20px; border-left: 4px solid #F59E0B; background: #FFF7ED; padding: 12px 14px; border-radius: 12px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #7C2D12;">This reminder is not medical advice. Follow your clinician's instructions for medicines, appointments, and care plans.</p>
            </div>
            <p style="margin: 20px 0 0; color: #5B605D;">Open KAMAL when complete and mark the reminder as taken or done.</p>
          </div>
        </div>
      </div>
    `}({name:b,medicineName:c,scheduledAt:f,details:g})});return n?(console.error("Resend medication reminder failed",n),{ok:!1,status:502,message:"We could not send the medication reminder email."}):{ok:!0}}async function k({to:a,name:b,summary:c,latestSession:f}){let j=process.env.RESEND_API_KEY,k=process.env.RESEND_FROM_EMAIL;if(!j||!k)return{ok:!1,status:503,message:"History email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL."};let l=new d.u(j),m=`KAMAL latest diagnosis summary for ${b}`,{error:n}=await l.emails.send({from:k,to:[a],subject:m,text:c.text,html:function({name:a,summary:b,latestSession:c}){let d=c?.diagnosis||{},f=g(d.recommendedNextSteps).concat(g(d.recommendedNextStep)).concat(g(d.nextSteps)),j=g(d.selfCare).concat(g(d.selfCareGuidance)),k=g(d.redFlags).concat(g(d.emergencyRedFlags)),l=Array.isArray(c?.transcript)?c.transcript:[],m=c?.createdAt?new Intl.DateTimeFormat("en-IN",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Kolkata"}).format(new Date(c.createdAt)):"Not available",n=d.primaryDisease||g(d.likelyConditions)[0]||"Latest diagnosis",o=c?.preConsultationText||b.text,p=l.length?l.map(a=>{let b="assistant"===a.role?"Doctor AI":"Patient";return`<div style="margin-top: 10px; border-radius: 12px; background: #F9FAFB; padding: 12px 14px;">
              <p style="margin: 0 0 5px; font-size: 12px; font-weight: 800; color: #324C4A;">${b}</p>
              <p style="margin: 0; white-space: pre-wrap; color: #111827;">${e(a.content)}</p>
            </div>`}).join(""):'<p style="margin: 0; color: #5B605D;">No conversation transcript was saved for this diagnosis.</p>';return`
      <div style="margin: 0; padding: 32px 18px; background: #DAF8EF; font-family: Arial, sans-serif; color: #111827;">
        <div style="max-width: 680px; margin: 0 auto; overflow: hidden; border-radius: 22px; background: #ffffff; box-shadow: 0 18px 45px rgba(50, 76, 74, 0.14);">
          <div style="background: #324C4A; padding: 24px 28px; color: #ffffff;">
            <p style="margin: 0; font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #ADF8EF;">KAMAL Health Assistant</p>
            <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2;">Latest diagnosis summary</h1>
          </div>
          <div style="padding: 28px;">
            <p style="margin: 0 0 16px; font-size: 16px;">Hello ${e(a)},</p>
            <p style="margin: 0 0 18px; color: #5B605D;">This email includes only your latest saved diagnosis from KAMAL history.</p>
            <div style="border: 1px solid rgba(50, 76, 74, 0.16); border-radius: 16px; padding: 18px;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: #324C4A;">Diagnosis</p>
              <p style="margin: 0; font-size: 24px; font-weight: 800; color: #10231F;">${e(n)}</p>
              <p style="margin: 16px 0 0; color: #5B605D;">Saved at</p>
              <p style="margin: 4px 0 0; font-size: 18px; font-weight: 800; color: #10231F;">${e(m)}</p>
            </div>
            ${i({title:"Patient context",background:"#F9FAFB",children:`<p style="margin: 0; white-space: pre-wrap; color: #111827;">${e(o)}</p>`})}
            ${d.reasoning?i({title:"Doctor reasoning",children:`<p style="margin: 0; line-height: 1.7; color: #111827;">${e(d.reasoning)}</p>`}):""}
            ${i({title:"Doctor recommendations",children:h(f,"No doctor recommendations were saved for this diagnosis.","#DAF8EF","#10231F")})}
            ${i({title:"Self-care guidance",children:h(j,"No self-care guidance was saved for this diagnosis.","#F3F4F6","#10231F")})}
            ${i({title:"Red flags",children:h(k,"No urgent red flags were saved for this diagnosis.","#FEF2F2","#B91C1C")})}
            ${i({title:"Conversation transcript",background:"#F9FAFB",children:p})}
            <div style="margin-top: 20px; border-left: 4px solid #F59E0B; background: #FFF7ED; padding: 12px 14px; border-radius: 12px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #7C2D12;">This is AI-assisted health guidance, not a final medical diagnosis. A qualified clinician should confirm important or worsening symptoms.</p>
            </div>
          </div>
        </div>
      </div>
    `}({name:b,summary:c,latestSession:f})});return n?(console.error("Resend history summary failed",n),{ok:!1,status:502,message:"We could not email the history summary."}):{ok:!0}}function l(a,b,c="#F3F4F6",d="#10231F"){let f=g(a);return f.length?`<ul style="list-style: none; margin: 0; padding: 0;">
      ${f.map(a=>`<li style="margin: 0 0 10px; border-radius: 12px; background: ${c}; padding: 12px 14px; color: ${d}; font-weight: 700;">${e(a)}</li>`).join("")}
    </ul>`:`<p style="margin: 0; color: #5B605D;">${e(b)}</p>`}async function m({to:a,recipientName:b,report:c,text:f}){let g=process.env.RESEND_API_KEY,h=process.env.RESEND_FROM_EMAIL;if(!g||!h)return{ok:!1,status:503,message:"Report email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL."};let j=new d.u(g),k=`KAMAL patient report for ${c.patientName}`,{error:m}=await j.emails.send({from:h,to:[a],subject:k,text:f,html:function({recipientName:a,report:b}){return`
      <div style="margin: 0; padding: 32px 18px; background: #DAF8EF; font-family: Arial, sans-serif; color: #111827;">
        <div style="max-width: 720px; margin: 0 auto; overflow: hidden; border-radius: 22px; background: #ffffff; box-shadow: 0 18px 45px rgba(50, 76, 74, 0.14);">
          <div style="background: #10231F; padding: 24px 28px; color: #ffffff;">
            <p style="margin: 0; font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #ADF8EF;">KAMAL Patient Report</p>
            <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2;">Doctor-ready patient report</h1>
          </div>
          <div style="padding: 28px;">
            <p style="margin: 0 0 16px; font-size: 16px;">Hello ${e(a)},</p>
            <div style="display: grid; gap: 12px;">
              ${i({title:"Patient name",children:`<p style="margin: 0; font-size: 22px; font-weight: 800; color: #10231F;">${e(b.patientName)}</p>`})}
              ${i({title:"Patient email",children:`<p style="margin: 0; font-weight: 700; color: #10231F;">${e(b.patientEmail)}</p>`})}
              ${i({title:"Pre text",background:"#F9FAFB",children:`<p style="margin: 0; white-space: pre-wrap; line-height: 1.7; color: #111827;">${e(b.preText)}</p>`})}
              ${i({title:"Summary",background:"#DAF8EF",children:`<p style="margin: 0; line-height: 1.7; color: #10231F;">${e(b.summary)}</p>`})}
              ${i({title:"Doctor recommendations",children:l(b.doctorRecommendations,"No recommendations available.","#DAF8EF","#10231F")})}
              ${i({title:"Red flags",children:l(b.redFlags,"No red flags available.","#FEF2F2","#B91C1C")})}
            </div>
            <div style="margin-top: 20px; border-left: 4px solid #F59E0B; background: #FFF7ED; padding: 12px 14px; border-radius: 12px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #7C2D12;">${e(b.caution)}</p>
            </div>
          </div>
        </div>
      </div>
    `}({recipientName:b,report:c})});return m?(console.error("Resend patient report failed",m),{ok:!1,status:502,message:"We could not email the patient report."}):{ok:!0,message:`Report emailed to ${a}.`}}},73935:(a,b,c)=>{c.d(b,{Q:()=>j,I$:()=>X,sm:()=>K,B7:()=>E,BD:()=>P,gB:()=>o,jz:()=>U,iK:()=>R,iW:()=>n,Nd:()=>Y,TW:()=>af,rN:()=>Z,K$:()=>$,iD:()=>M,XL:()=>J,eU:()=>ac,je:()=>aa,uW:()=>_,Wk:()=>ab,Ty:()=>O,xw:()=>Q,T$:()=>ag,vi:()=>ae,b$:()=>V,ou:()=>T,$5:()=>L,eg:()=>S,DT:()=>z,RY:()=>N});var d=c(55511),e=c.n(d),f=c(33873),g=c.n(f),h=c(79868),i=c(68167);let j="kamal_session",k=[];function l(){return g().resolve(process.cwd(),process.env.KAMAL_DB_PATH||"kamal.db")}function m(){var a;return globalThis.__kamalSqliteDb||(globalThis.__kamalSqliteDb=new h.DatabaseSync(l()),globalThis.__kamalSqliteDb.exec("PRAGMA foreign_keys = ON"),(a=globalThis.__kamalSqliteDb).exec(`
    CREATE TABLE IF NOT EXISTS users (
      id text PRIMARY KEY,
      name text NOT NULL,
      email text UNIQUE NOT NULL,
      password_hash text NOT NULL,
      email_verified integer NOT NULL DEFAULT 0,
      phone text,
      phone_verified integer NOT NULL DEFAULT 0,
      created_at text NOT NULL DEFAULT (datetime('now')),
      updated_at text NOT NULL DEFAULT (datetime('now'))
    );
  `),p(a,"users","google_sub","text"),p(a,"users","auth_provider","text NOT NULL DEFAULT 'email'"),p(a,"users","avatar_url","text"),a.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS users_google_sub_idx
      ON users (google_sub)
      WHERE google_sub IS NOT NULL;

    CREATE TABLE IF NOT EXISTS otp_codes (
      id text PRIMARY KEY,
      user_id text REFERENCES users(id) ON DELETE CASCADE,
      email text NOT NULL,
      code_hash text NOT NULL,
      purpose text NOT NULL CHECK (purpose IN ('signup_verification', 'password_reset')),
      expires_at text NOT NULL,
      attempts integer NOT NULL DEFAULT 0,
      consumed integer NOT NULL DEFAULT 0,
      created_at text NOT NULL DEFAULT (datetime('now')),
      last_sent_at text NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS otp_codes_email_purpose_idx
      ON otp_codes (email, purpose, created_at DESC);

    CREATE TABLE IF NOT EXISTS sessions (
      id text PRIMARY KEY,
      user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash text NOT NULL,
      created_at text NOT NULL DEFAULT (datetime('now')),
      expires_at text NOT NULL,
      revoked integer NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions (user_id);

    CREATE TABLE IF NOT EXISTS patient_intakes (
      id text PRIMARY KEY,
      user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      age integer NOT NULL,
      gender text NOT NULL,
      height_cm integer NOT NULL,
      weight_kg integer NOT NULL,
      allergies text,
      main_concern text NOT NULL DEFAULT '',
      created_at text NOT NULL DEFAULT (datetime('now')),
      updated_at text NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS patient_intakes_user_id_created_at_idx
      ON patient_intakes (user_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS medication_reminders (
      id text PRIMARY KEY,
      user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      medicine_name text NOT NULL,
      scheduled_at text NOT NULL,
      channel text NOT NULL CHECK (channel IN ('WhatsApp', 'Email')),
      status text NOT NULL CHECK (status IN ('scheduled', 'sent', 'taken', 'failed')) DEFAULT 'scheduled',
      repeat_rule text NOT NULL DEFAULT 'none',
      schedule_start_date text,
      schedule_end_date text,
      custom_interval integer,
      custom_unit text,
      custom_weekdays_json text,
      details text,
      email_sent_at text,
      email_error text,
      created_at text NOT NULL DEFAULT (datetime('now')),
      updated_at text NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS medication_reminders_user_scheduled_idx
      ON medication_reminders (user_id, status, scheduled_at);

    CREATE TABLE IF NOT EXISTS diagnosis_sessions (
      id text PRIMARY KEY,
      user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      patient_name text NOT NULL,
      patient_email text NOT NULL,
      pre_consultation_text text NOT NULL,
      transcript_json text NOT NULL,
      diagnosis_json text NOT NULL,
      formatted_summary text NOT NULL,
      created_at text NOT NULL DEFAULT (datetime('now', 'localtime'))
    );

    CREATE INDEX IF NOT EXISTS diagnosis_sessions_user_created_idx
      ON diagnosis_sessions (user_id, created_at DESC);

    DROP VIEW IF EXISTS login_info;

    CREATE VIEW login_info AS
      SELECT
        id,
        name,
        email,
        email_verified,
        auth_provider,
        google_sub,
        avatar_url,
        phone,
        phone_verified,
        created_at,
        updated_at
      FROM users;
  `),p(a,"medication_reminders","repeat_rule","text NOT NULL DEFAULT 'none'"),p(a,"medication_reminders","schedule_start_date","text"),p(a,"medication_reminders","schedule_end_date","text"),p(a,"medication_reminders","custom_interval","integer"),p(a,"medication_reminders","custom_unit","text"),p(a,"medication_reminders","custom_weekdays_json","text"),p(a,"medication_reminders","details","text")),globalThis.__kamalSqliteDb}function n(){m()}function o(a=100){let b=m(),c=b.prepare(`SELECT name, type
       FROM sqlite_master
       WHERE type IN ('table', 'view')
         AND name NOT LIKE 'sqlite_%'
       ORDER BY type, name`).all().map(c=>{var d;let e=(d=c.name,`"${d.replaceAll('"','""')}"`),f=b.prepare(`PRAGMA table_info(${e})`).all().map(a=>a.name),g=b.prepare(`SELECT * FROM ${e} LIMIT ?`).all(a).map(a=>Object.fromEntries(f.map(b=>[b,function(a,b){let c=b.toLowerCase();return c.includes("hash")||c.includes("token")||c.includes("code")?null==a?"NULL":"[hidden]":null==a?"NULL":"object"==typeof a?JSON.stringify(a):String(a)}(a[b],b)]))),h="table"===c.type?b.prepare(`SELECT COUNT(*) AS count FROM ${e}`).get().count??null:null;return{name:c.name,type:c.type,columns:f,rows:g,rowCount:h}});return{path:l(),tables:c}}function p(a,b,c,d){a.prepare(`PRAGMA table_info(${b})`).all().some(a=>a.name===c)||a.exec(`ALTER TABLE ${b} ADD COLUMN ${c} ${d}`)}function q(a){return a.trim().toLowerCase()}function r(a,b=e().randomBytes(16).toString("hex")){let c=e().scryptSync(a,b,64).toString("hex");return`${b}:${c}`}function s(a,b){let[c,d]=b.split(":");if(!c||!d)return!1;let f=e().scryptSync(a,c,64),g=Buffer.from(d,"hex");return g.length===f.length&&e().timingSafeEqual(g,f)}function t(){return e().randomUUID()}function u(a){return String(a??"").trim()}function v(a){let b=Number(a);return Number.isInteger(b)?b:null}function w(a){return a.toISOString()}function x(a,b){try{return JSON.parse(a)}catch{return b}}function y(a){return{id:a.id,name:a.name,email:a.email,emailVerified:!!a.email_verified,phone:a.phone||"",authProvider:a.auth_provider,avatarUrl:a.avatar_url}}function z(a){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.trim())}function A(a){return a.length>=8&&/[A-Za-z]/.test(a)&&/\d/.test(a)}function B(a){return m().prepare("SELECT * FROM users WHERE email = ?").get(q(a))}function C(a,b,c){return b?String(a||"").split(b).join(c||""):String(a||"")}function D(a,b){let c=a.prepare("SELECT id, name, email FROM users WHERE email = ?").get(q(b)),d=a.prepare("SELECT id, name, email FROM users WHERE email = ?").get(q("ppiyush0005@gmail.com"));if(!c||(a.prepare("DELETE FROM diagnosis_sessions WHERE user_id = ? AND id IN ('demo-diagnosis-1-latest', 'demo-diagnosis-2', 'demo-diagnosis-3', 'demo-diagnosis-4')").run(c.id),!k.length||!d||c.id===d.id))return;let e=a.prepare(`
      SELECT *
      FROM (
        SELECT d.*,
               ROW_NUMBER() OVER (ORDER BY d.created_at DESC) AS diagnosis_no
        FROM diagnosis_sessions d
        WHERE d.user_id = ?
      ) ranked
      WHERE diagnosis_no = ?
      LIMIT 1
    `),f=a.prepare(`
      INSERT INTO diagnosis_sessions (
        id,
        user_id,
        patient_name,
        patient_email,
        pre_consultation_text,
        transcript_json,
        diagnosis_json,
        formatted_summary,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        user_id = excluded.user_id,
        patient_name = excluded.patient_name,
        patient_email = excluded.patient_email,
        pre_consultation_text = excluded.pre_consultation_text,
        transcript_json = excluded.transcript_json,
        diagnosis_json = excluded.diagnosis_json,
        formatted_summary = excluded.formatted_summary,
        created_at = excluded.created_at
    `);for(let a of k){let g=e.get(d.id,a.sourceNumber);g&&f.run(a.id,c.id,c.name||"Demo Patient",c.email||b,g.pre_consultation_text,g.transcript_json,g.diagnosis_json,function(a,b,c){let d=String(a||"");return d=C(d,b.name,c.name),d=C(d,b.email,c.email)}(g.formatted_summary,d,c),g.created_at)}}function E(){let a=q(process.env.KAMAL_DEMO_EMAIL||""),b=String(process.env.KAMAL_DEMO_PASSWORD||""),c=u(process.env.KAMAL_DEMO_NAME||"Demo Patient")||"Demo Patient";if(!a||!b)return{ok:!1,status:404,message:"Demo login is not configured."};if(!z(a)||!A(b))return{ok:!1,status:500,message:"Demo login credentials are invalid."};try{let d=m();if(B(a))return d.prepare(`UPDATE users
           SET name = ?,
               password_hash = ?,
               email_verified = 1,
               updated_at = datetime('now')
           WHERE email = ?`).run(c,r(b),a),D(d,a),{ok:!0,email:a};return d.prepare(`INSERT INTO users (
            id,
            name,
            email,
            password_hash,
            email_verified,
            phone,
            phone_verified,
            created_at,
            updated_at
          ) VALUES (?, ?, ?, ?, 1, null, 0, datetime('now'), datetime('now'))`).run(t(),c,a,r(b)),D(d,a),{ok:!0,email:a}}catch(a){return console.error("Demo user setup failed",a),{ok:!1,status:500,message:"We could not prepare the demo login."}}}function F(a){return m().prepare("SELECT * FROM users WHERE google_sub = ?").get(a)}function G(a,b){return m().prepare(`SELECT *
       FROM otp_codes
       WHERE email = ? AND purpose = ?
       ORDER BY last_sent_at DESC
       LIMIT 1`).get(q(a),b)}async function H(a,b,c){m().prepare("UPDATE otp_codes SET consumed = 1 WHERE email = ? AND purpose = ? AND consumed = 0").run(q(a),b);let d=t(),f=e().randomInt(0,1e6).toString().padStart(6,"0");m().prepare(`INSERT INTO otp_codes (
        id,
        user_id,
        email,
        code_hash,
        purpose,
        expires_at,
        attempts,
        consumed,
        created_at,
        last_sent_at
      ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, datetime('now'), datetime('now'))`).run(d,c,q(a),r(f),b,w(new Date(Date.now()+6e5)));let g=await (0,i.g9)({to:a,code:f,purpose:b});return g.ok?{ok:!0}:(m().prepare("UPDATE otp_codes SET consumed = 1 WHERE id = ?").run(d),g)}function I(a){let b=e().randomBytes(32).toString("hex");return m().prepare(`INSERT INTO sessions (id, user_id, token_hash, created_at, expires_at, revoked)
       VALUES (?, ?, ?, datetime('now'), ?, 0)`).run(t(),a,r(b),w(new Date(Date.now()+2592e6))),b}async function J(a){let b=q(a.email),c=a.name.trim()||b.split("@")[0]||"KAMAL user",d=a.avatarUrl?.trim()||null;if(!a.googleSub.trim())return{ok:!1,status:400,message:"Google did not return a valid account id."};if(!z(b))return{ok:!1,status:400,message:"Google did not return a valid email address."};if(!a.emailVerified)return{ok:!1,status:403,message:"Please use a verified Google email address."};try{let f=F(a.googleSub);if(f){m().prepare(`UPDATE users
           SET name = ?, email = ?, email_verified = 1, auth_provider = 'google', avatar_url = ?, updated_at = datetime('now')
           WHERE id = ?`).run(c,b,d,f.id);let e=F(a.googleSub);return{ok:!0,message:"Signed in with Google.",user:y(e),sessionToken:I(e.id)}}let g=B(b);if(g){if(g.google_sub&&g.google_sub!==a.googleSub)return{ok:!1,status:409,message:"That email is already linked to another Google account."};m().prepare(`UPDATE users
           SET name = ?, google_sub = ?, email_verified = 1, auth_provider = 'google', avatar_url = ?, updated_at = datetime('now')
           WHERE id = ?`).run(c,a.googleSub,d,g.id);let e=B(b);return{ok:!0,message:"Signed in with Google.",user:y(e),sessionToken:I(e.id)}}let h=t();m().prepare(`INSERT INTO users (
          id,
          name,
          email,
          password_hash,
          email_verified,
          phone,
          phone_verified,
          google_sub,
          auth_provider,
          avatar_url,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, 1, null, 0, ?, 'google', ?, datetime('now'), datetime('now'))`).run(h,c,b,r(`google:${a.googleSub}:${e().randomBytes(16).toString("hex")}`),a.googleSub,d);let i=F(a.googleSub);return{ok:!0,message:"Signed in with Google.",user:y(i),sessionToken:I(i.id)}}catch(a){return console.error("Google login failed",a),{ok:!1,status:500,message:"We could not sign you in with Google. Please try again."}}}function K(a){return a}async function L(a){let b=a.name.trim(),c=q(a.email);if(!b)return{ok:!1,status:400,message:"Please enter your name."};if(!z(c))return{ok:!1,status:400,message:"Please enter a valid email address."};if(!A(a.password))return{ok:!1,status:400,message:"Password must be at least 8 characters and include one letter and one number."};if(a.password!==a.confirmPassword)return{ok:!1,status:400,message:"Passwords do not match."};try{let d,e=B(c);if(e?.email_verified)return{ok:!1,status:409,message:"An account with this email already exists. Try signing in instead."};if(e)m().prepare(`UPDATE users
           SET name = ?, password_hash = ?, updated_at = datetime('now')
           WHERE email = ?`).run(b,r(a.password),c),d=B(c);else{let e=t();m().prepare(`INSERT INTO users (
            id,
            name,
            email,
            password_hash,
            email_verified,
            phone,
            phone_verified,
            created_at,
            updated_at
          ) VALUES (?, ?, ?, ?, 0, null, 0, datetime('now'), datetime('now'))`).run(e,b,c,r(a.password)),d=B(c)}let f=await H(c,"signup_verification",d.id);if(!f.ok)return f;return{ok:!0,message:"We sent a 6-digit code to your email.",user:y(d)}}catch(a){return console.error("Signup failed",a),{ok:!1,status:500,message:"We could not create the account. Please try again."}}}async function M(a){let b=q(a.email),c={ok:!1,status:401,message:"Email or password is incorrect."};if(!z(b))return c;try{let d=B(b);if(!d||!s(a.password,d.password_hash))return c;if(!d.email_verified){let a=await H(b,"signup_verification",d.id);if(!a.ok)return a;return{ok:!0,message:"Please verify your email to continue.",user:y(d)}}return{ok:!0,message:"Signed in.",user:y(d),sessionToken:I(d.id)}}catch(a){return console.error("Login failed",a),{ok:!1,status:500,message:"We could not sign you in. Please try again."}}}async function N(a){let b=q(a.email),c=a.code.trim();try{let d=G(b,a.purpose);if(!d||d.consumed||new Date(d.expires_at).getTime()<Date.now()||d.attempts>=5)return{ok:!1,status:400,message:"That code is no longer active. Please request a new one."};if(!/^\d{6}$/.test(c)||!s(c,d.code_hash)){let a=d.attempts+1;if(m().prepare(`UPDATE otp_codes
           SET attempts = ?, consumed = CASE WHEN ? >= 5 THEN 1 ELSE consumed END
           WHERE id = ?`).run(a,a,d.id),a>=5)return{ok:!1,status:400,message:"That code no longer works. Please request a new one."};return{ok:!1,status:400,message:"That code did not match. Please try again."}}m().prepare("UPDATE otp_codes SET consumed = 1 WHERE id = ?").run(d.id);let e=m().prepare("SELECT * FROM users WHERE id = ? OR email = ? ORDER BY id = ? DESC LIMIT 1").get(d.user_id,b,d.user_id);if(!e)return{ok:!1,status:400,message:"We could not find an account for this code."};let f=e;return"signup_verification"===a.purpose&&(m().prepare("UPDATE users SET email_verified = 1, updated_at = datetime('now') WHERE id = ?").run(e.id),f=B(e.email)),{ok:!0,message:"Code verified.",user:y(f),sessionToken:I(f.id)}}catch(a){return console.error("OTP verification failed",a),{ok:!1,status:500,message:"We could not verify that code. Please try again."}}}async function O(a){let b=q(a.email);if(!z(b))return{ok:!1,status:400,message:"Please enter a valid email address."};try{let c=B(b);if(!c)return{ok:!1,status:404,message:"We could not find an account for that email."};let d=G(b,a.purpose);if(d){let a=Date.now()-new Date(d.last_sent_at).getTime();if(a<12e4){let b=Math.ceil((12e4-a)/1e3);return{ok:!1,status:429,message:`Please wait ${b} seconds before requesting another code.`}}}let e=await H(b,a.purpose,c.id);if(!e.ok)return e;return{ok:!0,message:"We sent a new code to your email."}}catch(a){return console.error("Resend OTP failed",a),{ok:!1,status:500,message:"We could not send a new code. Please try again."}}}async function P(a){let b=q(a.email),c="If that email is registered, we sent a code.";if(!z(b))return{ok:!0,message:c};try{let a=B(b);if(a){let c=await H(b,"password_reset",a.id);if(!c.ok)return{ok:!1,status:c.status,message:c.message}}return{ok:!0,message:c}}catch(a){return console.error("Forgot password failed",a),{ok:!0,message:c}}}async function Q(a){if(!A(a.newPassword))return{ok:!1,status:400,message:"Password must be at least 8 characters and include one letter and one number."};if(a.newPassword!==a.confirmPassword)return{ok:!1,status:400,message:"Passwords do not match."};let b=await N({email:a.email,code:a.code,purpose:"password_reset"});if(!b.ok||!b.user)return b;try{var c;m().prepare(`UPDATE users
         SET password_hash = ?, email_verified = 1, updated_at = datetime('now')
         WHERE email = ?`).run(r(a.newPassword),q(a.email));let b=B(a.email);if(!b)return{ok:!1,status:400,message:"We could not update that account."};return c=b.id,m().prepare("UPDATE sessions SET revoked = 1 WHERE user_id = ?").run(c),{ok:!0,message:"Password updated.",user:y(b),sessionToken:I(b.id)}}catch(a){return console.error("Reset password failed",a),{ok:!1,status:500,message:"We could not update the password. Please try again."}}}async function R(a){if(!a)return null;try{for(let b of m().prepare(`SELECT *
         FROM sessions
         WHERE revoked = 0 AND expires_at > ?
         ORDER BY created_at DESC`).all(w(new Date)))if(s(a,b.token_hash)){let a=m().prepare("SELECT * FROM users WHERE id = ?").get(b.user_id);return a?y(a):null}}catch(a){console.error("Session lookup failed",a)}return null}function S(a,b){let c=u(b.name),d=q(String(b.email||"")),e=u(b.phone).slice(0,40);if(!a)return{ok:!1,status:401,message:"Please sign in first."};if(!c)return{ok:!1,status:400,message:"Please enter your name."};if(!z(d))return{ok:!1,status:400,message:"Please enter a valid email address."};try{if(!m().prepare("SELECT * FROM users WHERE id = ?").get(a))return{ok:!1,status:404,message:"User not found."};let b=B(d);if(b&&b.id!==a)return{ok:!1,status:409,message:"That email is already used by another account."};m().prepare(`UPDATE users
         SET name = ?,
             email = ?,
             phone = ?,
             email_verified = CASE WHEN email = ? THEN email_verified ELSE 0 END,
             updated_at = datetime('now')
         WHERE id = ?`).run(c,d,e||null,d,a);let f=m().prepare("SELECT * FROM users WHERE id = ?").get(a);return{ok:!0,message:"Profile saved.",user:y(f)}}catch(a){return console.error("Profile update failed",a),{ok:!1,status:500,message:"We could not save your profile. Please try again."}}}function T(a){let b=u(a);if(!b)return[];let c=`%${b.replaceAll("%","\\%").replaceAll("_","\\_")}%`;return m().prepare(`SELECT id, name
       FROM users
       WHERE name LIKE ? ESCAPE '\\'
       ORDER BY name COLLATE NOCASE ASC
       LIMIT 25`).all(c).map(a=>({id:a.id,name:a.name}))}function U(a){if(!a)return null;let b=m().prepare(`SELECT *
       FROM patient_intakes
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 1`).get(a);return b?{id:b.id,userId:b.user_id,age:b.age,gender:b.gender,heightCm:b.height_cm,weightKg:b.weight_kg,allergies:b.allergies||"",mainConcern:b.main_concern,createdAt:b.created_at,updatedAt:b.updated_at}:null}function V(a,b){let c=v(b.age),d=v(b.heightCm),e=v(b.weightKg),f=u(b.gender),g=u(b.allergies),h=u(b.mainConcern),i=new Set(["female","male","non_binary","prefer_not_to_say"]);if(!a)return{ok:!1,status:401,message:"Please sign in before starting a consultation."};if(null===c||c<0||c>130)return{ok:!1,status:400,message:"Enter an age between 0 and 130 years."};if(!i.has(f))return{ok:!1,status:400,message:"Select a gender option."};if(null===d||d<40||d>260)return{ok:!1,status:400,message:"Enter height between 40 and 260 cm."};if(null===e||e<1||e>500)return{ok:!1,status:400,message:"Enter weight between 1 and 500 kg."};if(!h)return{ok:!1,status:400,message:"Describe the main concern before the diagnosis session can continue."};let j=t();return m().prepare(`INSERT INTO patient_intakes (
        id,
        user_id,
        age,
        gender,
        height_cm,
        weight_kg,
        allergies,
        main_concern,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`).run(j,a,c,f,d,e,g||null,h),{ok:!0,message:"Patient information saved.",intake:U(a)}}function W(a){return{id:a.id,title:a.medicine_name,scheduledAt:a.scheduled_at,channel:a.channel,status:a.status,repeatRule:a.repeat_rule||"none",scheduleStartDate:a.schedule_start_date||"",scheduleEndDate:a.schedule_end_date||"",customInterval:a.custom_interval||1,customUnit:a.custom_unit||"",customWeekdays:x(a.custom_weekdays_json,[]),details:a.details||"",emailSentAt:a.email_sent_at,emailError:a.email_error}}function X(a,b){let c=u(b.medicineName),d=u(b.channel),e=u(b.repeatRule||"none"),f=u(b.details).slice(0,1e3),g=new Date(b.scheduledAt),h=u(b.scheduleStartDate),i=u(b.scheduleEndDate),j=Math.max(1,Math.min(365,Number.parseInt(b.customInterval,10)||1)),k=u(b.customUnit||"day"),l=Array.isArray(b.customWeekdays)?b.customWeekdays.map(a=>Number.parseInt(a,10)).filter(a=>Number.isInteger(a)&&a>=0&&a<=6):[],n=new Set(["Email","WhatsApp"]),o=new Set(["none","daily","weekly","monthly","yearly","weekdays","custom"]),p=new Set(["day","week","month"]);if(!a)return{ok:!1,status:401,message:"Please sign in before setting medication reminders."};if(!c)return{ok:!1,status:400,message:"Enter the medicine name."};if(!n.has(d))return{ok:!1,status:400,message:"Choose Email or WhatsApp as the reminder channel."};if(!o.has(e))return{ok:!1,status:400,message:"Choose a valid repeat option."};if("custom"===e){if(!/^\d{4}-\d{2}-\d{2}$/.test(h)||!/^\d{4}-\d{2}-\d{2}$/.test(i))return{ok:!1,status:400,message:"Choose a custom start and end date."};if(i<h)return{ok:!1,status:400,message:"Custom end date must be after the start date."};if(!p.has(k))return{ok:!1,status:400,message:"Choose a valid custom repeat unit."};if("week"===k&&0===l.length)return{ok:!1,status:400,message:"Choose at least one weekday for a weekly custom reminder."}}if(Number.isNaN(g.getTime())||g.getTime()<=Date.now())return{ok:!1,status:400,message:"Choose a future reminder time."};let q=t();return m().prepare(`INSERT INTO medication_reminders (
        id,
        user_id,
        medicine_name,
        scheduled_at,
        channel,
        status,
        repeat_rule,
        schedule_start_date,
        schedule_end_date,
        custom_interval,
        custom_unit,
        custom_weekdays_json,
        details,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, 'scheduled', ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`).run(q,a,c,w(g),d,e,"custom"===e?h:null,"custom"===e?i:null,"custom"===e?j:null,"custom"===e?k:null,"custom"===e?JSON.stringify([...new Set(l)].sort((a,b)=>a-b)):null,f||null),{ok:!0,message:"Medication reminder set.",reminder:function(a){let b=m().prepare("SELECT * FROM medication_reminders WHERE id = ?").get(a);return b?W(b):null}(q)}}function Y(a){return a?m().prepare(`SELECT *
       FROM medication_reminders
       WHERE user_id = ?
         AND status = 'scheduled'
         AND scheduled_at > ?
       ORDER BY scheduled_at ASC`).all(a,w(new Date)).map(W):[]}function Z(){return m().prepare(`SELECT medication_reminders.*, users.name AS user_name, users.email AS user_email
       FROM medication_reminders
       JOIN users ON users.id = medication_reminders.user_id
       WHERE medication_reminders.status = 'scheduled'
         AND medication_reminders.scheduled_at <= ?
       ORDER BY medication_reminders.scheduled_at ASC`).all(w(new Date))}function $(){return m().prepare(`SELECT medication_reminders.*, users.name AS user_name, users.email AS user_email
       FROM medication_reminders
       JOIN users ON users.id = medication_reminders.user_id
       WHERE medication_reminders.status = 'scheduled'
         AND medication_reminders.scheduled_at > ?
       ORDER BY medication_reminders.scheduled_at ASC`).all(w(new Date))}function _(a,b){return m().prepare(`UPDATE medication_reminders
       SET status = 'taken', updated_at = datetime('now')
       WHERE id = ? AND user_id = ? AND status = 'scheduled'`).run(b,a).changes>0?{ok:!0,message:"Medication marked as taken."}:{ok:!1,status:404,message:"Active medication reminder was not found."}}function aa(a){m().prepare(`UPDATE medication_reminders
       SET status = 'sent', email_sent_at = datetime('now'), email_error = NULL, updated_at = datetime('now')
       WHERE id = ?`).run(a)}function ab(a,b){m().prepare(`UPDATE medication_reminders
       SET status = 'scheduled', scheduled_at = ?, email_sent_at = NULL, email_error = NULL, updated_at = datetime('now')
       WHERE id = ?`).run(w(b),a)}function ac(a,b){m().prepare(`UPDATE medication_reminders
       SET status = 'failed', email_error = ?, updated_at = datetime('now')
       WHERE id = ?`).run(String(b||"Email failed").slice(0,500),a)}function ad(a){return{id:a.id,userId:a.user_id,patientName:a.patient_name,patientEmail:a.patient_email,preConsultationText:a.pre_consultation_text,transcript:x(a.transcript_json,[]),diagnosis:x(a.diagnosis_json,{}),formattedSummary:a.formatted_summary,createdAt:a.created_at}}function ae(a,b,c,d){if(!a?.id)return{ok:!1,status:401,message:"Please sign in before saving a diagnosis."};if(!b)return{ok:!1,status:400,message:"Save your concern before diagnosis can continue."};let e=t(),f=`Age: ${b.age} years
Gender: ${b.gender}
Height: ${b.heightCm} cm
Weight: ${b.weightKg} kg
Allergies: ${b.allergies||"None reported"}
Main concern: ${b.mainConcern||"Not stated"}`,g=function({patientName:a,patientEmail:b,intake:c,transcript:d,diagnosis:e}){let f=`Age: ${c.age} years
Gender: ${c.gender}
Height: ${c.heightCm} cm
Weight: ${c.weightKg} kg
Allergies: ${c.allergies||"None reported"}
Main concern: ${c.mainConcern||"Not stated"}`,g=d.map(a=>`${"assistant"===a.role?"Doctor AI":"Patient"}: ${a.content}`).join("\n\n"),h=Array.isArray(e.likelyConditions)?e.likelyConditions.join(", "):"Not specified",i=e.primaryDisease||(Array.isArray(e.likelyConditions)?e.likelyConditions[0]:"")||"Not specified",j=Array.isArray(e.recommendedNextSteps)?e.recommendedNextSteps.join("\n- "):e.recommendedNextStep||"Consult a qualified clinician.",k=Array.isArray(e.redFlags)?e.redFlags.join("\n- "):"Seek urgent care for severe, worsening, or emergency symptoms.",l=Array.isArray(e.selfCare)?e.selfCare.join("\n- "):"Follow safe supportive care and clinician advice.";return`Patient Name
${a}

---

Patient Email
${b||"Not available"}

---

Pre Text
${f}

---

Whole Diagnosis
Final disease or condition: ${i}
Likely conditions: ${h}
Confidence: ${e.confidenceLevel||"Not specified"}
Reasoning: ${e.reasoning||"Not specified"}
Recommended next steps:
- ${j}
Red flags:
- ${k}
Self-care guidance:
- ${l}
Caution: ${e.caution||e.doctorConfirmationNote||"This is AI-assisted guidance, not a final medical diagnosis. A qualified doctor should confirm it."}

---

Conversation Transcript
${g}`}({patientName:a.name,patientEmail:a.email,intake:b,transcript:c,diagnosis:d});return m().prepare(`INSERT INTO diagnosis_sessions (
        id,
        user_id,
        patient_name,
        patient_email,
        pre_consultation_text,
        transcript_json,
        diagnosis_json,
        formatted_summary,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(e,a.id,a.name,a.email||"",f,JSON.stringify(c),JSON.stringify(d),g,function(a=new Date){return new Date(a.getTime()-6e4*a.getTimezoneOffset()).toISOString().slice(0,19).replace("T"," ")}()),{ok:!0,message:"Diagnosis saved to history.",diagnosisSession:function(a,b){let c=m().prepare("SELECT * FROM diagnosis_sessions WHERE user_id = ? AND id = ?").get(a,b);return c?ad(c):null}(a.id,e)}}function af(a,b=20){return a?m().prepare(`SELECT *
       FROM diagnosis_sessions
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ?`).all(a,b).map(ad):[]}async function ag(a){if(a)try{for(let b of m().prepare("SELECT id, token_hash FROM sessions WHERE revoked = 0 AND expires_at > ?").all(w(new Date)))if(s(a,b.token_hash))return void m().prepare("UPDATE sessions SET revoked = 1 WHERE id = ?").run(b.id)}catch(a){console.error("Session revoke failed",a)}}}};