import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  Cross,
  HeartPulse,
  Hospital,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Siren,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import {
  cosmeticServices,
  doctors,
  facilities,
  generalServices,
  hospitalData,
} from '@/data/hospitalData';

const queryClient = new QueryClient();

type IconType = typeof HeartPulse;

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="display-font text-4xl leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

function Logo({
  compact = false,
  transparent = false,
}: {
  compact?: boolean;
  transparent?: boolean;
}) {
  const imageSrc = transparent
    ? import.meta.env.BASE_URL + 'assets/hajra-karim-logo-transparent.png'
    : import.meta.env.BASE_URL + 'assets/hajra-karim-logo.png';
  const imageClassName = compact
    ? 'h-14 w-14 object-contain object-center'
    : 'h-20 w-20 object-contain object-center sm:h-24 sm:w-24';

  return (
    <a href="#home" className="inline-flex items-center" aria-label="Hajra Kareem Hospital home" data-testid="link-logo-home">
      <img
        src={imageSrc}
        alt="Hajra Kareem Hospital logo"
        className={imageClassName}
      />
    </a>
  );
}

function Header({ openInquiry }: { openInquiry: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    ['About', '#about'],
    ['Services', '#services'],
    ['Doctors', '#doctors'],
    ['Location', '#location'],
    ['Contact', '#contact'],
  ];

  const goTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="border-b border-border/70 bg-secondary/45">
        <div className="site-container flex min-h-9 items-center justify-between gap-4 text-xs font-semibold text-muted-foreground">
          <a href={`tel:${hospitalData.landline.replaceAll('-', '')}`} className="inline-flex items-center gap-2 hover:text-primary" data-testid="link-top-landline">
            <Phone size={13} aria-hidden="true" /> {hospitalData.landline}
          </a>
          <span className="hidden sm:inline">{hospitalData.address}</span>
          <a href={`https://wa.me/92${hospitalData.whatsapp.slice(1)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline" data-testid="link-top-whatsapp">
            <MessageCircle size={13} aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
      <div className="site-container flex h-[76px] items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-3">
          <Logo compact transparent />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary">Hajra Kareem</p>
            <p className="text-sm font-semibold tracking-tight text-foreground">Hospital</p>
          </div>
        </div>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <button key={href} onClick={() => goTo(href)} className="text-sm font-semibold text-muted-foreground hover:text-primary" data-testid={`button-nav-${label.toLowerCase()}`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={openInquiry} className="hidden rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/90 sm:inline-flex" data-testid="button-header-inquiry">
            Send an inquiry
          </button>
          <button className="rounded-lg p-2 text-foreground hover:bg-secondary lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <nav className="border-t border-border bg-card px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="site-container flex flex-col gap-1">
            {navItems.map(([label, href]) => (
              <button key={href} onClick={() => goTo(href)} className="flex items-center justify-between border-b border-border/70 py-3 text-left text-sm font-semibold" data-testid={`button-mobile-nav-${label.toLowerCase()}`}>
                {label}<ArrowRight size={16} className="text-primary" />
              </button>
            ))}
            <button onClick={() => { setMobileOpen(false); openInquiry(); }} className="mt-3 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground" data-testid="button-mobile-inquiry">Send an inquiry</button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function Hero({ openInquiry }: { openInquiry: () => void }) {
  return (
    <section id="home" className="hero-grid relative overflow-hidden border-b border-border">
      <div className="hero-orbit pointer-events-none" aria-hidden="true" />
      <div className="site-container relative grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:py-20">
        <div className="max-w-2xl">
          <img
            src={import.meta.env.BASE_URL + 'assets/hajra-hospital-building.jpeg'}
            alt="Hajra Kareem Hospital building"
            className="reveal mb-6 block aspect-[2.16/1] w-full max-w-[520px] rounded-[1.5rem] border border-border object-cover object-center shadow-lg shadow-foreground/10"
          />
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-2 text-xs font-bold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" /> A hospital for patients and families
          </div>
          <h1 className="reveal reveal-delay-1 display-font mt-7 max-w-xl text-[3.35rem] leading-[0.98] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[5.6rem]">
            Care that feels <span className="text-primary">close.</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
            Welcome to Hajra Kareem Hospital in Faisalabad. Find essential information, meet our doctors, and reach us when you need us.
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <button onClick={openInquiry} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 hover:-translate-y-0.5 hover:bg-primary/90" data-testid="button-hero-inquiry">
              Send an inquiry <ArrowRight size={17} />
            </button>
            <button onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary" data-testid="button-hero-services">
              Explore services <ArrowDown size={16} />
            </button>
          </div>
          <p className="reveal reveal-delay-4 mt-10 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {hospitalData.tagline}
          </p>
        </div>
        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[470px]">
          <div className="absolute -inset-4 rounded-[2.2rem] border border-primary/15" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.8rem] border border-border bg-card p-6 shadow-xl shadow-foreground/10 sm:p-8">
            <div className="flex items-start justify-between border-b border-border pb-6">
              <div>
                <p className="eyebrow">At a glance</p>
                <h2 className="mt-2 text-xl font-bold tracking-tight">Here when it matters</h2>
              </div>
              <div className="rounded-xl bg-accent p-3 text-primary"><HeartPulse size={22} /></div>
            </div>
            <div className="space-y-5 py-7">
              <div className="flex gap-4">
                <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary"><Siren size={17} /></div>
                <div><p className="font-bold">Emergency care</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Emergency and Gynecology services are available 24 hours a day.</p></div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 rounded-full bg-secondary p-2 text-foreground"><MapPin size={17} /></div>
                <div><p className="font-bold">Find us in Faisalabad</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{hospitalData.address}</p></div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 rounded-full bg-secondary p-2 text-foreground"><Phone size={17} /></div>
                <div><p className="font-bold">Speak with the hospital</p><a href={`tel:${hospitalData.landline.replaceAll('-', '')}`} className="mt-1 block text-sm font-bold text-primary hover:underline" data-testid="link-hero-call">{hospitalData.landline}</a></div>
              </div>
            </div>
            <div className="border-t border-border pt-5 text-sm text-muted-foreground">
              Other doctors' consultation timings vary. <button onClick={() => document.querySelector('#doctors')?.scrollIntoView({ behavior: 'smooth' })} className="font-bold text-primary hover:underline" data-testid="button-hero-doctors">View doctors</button>
            </div>
          </div>
        </div>
      </div>
      <div className="site-container flex flex-wrap gap-3 border-t border-border py-5 text-sm font-semibold text-muted-foreground">
        {['Services', 'Doctors', 'Location & timings'].map((label, index) => (
          <button key={label} onClick={() => document.querySelector(['#services', '#doctors', '#location'][index])?.scrollIntoView({ behavior: 'smooth' })} className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 hover:border-primary/40 hover:text-primary" data-testid={`button-quick-${index}`}>
            {label} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="reveal-on-scroll bg-card py-24 sm:py-32">
      <div className="site-container grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="About the hospital" title="A clear place to begin." copy="Hajra Kareem Hospital is a medical facility in Faisalabad focused on care, compassion, and cure for patients and families." />
          <div className="mt-9 flex items-center gap-3 border-t border-border pt-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Cross size={21} /></div>
            <p className="text-sm font-semibold leading-6 text-muted-foreground">Simple information. Familiar support. A team you can reach.</p>
          </div>
        </div>
        <div>
          <div className="mb-7 flex items-end justify-between border-b border-border pb-5">
            <h3 className="text-xl font-bold">Facilities</h3>
            <span className="font-mono text-xs font-bold text-primary">01—07</span>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {facilities.map((facility, index) => (
              <div key={facility} className="group flex items-center gap-4 border-b border-border/80 py-5" data-testid={`text-facility-${index}`}>
                <span className="font-mono text-xs text-primary/70">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceList({ items, icon: Icon, numbered = false }: { items: string[]; icon: IconType; numbered?: boolean }) {
  return (
    <div className="divide-y divide-border/80 border-y border-border">
      {items.map((service, index) => (
        <div key={service} className="group flex items-center gap-4 py-4">
          {numbered ? <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span> : <span className="rounded-full bg-primary/10 p-2 text-primary"><Icon size={16} /></span>}
          <span className="flex-1 text-sm font-semibold text-foreground">{service}</span>
          <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      ))}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="reveal-on-scroll bg-secondary/50 py-24 sm:py-32">
      <div className="site-container">
        <SectionHeading eyebrow="What we provide" title="Care, explained plainly." copy="Explore the hospital's general services and cosmetic gynecology options. A consultation is the right place to understand what is appropriate for you." />
        <div className="mt-14 grid gap-7 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.5rem] border border-border bg-card p-7 sm:p-9">
            <div className="mb-8 flex items-center justify-between">
              <div><p className="eyebrow">01 / General services</p><h3 className="mt-2 text-2xl font-bold">Hospital care</h3></div>
              <div className="rounded-2xl bg-foreground p-3 text-background"><Hospital size={24} /></div>
            </div>
            <ServiceList items={generalServices} icon={Stethoscope} numbered />
          </div>
          <div className="rounded-[1.5rem] border border-primary/25 bg-foreground p-7 text-background shadow-xl shadow-foreground/10 sm:p-9">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div><p className="eyebrow !text-red-300">02 / Cosmetic gynecology</p><h3 className="mt-2 text-2xl font-bold">Specialist options</h3></div>
              <div className="rounded-2xl bg-primary p-3 text-primary-foreground"><Sparkles size={24} /></div>
            </div>
            <div className="divide-y divide-background/15 border-y border-background/15">
              {cosmeticServices.map((service, index) => (
                <div key={service} className="group flex items-center gap-4 py-4">
                  <span className="font-mono text-xs text-red-300">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-sm font-semibold text-background">{service}</span>
                  <ArrowRight size={15} className="text-background/45 transition-transform group-hover:translate-x-1 group-hover:text-red-300" />
                </div>
              ))}
            </div>
            <p className="mt-7 border-l-2 border-primary pl-4 text-sm leading-6 text-background/75">All cosmetic gynecology procedures are performed by qualified specialists after consultation. Results vary by individual. Book a consultation to discuss what is right for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorCard({ doctor, index }: { doctor: typeof doctors[number]; index: number }) {
  const initials = doctor.name.replace('Dr. ', '').split(' ').map((part) => part[0]).join('').slice(0, 2);
  return (
    <article className="group flex min-h-[238px] flex-col rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5" data-testid={`card-doctor-${index}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">{initials}</div>
        <span className="font-mono text-[0.68rem] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-5 text-base font-bold text-foreground">{doctor.name}</h3>
      <p className="mt-1 text-xs font-semibold text-primary">{doctor.qualification}</p>
      {doctor.specialty ? <p className="mt-3 text-sm leading-5 text-muted-foreground">{doctor.specialty}</p> : null}
      <div className="mt-auto flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
        {doctor.timing ? <><Clock3 size={14} className="text-primary" /> {doctor.timing}</> : <span>Timing not displayed</span>}
      </div>
    </article>
  );
}

function Doctors() {
  return (
    <section id="doctors" className="reveal-on-scroll bg-card py-24 sm:py-32">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our doctors" title="Meet the directory." copy="Consultation timings vary. Please use the information below as a guide and contact the hospital for an inquiry." />
          <div className="hidden rounded-full border border-border px-4 py-2 font-mono text-xs font-bold text-muted-foreground sm:block">12 doctors</div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doctor, index) => <DoctorCard key={doctor.name} doctor={doctor} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="reveal-on-scroll bg-secondary/50 py-24 sm:py-32">
      <div className="site-container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-[1.5rem] bg-primary p-7 text-primary-foreground sm:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-100">Location & timings</p>
            <h2 className="display-font mt-5 text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Easy to find. Easy to reach.</h2>
            <div className="mt-10 space-y-7">
              <div className="flex gap-4"><MapPin className="mt-1 shrink-0" size={20} /><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-red-100">Address</p><p className="mt-2 text-base font-semibold leading-7">{hospitalData.address}</p></div></div>
              <div className="flex gap-4"><Clock3 className="mt-1 shrink-0" size={20} /><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-red-100">24-hour notice</p><p className="mt-2 text-base font-semibold leading-7">Emergency and Gynecology services: open 24 hours a day.</p></div></div>
            </div>
          </div>
          <div className="mt-12 border-t border-red-200/25 pt-6">
            <p className="text-sm leading-6 text-red-50">Other doctors' consultation timings vary. View the doctors directory for the timings provided.</p>
            <a href={hospitalData.directionsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background hover:-translate-y-0.5" data-testid="link-get-directions">Get directions <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lg shadow-foreground/5">
          <iframe className="map-frame h-full min-h-[420px]" src={hospitalData.mapEmbed} title="Map showing Hajra Kareem Hospital in Faisalabad" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" data-testid="iframe-hospital-map" />
        </div>
      </div>
    </section>
  );
}

function Contact({ openInquiry }: { openInquiry: () => void }) {
  return (
    <section id="contact" className="reveal-on-scroll bg-card py-24 sm:py-32">
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <SectionHeading eyebrow="Contact the hospital" title="A question is a good place to start." copy="Send a simple inquiry and the hospital team can follow up. This form is for inquiries only, not a payment or booking system." />
          <div className="mt-9 space-y-3">
            <a href={`tel:${hospitalData.landline.replaceAll('-', '')}`} className="flex items-center gap-4 rounded-xl border border-border p-4 hover:border-primary/40 hover:bg-accent" data-testid="link-contact-landline"><span className="rounded-full bg-accent p-2.5 text-primary"><Phone size={18} /></span><span><span className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Landline</span><span className="mt-1 block font-bold">{hospitalData.landline}</span></span></a>
            <a href={`https://wa.me/92${hospitalData.whatsapp.slice(1)}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-border p-4 hover:border-primary/40 hover:bg-accent" data-testid="link-contact-whatsapp"><span className="rounded-full bg-accent p-2.5 text-primary"><MessageCircle size={18} /></span><span><span className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">WhatsApp</span><span className="mt-1 block font-bold">{hospitalData.whatsapp}</span></span></a>
          </div>
        </div>
        <button onClick={openInquiry} className="group flex min-h-[250px] flex-col justify-between rounded-[1.5rem] bg-foreground p-7 text-left text-background transition-transform hover:-translate-y-1 sm:p-10" data-testid="button-open-inquiry-card">
          <div className="flex items-start justify-between"><div className="rounded-full bg-primary p-3 text-primary-foreground"><Mail size={22} /></div><ArrowRight size={24} className="text-background/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" /></div>
          <div><p className="eyebrow !text-red-300">Contact / inquiry</p><h3 className="mt-2 text-2xl font-bold">Tell us how we can help.</h3><p className="mt-2 max-w-md text-sm leading-6 text-background/65">Share your name, phone number and question. We will use it to understand your inquiry.</p></div>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="site-container flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3"><Logo compact /><div><p className="text-sm font-bold">Hajra Kareem Hospital</p><p className="mt-1 text-xs text-muted-foreground">{hospitalData.tagline}</p></div></div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground"><a href="#about" className="hover:text-primary" data-testid="link-footer-about">About</a><a href="#services" className="hover:text-primary" data-testid="link-footer-services">Services</a><a href="#doctors" className="hover:text-primary" data-testid="link-footer-doctors">Doctors</a><a href="#contact" className="hover:text-primary" data-testid="link-footer-contact">Contact</a></div>
      </div>
      <div className="site-container border-t border-border py-5 text-xs text-muted-foreground">{hospitalData.name} · {hospitalData.address}</div>
    </footer>
  );
}

function InquiryDialog({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    if (!String(form.get('name') || '').trim()) nextErrors.name = 'Please enter your name.';
    if (!String(form.get('phone') || '').trim()) nextErrors.phone = 'Please enter your phone number.';
    if (!String(form.get('message') || '').trim()) nextErrors.message = 'Please enter a short message.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/55 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <div className="max-h-[94dvh] w-full max-w-xl overflow-auto rounded-t-[1.5rem] bg-card p-6 shadow-2xl sm:rounded-[1.5rem] sm:p-9">
        <div className="flex items-start justify-between gap-5">
          <div><p className="eyebrow">Contact / inquiry</p><h2 id="inquiry-title" className="display-font mt-2 text-3xl tracking-tight">How can we help?</h2></div>
          <button onClick={onClose} aria-label="Close inquiry form" className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" data-testid="button-close-inquiry"><X size={20} /></button>
        </div>
        {submitted ? (
          <div className="my-10 rounded-2xl border border-primary/20 bg-accent p-6" data-testid="status-inquiry-success">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check size={22} /></div>
            <h3 className="mt-5 text-xl font-bold">Your inquiry is ready to send.</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Thank you for sharing your details. Please call the hospital on {hospitalData.landline} or WhatsApp {hospitalData.whatsapp} to follow up.</p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90" data-testid="button-close-success">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            <div><label htmlFor="inquiry-name" className="text-sm font-bold">Name</label><input id="inquiry-name" name="name" className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Your name" data-testid="input-inquiry-name" />{errors.name ? <p className="mt-1 text-xs font-semibold text-primary">{errors.name}</p> : null}</div>
            <div><label htmlFor="inquiry-phone" className="text-sm font-bold">Phone</label><input id="inquiry-phone" name="phone" className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Your phone number" type="tel" data-testid="input-inquiry-phone" />{errors.phone ? <p className="mt-1 text-xs font-semibold text-primary">{errors.phone}</p> : null}</div>
            <div><label htmlFor="inquiry-message" className="text-sm font-bold">Message</label><textarea id="inquiry-message" name="message" className="mt-2 min-h-32 w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="How can we help?" data-testid="input-inquiry-message" />{errors.message ? <p className="mt-1 text-xs font-semibold text-primary">{errors.message}</p> : null}</div>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90" data-testid="button-submit-inquiry">Send inquiry <ArrowRight size={16} /></button>
            <p className="text-center text-xs text-muted-foreground">For urgent matters, please call {hospitalData.landline}.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function HospitalHome() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <Header openInquiry={() => setInquiryOpen(true)} />
      <main>
        <Hero openInquiry={() => setInquiryOpen(true)} />
        <About />
        <Services />
        <Doctors />
        <Location />
        <Contact openInquiry={() => setInquiryOpen(true)} />
      </main>
      <Footer />
      {inquiryOpen ? <InquiryDialog onClose={() => setInquiryOpen(false)} /> : null}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HospitalHome} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
