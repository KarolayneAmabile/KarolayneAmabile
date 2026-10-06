// worker.js — Karolayne Portfolio (Bilingual: PT / EN)
// Routes:
//   /         → redirect to /pt or /en based on Accept-Language
//   /pt        → Portuguese version
//   /en        → English version
//   anything else → redirect to /pt

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';

    if (path === '/en') return new Response(buildHTML('en'), htmlHeaders());
    if (path === '/pt') return new Response(buildHTML('pt'), htmlHeaders());

    // Auto-detect language from Accept-Language header
    const acceptLang = request.headers.get('Accept-Language') || '';
    const prefersPT = /\bpt\b/i.test(acceptLang);
    const lang = prefersPT ? 'pt' : 'en';

    return Response.redirect(`${url.origin}/${lang}`, 302);
  },
};

function htmlHeaders() {
  return {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy':
        "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self'; connect-src 'none'; script-src 'unsafe-inline';",
    },
  };
}

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  pt: {
    lang: 'pt',
    altLang: 'en',
    altLabel: 'EN',
    altTitle: 'Switch to English',
    title: 'karolayne@Karol: ~',
    // whoami
    cmd_whoami: 'whoami',
    location: 'Anápolis, Goiás · Brasil',
    email_label: 'e-mail',
    github_label: 'github',
    linkedin_label: 'linkedin',
    location_label: 'localização',
    bio: 'DevOps Engineer Jr com experiência em infraestrutura AWS multi-conta e cloud-native, Kubernetes, automação e práticas GitOps. Atuo com IaC, CI/CD, segurança e governança em AWS, observabilidade e gerenciamento de secrets. Graduanda em Ciência da Computação pelo IFG — 6º período, IRA 8,0.',
    // stack
    cmd_stack: 'cat stack.conf',
    stack: [
      ['aws',             'EKS · ECS Fargate · IAM Identity Center · Organizations · Control Tower · GuardDuty · Security Hub · CloudTrail · Config · RDS · S3 · Secrets Manager'],
      ['kubernetes',      'EKS · k0s · Helm · ArgoCD · Karpenter · Gateway API · Traefik · Cilium · cert-manager'],
      ['iac &amp; ci/cd', 'Terraform/OpenTofu · Terragrunt · GitHub Actions · ArgoCD Image Updater'],
      ['observability',   'Grafana · Prometheus · Loki · Mimir · Alloy'],
      ['security',        'Vault · External Secrets Operator · Authentik'],
      ['backup',          'Velero · Longhorn'],
      ['linguagens',      'Rust · C · Python · HCL'],
      ['idiomas',         'Português (nativo) · Inglês (leitura técnica avançada, EF SET C2; conversação intermediária)'],
    ],
    // experience
    cmd_exp: 'cat experience.log',
    job_title: 'DevOps Engineer Jr',
    job_company: 'Soliton',
    job_type: 'Remoto',
    job_period: 'Abril 2025 — Outubro 2026',
    bullets: [
      'Estruturei a governança de segurança de uma AWS Organization com ~25 contas via Terragrunt/OpenTofu: GuardDuty e Security Hub com admin delegado, CloudTrail multi-região, AWS Config e Control Tower.',
      'Provisionei cluster EKS de operações (terraform-aws-eks) com Gateway API, Traefik, cert-manager (DNS01) e VPN mesh self-hosted (NetBird) integrada a SSO com Authentik sobre RDS PostgreSQL.',
      'Implementei SSO com IAM Identity Center e Google Workspace como IdP (SAML + SCIM), com grupos por perfil de acesso e contas break-glass.',
      'Reduzi o tempo de deploy da plataforma OpenEDX em 5× substituindo a camada de abstração do Tutor por uma pipeline customizada com GitHub Actions, ArgoCD e ArgoCD Image Updater.',
      'Projetei e administrei clusters Kubernetes multi-purpose (segurança, monitoramento, operações e produção) com isolamento por ambiente.',
      'Configurei HPA e PDB em aplicações de produção em EKS com Karpenter, evitando downtime na consolidação de nós, e balanceei réplicas entre spot e on-demand com topologySpreadConstraints.',
      'Implementei stack de observabilidade com Grafana, Prometheus, Loki, Mimir e Alloy, com logs cross-account armazenados em S3 numa conta de log-archive via IRSA.',
      'Instrumentei aplicações em ECS Fargate com Grafana Alloy como sidecar, sem custo adicional de infraestrutura para o cliente.',
      'Desenvolvi módulos Terraform/OpenTofu e Helm Charts padronizando a infraestrutura e garantindo o padrão GitOps entre ambientes.',
      'Automatizei secrets com Vault e External Secrets Operator, eliminando credenciais hardcoded nos repositórios.',
    ],
    // certifications
    cmd_certs: 'ls certifications/',
    cert_aws_label: 'AWS Certified Cloud Practitioner',
    cert_aws_issuer: 'Amazon Web Services · 2023–2026',
    cert_ef_label: '✓ EF SET C2 Proficient',
    cert_ef_issuer: 'EF SET English Certificate',
    // education
    cmd_edu: 'cat education.txt',
    edu_degree: 'Bacharelado em Ciência da Computação',
    edu_meta: 'Instituto Federal de Goiás (IFG) · 2024–2027 · 6º período · IRA 8,0',
    edu_subjects: 'Arquitetura de Computadores · Sistemas Operacionais · Redes de Computadores · Engenharia de Software · Estrutura de Dados · Bancos de Dados',
    // hobbies
    cmd_hobbies: 'cat hobbies.txt',
    hobbies: 'games · anime · café hopping · gardening · learning new things',
  },

  en: {
    lang: 'en',
    altLang: 'pt',
    altLabel: 'PT',
    altTitle: 'Mudar para Português',
    title: 'karolayne@Karol: ~',
    // whoami
    cmd_whoami: 'whoami',
    location: 'Anápolis, Goiás · Brazil',
    email_label: 'email',
    github_label: 'github',
    linkedin_label: 'linkedin',
    location_label: 'location',
    bio: 'Junior DevOps Engineer with hands-on experience building and operating multi-account AWS and cloud-native infrastructure. Experienced with Kubernetes, IaC, GitOps, AWS security and governance, and end-to-end observability. B.Sc. in Computer Science at IFG — 6th semester, GPA 8.0/10.',
    // stack
    cmd_stack: 'cat stack.conf',
    stack: [
      ['aws',             'EKS · ECS Fargate · IAM Identity Center · Organizations · Control Tower · GuardDuty · Security Hub · CloudTrail · Config · RDS · S3 · Secrets Manager'],
      ['kubernetes',      'EKS · k0s · Helm · ArgoCD · Karpenter · Gateway API · Traefik · Cilium · cert-manager'],
      ['iac &amp; ci/cd', 'Terraform/OpenTofu · Terragrunt · GitHub Actions · ArgoCD Image Updater'],
      ['observability',   'Grafana · Prometheus · Loki · Mimir · Alloy'],
      ['security',        'Vault · External Secrets Operator · Authentik'],
      ['backup',          'Velero · Longhorn'],
      ['languages',       'Rust · C · Python · HCL'],
      ['spoken langs',    'Portuguese (native) · English (advanced technical reading, EF SET C2; intermediate conversation)'],
    ],
    // experience
    cmd_exp: 'cat experience.log',
    job_title: 'Junior DevOps Engineer',
    job_company: 'Soliton',
    job_type: 'Remote',
    job_period: 'April 2025 — October 2026',
    bullets: [
      'Built the security governance baseline for a ~25-account AWS Organization using Terragrunt/OpenTofu: GuardDuty and Security Hub with delegated admin, multi-region CloudTrail, AWS Config, and Control Tower.',
      'Provisioned an operations EKS cluster (terraform-aws-eks) with Gateway API, Traefik, cert-manager (DNS01), and a self-hosted VPN mesh (NetBird) integrated with Authentik SSO backed by RDS PostgreSQL.',
      'Implemented SSO with IAM Identity Center using Google Workspace as the IdP (SAML + SCIM), with role-based access groups and break-glass accounts.',
      'Reduced OpenEDX platform deploy time by 5× by replacing the Tutor abstraction layer with a custom pipeline using GitHub Actions, ArgoCD, and ArgoCD Image Updater.',
      'Designed and managed multi-purpose Kubernetes clusters (security, monitoring, operations, and production) with per-environment isolation.',
      'Configured HPA and PDB for production workloads on EKS with Karpenter, preventing downtime during node consolidation, and balanced replicas across spot and on-demand capacity using topologySpreadConstraints.',
      'Implemented an observability stack with Grafana, Prometheus, Loki, Mimir, and Alloy, including cross-account log storage in S3 in a log-archive account via IRSA.',
      'Instrumented ECS Fargate applications with Grafana Alloy as a sidecar, at no additional infrastructure cost to the client.',
      'Developed reusable Terraform/OpenTofu modules and Helm Charts to standardize infrastructure and enforce GitOps practices across environments.',
      'Automated secrets management with Vault and External Secrets Operator, eliminating hardcoded credentials from repositories.',
    ],
    // certifications
    cmd_certs: 'ls certifications/',
    cert_aws_label: 'AWS Certified Cloud Practitioner',
    cert_aws_issuer: 'Amazon Web Services · 2023–2026',
    cert_ef_label: '✓ EF SET C2 Proficient',
    cert_ef_issuer: 'EF SET English Certificate',
    // education
    cmd_edu: 'cat education.txt',
    edu_degree: 'B.Sc. in Computer Science',
    edu_meta: 'Instituto Federal de Goiás (IFG) · 2024–2027 · 6th semester · GPA 8.0',
    edu_subjects: 'Computer Architecture · Operating Systems · Computer Networks · Software Engineering · Data Structures · Databases',
    // hobbies
    cmd_hobbies: 'cat hobbies.txt',
    hobbies: 'games · anime · café hopping · gardening · learning new things',
  },
};

// ─── HTML Builder ─────────────────────────────────────────────────────────────

function buildHTML(lang) {
  const l = t[lang];
  const dot = '<span class="dot-sep">·</span>';

  const stackRows = l.stack.map(([key, val]) => `
          <span class="stack-key">${key}</span>
          <span class="stack-val">${val.split(' · ').join(` ${dot} `)}</span>`).join('');

  const bulletItems = l.bullets.map(b => `<div class="bullet">${b}</div>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${l.title}</title>
<link rel="alternate" hreflang="${l.lang}" href="/${l.lang}">
<link rel="alternate" hreflang="${l.altLang}" href="/${l.altLang}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
<style>
  :root {
    --pink: #ff6eb4;
    --pink-dim: #b5386e;
    --pink-dark: #6b1f40;
    --amber: #ffb3d9;
    --cyan: #f0f0f0;
    --red: #ff4444;
    --bg: #0a0a0a;
    --bg2: #0f0f0f;
    --border: #222222;
    --text: #e0e0e0;
    --text-dim: #888888;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    min-height: 100vh;
    padding: 2rem 1rem;
    overflow-x: hidden;
  }
  .scanlines {
    position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
    pointer-events: none; z-index: 999;
  }
  .crt-glow {
    position: fixed; inset: 0;
    background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%);
    pointer-events: none; z-index: 998;
  }
  .terminal {
    max-width: 860px; margin: 0 auto;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    box-shadow: 0 0 40px rgba(255,110,180,0.06), 0 0 1px rgba(255,110,180,0.25);
  }
  .terminal-bar {
    background: #1a1a1a; border-bottom: 1px solid var(--border);
    padding: 0; display: flex; align-items: stretch;
    border-radius: 4px 4px 0 0; user-select: none;
  }
  .win-tab {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; background: #0f0f0f;
    border-right: 1px solid var(--border);
    color: var(--text-dim); font-size: 12px; letter-spacing: 0.03em;
    border-radius: 4px 0 0 0;
  }
  .win-tab-icon { color: var(--pink); font-size: 13px; }
  .win-tab-new {
    display: flex; align-items: center;
    padding: 0 12px; color: var(--text-dim); font-size: 16px; cursor: default;
    border-right: 1px solid var(--border);
  }
  .win-tab-new:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .win-spacer { flex: 1; }
  .win-controls { display: flex; align-items: stretch; }
  /* Language switcher */
  .lang-switch {
    display: flex; align-items: center;
    padding: 0 14px;
    border-right: 1px solid var(--border);
    color: var(--pink-dim); font-size: 11px; letter-spacing: 0.08em;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: color 0.15s, background 0.15s;
  }
  .lang-switch:hover {
    background: rgba(255,110,180,0.08);
    color: var(--pink);
  }
  .lang-switch::before { content: '⌥ '; opacity: 0.5; margin-right: 3px; }
  .win-btn {
    display: flex; align-items: center; justify-content: center;
    width: 46px; font-size: 12px; color: var(--text-dim); cursor: default;
  }
  .win-btn:hover { background: rgba(255,255,255,0.08); color: var(--text); }
  .win-btn.close:hover { background: #e81123; color: #fff; }
  .body { padding: 2rem; }
  .prompt-line { display: flex; align-items: baseline; gap: 0; margin-bottom: 0.25rem; flex-wrap: wrap; }
  .ps1 { color: var(--pink); font-weight: 500; white-space: nowrap; }
  .ps1 .user { color: var(--cyan); }
  .ps1 .sep { color: var(--text-dim); }
  .ps1 .path { color: var(--pink); }
  .ps1 .dollar { color: var(--text-dim); margin: 0 6px 0 0; }
  .cmd { color: var(--text); }
  .output { margin: 0.5rem 0 1.75rem 0; }
  .box {
    border: 1px solid var(--pink-dark); border-radius: 2px;
    padding: 1rem 1.25rem; margin: 0.25rem 0;
    background: rgba(255,110,180,0.02);
  }
  .info-line { color: var(--text); margin: 0.15rem 0; font-size: 13px; }
  .info-line .label { color: var(--text-dim); min-width: 180px; display: inline-block; }
  .info-line .value { color: var(--cyan); }
  .info-line .value a { color: var(--cyan); text-decoration: none; }
  .info-line .value a:hover { color: var(--pink); text-decoration: underline; }
  .badge {
    display: inline-block;
    background: rgba(255,110,180,0.1); border: 1px solid var(--pink-dark);
    color: var(--pink); font-size: 11px; padding: 1px 6px;
    border-radius: 2px; margin: 2px 3px 2px 0; letter-spacing: 0.03em;
  }
  .badge.amber { background: rgba(240,165,0,0.08); border-color: rgba(240,165,0,0.3); color: var(--amber); }
  .badge.cyan { background: rgba(0,229,229,0.08); border-color: rgba(0,229,229,0.3); color: var(--cyan); }
  .job-entry { margin-bottom: 1.25rem; padding-left: 1rem; border-left: 1px solid var(--pink-dark); }
  .job-title { color: var(--pink); font-weight: 500; }
  .job-meta { color: var(--text-dim); font-size: 12px; margin: 0.1rem 0 0.5rem; }
  .bullet { color: var(--text); font-size: 13px; margin: 0.2rem 0; padding-left: 1.2em; text-indent: -1.2em; }
  .bullet::before { content: '▸ '; color: var(--pink-dim); }
  .edu-entry { padding-left: 1rem; border-left: 1px solid var(--pink-dark); }
  .edu-title { color: var(--pink); font-weight: 500; }
  .edu-sub { color: var(--text-dim); font-size: 12px; margin: 0.1rem 0 0.5rem; }
  .stack-grid { display: grid; grid-template-columns: 140px 1fr; gap: 0.3rem 1rem; font-size: 13px; }
  .stack-key { color: var(--text-dim); white-space: nowrap; }
  .stack-key::before { content: '['; } .stack-key::after { content: ']'; }
  .stack-val { color: var(--text); }
  .dot-sep { color: var(--pink-dim); margin: 0 4px; }
  .hobbies { color: var(--text); font-size: 13px; }
  .hobbies span { color: var(--pink-dim); margin: 0 4px; }
  .cursor {
    display: inline-block; width: 8px; height: 14px;
    background: var(--pink); vertical-align: text-bottom;
    animation: blink 1.1s step-end infinite; margin-left: 2px;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .section { opacity: 0; animation: fadeIn 0.5s ease forwards; }
  .section:nth-child(1) { animation-delay: 0s; }
  .section:nth-child(2) { animation-delay: 0.08s; }
  .section:nth-child(3) { animation-delay: 0.16s; }
  .section:nth-child(4) { animation-delay: 0.24s; }
  .section:nth-child(5) { animation-delay: 0.32s; }
  .section:nth-child(6) { animation-delay: 0.40s; }
  .section:nth-child(7) { animation-delay: 0.48s; }
  @keyframes fadeIn { to { opacity: 1; } }
  @media (max-width: 600px) {
    body { padding: 0.5rem; font-size: 13px; }
    .body { padding: 1rem; }
    .stack-grid { grid-template-columns: 1fr; }
    .info-line .label { min-width: 120px; font-size: 12px; }
  }
</style>
</head>
<body>
<div class="scanlines"></div>
<div class="crt-glow"></div>
<div class="terminal">
  <div class="terminal-bar">
    <div class="win-tab"><span class="win-tab-icon">❯_</span>karolayne@Karol: ~</div>
    <div class="win-tab-new">+</div>
    <div class="win-spacer"></div>
    <div class="win-controls">
      <a href="/${l.altLang}" class="lang-switch" title="${l.altTitle}">${l.altLabel}</a>
      <div class="win-btn">&#x2500;</div>
      <div class="win-btn">&#x25A1;</div>
      <div class="win-btn close">&#x2715;</div>
    </div>
  </div>
  <div class="body">

    <!-- whoami -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">${l.cmd_whoami}</span>
      </div>
      <div class="output">
        <div class="box">
          <div class="info-line">Karolayne Amábile Brito Borges &nbsp;<span class="badge">DevOps Engineer Jr</span></div>
          <div class="info-line" style="margin-top:0.5rem;"><span class="label">${l.location_label}</span><span class="value">${l.location}</span></div>
          <div class="info-line"><span class="label">${l.email_label}</span><span class="value"><a href="mailto:karolayneamabile@gmail.com">karolayneamabile@gmail.com</a></span></div>
          <div class="info-line"><span class="label">${l.github_label}</span><span class="value"><a href="https://github.com/KarolayneAmabile" target="_blank" rel="noopener noreferrer">github.com/KarolayneAmabile</a></span></div>
          <div class="info-line"><span class="label">${l.linkedin_label}</span><span class="value"><a href="https://linkedin.com/in/karolayneamabile" target="_blank" rel="noopener noreferrer">linkedin.com/in/karolayneamabile</a></span></div>
          <div style="margin-top:0.75rem; color:#888888; font-size:13px; font-style:italic; line-height:1.5;">${l.bio}</div>
        </div>
      </div>
    </div>

    <!-- stack -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">${l.cmd_stack}</span>
      </div>
      <div class="output">
        <div class="stack-grid">${stackRows}</div>
      </div>
    </div>

    <!-- experience -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">${l.cmd_exp}</span>
      </div>
      <div class="output">
        <div class="job-entry">
          <div class="job-title">${l.job_title} &nbsp;<span class="badge">${l.job_company}</span> <span class="badge">${l.job_type}</span></div>
          <div class="job-meta">${l.job_period}</div>
          ${bulletItems}
        </div>
      </div>
    </div>

    <!-- certifications -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">${l.cmd_certs}</span>
      </div>
      <div class="output">
        <a href="https://www.credly.com/badges/cf49021b-d946-47a7-8442-c0349f7d8b7e" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><span class="badge amber">${l.cert_aws_label}</span></a>
        <span style="color:var(--text-dim); font-size:12px; margin-left:6px;">${l.cert_aws_issuer}</span>
        <br style="margin:0.3rem 0; display:block;">
        <a href="https://cert.efset.org/en/FXfQvC" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><span class="badge cyan">${l.cert_ef_label}</span></a>
        <span style="color:var(--text-dim); font-size:12px; margin-left:6px;">${l.cert_ef_issuer}</span>
      </div>
    </div>

    <!-- education -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">${l.cmd_edu}</span>
      </div>
      <div class="output">
        <div class="edu-entry">
          <div class="edu-title">${l.edu_degree}</div>
          <div class="edu-sub">${l.edu_meta}</div>
          <div style="font-size:12px; color:var(--text-dim);">${l.edu_subjects}</div>
        </div>
      </div>
    </div>

    <!-- hobbies -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">${l.cmd_hobbies}</span>
      </div>
      <div class="output">
        <div class="hobbies">${l.hobbies.split(' · ').join(' <span>·</span> ')}</div>
      </div>
    </div>

    <!-- cursor -->
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <div class="cursor"></div>
      </div>
    </div>

  </div>
</div>
</body>
</html>`;
}