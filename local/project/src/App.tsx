import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Bell, Brush, CalendarDays, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Drill, Droplets, Hammer, Heart, Home, LayoutDashboard, ListFilter, KeyRound, LockKeyhole, MapPin, Menu, MessageCircle, Plug, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, UserRound, Users, WalletCards, Wrench, X, Zap } from 'lucide-react';
import { bookings, categories, images, providers, type Booking, type BookingStatus, type Provider } from '@/data/mockData';

const iconMap = { Droplets, Zap, Hammer, Sparkles };

function Logo() { return <Link to="/" className="logo"><span className="logo-mark"><Home size={16} strokeWidth={3} /></span><span>Local<span>Link</span></span></Link>; }

function Header({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <header className={`site-header ${minimal ? 'minimal-header' : ''}`}><div className="container header-inner"><Logo /> {!minimal && <><nav className={open ? 'nav-open' : ''}><Link className={location.pathname === '/' ? 'active' : ''} to="/">Home</Link><Link className={location.pathname.startsWith('/services') ? 'active' : ''} to="/services">Find a pro</Link><Link to="/bookings">My bookings</Link><Link to="/dashboard">For providers</Link></nav><div className="header-actions"><Link to="/login" className="header-login">Log in</Link><Link to="/services" className="button button-dark button-small">Get started <ArrowUpRight size={15} /></Link></div><button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></>}</div></header>;
}

function Footer() { return <footer><div className="container footer-grid"><div><Logo /><p className="footer-copy">The simple, trusted way to get things done around your home.</p><div className="socials"><span>in</span><span>ig</span><span>f</span></div></div><div><h4>Explore</h4><Link to="/services">Find a service</Link><Link to="/services">Browse pros</Link><Link to="/dashboard">Become a provider</Link></div><div><h4>Support</h4><a href="#faq">How it works</a><a href="#faq">Trust & safety</a><a href="#faq">Help center</a></div><div><h4>Stay in the loop</h4><p className="muted">Tips for a happier home, delivered monthly.</p><div className="newsletter"><input placeholder="Your email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></div></div></div><div className="container footer-bottom"><span>© 2026 LocalLink</span><span>Made for your neighborhood.</span></div></footer>; }

function Stars({ rating, count }: { rating: number; count?: number }) { return <span className="rating"><Star size={15} fill="currentColor" /><b>{rating.toFixed(1)}</b>{count !== undefined && <span className="review-count">({count})</span>}</span>; }
function TrustScore({ score }: { score: number }) { return <div className="trust"><span className="trust-ring">{score}</span><span><b>Trust score</b><small>Top rated local pro</small></span></div>; }
function StatusBadge({ status }: { status: BookingStatus }) { return <span className={`status status-${status.toLowerCase()}`}><span />{status}</span>; }
function ProviderCard({ provider, compact = false }: { provider: Provider; compact?: boolean }) { const navigate = useNavigate(); return <article className={`provider-card ${compact ? 'compact' : ''}`}><div className="provider-image-wrap"><img src={provider.image} alt={provider.name} /><button className="heart" aria-label="Save provider"><Heart size={17} /></button><span className="available-dot"><span />Available</span></div><div className="provider-info"><div className="provider-heading"><div><p className="eyebrow">{provider.category}</p><h3>{provider.name}</h3><p className="provider-role">{provider.role}</p></div><TrustScore score={provider.score} /></div><div className="provider-meta"><Stars rating={provider.rating} count={provider.reviews} /><span><MapPin size={14} />{provider.location}</span></div><div className="card-bottom"><span className="price"><b>${provider.price}</b> / hr</span><span className="next-available"><Clock3 size={14} /> {provider.available}</span></div><button className="button button-outline full" onClick={() => navigate(`/provider/${provider.id}`)}>View profile <ArrowRight size={16} /></button></div></article>; }

function SearchBar({ large = false }: { large?: boolean }) { const navigate = useNavigate(); const [query, setQuery] = useState(''); return <form className={`search-bar ${large ? 'search-large' : ''}`} onSubmit={(e) => { e.preventDefault(); navigate(`/services${query ? `?q=${query}` : ''}`); }}><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you need help with?" /><span className="search-divider" /><MapPin size={18} /><input className="location-input" placeholder="Austin, TX" /><button className="button button-yellow">Search <ArrowRight size={17} /></button></form>; }

function FloatingTool({ className, label, children, scrollY, depth }: { className: string; label: string; children: React.ReactNode; scrollY: number; depth: number }) { const parallax = Math.min(scrollY * depth, 34); return <div className={`tool-layer ${className}`} style={{ transform: `translate3d(0, ${parallax}px, 0)` }} aria-label={label}><div className="tool-float"><span className="tool-shadow" /><span className="tool-icon">{children}</span></div></div>; }

function HeroTools() { const [scrollY, setScrollY] = useState(0); useEffect(() => { let frame = 0; const onScroll = () => { if (frame) return; frame = requestAnimationFrame(() => { setScrollY(window.scrollY); frame = 0; }); }; window.addEventListener('scroll', onScroll, { passive: true }); return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); }; }, []); return <div className="tool-ecosystem" aria-hidden="true"><FloatingTool className="tool-wrench" label="Wrench" scrollY={scrollY} depth={0.03}><Wrench /></FloatingTool><FloatingTool className="tool-screwdriver" label="Screwdriver" scrollY={scrollY} depth={0.06}><KeyRound /></FloatingTool><FloatingTool className="tool-hammer" label="Hammer" scrollY={scrollY} depth={0.045}><Hammer /></FloatingTool><FloatingTool className="tool-drill" label="Drill" scrollY={scrollY} depth={0.08}><Drill /></FloatingTool><FloatingTool className="tool-brush" label="Cleaning brush" scrollY={scrollY} depth={0.05}><Brush /></FloatingTool><FloatingTool className="tool-plug" label="Electrical plug" scrollY={scrollY} depth={0.07}><Plug /></FloatingTool></div>; }

function HomePage() { return <><Header /><main><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow accent-eyebrow"><span />LOCAL HELP, MADE SIMPLE</p><h1>Good help is <em>closer</em> than you think.</h1><p className="hero-text">From the leaky faucet to the big renovation, connect with trusted local pros who care about doing the job right.</p><SearchBar large /><div className="hero-proof"><div className="avatar-stack"><span>JM</span><span>MR</span><span>CO</span><span>+2k</span></div><span>Trusted by <b>12,000+</b> neighbors</span><span className="proof-star"><Star size={14} fill="currentColor" /> 4.9 average</span></div></div><div className="hero-visual"><HeroTools /><div className="hero-image"><img src={images.hero} alt="Local handyman ready to help" /><div className="hero-tag tag-top"><ShieldCheck size={17} /><span><b>Trust verified</b><small>Every pro is checked</small></span></div><div className="hero-tag tag-bottom"><span className="tag-icon"><Clock3 size={17} /></span><span><b>Help when you need it</b><small>Same-day bookings available</small></span></div></div><div className="hero-accent" /></div></div></section><section className="stats"><div className="container stats-inner"><div><b>12,000+</b><span>jobs completed</span></div><div><b>2,400+</b><span>trusted local pros</span></div><div><b>4.9/5</b><span>neighbor rating</span></div><div><b>94%</b><span>book again</span></div></div></section><section className="section category-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">START HERE</p><h2>What can we help with?</h2></div><Link className="text-link" to="/services">See all services <ArrowRight size={17} /></Link></div><div className="category-grid">{categories.map((category) => { const Icon = iconMap[category.icon as keyof typeof iconMap]; return <Link className={`category-card category-${category.color}`} to={`/services?category=${category.name}`} key={category.name}><span className="category-icon"><Icon size={24} /></span><span><b>{category.name}</b><small>{category.jobs}</small></span><ArrowUpRight className="category-arrow" size={20} /></Link>; })}</div></div></section><section className="section dark-section"><div className="container split-section"><div><p className="eyebrow accent-eyebrow"><span />WHY LOCALLINK</p><h2>More than a service.<br /><em>A better way to get it done.</em></h2><p className="section-copy">Finding someone you can trust shouldn't be the hard part. We make it easy to discover quality local help, understand the price, and book with confidence.</p><Link className="button button-yellow" to="/services">Find your local pro <ArrowRight size={17} /></Link></div><div className="benefit-list"><Benefit icon={<ShieldCheck />} title="Trust you can see" text="Real reviews, verified profiles, and a Trust Score that tells the whole story." /><Benefit icon={<WalletCards />} title="Fair prices, upfront" text="Know what a job should cost before you book. No awkward surprises." /><Benefit icon={<MessageCircle />} title="Neighbors helping neighbors" text="Built around the people and small businesses that make your neighborhood better." /></div></div></section><section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">MEET YOUR NEXT PRO</p><h2>People who take pride in the work.</h2></div><Link className="text-link" to="/services">Browse all pros <ArrowRight size={17} /></Link></div><div className="provider-grid">{providers.slice(0, 3).map((provider) => <ProviderCard provider={provider} key={provider.id} />)}</div></div></section><section className="section estimator-section"><div className="container estimator"><div><p className="eyebrow">FAIR PRICE ESTIMATOR</p><h2>What should this job cost?</h2><p>Get a quick, honest estimate based on what neighbors in your area have paid.</p><Link className="button button-dark" to="/services">Estimate my job <ArrowRight size={16} /></Link></div><div className="estimator-box"><div className="estimate-row"><span>Typical range</span><b>$85 — $140</b></div><div className="estimate-bar"><span /></div><div className="estimate-row"><span>Based on 148 similar jobs</span><small>Updated this week</small></div><div className="estimate-note"><CircleHelp size={16} /> Estimates are a guide, not a quote.</div></div></div></section></main><Footer /></>; }
function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="benefit"><span className="benefit-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>; }

function ServicesPage() { const [filtersOpen, setFiltersOpen] = useState(false); const [category, setCategory] = useState('All services'); const filtered = category === 'All services' ? providers : providers.filter((p) => p.category === category); return <><Header /><main className="page-shell"><div className="container"><div className="page-top"><div><p className="eyebrow">LOCAL PROS IN YOUR AREA</p><h1>Find the right help.</h1><p className="page-intro">Browse trusted professionals ready to take on your next home project.</p></div><button className="button button-outline filter-button" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} /> Filters</button></div><SearchBar /><div className="service-layout"><aside className={filtersOpen ? 'filter-open' : ''}><div className="filter-header"><b>Filter results</b><button onClick={() => setFiltersOpen(false)}><X size={17} /></button></div><label>Service category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>All services</option>{categories.map((c) => <option key={c.name}>{c.name}</option>)}</select></label><label>Location<div className="field-icon"><MapPin size={15} /><input defaultValue="Austin, TX" /></div></label><div className="filter-group"><span>Minimum rating</span>{[4.5, 4, 3].map((rating) => <label className="check-label" key={rating}><input type="checkbox" defaultChecked={rating === 4.5} /><Stars rating={rating} /><span>& up</span></label>)}</div><div className="filter-group"><span>Availability</span>{['Today', 'This week', 'Flexible'].map((item, i) => <label className="check-label" key={item}><input type="checkbox" defaultChecked={i === 0} /><span>{item}</span></label>)}</div><div className="filter-group"><span>Hourly rate</span><div className="range-label"><span>$40</span><span>$150+</span></div><input className="range" type="range" min="40" max="150" defaultValue="150" /></div><button className="button button-dark full">Apply filters</button></aside><div className="results"><div className="results-top"><span><b>{filtered.length * 38}</b> pros near Austin</span><button className="sort-button"><ListFilter size={16} /> Recommended <ChevronDown size={15} /></button></div>{filtered.map((provider) => <ProviderCard provider={provider} key={provider.id} />)}</div></div></div></main></>; }

function ProviderPage() { const { id = '1' } = useParams(); const provider = providers.find((p) => p.id === id) || providers[0]; const navigate = useNavigate(); return <><Header /><main className="page-shell provider-page"><div className="container"><Link to="/services" className="back-link"><ChevronRight size={16} className="back-icon" /> Back to search</Link><div className="profile-layout"><div><div className="profile-hero"><img src={provider.image} alt={provider.name} /><div className="profile-main"><div className="profile-title"><div><div className="verified-label"><ShieldCheck size={15} /> Verified professional</div><h1>{provider.name}</h1><p>{provider.role} <span>•</span> {provider.location}</p></div><button className="heart large"><Heart size={19} /></button></div><div className="profile-stats"><div><Stars rating={provider.rating} count={provider.reviews} /><small>Overall rating</small></div><div><b className="stat-score">{provider.score}</b><small>Trust score</small></div><div><b>12 yrs</b><small>Experience</small></div></div></div></div><div className="profile-tabs"><span className="active">About</span><span>Reviews (128)</span><span>Portfolio</span></div><section className="profile-content"><h2>About {provider.name.split(' ')[0]}</h2><p>{provider.bio}</p><div className="tag-list">{provider.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h2>Recent reviews</h2><Review name="Alyssa M." date="2 days ago" text="Jordan was on time, explained everything clearly, and left the place cleaner than he found it. Would absolutely book again." rating={5} /><Review name="Marcus T." date="1 week ago" text="Great communication and a really fair price. The work looks excellent." rating={5} /></section></div><aside className="booking-card"><div className="booking-card-header"><p className="eyebrow">BOOK THIS PRO</p><h2>Let's get that fixed.</h2><p>Choose a time that works for you. You won't be charged yet.</p></div><div className="booking-field"><label>What do you need help with?</label><select><option>{provider.category} — tell us more</option><option>General consultation</option></select></div><div className="booking-field"><label>Preferred date</label><div className="input-with-icon"><CalendarDays size={17} /><span>Choose a date</span></div></div><div className="booking-field"><label>Preferred time</label><div className="time-slots"><button className="selected">2:00 PM</button><button>4:30 PM</button><button>6:00 PM</button></div></div><div className="booking-estimate"><span>Estimated rate</span><b>${provider.price} <small>/ hr</small></b></div><button className="button button-yellow full" onClick={() => navigate(`/book/${provider.id}`)}>Request a booking <ArrowRight size={17} /></button><p className="secure-note"><LockKeyhole size={13} /> Free to request. No payment today.</p></aside></div></div></main><Footer /></>; }
function Review({ name, date, text, rating }: { name: string; date: string; text: string; rating: number }) { return <div className="review"><div className="review-avatar">{name.charAt(0)}</div><div><div className="review-top"><b>{name}</b><span>{date}</span><Stars rating={rating} /></div><p>{text}</p></div></div>; }

function BookingPage() { const { id = '1' } = useParams(); const provider = providers.find((p) => p.id === id) || providers[0]; const [submitted, setSubmitted] = useState(false); return <><Header minimal /><main className="booking-page"><div className="container narrow"><Link to={`/provider/${provider.id}`} className="back-link"><ChevronRight size={16} className="back-icon" /> Back to {provider.name}'s profile</Link>{submitted ? <div className="success-card"><span className="success-icon"><Check size={28} /></span><p className="eyebrow">REQUEST SENT</p><h1>You're on your way.</h1><p>{provider.name} will review your request and get back to you shortly. We'll let you know as soon as they respond.</p><Link to="/bookings" className="button button-dark">View my bookings <ArrowRight size={17} /></Link></div> : <div className="booking-form-layout"><div><p className="eyebrow">BOOK A LOCAL PRO</p><h1>Tell us about the job.</h1><p className="page-intro">A few details help {provider.name.split(' ')[0]} come prepared.</p><form className="form-card" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><label>What do you need help with?<select><option>Fix a leaking faucet</option><option>Install a new fixture</option><option>Other plumbing help</option></select></label><label>Tell us a little more <textarea placeholder="Describe what needs to be done..." rows={4} /></label><div className="two-fields"><label>Preferred date<input type="date" defaultValue="2026-10-12" /></label><label>Preferred time<select><option>2:00 PM</option><option>4:30 PM</option><option>6:00 PM</option></select></label></div><label>Service address<input defaultValue="1240 W 5th Street, Austin, TX" /></label><label className="check-label"><input type="checkbox" defaultChecked /> <span>I'd like to receive text updates about this booking.</span></label><button className="button button-yellow full" type="submit">Send booking request <ArrowRight size={17} /></button></form></div><div className="booking-summary"><p className="eyebrow">YOUR PRO</p><div className="mini-provider"><img src={provider.image} alt={provider.name} /><div><b>{provider.name}</b><span>{provider.role}</span><Stars rating={provider.rating} /></div></div><div className="summary-line"><span>Estimated hourly rate</span><b>${provider.price} / hr</b></div><div className="summary-line"><span>Service fee</span><b>Free</b></div><div className="summary-total"><span>Due today</span><b>$0</b></div><p className="secure-note"><ShieldCheck size={14} /> You're only requesting a time. Nothing is charged.</p></div></div>}</div></main></>; }

function BookingsPage() { const [active, setActive] = useState('All'); const statuses = ['All', 'Pending', 'Accepted', 'Completed']; const filtered = active === 'All' ? bookings : bookings.filter((b) => b.status === active); return <><Header /><main className="page-shell"><div className="container"><div className="page-top"><div><p className="eyebrow">YOUR LOCALINK</p><h1>My bookings</h1><p className="page-intro">Keep track of your upcoming help and past projects.</p></div><Link to="/services" className="button button-dark">Book a service <ArrowRight size={16} /></Link></div><div className="tab-pills">{statuses.map((status) => <button className={active === status ? 'active' : ''} onClick={() => setActive(status)} key={status}>{status}{status !== 'All' && <span>{bookings.filter((b) => b.status === status).length}</span>}</button>)}</div><div className="bookings-list">{filtered.map((booking) => <BookingRow booking={booking} key={booking.id} />)}</div></div></main></>; }
function BookingRow({ booking }: { booking: Booking }) { return <article className="booking-row"><img src={booking.image} alt={booking.provider} /><div className="booking-row-main"><div className="booking-row-title"><div><p className="eyebrow">{booking.service}</p><h3>{booking.provider}</h3></div><StatusBadge status={booking.status} /></div><div className="booking-details"><span><CalendarDays size={15} />{booking.date}</span><span><Clock3 size={15} />{booking.time}</span><span><MapPin size={15} />{booking.address}</span></div></div><div className="booking-price"><span>Total estimate</span><b>${booking.price}</b><Link to={`/provider/1`}>View details <ChevronRight size={14} /></Link></div></article>; }
function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const response = await fetch('https://locallink-api-production.up.railway.app/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || 'Invalid email or password');
        }

        const data = await response.json();

        localStorage.setItem('locallinkUser', JSON.stringify(data));

        navigate('/dashboard');
      } else {
        const response = await fetch('https://locallink-api-production.up.railway.app/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            role,
          }),
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || 'Registration failed');
        }

        alert('Account created successfully! Please log in.');

        setMode('login');
        setName('');
        setPhone('');
        setPassword('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Logo />

        <div className="auth-quote">
          <span className="quote-mark">“</span>
          <h1>
            Small jobs.
            <br />
            <em>Big difference.</em>
          </h1>
          <p>
            LocalLink helps neighbors find the people who make a house feel like home.
          </p>

          <div className="auth-stat">
            <b>4.9/5</b>
            <span>average rating from our neighbors</span>
          </div>
        </div>

        <div className="auth-image">
          <img src={images.tools} alt="A collection of home repair tools" />
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form">

          <div className="auth-mobile-logo">
            <Logo />
          </div>

          <div className="auth-heading">
            <p className="eyebrow">
              {mode === 'login' ? 'WELCOME BACK' : 'JOIN THE NEIGHBORHOOD'}
            </p>

            <h2>
              {mode === 'login'
                ? 'Good to see you.'
                : 'Let’s get started.'}
            </h2>

            <p>
              {mode === 'login'
                ? 'Log in to manage your bookings and more.'
                : 'Create an account to find trusted help near you.'}
            </p>
          </div>

          <div className="auth-toggle">
            <button
              className={mode === 'login' ? 'active' : ''}
              onClick={() => {
                setMode('login');
                setError('');
              }}
            >
              Log in
            </button>

            <button
              className={mode === 'register' ? 'active' : ''}
              onClick={() => {
                setMode('register');
                setError('');
              }}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            {mode === 'register' && (
              <>
                <label>
                  Full name
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label>
                  Phone number
                  <input
                    type="tel"
                    placeholder="9999999999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </label>
              </>
            )}

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {mode === 'register' && (
              <label>
                What brings you to LocalLink?
                <select
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value === 'CUSTOMER'
                        ? 'CUSTOMER'
                        : 'PROVIDER'
                    )
                  }
                >
                  <option value="CUSTOMER">
                    I'm looking for help
                  </option>
                  <option value="PROVIDER">
                    I'm a service provider
                  </option>
                </select>
              </label>
            )}

            {mode === 'login' && (
              <div className="forgot-row">
                <label className="check-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a href="#forgot">Forgot password?</a>
              </div>
            )}

            {error && (
              <p
                style={{
                  color: '#c0392b',
                  marginTop: '10px',
                  marginBottom: '10px',
                  fontSize: '14px',
                }}
              >
                {error}
              </p>
            )}

            <button
              className="button button-yellow full"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                ? 'Log in'
                : 'Create my account'}

              {!loading && <ArrowRight size={17} />}
            </button>

          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button className="social-button">
            Continue with Google
          </button>

          <p className="auth-terms">
            By continuing, you agree to LocalLink's{' '}
            <a href="#terms">Terms of Service</a> and{' '}
            <a href="#privacy">Privacy Policy</a>.
          </p>

        </div>
      </div>
    </div>
  );
}
function DashboardPage({ admin = false }: { admin?: boolean }) { const [active, setActive] = useState('Overview'); const data = admin ? { title: 'Good morning, Alex.', sub: 'Here’s what’s happening across LocalLink today.', stat1: '2,418', stat1Label: 'Active providers', stat2: '186', stat2Label: 'Bookings this week', stat3: '$18.4k', stat3Label: 'Platform revenue', nav: ['Overview', 'Providers', 'Bookings', 'Reports'] } : { title: 'Good morning, Jordan.', sub: 'Here’s what’s happening with your work today.', stat1: '4', stat1Label: 'Upcoming bookings', stat2: '4.9', stat2Label: 'Your rating', stat3: '$2,840', stat3Label: 'This month', nav: ['Overview', 'Bookings', 'Availability'] }; return <><Header /><main className="dashboard-page"><div className="container dashboard-layout"><aside className="dashboard-nav"><p className="eyebrow">{admin ? 'ADMIN CONSOLE' : 'PROVIDER PORTAL'}</p><h1>{admin ? 'Operations' : 'Jordan Mitchell'}</h1>{data.nav.map((item, i) => <button className={active === item ? 'active' : ''} onClick={() => setActive(item)} key={item}>{i === 0 ? <LayoutDashboard size={17} /> : i === 1 ? <CalendarDays size={17} /> : i === 2 ? <Users size={17} /> : <WalletCards size={17} />}{item}</button>)}<div className="dashboard-help"><CircleHelp size={18} /><b>Need help?</b><span>Visit our provider support center.</span></div></aside><div className="dashboard-main"><div className="dashboard-welcome"><div><p className="eyebrow">{admin ? 'MONDAY, OCTOBER 5' : 'MONDAY, OCTOBER 5'}</p><h2>{data.title}</h2><p>{data.sub}</p></div><div className="dashboard-actions"><button className="icon-button"><Bell size={18} /></button><Link className="button button-dark" to={admin ? '/services' : '/services'}>{admin ? 'View marketplace' : 'Find more work'} <ArrowUpRight size={16} /></Link></div></div><div className="dashboard-stats"><DashStat value={data.stat1} label={data.stat1Label} trend="+12%" /><DashStat value={data.stat2} label={data.stat2Label} trend="+8%" /><DashStat value={data.stat3} label={data.stat3Label} trend="+18%" /></div><div className="dashboard-content-grid"><div className="dashboard-panel"><div className="panel-heading"><div><p className="eyebrow">{admin ? 'RECENT ACTIVITY' : 'NEXT UP'}</p><h3>{admin ? 'Marketplace snapshot' : 'Your upcoming jobs'}</h3></div><button className="text-link">View all <ArrowRight size={15} /></button></div>{(admin ? bookings : bookings.slice(0, 2)).map((b) => <BookingRow booking={b} key={b.id} />)}</div><div className="dashboard-panel trust-panel"><div className="panel-heading"><div><p className="eyebrow">{admin ? 'HEALTH CHECK' : 'YOUR PROFILE'}</p><h3>{admin ? 'Platform at a glance' : 'Keep your profile fresh'}</h3></div></div>{admin ? <><Progress label="Provider verification" value="94%" percent={94} /><Progress label="Booking acceptance" value="87%" percent={87} /><Progress label="Customer satisfaction" value="96%" percent={96} /></> : <><div className="profile-progress"><span>Profile completeness</span><b>82%</b></div><div className="progress"><span style={{ width: '82%' }} /></div><p className="muted">Add 2 more portfolio photos to stand out to nearby customers.</p><button className="button button-outline full">Edit profile <ArrowRight size={15} /></button></>}</div></div></div></div></main></>; }
function DashStat({ value, label, trend }: { value: string; label: string; trend: string }) { return <div className="dash-stat"><span>{label}</span><b>{value}</b><small><ArrowUpRight size={13} /> {trend} this month</small></div>; }
function Progress({ label, value, percent }: { label: string; value: string; percent: number }) { return <div className="progress-item"><div><span>{label}</span><b>{value}</b></div><div className="progress"><span style={{ width: `${percent}%` }} /></div></div>; }
function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const savedUser = localStorage.getItem('locallinkUser');

    if (!savedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);
      setName(parsedUser.name || '');
      setEmail(parsedUser.email || '');
      setPhone(parsedUser.phone || '');
    } catch {
      localStorage.removeItem('locallinkUser');
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((word: string) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const roleName =
    user.role === 'PROVIDER'
      ? 'Service Provider'
      : 'Customer';

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      phone,
    };

    localStorage.setItem(
      'locallinkUser',
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    alert('Profile saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('locallinkUser');
    navigate('/login');
  };

  return (
    <>
      <Header />

      <main className="page-shell">
        <div className="container narrow">

          <div className="page-top">
            <div>
              <p className="eyebrow">ACCOUNT SETTINGS</p>

              <h1>Your profile</h1>

              <p className="page-intro">
                Keep your details up to date for a smoother
                LocalLink experience.
              </p>
            </div>
          </div>

          <div className="account-layout">

            <aside className="account-nav">

              <button
                type="button"
                className={activeTab === 'personal' ? 'active' : ''}
                onClick={() => setActiveTab('personal')}
              >
                <UserRound size={17} />
                Personal details
              </button>

              <button
                type="button"
                className={activeTab === 'notifications' ? 'active' : ''}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={17} />
                Notifications
              </button>

              <button
                type="button"
                className={activeTab === 'security' ? 'active' : ''}
                onClick={() => setActiveTab('security')}
              >
                <LockKeyhole size={17} />
                Security
              </button>

            </aside>

            <section className="form-card profile-form">

              {activeTab === 'personal' && (
                <>
                  <div className="profile-form-heading">

                    <div className="account-avatar">
                      {initials}
                    </div>

                    <div>
                      <h2>{user.name}</h2>

                      <p>
                        {roleName}
                      </p>
                    </div>

                    <button
                      className="button button-outline"
                      type="button"
                      onClick={() =>
                        alert(
                          'Profile photo upload will be added later.'
                        )
                      }
                    >
                      Change photo
                    </button>

                  </div>

                  <label>
                    Full name

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />
                  </label>

                  <label>
                    Email address

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />
                  </label>

                  <label>
                    Phone number

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Account type

                    <input
                      type="text"
                      value={roleName}
                      readOnly
                    />
                  </label>

                  <div className="form-actions">

                    <button
                      className="button button-dark"
                      type="button"
                      onClick={handleSave}
                    >
                      Save changes
                    </button>

                    <button
                      className="button button-outline"
                      type="button"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>

                  </div>
                </>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <div className="profile-form-heading">
                    <div>
                      <p className="eyebrow">
                        NOTIFICATIONS
                      </p>

                      <h2>
                        Notification preferences
                      </h2>

                      <p>
                        Choose how LocalLink keeps you
                        updated.
                      </p>
                    </div>
                  </div>

                  <label className="check-label">
                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    <span>
                      Booking updates
                    </span>
                  </label>

                  <label className="check-label">
                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    <span>
                      New messages
                    </span>
                  </label>

                  <label className="check-label">
                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    <span>
                      Promotional emails
                    </span>
                  </label>

                  <div className="form-actions">
                    <button
                      className="button button-dark"
                      type="button"
                      onClick={() =>
                        alert(
                          'Notification preferences saved!'
                        )
                      }
                    >
                      Save preferences
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <div className="profile-form-heading">
                    <div>
                      <p className="eyebrow">
                        SECURITY
                      </p>

                      <h2>
                        Account security
                      </h2>

                      <p>
                        Manage your LocalLink account
                        security settings.
                      </p>
                    </div>
                  </div>

                  <label>
                    Current password

                    <input
                      type="password"
                      placeholder="Enter current password"
                    />
                  </label>

                  <label>
                    New password

                    <input
                      type="password"
                      placeholder="Enter new password"
                    />
                  </label>

                  <label>
                    Confirm new password

                    <input
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </label>

                  <div className="form-actions">
                    <button
                      className="button button-dark"
                      type="button"
                      onClick={() =>
                        alert(
                          'Password update API will be connected next.'
                        )
                      }
                    >
                      Update password
                    </button>
                  </div>
                </div>
              )}

            </section>

          </div>
        </div>
      </main>
    </>
  );
}

function App() { return <BrowserRouter><Routes><Route path="/" element={<HomePage />} /><Route path="/login" element={<AuthPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/provider/:id" element={<ProviderPage />} /><Route path="/book/:id" element={<BookingPage />} /><Route path="/bookings" element={<BookingsPage />} /><Route path="/dashboard" element={<DashboardPage />} /><Route path="/admin" element={<DashboardPage admin />} /><Route path="/profile" element={<ProfilePage />} /><Route path="*" element={<HomePage />} /></Routes></BrowserRouter>; }

export default App;
