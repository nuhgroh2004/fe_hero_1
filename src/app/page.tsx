"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

type FeatureItem = {
  title: string;
  description: string;
  image: string;
};

type AiPanel = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const quickPoints = [
  {
    title: "Know what to do next",
    description: "Fixa removes the clutter that makes planning feel exhausting.",
  },
  {
    title: "One simple plan for today",
    description: "It helps you focus on today without feeling like you are behind.",
  },
  {
    title: "Add tasks naturally by speaking",
    description: "Say what you need to do and let the planner shape it for you.",
  },
];

const deepFeatures: FeatureItem[] = [
  {
    title: "Designed for calm, not chaos",
    description:
      "Every screen is built to be clear and gentle, so your attention stays on doing instead of figuring things out.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "The effortless way to begin",
    description:
      "When starting feels hard, Fixa gives you light structure and ready-made routines to reduce friction.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Stay fully focused",
    description:
      "A focused timer with clear boundaries helps you stay in the zone and move through tasks without noise.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Small steps, zero guilt",
    description:
      "Track small wins, build momentum, and trust the process as consistent steps compound into real progress.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
  },
];

const aiPanels: AiPanel[] = [
  {
    title: "Talk like a human",
    description:
      "Say or type what you need to do. Fixa AI understands intent and drops tasks into your day instantly.",
  },
  {
    title: "Always one step ahead",
    description:
      "Fixa AI helps you break down larger tasks into smaller next actions so you can start without overthinking.",
  },
  {
    title: "Control tasks without stress",
    description:
      "Prioritize, reorder, and simplify your list in seconds with AI suggestions tuned for low-friction planning.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Is Fixa made for people with ADHD?",
    answer:
      "Yes. Fixa is built around low-friction planning, less visual noise, and a calmer structure designed to help you begin.",
  },
  {
    question: "What makes Fixa different from other to-do apps?",
    answer:
      "Most productivity tools add more lists and pressure. Fixa focuses on clarity, gentle structure, and reducing decision fatigue.",
  },
  {
    question: "Will Fixa help me stay focused?",
    answer:
      "Yes. Fixa includes focus tools like a timer, but the key difference is the calmer interface that helps you keep going.",
  },
  {
    question: "How do you handle privacy?",
    answer:
      "Your tasks are personal. Fixa is built with privacy and security in mind and clear data transparency before launch.",
  },
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeAiPanel, setActiveAiPanel] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % deepFeatures.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAiPanel((prev) => (prev + 1) % aiPanels.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="fixa-page">
      <header className="top-nav-wrap">
        <nav className="top-nav">
          <a href="#hero" className="brand" onClick={() => setMobileMenuOpen(false)}>
            Fixa.
          </a>
          <div className="desktop-nav-links">
            <a href="#features">Features</a>
            <a href="#fixa-ai">Fixa AI</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="waitlist-btn desktop-only" href="#footer-cta">
            Join the waitlist
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </nav>
        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#fixa-ai" onClick={() => setMobileMenuOpen(false)}>
                Fixa AI
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a href="#footer-cta" onClick={() => setMobileMenuOpen(false)}>
                Join the waitlist
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <section className="hero" id="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <Reveal className="hero-title-wrap" delay={0.1}>
            <h1 className="hero-title">Plan your day</h1>
            <h1 className="hero-title">
              without <span className="serif-accent">overwhelm</span>
            </h1>
          </Reveal>

          <Reveal className="hero-sub" delay={0.2}>
            Fixa is a simple, ADHD-friendly planner that turns your thoughts into
            a clear plan.
          </Reveal>

          <Reveal className="hero-cta" delay={0.3}>
            <p>No clutter. No complicated setup. Just your day, clearly planned.</p>
            <a href="#footer-cta" className="waitlist-btn solid">
              Join the waitlist
            </a>
          </Reveal>
        </div>
      </section>

      <section className="light-block" id="difference">
        <div className="shell section-grid">
          <Reveal>
            <div className="pill">ADHD-Friendly</div>
            <h2 className="section-title dark-text">
              Here, you stop fighting your brain and start working with it.
            </h2>
            <p className="section-copy dark-copy">
              We provide clear tools designed specifically for people with ADHD.
            </p>
            <div className="metric-wrap">
              <div className="metric-row">
                <span>Anxiety</span>
                <strong>80%</strong>
              </div>
              <div className="metric-bar">
                <div style={{ width: "80%" }} />
              </div>
              <div className="metric-row">
                <span>Productivity</span>
                <strong>21%</strong>
              </div>
              <div className="metric-bar">
                <div style={{ width: "21%" }} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="preview-card">
                  <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80"
                alt="Soft desk setup"
                    width={1400}
                    height={980}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell designed-section">
        <Reveal>
          <p className="small-lead">Traditional planners do not work well for many people</p>
          <h2 className="big-title">Fixa is designed differently</h2>
        </Reveal>

        <div className="three-cards">
          {quickPoints.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.08}>
              <article className="info-card">
                <div className="icon-dot">0{index + 1}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="features-dark" id="features">
        <div className="shell features-grid">
          <Reveal className="features-sticky">
            <h2 className="section-title">
              Tools that work with your mind, not against it
            </h2>
            <p className="section-copy">
              No clutter. No complicated setup. Just your day, clearly planned.
            </p>
            <a href="#footer-cta" className="waitlist-btn solid">
              Join the waitlist
            </a>
            <div className="feature-tags">
              {deepFeatures.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveFeature(index)}
                  className={index === activeFeature ? "active" : ""}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="feature-cards-col">
            {deepFeatures.map((item, index) => (
              <motion.article
                key={item.title}
                className={`feature-card ${index === activeFeature ? "focused" : ""}`}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                    <Image src={item.image} alt={item.title} width={1400} height={850} />
                <div className="feature-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section" id="fixa-ai">
        <div className="shell ai-shell">
          <Reveal>
            <div className="pill">Fixa AI</div>
            <h2 className="section-title">
              Meet Fixa AI, your AI bestie for getting things done without
              overthinking.
            </h2>
          </Reveal>

          <div className="ai-content">
            <Reveal className="ai-menu" delay={0.1}>
              {aiPanels.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveAiPanel(index)}
                  className={index === activeAiPanel ? "active" : ""}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </button>
              ))}
            </Reveal>

            <Reveal className="ai-preview" delay={0.2}>
                  <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80"
                alt="Phone mockup"
                    width={1000}
                    height={1500}
              />
              <div className="ai-preview-footer">
                <span className="active-dot" />
                <span>{activeAiPanel + 1}/3</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="loud-section">
        <div className="loud-bg" />
        <div className="shell loud-content">
          <Reveal>
            <h2>For days when your brain feels too loud.</h2>
            <a href="#footer-cta" className="waitlist-btn solid">
              Join the waitlist
            </a>
          </Reveal>
          <Reveal delay={0.1} className="chip-cloud">
            <span>Task Breakdown</span>
            <span>Brain Dump</span>
            <span>Priorities</span>
            <span>Small Wins</span>
            <span>Focus Timer</span>
          </Reveal>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="shell faq-shell">
          <Reveal>
            <div className="pill">FAQ</div>
            <h2 className="section-title dark-text">
              We are here to help. If you do not find your answer, contact us any
              time.
            </h2>
          </Reveal>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.article
                  key={item.question}
                  className="faq-item"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <button
                    type="button"
                    className="faq-head"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <span className={`faq-plus ${isOpen ? "open" : ""}`}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.p
                        className="faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {item.answer}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="shell" id="footer-cta">
        <div className="footer-card">
          <h2 className="footer-big-title">Gentle planning for busy minds</h2>
          <div className="footer-grid">
            <div>
              <h3>Fixa.</h3>
              <p>Get early updates.</p>
              <p>Just the essentials from us, never spam, never noise.</p>
              <a href="#hero" className="waitlist-btn solid footer-btn">
                Join the waitlist
              </a>
            </div>
            <div className="footer-links-grid">
              <div>
                <h4>Information</h4>
                <a href="#hero">Home</a>
                <a href="#features">Features</a>
                <a href="#fixa-ai">Fixa AI</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <h4>Contact</h4>
                <a href="mailto:info@fixaplan.com">info@fixaplan.com</a>
              </div>
              <div>
                <h4>Social</h4>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026. Fixa. All rights reserved.</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
