import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  MapPin
} from 'lucide-react';
import './styles.css';

const projects = [
  { title: 'Project One', type: 'Web Application', language: 'React • JavaScript', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A modern application focused on a clean and useful user experience.', github: '#' },
  { title: 'Project Two', type: 'Full Stack Project', language: 'React • Node.js • SQL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Built with a practical full-stack architecture and responsive interface.', github: '#' },
  { title: 'Project Three', type: 'Application', language: 'C# • ASP.NET Core MVC', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A structured application demonstrating real-world development workflow.', github: '#' }
];

const skillGroups = [
  {
    title: 'Programming',
    items: ['C', 'C++', 'Java', 'Python']
  },
  {
    title: 'Web Development',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'PHP', 'SQL']
  },
  {
    title: 'Tools & Platforms',
    items: ['VS Code', 'Visual Studio', 'Android Studio', 'Linux / Ubuntu', 'Google Colab']
  },
  {
    title: 'Soft Skills',
    items: ['Problem-Solving', 'Teamwork', 'Communication', 'Quick Learner']
  }
];



function App(){
  const [loading,setLoading]=useState(true);
  const [dark,setDark]=useState(true);
  const [menu,setMenu]=useState(false);
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:100,damping:30,mass:.2});

  useEffect(() => {
  const cursor = document.getElementById('cursor');

  const moveCursor = (e) => {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };

  window.addEventListener('mousemove', moveCursor);

  return () => {
    window.removeEventListener('mousemove', moveCursor);
  };
}, []);

  useEffect(()=>{ const t=setTimeout(()=>setLoading(false),1000); return()=>clearTimeout(t)},[]);
  useEffect(()=>{document.body.dataset.theme=dark?'dark':'light'},[dark]);

  const go=(id)=>{setMenu(false); document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};

  return <>
    <AnimatePresence>{loading && 
      <motion.div className="loader" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.35}}>
        <motion.h1
          className="loader-name"
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [1, 1, 8],
          }}
          transition={{
            duration: 0.7,
            delay: 0.65,
            times: [0, 0.25, 1],
            ease: [0.4, 0, 1, 1],
          }}
        >
          <span className="name-left">
            {["A", "M", "N", "A"].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: (3 - index) * 0.12,
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>

          <span className="name-space"> </span>

          <span className="name-right">
            {["A", "H", "M", "E", "D"].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>
      </motion.div>}</AnimatePresence>

    <motion.div className="scroll-progress" style={{scaleX:progress}} />
    <div className="cursor" id="cursor" />

    <header className="navbar">
      <button className="brand" onClick={()=>go('home')}>AMNA<span>.</span></button>
      <nav className={menu?'nav-open':''}>
        {['about', 'experience', 'projects', 'skills','beyond-code'].map(x=>
          <button key={x} onClick={()=>go(x)}>
            {x === 'beyond-code' ? 'Beyond Code' : x}
          </button>
        )}
              </nav>
      <div className="nav-right">
        <button className="theme" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
        <button className="contact-nav" onClick={()=>go('contact')}>Contact <ArrowUpRight size={16}/></button>
        <button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:1.1}}>HELLO, I'M</motion.p>
          <motion.h2 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:1.18,duration:.7}}>Amna <span>Ahmed</span></motion.h2>
          <motion.h3 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.28}}>I build <span>web applications</span> &amp; digital experiences.</motion.h3>
          <motion.p className="hero-sub" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.38}}>Full Stack Developer · BS Computer Science Student</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:1.48}}>
            <button className="btn primary" onClick={()=>go('contact')}>Let's Connect <ArrowUpRight size={18}/></button>
            <a className="btn secondary" href="/Amna_Ahmed_CV.pdf" download>Download Resume <Download size={17}/></a>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{delay:1.2,duration:.8}}>
          <div className="visual-glow"/>
          <div className="photo-frame"><img src="/amna.jpeg" alt="Amna Ahmed"/></div>
          <div className="floating-card card-one">
            Full Stack Developer
          </div>

          <div className="floating-card card-two">
            Visual Creator
          </div>
        </motion.div>
      </section>

      <section id="about" className="section-shell section about">
        <SectionHeading label="ABOUT" title="A little about me." />
        <div className="about-grid">
          <motion.p className="statement" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>I turn ideas into <em>functional, thoughtful</em> digital experiences.</motion.p>
          <motion.div className="about-copy" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.12}}>
            <p>I’m a developer who enjoys turning ideas into things people can actually use. I like building web applications, solving problems, and learning by creating.</p>
            <p>Beyond coding, I have a creative side through photography, videography, and media. I enjoy bringing creativity into technology and paying attention to the details that make an experience feel memorable.</p>
            <p>I’m always learning, experimenting, and finding new ways to bring my technical and creative sides together.</p>
          </motion.div>
        </div>
      </section>


    <section id="education" className="section-shell section education">
      <SectionHeading
        label="EDUCATION"
        title="My academic journey."
      />

      <div className="edu-list">

        <div className="edu-item">
          <div className="edu-info">
            <h3>BS Computer Science</h3>
            <p>University of Central Punjab · Lahore</p>
          </div>

          <span className="edu-year">2023 — PRESENT</span>
        </div>

        <div className="edu-item">
          <div className="edu-info">
            <h3>Intermediate in Computer Science (ICS)</h3>
            <p>Punjab Group of Colleges</p>
          </div>

          <span className="edu-year">2021 — 2023</span>
        </div>

      </div>
    </section>


    <section id="experience" className="section-shell section experience">
      <SectionHeading
        label="EXPERIENCE"
        title="Where I've gained experience."
      />

      <motion.div
        className="experience-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="experience-number">01</div>

        <div className="experience-content">
          <div className="experience-top">
            <div>
              <p className="experience-type">INTERNSHIP</p>
              <h3>Enterprise Application Development Intern</h3>
              <p className="experience-company">
                University of Central Punjab · Lahore
              </p>
            </div>

            <span className="experience-date">2026</span>
          </div>

          <p className="experience-description">
            Worked on enterprise-level web application development using
            C#, ASP.NET Core MVC, Entity Framework Core, SQL Server, and
            ASP.NET Core Identity. Gained hands-on experience in building
            structured applications, database integration, authentication,
            and collaborative software development.
          </p>

          <div className="experience-tags">
            <span>C#</span>
            <span>ASP.NET Core MVC</span>
            <span>EF Core</span>
            <span>SQL Server</span>
            <span>ASP.NET Identity</span>
            <span>Git</span>
          </div>
        </div>
      </motion.div>
    </section>

    <section id="projects" className="section-shell section projects">
      <SectionHeading
        label="PROJECTS"
        title="Things I've built."
      />
    </section>

     <section id="skills" className="section-shell section">
      <SectionHeading label="SKILLS" title="Things I work with." />

      <div className="skills-cards">
        {skillGroups.map((group, i) => (
          <motion.div
            className="skill-card"
            key={group.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="skill-card-top">
              <span>0{i + 1}</span>
              <div className="skill-arrow">↗</div>
            </div>

            <h3>{group.title}</h3>

            <div className="skill-tags">
              {group.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section id="beyond-code" className="section-shell section beyond-code">
      <SectionHeading
        label="BEYOND CODE"
        title="My creative side."
      />

      <div className="creative-intro">
        <div>
          <p className="creative-kicker">VISUAL CREATOR</p>
          <h3>
            <span>Creating</span>{' '}
            <strong>Beyond the screen.</strong>
          </h3>
        </div>

        <p>
          Photography, videography, and creative storytelling are a big part of
          how I express ideas beyond development.
        </p>
      </div>

      {/* Photography */}
      <div className="creative-block">
        <div className="creative-heading">
          <div>
            <p>PHOTOGRAPHY</p>
            <h3>Moments through my lens.</h3>
          </div>
        </div>

        <p className="creative-description">
          I capture moments through composition, light, and perspective.
          A glimpse into some of my photography work.
        </p>

        <div className="photo-gallery">
          <motion.div
            className="photo-card photo-main"
            initial={{ opacity: 0, x: -40}}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src="/photo1.jpeg" alt="Photography work 1" />
          </motion.div>

          <motion.div
            className="photo-card photo-side photo-two"
            initial={{ opacity: 0, x: 40}}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img src="/photo2.jpeg" alt="Photography work 2" />
          </motion.div>

          <motion.div
            className="photo-card photo-side photo-three"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img src="/photo3.jpeg" alt="Photography work 3" />
          </motion.div>
        </div>
      </div>

      {/* Reels */}
      <div className="creative-block reels-block">
        <div className="creative-heading">
          <div>
            <p>REELS / VIDEOGRAPHY</p>
            <h3>Stories in motion.</h3>
          </div>
        </div>

        <p className="creative-description">
          I create short-form visual content that combines storytelling,
          editing, and creative direction.
        </p>

        <div className="reel-links">

          <a
            className="reel-link"
            href="https://www.instagram.com/reel/DXuCM5pDAAt/?stkn=OXRqc3ZsaHkwcm52"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>WINNING REEL</span>
              <h4>Intra Media Fest</h4>
              <p>Best Reel</p>
            </div>

            <div className="reel-arrow">↗</div>
          </a>

          <a
            className="reel-link"
            href="https://www.instagram.com/reel/DSnS-GwCZ6_/?stkn=MWhnMHg0Z3QzZmxmcw=="
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>WINNING REEL</span>
              <h4>Rang-e-Lahore</h4>
              <p>Reels Competition Winner</p>
            </div>

            <div className="reel-arrow">↗</div>
          </a>

        </div>
      </div>

      {/* Achievements */}
      <div className="creative-block achievements-block">
        <div className="creative-heading">
          <div>
            <p>ACHIEVEMENTS</p>
            <h3>Work worth remembering.</h3>
          </div>
        </div>

        <div className="achievement-list">

          <motion.div
            className="achievement-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>01</span>
            <div>
              <h4>Best Member of the Year</h4>
              <p>Reels Domain</p>
            </div>
            <div className="achievement-mark">✦</div>
          </motion.div>

          <motion.div
            className="achievement-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span>02</span>
            <div>
              <h4>Best Reel</h4>
              <p>Intra Media Fest</p>
            </div>
            <div className="achievement-mark">✦</div>
          </motion.div>

          <motion.div
            className="achievement-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span>03</span>
            <div>
              <h4>Rang-e-Lahore Reels Competition</h4>
              <p>Winner</p>
            </div>
            <div className="achievement-mark">✦</div>
          </motion.div>

        </div>
      </div>
    </section>


     <section id="contact" className="section-shell section contact">
        <SectionHeading
          label="CONTACT"
          title={
            <>
              Let's <span className="outline-text">talk.</span>
            </>
          }
        />

        <div className="contact-grid">

          <div className="contact-info">
            <p className="contact-intro">
              Have an idea, opportunity, or just want to say hello?
              I'd love to hear from you.
            </p>

            <div className="contact-links">

              <a href="mailto:amna.ahk09@gmail.com">
                <Mail size={19} />
                <div>
                  <span>EMAIL</span>
                  <p>amna.ahk09@gmail.com</p>
                </div>
              </a>

              <a href="tel:+923229715074">
                <Phone size={19} />
                <div>
                  <span>PHONE</span>
                  <p>03229715074</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/amna-ahmed-90b63b419"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.98h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.3ZM5.34 7.42a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V8.98H3.56v11.47Z" />
                </svg>

                <div>
                  <span>LINKEDIN</span>
                  <p>Amna Ahmed</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/amna._k9?stkn=MWh6MmxjYWh5YXM1eA=="
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
                </svg>

                <div>
                  <span>INSTAGRAM</span>
                  <p>@amna._k9</p>
                </div>
              </a>

              <a
                href="https://github.com/amnak004"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.75 10.75 0 0 1 5.64 0c2.15-1.46 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.04.76 2.1v3.1c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />
                </svg>

                <div>
                  <span>GITHUB</span>
                  <p>amnak004</p>
                </div>
              </a>

              <div className="contact-location">
                <MapPin size={19} />
                <div>
                  <span>LOCATION</span>
                  <p>Lahore, Pakistan</p>
                </div>
              </div>

            </div>
          </div>


          <motion.form
            className="contact-form"
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;
            let valid = true;

            form.querySelectorAll('.form-field').forEach((field) => {
              const input = field.querySelector('input, textarea');
              const error = field.querySelector('.form-error');

              if (!input.value.trim()) {
                error.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
                field.classList.add('has-error');
                valid = false;
              } else if (
                input.name === 'email' &&
                !/^[^\s@]+@gmail\.com$/i.test(input.value.trim())
              ) {
                error.textContent = 'Please enter a valid Gmail address';
                field.classList.add('has-error');
                valid = false;
              } else {
                error.textContent = '';
                field.classList.remove('has-error');
              }
            });

            if (!valid) return;

            try {
              const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: form.name.value,
                  email: form.email.value,
                  subject: form.subject.value,
                  message: form.message.value,
                }),
              });

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.message || 'Something went wrong.');
              }

              alert('Message sent successfully!');

              form.reset();

              form.querySelectorAll('.form-error').forEach((error) => {
                error.textContent = '';
              });

              form.querySelectorAll('.form-field').forEach((field) => {
                field.classList.remove('has-error');
              });

            } catch (error) {
              console.error('Form submission error:', error);
              alert(error.message || 'Unable to send message.');
            }
          }}
          >
            <div className="form-row">

              <div className="form-field">
                <label>Your Name</label>
                <span className="form-error"></span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-field">
                <label>Your Email</label>
                <span className="form-error"></span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
              </div>

            </div>

            <div className="form-field">
              <label>Subject</label>
              <span className="form-error"></span>
              <input
                type="text"
                name="subject"
                placeholder="What's this about?"
              />
            </div>

            <div className="form-field">
              <label>Message</label>
              <span className="form-error"></span>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell me a little about what you have in mind..."
              />
            </div>

            <button type="submit" className="form-submit">
              Send Message
              <ArrowUpRight size={18} />
            </button>
          </motion.form>

        </div>
      </section>
    </main>

    <footer><span>AMNA AHMED<span className="accent">.</span></span><span>Designed &amp; built with intention © 2026</span><button onClick={()=>go('home')}>Back to top ↑</button></footer>
  </>
}

function SectionHeading({label,title}){return <div className="section-heading"><p>{label}</p><h2>{title}</h2></div>}

createRoot(document.getElementById('root')).render(<App/>);
