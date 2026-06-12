import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Landing.css";

export default function Landing() {
  const nav = useNavigate();
  const { user } = useAuth();

  // If already logged in, go to dashboard
  if (user) {
    nav("/");
    return null;
  }

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-icon">📅</div>
            <h1 className="logo-text">SocialSync</h1>
          </div>
          
          <nav className="header-nav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <button className="btn-secondary" onClick={() => nav("/auth")}>
              Login
            </button>
            <button className="btn-primary" onClick={() => nav("/auth")}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              ⭐ THE EASIEST WAY TO MANAGE CONTENT
            </div>
            <h2 className="hero-title">
              Schedule social posts <br />
              <span className="highlight">without</span> the chaos.
            </h2>
            <p className="hero-description">
              SocialSync is a beautifully opinionated scheduler for X, LinkedIn, Instagram and TikTok. Compose with AI, schedule for the best time, and watch the analytics roll in — all in one clean dashboard.
            </p>
            
            <div className="hero-actions">
              <button className="btn-primary btn-large" onClick={() => nav("/auth")}>
                Create your free account →
              </button>
              <button className="btn-secondary btn-large" onClick={scrollToFeatures}>
                I already have an account
              </button>
            </div>

            <div className="hero-badges">
              <span className="badge">No card required</span>
              <span className="badge">4 Platforms</span>
              <span className="badge">AI Captions Included</span>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-placeholder">
              <div className="chart-preview">
                <div className="bar" style={{ height: "30%" }}></div>
                <div className="bar" style={{ height: "50%" }}></div>
                <div className="bar" style={{ height: "80%" }}></div>
                <div className="bar" style={{ height: "60%" }}></div>
                <div className="bar" style={{ height: "90%" }}></div>
              </div>
              <p>📊 Analytics Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Ticker */}
      <section className="ticker-section">
        <div className="ticker-content">
          <span className="platform-item">📘 Facebook</span>
          <span className="ticker-dot">●</span>
          <span className="platform-item">📷 Instagram</span>
          <span className="ticker-dot">●</span>
          <span className="platform-item">💼 LinkedIn</span>
          <span className="ticker-dot">●</span>
          <span className="platform-item">𝕏 X / Twitter</span>
          <span className="ticker-dot">●</span>
          <span className="platform-item">▶️ YouTube</span>
          <span className="ticker-dot">●</span>
          <span className="platform-item">📘 Facebook</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Features built for creators</h2>
          <p>Powerful AI tools that handle the heavy lifting while you focus on creativity.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Smart Scheduling</h3>
            <p>Schedule your posts for the best time and reach more audience automatically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Multiple Platforms</h3>
            <p>Manage and publish on Instagram, Twitter, LinkedIn and more from one view.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Media Support</h3>
            <p>Upload images, videos, GIFs and create stunning posts with AI suggestions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Track performance with detailed analytics and data-driven insights.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple steps to automate your social media empire.</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-icon step-1">1</div>
            <h4>Connect Your Accounts</h4>
            <p>Securely link all your profiles in one central hub.</p>
          </div>
          <div className="step">
            <div className="step-icon step-2">2</div>
            <h4>Create Your Post</h4>
            <p>Draft content with AI-assisted copywriting and image editing.</p>
          </div>
          <div className="step">
            <div className="step-icon step-3">3</div>
            <h4>Schedule & Optimize</h4>
            <p>Choose the perfect time slots using our predictive engine.</p>
          </div>
          <div className="step">
            <div className="step-icon step-4">4</div>
            <h4>Auto Publish</h4>
            <p>Sit back as your content goes live across all channels.</p>
          </div>
          <div className="step">
            <div className="step-icon step-5">5</div>
            <h4>Track & Analyze</h4>
            <p>Refine your strategy with real-time performance metrics.</p>
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="analytics-preview">
        <div className="analytics-main">
          <div className="analytics-header">
            <div>
              <h3>Analytics Overview</h3>
              <p>Monthly performance summary</p>
            </div>
            <select>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>

          <div className="analytics-stats">
            <div className="stat-card">
              <p className="stat-label">Impressions</p>
              <h4 className="stat-value">25.8K</h4>
              <p className="stat-change">📈 18.5%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Engagements</p>
              <h4 className="stat-value">8.6K</h4>
              <p className="stat-change">📈 23.7%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Clicks</p>
              <h4 className="stat-value">3.2K</h4>
              <p className="stat-change">📈 12.4%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Shares</p>
              <h4 className="stat-value">1.6K</h4>
              <p className="stat-change">📈 15.3%</p>
            </div>
          </div>

          <div className="chart-container">
            <div className="mini-chart">
              <div className="bar" style={{ height: "25%" }}></div>
              <div className="bar" style={{ height: "50%" }}></div>
              <div className="bar" style={{ height: "75%" }}></div>
              <div className="bar" style={{ height: "50%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "100%" }}></div>
              <div className="bar" style={{ height: "65%" }}></div>
              <div className="bar" style={{ height: "45%" }}></div>
              <div className="bar" style={{ height: "70%" }}></div>
            </div>
          </div>
        </div>

        <div className="analytics-sidebar">
          <div className="cta-card">
            <h3>Grow Faster.</h3>
            <p>Automate your social media and focus on what matters most — your business.</p>
            <button className="btn-dark" onClick={() => nav("/auth")}>
              Start free →
            </button>
          </div>
          <div className="trust-card">
            <div className="trust-icon">✓</div>
            <h4>Trusted by 10k+ Creators</h4>
            <p>Join the world's most innovative marketing teams.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that's right for you</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">$29<span>/mo</span></div>
            <ul className="features-list">
              <li>✓ 5 Social Profiles</li>
              <li>✓ 100 Scheduled Posts</li>
              <li>✓ Basic Analytics</li>
              <li>✓ AI Copywriting</li>
            </ul>
            <button className="btn-outline" onClick={() => nav("/auth")}>Choose Basic</button>
          </div>

          <div className="pricing-card featured">
            <div className="badge-featured">MOST POPULAR</div>
            <h3>Professional</h3>
            <div className="price">$79<span>/mo</span></div>
            <ul className="features-list">
              <li>✓ Unlimited Social Profiles</li>
              <li>✓ Unlimited Scheduled Posts</li>
              <li>✓ Advanced AI Insights</li>
              <li>✓ AI Content Generation</li>
              <li>✓ Team Collaboration</li>
            </ul>
            <button className="btn-primary" onClick={() => nav("/auth")}>Start 14-day Trial</button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul className="features-list">
              <li>✓ Multi-Brand Management</li>
              <li>✓ Custom White-labeling</li>
              <li>✓ Dedicated Success Manager</li>
              <li>✓ API Access</li>
            </ul>
            <button className="btn-outline" onClick={() => nav("/auth")}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-container">
          <details className="faq-item">
            <summary>Can I manage multiple brands?</summary>
            <p>Yes! With SocialSync, you can manage and schedule posts for unlimited brands from a single dashboard. Perfect for agencies and managers.</p>
          </details>
          <details className="faq-item">
            <summary>Is there an AI limit for content creation?</summary>
            <p>No limits on our Professional plan. Generate as many AI captions, descriptions, and content ideas as you need.</p>
          </details>
          <details className="faq-item">
            <summary>How does the predictive timing work?</summary>
            <p>Our AI analyzes your audience's engagement patterns and recommends optimal posting times based on when your followers are most active.</p>
          </details>
          <details className="faq-item">
            <summary>Can I collaborate with my team?</summary>
            <p>Yes! Invite team members, set roles, and collaborate on posts. Available on Professional and Enterprise plans.</p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <h2>Ready to take control of your social media?</h2>
        <p>Join thousands of creators who've simplified their social media management.</p>
        <button className="btn-primary btn-large" onClick={() => nav("/auth")}>
          Get Started Free Today
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SocialSync</h4>
            <p>Schedule social posts without the chaos.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#security">Security</a>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SocialSync. All rights reserved.</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
