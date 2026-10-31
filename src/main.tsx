import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Menu, MessageCircle, X } from './icons';
import { content, spaces, type Space } from './content';
import {media} from './media';
import './styles.css';
import './revamp.css';

const navigation = [
  { label: 'The story', href: '#story' },
  { label: 'Our services', href: '#spaces' },
  { label: 'Our approach', href: '#philosophy' },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function Header({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const outside=(event:PointerEvent)=>{if(open&&event.target instanceof Element&&!event.target.closest('.site-header'))setOpen(false);};
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 801px)');
    const close = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown',outside);
    desktop.addEventListener('change', close);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown',outside); desktop.removeEventListener('change', close); };
  }, [open]);

  return <header className="site-header">
    <a className="brand" href="#top" aria-label="CozySpace, back to top">{content.brand}</a>
    <nav id="main-navigation" className={`header-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
      {navigation.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <button className="mobile-contact" onClick={() => { menuButton.current?.focus(); setOpen(false); onContact(); }}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></button>
    </nav>
    <button className="header-contact" onClick={onContact}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></button>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(value => !value)}>
      {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
    </button>
  </header>;
}

function Hero() {
  const [active, setActive] = useState(0);
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-cinema" aria-hidden="true">
      {spaces.map((space, index) => <img key={space.id} className={`hero-slide${active === index ? ' is-active' : ''}`} src={space.image} alt="" width="1536" height="1024" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />)}
    </div>
    <div className="hero-shade" />
    <div className="hero-content">
      <h1 id="hero-title">Organized for living,<br />styled for <em>comfort.</em></h1>
      <p className="hero-description">Thoughtful home organization. {content.introduction}</p>
      <a className="button button-light" href="#story">Explore <ArrowUpRight size={18} aria-hidden="true" /></a>
    </div>
    <a className="hero-scroll" href="#story" aria-label="Scroll to the story"><span className="scroll-line" aria-hidden="true" /><span>Scroll to the story</span><ArrowDown size={15} aria-hidden="true" /></a>
    <div className="hero-selector" aria-label="Choose a featured room">
      <p className="room-selector-label">A look inside <span>{spaces[active].name.replace(/^The /,'')}</span></p>
      {spaces.map((space, index) => <button key={space.id} aria-label={`Show ${space.name.toLowerCase()}`} aria-pressed={active === index} onClick={() => setActive(index)}><img src={space.image} alt="" width="60" height="42" loading="lazy"/><span>{space.name.replace(/^The /,'').replace(' room','')}</span></button>)}
    </div>
  </section>;
}

function Story() {
  return <section className="intro-section" id="story" aria-labelledby="story-title">
    <SectionLabel index="I">The story</SectionLabel>
    <div className="intro-main">
      <h2 id="story-title">Order isn’t about <em>perfection.</em><br />It’s about possibility.</h2>
      <div className="intro-bottom"><span aria-hidden="true" /><p>From the first glass on a kitchen shelf to the last piece of linen folded away, we find the beauty in making space for what matters.</p></div>
    </div>
    <p className="intro-aside">A considered home is a home that gives back.</p>
  </section>;
}

function SpaceChapter({ space, index, onView, onContact }: { space: Space; index: number; onView:(index:number)=>void; onContact:()=>void }) {
  const next = spaces[index + 1];
  const number = String(index + 1).padStart(2, '0');
  return <article className="scene" id={space.id} aria-labelledby={`${space.id}-title`}>
    <div className="scene-photo-wrap">
      <img className="scene-photo" src={space.image} alt={space.alt} width="1536" height="1024" loading="lazy" decoding="async" />
      <span className="photo-corner corner-top" aria-hidden="true" />
      <span className="photo-corner corner-bottom" aria-hidden="true" />
      <button className="photo-open" onClick={()=>onView(index)} aria-label={`View full-size photo of ${space.name.toLowerCase()}`}><ArrowUpRight size={21} aria-hidden="true"/><span>View photo</span></button>
    </div>
    <div className="scene-copy">
      <p className="scene-kicker">{space.name}</p>
      <div className="scene-copy-main">
        <span className="scene-dash" aria-hidden="true" />
        <h3 id={`${space.id}-title`}>{space.heading}</h3>
        <p>{space.description}</p>
        <span className="scene-detail">{space.detail}</span>
      </div>
      <a className="scene-next" href={`#${next?.id ?? 'philosophy'}`} aria-label={next ? `Continue to ${next.name.toLowerCase()}` : 'Continue to our approach'}>Continue the journey <ArrowDownRight size={18} aria-hidden="true" /></a>
      <button className="scene-enquire" onClick={onContact}>Discuss this room <ArrowUpRight size={16} aria-hidden="true"/></button>
    </div>
  </article>;
}

function Services({onView,onContact}:{onView:(index:number)=>void;onContact:()=>void}) {
  return <section className="spaces-section" id="spaces" aria-labelledby="spaces-title">
    <div className="spaces-heading">
      <SectionLabel index="II">Our services</SectionLabel>
      <h2 id="spaces-title">Space by <em>space.</em></h2>
      <p>Follow the light. Find the details. See what happens when a home is given room to breathe.</p>
    </div>
    <nav className="room-index" aria-label="Explore rooms">{spaces.map(s=><a key={s.id} href={`#${s.id}`}>{s.name.replace(/^The /,'')}<ArrowDownRight size={15} aria-hidden="true"/></a>)}</nav>
    <div className="scenes-list">{spaces.map((space, index) => <SpaceChapter key={space.id} space={space} index={index} onView={onView} onContact={onContact}/>)}</div>
  </section>;
}

function Philosophy({ onContact }: { onContact: () => void }) {
  return <section className="philosophy-section" id="philosophy" aria-labelledby="philosophy-title">
    <SectionLabel index="III">The way we see it</SectionLabel>
    <div className="philosophy-grid">
      <div className="philosophy-lead"><h2 id="philosophy-title">Less clutter.<br /><em>More life.</em></h2></div>
      <div className="philosophy-body">
        <p>We believe organization should feel human. Not a picture-perfect room that no one lives in, but a thoughtful system that makes ordinary moments feel extraordinary.</p>
        <ul className="principles">{['See the whole picture', 'Keep what matters', 'Make it yours'].map(principle => <li key={principle}>{principle}</li>)}</ul>
        <button className="text-action" onClick={onContact}>Make room for living <ArrowUpRight size={17} aria-hidden="true" /></button>
      </div>
    </div>
    <span className="philosophy-watermark" aria-hidden="true">SPACE</span>
  </section>;
}

function Contact({ onContact }: { onContact: () => void }) {
  return <section className="contact-section" id="contact" aria-labelledby="contact-title">
    <img className="contact-image" src={media.contact.src || media.kitchen.src} alt="" width="1536" height="1024" loading="lazy" />
    <div className="contact-overlay" />
    <div className="contact-inner">
      <h2 id="contact-title">Let’s make space<br />for <em>what matters.</em></h2>
      <p>Ready to see your home in a new light? We’d love to hear your story.</p>
      <button className="button button-light" onClick={onContact}>Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></button>
    </div>
    <span className="contact-bottom">CozySpace / Home, reimagined</span>
  </section>;
}

function ContactDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const close = () => dialogRef.current?.close();
  const containFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  return <dialog ref={dialogRef} className="contact-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onKeyDown={containFocus} onClose={() => document.body.classList.remove('dialog-open')} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
    <div className="dialog-content">
      <button className="dialog-close" onClick={close} aria-label="Close contact options" autoFocus><X size={22} aria-hidden="true" /></button>
      <MessageCircle className="dialog-icon" size={28} aria-hidden="true" />
      <p className="overline">A little more room for you</p>
      <h2 id="dialog-title">Let’s talk <em>space.</em></h2>
      <p id="dialog-description">Tell us about your home. Choose a number to start a conversation on WhatsApp.</p>
      <div className="contact-options">{content.contacts.map(contact => <a key={contact.url} href={contact.url} target="_blank" rel="noopener noreferrer"><span><strong>{contact.label}</strong><span>{contact.phone}</span></span><ArrowUpRight size={23} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div>
      <p className="dialog-note">WhatsApp opens in a new tab.</p>
    </div>
  </dialog>;
}

function Footer() {
  return <footer className="site-footer">
    <a className="footer-brand" href="#top" aria-label="CozySpace, back to top">COZY<em>SPACE</em></a>
    <div className="footer-description"><p>Thoughtful spaces. Lighter living.</p><p>Home organization, with intention.</p></div>
    <div className="footer-links"><a className="instagram-link" href={content.instagramUrl} target="_blank" rel="noopener noreferrer">Visit us on Instagram <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><p>Message us on</p>{content.contacts.map(contact => <a className="footer-phone" key={contact.url} href={contact.url} target="_blank" rel="noopener noreferrer">{contact.phone}<span className="sr-only"> on WhatsApp (opens in a new tab)</span></a>)}</div>
  </footer>;
}

function PhotoGallery({index,onChange,onClose}:{index:number;onChange:(index:number)=>void;onClose:()=>void}){
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const trigger=document.activeElement as HTMLElement|null;const dialog=ref.current;dialog?.showModal();document.body.classList.add('dialog-open');return()=>{dialog?.close();document.body.classList.remove('dialog-open');trigger?.focus();};},[]);
  const move=(step:number)=>onChange((index+step+spaces.length)%spaces.length);
  return <dialog className="photo-dialog" ref={ref} aria-labelledby="photo-title" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===event.currentTarget)onClose();}} onKeyDown={event=>{if(event.key==='Tab'){const buttons=event.currentTarget.querySelectorAll<HTMLButtonElement>('button');const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}if(event.key==='ArrowRight'){event.preventDefault();move(1);}}}>
    <div className="photo-dialog-heading"><div><p>CozySpace · A look inside</p><h2 id="photo-title">{spaces[index].name}</h2></div><button className="gallery-close" aria-label="Close photo viewer" onClick={onClose}><X size={24} aria-hidden="true"/></button></div>
    <img className="gallery-image" src={spaces[index].image} alt={spaces[index].alt} width="1536" height="1024"/>
    <div className="gallery-controls"><button onClick={()=>move(-1)} aria-label="Previous room photo">← Previous</button><p aria-live="polite">{index+1} / {spaces.length}</p><button onClick={()=>move(1)} aria-label="Next room photo">Next →</button></div>
  </dialog>;
}

function App() {
  const [gallery,setGallery]=useState<number|null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openContact = () => { dialogRef.current?.showModal(); document.body.classList.add('dialog-open'); };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header onContact={openContact} />
    <main id="main"><Hero /><Story /><Services onView={setGallery} onContact={openContact}/><Philosophy onContact={openContact} /><Contact onContact={openContact} /></main>
    <Footer />
    <ContactDialog dialogRef={dialogRef} />
    {gallery!==null&&<PhotoGallery index={gallery} onChange={setGallery} onClose={()=>setGallery(null)}/>}
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
