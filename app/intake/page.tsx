'use client'

// app/intake/page.tsx  (or drop IntakeForm anywhere as a component)
// Full client intake form — saves to Supabase + emails you via Resend

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ─── Zod Schema ────────────────────────────────────────────────────────────────
const schema = z.object({
  // Section 1
  full_name: z.string().min(2, 'Name is required'),
  business_name: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  preferred_contact: z.string().optional(),
  industry: z.string().optional(),
  years_in_business: z.string().optional(),
  business_type: z.string().optional(),
  business_description: z.string().optional(),
  target_audience: z.string().optional(),

  // Section 2
  goals: z.array(z.string()).optional(),
  has_existing_site: z.string().optional(),
  existing_url: z.string().optional(),
  dislikes: z.string().optional(),
  inspiration_sites: z.string().optional(),

  // Section 3
  brand_vibes: z.array(z.string()).optional(),
  brand_colors: z.string().optional(),
  has_logo: z.string().optional(),
  font_style: z.string().optional(),
  has_brand_guidelines: z.string().optional(),
  content_provider: z.string().optional(),
  photo_provider: z.string().optional(),
  video_integration: z.string().optional(),
  languages: z.string().optional(),

  // Section 4
  pages_needed: z.array(z.string()).optional(),
  features_needed: z.array(z.string()).optional(),
  num_products: z.string().optional(),
  product_type: z.string().optional(),
  payment_processor: z.string().optional(),
  needs_tax_shipping: z.string().optional(),

  // Section 5
  desired_domain: z.string().optional(),
  owns_domain: z.string().optional(),
  has_hosting: z.string().optional(),
  preferred_platform: z.string().optional(),
  hosting_preference: z.string().optional(),
  needs_business_email: z.string().optional(),
  integrations: z.array(z.string()).optional(),

  // Section 6
  ideal_launch_date: z.string().optional(),
  deadline_flexible: z.string().optional(),
  build_budget: z.string().optional(),
  monthly_budget: z.string().optional(),
  important_dates: z.string().optional(),

  // Section 7
  access_needed: z.array(z.string()).optional(),
  access_notes: z.string().optional(),

  // Section 8
  ongoing_services: z.array(z.string()).optional(),
  additional_notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

// ─── Helper Components ─────────────────────────────────────────────────────────

function SectionCard({
  num, title, subtitle, children
}: { num: string | number; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6">
      <div className="flex items-center gap-4 px-8 py-5 border-b-2 border-stone-100">
        <div className="w-8 h-8 bg-orange-600 text-white text-sm font-bold rounded-lg flex items-center justify-center shrink-0">
          {num}
        </div>
        <div>
          <h2 className="font-serif text-xl text-stone-900">{title}</h2>
          {subtitle && <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="px-8 py-6">{children}</div>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-1.5 block">
      {children}
    </label>
  )
}

const inputCls = "w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:bg-white transition"
const selectCls = inputCls
const textareaCls = `${inputCls} min-h-[90px] resize-y`

function CheckboxGrid({
  options, value, onChange
}: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 border rounded-xl cursor-pointer text-sm transition select-none
            ${value.includes(opt)
              ? 'border-orange-500 bg-orange-50 text-orange-800 font-medium'
              : 'border-stone-200 hover:border-orange-300 hover:bg-orange-50/40'}`}
        >
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            className="accent-orange-600 w-4 h-4"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

function RadioGroup({
  options, value, onChange
}: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer text-sm transition select-none
            ${value === opt
              ? 'border-orange-500 bg-orange-50 text-orange-800 font-medium'
              : 'border-stone-200 hover:border-orange-300'}`}
        >
          <input
            type="radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-orange-600"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 pt-5 border-t border-dashed border-stone-200">
      <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-3">{label}</p>
      {children}
    </div>
  )
}

// ─── Main Form ─────────────────────────────────────────────────────────────────

export default function IntakeForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      goals: [], brand_vibes: [], pages_needed: [], features_needed: [],
      integrations: [], access_needed: [], ongoing_services: [],
    }
  })

  // Checkbox array helpers
  const goals = watch('goals') || []
  const brand_vibes = watch('brand_vibes') || []
  const pages_needed = watch('pages_needed') || []
  const features_needed = watch('features_needed') || []
  const integrations = watch('integrations') || []
  const access_needed = watch('access_needed') || []
  const ongoing_services = watch('ongoing_services') || []
  const has_existing_site = watch('has_existing_site') || ''
  const hosting_preference = watch('hosting_preference') || ''
  const needs_business_email = watch('needs_business_email') || ''

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setErrorMsg('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="font-serif text-2xl text-stone-900 mb-3">Form Received!</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Thank you for submitting your project details. We'll review everything and reach out within 1–2 business days with next steps and a project proposal.
          </p>
          <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-400">
            Coding Sprout Web Design
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white px-6 py-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-600 opacity-10 -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-3xl mx-auto relative">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Coding Sprout</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-3">Client Intake & Project Brief</h1>
          <p className="text-stone-400 text-base max-w-xl">
            Fill out this form so we can understand your vision and build you something extraordinary. Takes about 5–10 minutes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto px-4 py-10">

        {/* ── SECTION 1 ── */}
        <SectionCard num={1} title="Client & Business Information" subtitle="Basic contact and business details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Full Name *</FieldLabel>
              <input {...register('full_name')} className={inputCls} placeholder="Jane Smith" />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <FieldLabel>Business / Company Name</FieldLabel>
              <input {...register('business_name')} className={inputCls} placeholder="Smith Consulting LLC" />
            </div>
            <div>
              <FieldLabel>Email Address *</FieldLabel>
              <input {...register('email')} type="email" className={inputCls} placeholder="jane@example.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <input {...register('phone')} type="tel" className={inputCls} placeholder="(555) 000-0000" />
            </div>
            <div>
              <FieldLabel>Mailing Address</FieldLabel>
              <input {...register('address')} className={inputCls} placeholder="Street, City, State, ZIP" />
            </div>
            <div>
              <FieldLabel>Preferred Contact Method</FieldLabel>
              <select {...register('preferred_contact')} className={selectCls}>
                <option>Email</option>
                <option>Phone Call</option>
                <option>Text / SMS</option>
                <option>Video Call (Zoom/Meet)</option>
              </select>
            </div>
          </div>

          <SubSection label="Business Details">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <FieldLabel>Industry / Niche</FieldLabel>
                <input {...register('industry')} className={inputCls} placeholder="e.g. Real Estate, Salon" />
              </div>
              <div>
                <FieldLabel>Years in Business</FieldLabel>
                <input {...register('years_in_business')} className={inputCls} placeholder="e.g. 3 years" />
              </div>
              <div>
                <FieldLabel>Business Type</FieldLabel>
                <select {...register('business_type')} className={selectCls}>
                  <option>Sole Proprietor</option>
                  <option>LLC</option>
                  <option>Corporation</option>
                  <option>Non-Profit</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 mt-4">
              <div>
                <FieldLabel>Business Description</FieldLabel>
                <textarea {...register('business_description')} className={textareaCls}
                  placeholder="Describe your business, products, services, and what makes you unique..." />
              </div>
              <div>
                <FieldLabel>Target Audience / Ideal Customer</FieldLabel>
                <textarea {...register('target_audience')} className={textareaCls}
                  placeholder="Who are your customers? Age, location, interests, problems they need solved..." />
              </div>
            </div>
          </SubSection>
        </SectionCard>

        {/* ── SECTION 2 ── */}
        <SectionCard num={2} title="Website Goals & Purpose" subtitle="What do you need this website to do for you?">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-3">Primary Goal (select all that apply)</p>
          <CheckboxGrid
            options={['Showcase services/portfolio','Generate leads / inquiries','Sell products online (e-commerce)','Accept bookings / appointments','Provide information / blog','Build brand credibility','Collect email subscribers','Membership / login area','Event promotion','Online courses / digital products']}
            value={goals}
            onChange={v => setValue('goals', v)}
          />
          <div className="grid gap-4 mt-6">
            <div>
              <FieldLabel>Do you have an existing website?</FieldLabel>
              <RadioGroup
                options={['No — brand new','Yes — needs a redesign','Yes — just needs updates']}
                value={has_existing_site}
                onChange={v => setValue('has_existing_site', v)}
              />
            </div>
            <div>
              <FieldLabel>Existing Website URL (if any)</FieldLabel>
              <input {...register('existing_url')} type="url" className={inputCls} placeholder="https://www.yoursite.com" />
            </div>
            <div>
              <FieldLabel>What do you NOT like about your current or other sites?</FieldLabel>
              <textarea {...register('dislikes')} className={textareaCls}
                placeholder="Layout issues, old design, slow loading, hard to update..." />
            </div>
            <div>
              <FieldLabel>2–3 Competitor or Inspiration Websites You Like</FieldLabel>
              <textarea {...register('inspiration_sites')} className={textareaCls}
                placeholder="e.g. apple.com — I love how clean it is. squarespace.com — great photography use..." />
            </div>
          </div>
        </SectionCard>

        {/* ── SECTION 3 ── */}
        <SectionCard num={3} title="Design Preferences & Branding">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-3">Brand Vibe / Aesthetic (select all that apply)</p>
          <CheckboxGrid
            options={['Clean & Minimal','Bold & Modern','Warm & Friendly','Luxury / High-End','Playful / Fun','Corporate / Professional','Rustic / Earthy','Edgy / Creative','Tech / Futuristic','Feminine / Elegant']}
            value={brand_vibes}
            onChange={v => setValue('brand_vibes', v)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <FieldLabel>Brand Colors</FieldLabel>
              <input {...register('brand_colors')} className={inputCls} placeholder="e.g. Navy (#003366), Gold (#D4AF37)" />
            </div>
            <div>
              <FieldLabel>Do you have a logo?</FieldLabel>
              <select {...register('has_logo')} className={selectCls}>
                <option>Yes — I will provide files</option>
                <option>No — I need a logo designed (add-on cost)</option>
                <option>Not sure — let's discuss</option>
              </select>
            </div>
            <div>
              <FieldLabel>Preferred Font Style</FieldLabel>
              <select {...register('font_style')} className={selectCls}>
                <option>No preference — designer's choice</option>
                <option>Classic / Serif</option>
                <option>Modern / Sans-Serif</option>
                <option>Script / Handwritten</option>
                <option>Mixed</option>
              </select>
            </div>
            <div>
              <FieldLabel>Brand Guidelines / Style Guide?</FieldLabel>
              <select {...register('has_brand_guidelines')} className={selectCls}>
                <option>No</option>
                <option>Yes — I will share it</option>
                <option>In progress</option>
              </select>
            </div>
          </div>

          <SubSection label="Content & Media">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Will you provide written content?</FieldLabel>
                <select {...register('content_provider')} className={selectCls}>
                  <option>Yes — I will write all content</option>
                  <option>Partially — I'll provide info, you help write</option>
                  <option>No — I need copywriting (add-on cost)</option>
                </select>
              </div>
              <div>
                <FieldLabel>Will you provide photos/images?</FieldLabel>
                <select {...register('photo_provider')} className={selectCls}>
                  <option>Yes — professional photos available</option>
                  <option>Yes — phone/personal photos only</option>
                  <option>No — please use stock images</option>
                  <option>Mix of provided + stock</option>
                </select>
              </div>
              <div>
                <FieldLabel>Video Integration?</FieldLabel>
                <select {...register('video_integration')} className={selectCls}>
                  <option>No</option>
                  <option>Yes — embed YouTube / Vimeo</option>
                  <option>Yes — host video directly on site</option>
                </select>
              </div>
              <div>
                <FieldLabel>Languages Needed</FieldLabel>
                <input {...register('languages')} className={inputCls} placeholder="e.g. English only / English + Spanish" />
              </div>
            </div>
          </SubSection>
        </SectionCard>

        {/* ── SECTION 4 ── */}
        <SectionCard num={4} title="Pages & Site Features">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-3">Standard Pages (select all that apply)</p>
          <CheckboxGrid
            options={['Home Page','About / Our Story','Services / Offerings','Portfolio / Gallery','Blog / News','FAQ','Testimonials / Reviews','Team / Staff Page','Contact Page','Privacy Policy','Terms & Conditions','Shop / Store','Events / Calendar','Booking / Scheduling','Login / Member Area','Custom Landing Page']}
            value={pages_needed}
            onChange={v => setValue('pages_needed', v)}
          />

          <SubSection label="Advanced Features">
            <CheckboxGrid
              options={['Online Store (e-commerce)','Payment processing','Appointment booking','Email newsletter signup','Contact / inquiry form','Live chat integration','Social media feeds','Google Maps / location','Search function','Customer reviews/ratings','Password-protected pages','Pop-ups / lead magnets','Analytics / tracking','SEO optimization','Blog with comments','Photo/video gallery','Countdown timer','Multi-language support']}
              value={features_needed}
              onChange={v => setValue('features_needed', v)}
            />
          </SubSection>

          <SubSection label="E-Commerce / Payment Details (if applicable)">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Approx. Number of Products</FieldLabel>
                <select {...register('num_products')} className={selectCls}>
                  <option>N/A</option>
                  <option>1–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>200+</option>
                </select>
              </div>
              <div>
                <FieldLabel>Product Type</FieldLabel>
                <select {...register('product_type')} className={selectCls}>
                  <option>N/A</option>
                  <option>Physical products (shipping)</option>
                  <option>Digital downloads</option>
                  <option>Services / sessions</option>
                  <option>Subscriptions / memberships</option>
                  <option>Mix of the above</option>
                </select>
              </div>
              <div>
                <FieldLabel>Preferred Payment Processor</FieldLabel>
                <select {...register('payment_processor')} className={selectCls}>
                  <option>No preference</option>
                  <option>Stripe</option>
                  <option>PayPal</option>
                  <option>Square</option>
                  <option>Shopify Payments</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <FieldLabel>Sales Tax / Shipping Configuration?</FieldLabel>
                <select {...register('needs_tax_shipping')} className={selectCls}>
                  <option>N/A</option>
                  <option>Yes — sales tax needed</option>
                  <option>Yes — shipping rates needed</option>
                  <option>Both</option>
                  <option>No — digital only</option>
                </select>
              </div>
            </div>
          </SubSection>
        </SectionCard>

        {/* ── SECTION 5 ── */}
        <SectionCard num={5} title="Domain, Hosting & Technical Setup">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Desired Domain Name</FieldLabel>
              <input {...register('desired_domain')} className={inputCls} placeholder="e.g. mybusiness.com" />
            </div>
            <div>
              <FieldLabel>Do you already own a domain?</FieldLabel>
              <select {...register('owns_domain')} className={selectCls}>
                <option>No — need to purchase one</option>
                <option>Yes — I own it</option>
                <option>Yes — registered through GoDaddy</option>
                <option>Yes — registered through Namecheap</option>
                <option>Yes — other registrar</option>
              </select>
            </div>
            <div>
              <FieldLabel>Do you have existing hosting?</FieldLabel>
              <select {...register('has_hosting')} className={selectCls}>
                <option>No — need hosting</option>
                <option>Yes — I'll provide login details</option>
                <option>Not sure</option>
              </select>
            </div>
            <div>
              <FieldLabel>Preferred Platform / CMS</FieldLabel>
              <select {...register('preferred_platform')} className={selectCls}>
                <option>No preference — recommend one for me</option>
                <option>WordPress</option>
                <option>Shopify</option>
                <option>Wix</option>
                <option>Squarespace</option>
                <option>Webflow</option>
                <option>Custom / HTML-CSS-JS</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <SubSection label="Hosting & Maintenance Preference">
            <RadioGroup
              options={['🛠 You host & maintain — I just need the site built','🤝 Designer manages hosting & maintenance (monthly plan)','🔄 Not sure — let\'s discuss options']}
              value={hosting_preference}
              onChange={v => setValue('hosting_preference', v)}
            />
            <div className="mt-4">
              <FieldLabel>Need a Business Email? (e.g. info@yourbusiness.com)</FieldLabel>
              <RadioGroup
                options={['Yes','No — I already have one','Not sure']}
                value={needs_business_email}
                onChange={v => setValue('needs_business_email', v)}
              />
            </div>
          </SubSection>

          <SubSection label="Third-Party Integrations Needed">
            <CheckboxGrid
              options={['Google Analytics','Google Search Console','Facebook Pixel','Mailchimp / email marketing','CRM (HubSpot, Salesforce, etc.)','Calendly / booking software','Quickbooks / accounting','Instagram feed embed','WhatsApp / SMS chat','Yelp / Google Reviews embed']}
              value={integrations}
              onChange={v => setValue('integrations', v)}
            />
          </SubSection>
        </SectionCard>

        {/* ── SECTION 6 ── */}
        <SectionCard num={6} title="Timeline & Budget">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Ideal Launch Date</FieldLabel>
              <input {...register('ideal_launch_date')} type="date" className={inputCls} />
            </div>
            <div>
              <FieldLabel>Is this deadline flexible?</FieldLabel>
              <select {...register('deadline_flexible')} className={selectCls}>
                <option>Yes — flexible</option>
                <option>No — hard deadline</option>
              </select>
            </div>
            <div>
              <FieldLabel>Budget Range for Website Build</FieldLabel>
              <select {...register('build_budget')} className={selectCls}>
                <option>Under $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000 – $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000 – $10,000</option>
                <option>$10,000+</option>
                <option>Flexible — let's discuss</option>
              </select>
            </div>
            <div>
              <FieldLabel>Monthly Budget for Maintenance (if needed)</FieldLabel>
              <select {...register('monthly_budget')} className={selectCls}>
                <option>N/A — I'll self-host</option>
                <option>Under $50/mo</option>
                <option>$50 – $100/mo</option>
                <option>$100 – $200/mo</option>
                <option>$200+/mo</option>
                <option>Let's discuss</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <FieldLabel>Important Dates, Events, or Deadlines to Note</FieldLabel>
            <textarea {...register('important_dates')} className={textareaCls}
              placeholder="Product launch, grand opening, marketing campaign start, conference..." />
          </div>
        </SectionCard>

        {/* ── SECTION 7 ── */}
        <SectionCard num={7} title="Access & Credentials Needed" subtitle="Only check what applies — share actual credentials via a secure method">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 mb-4">
            ⚠️ Do NOT enter passwords here. We'll request secure credential sharing separately.
          </div>
          <CheckboxGrid
            options={['Domain registrar login','Hosting control panel (cPanel)','FTP / SFTP credentials','Existing website admin login','Google Analytics account','Google Search Console','Social media accounts','Email marketing account','Payment processor account','Stock image account']}
            value={access_needed}
            onChange={v => setValue('access_needed', v)}
          />
          <div className="mt-4">
            <FieldLabel>Notes on Access / Permissions</FieldLabel>
            <textarea {...register('access_notes')} className={textareaCls}
              placeholder="Any notes about existing accounts or things to watch out for..." />
          </div>
        </SectionCard>

        {/* ── SECTION 8 ── */}
        <SectionCard num={8} title="Ongoing Needs & Add-On Services">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-3">Ongoing Services Interested In</p>
          <CheckboxGrid
            options={['Monthly maintenance plan','Content updates (text/images)','SEO management','Blog writing / content creation','Social media graphics','Email marketing campaigns','Performance reports','Security monitoring','Backup management','Training on how to edit site']}
            value={ongoing_services}
            onChange={v => setValue('ongoing_services', v)}
          />
          <div className="mt-4">
            <FieldLabel>Additional Questions, Notes, or Anything Else We Should Know</FieldLabel>
            <textarea {...register('additional_notes')} className={textareaCls} style={{ minHeight: '120px' }}
              placeholder="Feel free to share anything that will help us create the best website for you..." />
          </div>
        </SectionCard>

        {/* Submit */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700 mb-4">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange-600 text-white font-semibold text-base rounded-2xl py-4 px-8 hover:bg-orange-700 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
        >
          {submitting ? 'Submitting your brief...' : 'Submit Project Brief →'}
        </button>
        <p className="text-center text-xs text-stone-400 mt-3">
          We'll review and reach out within 1–2 business days with next steps.
        </p>

      </form>
    </div>
  )
}
