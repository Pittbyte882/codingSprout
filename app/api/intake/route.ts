import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role key (server-side only!)
)

const resend = new Resend(process.env.RESEND_API_KEY!)

// ✏️ Change this to your email address
const YOUR_EMAIL = 'codingsproutllc@gmail.com'
const FROM_EMAIL = 'intake@codingsprout.com' // must be a verified Resend domain

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // --- 1. Save to Supabase ---
    const { data, error } = await supabase
      .from('client_intake_submissions')
      .insert([
        {
          full_name: body.full_name,
          business_name: body.business_name,
          email: body.email,
          phone: body.phone,
          address: body.address,
          preferred_contact: body.preferred_contact,
          industry: body.industry,
          years_in_business: body.years_in_business,
          business_type: body.business_type,
          business_description: body.business_description,
          target_audience: body.target_audience,

          goals: body.goals,
          has_existing_site: body.has_existing_site,
          existing_url: body.existing_url,
          dislikes: body.dislikes,
          inspiration_sites: body.inspiration_sites,

          brand_vibes: body.brand_vibes,
          brand_colors: body.brand_colors,
          has_logo: body.has_logo,
          font_style: body.font_style,
          has_brand_guidelines: body.has_brand_guidelines,
          content_provider: body.content_provider,
          photo_provider: body.photo_provider,
          video_integration: body.video_integration,
          languages: body.languages,

          pages_needed: body.pages_needed,
          features_needed: body.features_needed,
          num_products: body.num_products,
          product_type: body.product_type,
          payment_processor: body.payment_processor,
          needs_tax_shipping: body.needs_tax_shipping,

          desired_domain: body.desired_domain,
          owns_domain: body.owns_domain,
          has_hosting: body.has_hosting,
          preferred_platform: body.preferred_platform,
          hosting_preference: body.hosting_preference,
          needs_business_email: body.needs_business_email,
          integrations: body.integrations,

          ideal_launch_date: body.ideal_launch_date || null,
          deadline_flexible: body.deadline_flexible,
          build_budget: body.build_budget,
          monthly_budget: body.monthly_budget,
          important_dates: body.important_dates,

          access_needed: body.access_needed,
          access_notes: body.access_notes,

          ongoing_services: body.ongoing_services,
          additional_notes: body.additional_notes,
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
     const formatList = (arr: string[]) =>
      arr && arr.length > 0 ? arr.join(', ') : 'None selected'

    await resend.emails.send({
      from: FROM_EMAIL,
      to: YOUR_EMAIL,
      replyTo: body.email,
      subject: `🆕 New Client Intake: ${body.business_name || body.full_name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0f0e0c; color: white; padding: 32px; border-radius: 12px 12px 0 0;">
            <p style="color: #c8502a; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 8px;">Coding Sprout</p>
            <h1 style="margin: 0; font-size: 24px;">New Client Intake Submission</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0;">Received: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div style="background: #f7f4ef; padding: 24px; border: 1px solid #d4cfc8; border-top: none;">

            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Client Information</th></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600; width:40%">Name</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.full_name || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Business</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.business_name || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Email</td><td style="padding:10px 16px; border-bottom:1px solid #eee"><a href="mailto:${body.email}">${body.email || '—'}</a></td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Phone</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.phone || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Industry</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.industry || '—'}</td></tr>
              <tr><td style="padding:10px 16px; font-weight:600">Preferred Contact</td><td style="padding:10px 16px">${body.preferred_contact || '—'}</td></tr>
            </table>

            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Business Details</th></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600; width:40%">Description</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.business_description || '—'}</td></tr>
              <tr><td style="padding:10px 16px; font-weight:600">Target Audience</td><td style="padding:10px 16px">${body.target_audience || '—'}</td></tr>
            </table>

            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Website Goals & Features</th></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600; width:40%">Goals</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${formatList(body.goals)}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Pages Needed</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${formatList(body.pages_needed)}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Features Needed</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${formatList(body.features_needed)}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Existing Site</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.has_existing_site || '—'} ${body.existing_url ? `— <a href="${body.existing_url}">${body.existing_url}</a>` : ''}</td></tr>
              <tr><td style="padding:10px 16px; font-weight:600">Inspiration Sites</td><td style="padding:10px 16px">${body.inspiration_sites || '—'}</td></tr>
            </table>

            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Design & Branding</th></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600; width:40%">Brand Vibes</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${formatList(body.brand_vibes)}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Brand Colors</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.brand_colors || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Has Logo</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.has_logo || '—'}</td></tr>
              <tr><td style="padding:10px 16px; font-weight:600">Font Style</td><td style="padding:10px 16px">${body.font_style || '—'}</td></tr>
            </table>

            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Technical & Hosting</th></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600; width:40%">Desired Domain</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.desired_domain || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Owns Domain</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.owns_domain || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Platform Preference</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.preferred_platform || '—'}</td></tr>
              <tr><td style="padding:10px 16px; font-weight:600">Hosting Preference</td><td style="padding:10px 16px">${body.hosting_preference || '—'}</td></tr>
            </table>

            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Timeline & Budget</th></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600; width:40%">Launch Date</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.ideal_launch_date || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Flexible?</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.deadline_flexible || '—'}</td></tr>
              <tr><td style="padding:10px 16px; border-bottom:1px solid #eee; font-weight:600">Build Budget</td><td style="padding:10px 16px; border-bottom:1px solid #eee">${body.build_budget || '—'}</td></tr>
              <tr><td style="padding:10px 16px; font-weight:600">Monthly Budget</td><td style="padding:10px 16px">${body.monthly_budget || '—'}</td></tr>
            </table>

            ${body.additional_notes ? `
            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
              <tr style="background: #c8502a;"><th colspan="2" style="color:white; padding: 12px 16px; text-align:left; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Additional Notes</th></tr>
              <tr><td style="padding:14px 16px">${body.additional_notes}</td></tr>
            </table>` : ''}

            <div style="background: #0f0e0c; border-radius: 8px; padding: 16px 20px; color: rgba(255,255,255,0.7); font-size: 13px;">
              View all submissions in your <a href="https://supabase.com" style="color:#c8502a">Supabase dashboard</a> → Table Editor → client_intake_submissions
            </div>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true, id: data?.[0]?.id })

  } catch (err) {
    console.error('Intake API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}