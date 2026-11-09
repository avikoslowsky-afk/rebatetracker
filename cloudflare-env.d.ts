declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}

declare namespace Cloudflare { interface Env { REBATE_TEAM_EMAIL?: string; } }

declare namespace Cloudflare { interface Env { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string; AUTH_SESSION_SECRET?: string; AUTH_ORIGIN?: string; } }

declare namespace Cloudflare { interface Env { REWIRING_AMERICA_API_KEY?: string; } }

declare namespace Cloudflare {interface Env {EMAIL_ENABLED?:string;RESEND_API_KEY?:string;EMAIL_FROM?:string;EMAIL_REPLY_TO?:string;}}

declare namespace Cloudflare {interface Env {REBATE_AI_ENABLED?:string;AI?:{run(model:string,input:{messages:{role:string;content:string}[];max_tokens:number;temperature:number}):Promise<unknown>};}}
