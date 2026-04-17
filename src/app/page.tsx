"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

type FeatureItem = {
  image: string;
  alt: string;
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
    title: "Identitas visual yang kuat",
    description:
      "Membangun logo, warna, dan tipografi yang konsisten agar brand mudah dikenali.",
  },
  {
    title: "Desain yang siap dipakai",
    description:
      "Setiap aset disiapkan untuk kebutuhan digital dan cetak tanpa langkah yang rumit.",
  },
  {
    title: "Kolaborasi yang jelas",
    description:
      "Brief, revisi, dan finalisasi berjalan rapi supaya hasil sesuai arah brand Anda.",
  },
];

const deepFeatures: FeatureItem[] = [
  {
    image: "/proyek/foto-1.png",
    alt: "Karya desain 01",
  },
  {
    image: "/proyek/gambar-2.png",
    alt: "Karya desain 02",
  },
  {
    image: "/proyek/gambar-3.png",
    alt: "Karya desain 03",
  },
  {
    image: "/proyek/gambar-4.png",
    alt: "Karya desain 04",
  },
  {
    image: "/proyek/gambar-5.jpg",
    alt: "Karya desain 05",
  },
  {
    image: "/proyek/gambar-6.jpg",
    alt: "Karya desain 06",
  },
  {
    image: "/proyek/gambar-7.jpg",
    alt: "Karya desain 07",
  },
  {
    image: "/proyek/gambar-8.jpg",
    alt: "Karya desain 08",
  },
  {
    image: "/proyek/gambar-9.jpg",
    alt: "Karya desain 09",
  },
  {
    image: "/proyek/gambar-10.jpg",
    alt: "Karya desain 10",
  },
  {
    image: "/proyek/gambar-11.jpg",
    alt: "Karya desain 11",
  },
  {
    image: "/proyek/gambar-12.png",
    alt: "Karya desain 12",
  },
];

const aiPanels: AiPanel[] = [
  {
    title: "Brand Identity",
    description:
      "Mulai dari riset visual, eksplorasi logo, hingga guideline agar citra brand terasa utuh.",
  },
  {
    title: "Social Media Design",
    description:
      "Desain konten mingguan yang konsisten, menarik, dan sesuai karakter audiens Anda.",
  },
  {
    title: "Print & Editorial",
    description:
      "Materi cetak seperti brosur, poster, dan company profile dengan layout yang bersih dan efektif.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Pendidikan terakhir apa?",
    answer:
      "Pendidikan terakhir saya adalah SMA N 1 Balapulang.",
  },
  {
    question: "Berapa umur saya?",
    answer:
      "Saat ini saya berusia 18 tahun.",
  },
  {
    question: "Di mana alamat saya?",
    answer:
      "Saya berdomisili di Balapulang, Kabupaten Tegal.",
  },
  {
    question: "Apa minat utama saya?",
    answer:
      "Saya memiliki minat besar di bidang editing dan desain visual.",
  },
  {
    question: "Apakah saya siap bekerja?",
    answer:
      "Ya, saya siap bekerja, belajar hal baru, dan berkolaborasi secara profesional.",
  },
];

const introWords = ["Visual", "that", "tell", "stories."];

const INTRO_TIMING = {
  wordDelay: 0.38,
  wordStagger: 0.34,
  wordDuration: 0.72,
  wordExitDuration: 0.44,
  holdAfterWords: 0.72,
  overlayExitDuration: 1.05,
  heroGap: 0.16,
} as const;

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
  const [activeAiPanel, setActiveAiPanel] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introPhase, setIntroPhase] = useState<"enter" | "exit" | "done">(
    "enter",
  );
  const [introVisible, setIntroVisible] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

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
      setActiveAiPanel((prev) => (prev + 1) % aiPanels.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const textRevealDoneAt =
      (INTRO_TIMING.wordDelay +
        INTRO_TIMING.wordStagger * (introWords.length - 1) +
        INTRO_TIMING.wordDuration) *
      1000;

    const startExitAt = textRevealDoneAt + INTRO_TIMING.holdAfterWords * 1000;
    const overlayGoneAt = startExitAt + INTRO_TIMING.overlayExitDuration * 1000;

    const startExitTimer = window.setTimeout(() => {
      setIntroPhase("exit");
    }, startExitAt);

    const hideOverlayTimer = window.setTimeout(() => {
      setIntroVisible(false);
      setIntroPhase("done");
    }, overlayGoneAt);

    const showHeroTimer = window.setTimeout(() => {
      setHeroReady(true);
    }, overlayGoneAt + INTRO_TIMING.heroGap * 1000);

    return () => {
      window.clearTimeout(startExitTimer);
      window.clearTimeout(hideOverlayTimer);
      window.clearTimeout(showHeroTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = introVisible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [introVisible]);

  return (
    <div className="fixa-page">
      <AnimatePresence>
        {introVisible ? (
          <motion.div
            className="intro-overlay"
            initial={{ y: 0, opacity: 1 }}
            animate={introPhase === "exit" ? { y: "-100%" } : { y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: INTRO_TIMING.overlayExitDuration,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="intro-line"
              initial="hidden"
              animate={introPhase === "enter" ? "visible" : "exit"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: INTRO_TIMING.wordStagger,
                    delayChildren: INTRO_TIMING.wordDelay,
                  },
                },
                exit: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {introWords.map((word) => (
                <motion.span
                  key={word}
                  className="intro-word"
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -22,
                      filter: "blur(12px)",
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: INTRO_TIMING.wordDuration,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      x: 26,
                      filter: "blur(10px)",
                      transition: {
                        duration: INTRO_TIMING.wordExitDuration,
                        ease: [0.4, 0, 1, 1],
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="top-nav-wrap">
        <nav className="top-nav">
          <a href="#hero" className="brand" onClick={() => setMobileMenuOpen(false)}>
            Diva.
          </a>
          <div className="desktop-nav-links">
            <a href="#features">Portofolio</a>
            <a href="#services">Keahlian</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="waitlist-btn desktop-only" href="#footer-cta">
            Diskusikan proyek
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
                Portofolio
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                Keahlian
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a href="#footer-cta" onClick={() => setMobileMenuOpen(false)}>
                Diskusikan proyek
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
          // poster="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            // src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
            src="/video-hero.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <div className="hero-title-wrap">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
              animate={
                heroReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 36, filter: "blur(14px)" }
              }
              transition={{ duration: 1.45, delay: 0.16, ease: [0.19, 1, 0.22, 1] }}
            >
              Riski Diva Afriyani
            </motion.h1>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
              animate={
                heroReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 36, filter: "blur(14px)" }
              }
              transition={{ duration: 1.45, delay: 0.48, ease: [0.19, 1, 0.22, 1] }}
            >
              Graphic <span className="serif-accent">Designer</span>
            </motion.h1>
          </div>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={
              heroReady
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 26, filter: "blur(10px)" }
            }
            transition={{ duration: 1.2, delay: 0.82, ease: [0.19, 1, 0.22, 1] }}
          >
            Saya membantu brand tampil lebih kuat melalui desain visual yang
            strategis, estetik, dan mudah diingat.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 24, scale: 0.985, filter: "blur(10px)" }}
            animate={
              heroReady
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: 24, scale: 0.985, filter: "blur(10px)" }
            }
            transition={{ duration: 1.24, delay: 1.06, ease: [0.19, 1, 0.22, 1] }}
          >
            <p>
              Dari ide awal hingga final artwork, setiap detail dirancang agar
              pesan brand Anda terasa tepat sasaran.
            </p>
            <a href="#footer-cta" className="waitlist-btn solid">
              Mulai kolaborasi
            </a>
          </motion.div>
        </div>
      </section>

      <section className="light-block" id="difference">
        <div className="shell section-grid">
          <Reveal>
            <div className="pill">Graphic Designer</div>
            <h2 className="section-title dark-text">
              Profil Riski Diva Afriyani
            </h2>
            <p className="section-copy dark-copy">
              Saya adalah desainer grafis yang berfokus pada pembuatan visual
              brand yang kuat, modern, dan mudah diingat.
            </p>
            <p className="section-copy dark-copy">
              Keahlian saya mencakup brand identity, desain konten media sosial,
              materi promosi, dan layout editorial dengan pendekatan strategis dan
              estetika yang relevan untuk target audiens.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="preview-card">
              <Image
                src="/foto-diva.jpeg"
                alt="Graphic design workspace"
                width={1400}
                height={980}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell designed-section">
        <Reveal>
          <p className="small-lead">Pilihan karya dari berbagai kebutuhan visual brand</p>
          <h2 className="big-title">Portofolio yang dirancang dengan strategi</h2>
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
        <div className="shell features-shell">
          <Reveal className="features-intro">
            <h2 className="section-title">
              Proyek terbaru
            </h2>
            <p className="section-copy">
              Seleksi karya desain untuk identitas brand, kampanye digital, dan
              kebutuhan promosi cetak.
            </p>
            <a href="#footer-cta" className="waitlist-btn solid">
              Mulai proyek
            </a>
          </Reveal>

          <div className="features-static-grid">
            {deepFeatures.map((item, index) => (
              <Reveal key={item.image} delay={index * 0.06}>
                <article className="feature-card feature-card-static">
                  <Image src={item.image} alt={item.alt} width={1080} height={1920} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section" id="services">
        <div className="shell ai-shell">
          <Reveal>
            <div className="pill">Keahlian</div>
            <h2 className="section-title">
              Keahlian desain grafis untuk membantu brand Anda tampil lebih
              profesional dan berkarakter.
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
                src="/diva-2.jpeg"
                alt="Design showcase"
                width={1000}
                height={1500}
              />
              <div className="ai-preview-footer">
                <span className="active-dot" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="loud-section">
        <div className="loud-bg" />
        <div className="shell loud-content">
          <Reveal>
            <h2>Mari wujudkan visual brand yang berani, relevan, dan berkesan.</h2>
            <a href="#footer-cta" className="waitlist-btn solid">
              Hubungi saya
            </a>
          </Reveal>
          <Reveal delay={0.1} className="chip-cloud">
            <span>Logo Design</span>
            <span>Social Media Kit</span>
            <span>Packaging Visual</span>
            <span>Editorial Layout</span>
            <span>Creative Direction</span>
          </Reveal>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="shell faq-shell">
          <Reveal>
            <div className="pill">FAQ</div>
            <h2 className="section-title dark-text">
              Ringkasan profil singkat untuk mengenal saya lebih dekat.
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
          <h2 className="footer-big-title">Siap memperkuat visual brand Anda?</h2>
          <div className="footer-grid">
            <div>
              <h3>Diva.</h3>
              <p>Tersedia untuk proyek freelance.</p>
              <p>
                Terbuka untuk kolaborasi dengan UMKM, personal brand, dan tim
                perusahaan.
              </p>
              
            </div>
            <div className="footer-links-grid">
              <div>
                <h4>Information</h4>
                <a href="#hero">Home</a>
                <a href="#features">Portofolio</a>
                <a href="#services">Keahlian</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <h4>Contact</h4>
                <a href="tel:+6283136352790">+62 831-3635-2790</a>
                <a href="mailto:divaafriyani653@gmail.com">divaafriyani653@gmail.com</a>
              </div>
              <div>
                <h4>Social</h4>
                <a href="https://www.instagram.com/ddvaaavryni" target="_blank" rel="noreferrer">
                  @ddvaaavryni
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026. Diva Studio. All rights reserved.</span>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
