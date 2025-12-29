#!/usr/bin/env node
/**
 * PageSpeed Insights API Test
 * Run: node scripts/pagespeed-test.js
 * 
 * Optional: Set GOOGLE_API_KEY environment variable for higher quota
 */

const API_KEY = process.env.GOOGLE_API_KEY || '';
const URL = process.argv[2] || 'https://xenia-portfolio-ten.vercel.app/';

// Use public PageSpeed Insights API (no key required, but has rate limits)
// Alternative: Use pagespeed.web.dev API endpoint
const getApiUrl = (strategy) => {
  if (API_KEY) {
    return `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(URL)}&key=${API_KEY}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=${strategy}`;
  } else {
    // Public API endpoint (alternative method)
    return `https://pagespeed.web.dev/api/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(URL)}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=${strategy}`;
  }
};

async function testPageSpeed(strategy = 'MOBILE') {
  const apiUrl = getApiUrl(strategy);

  console.log(`\n🔍 Testing ${URL} (${strategy})...`);
  if (!API_KEY) {
    console.log('⚠️  Using public API (rate limits apply). Set GOOGLE_API_KEY for higher quota.\n');
  } else {
    console.log('✅ Using API key\n');
  }
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText}\n${errorText}`);
    }
    
    const data = await response.json();
    
    // Extract key metrics
    const lighthouse = data.lighthouseResult;
    const categories = lighthouse.categories;
    const audits = lighthouse.audits;
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 LIGHTHOUSE SCORES');
    console.log('═══════════════════════════════════════════════════════\n');
    
    // Category Scores
    Object.keys(categories).forEach(key => {
      const category = categories[key];
      const score = Math.round(category.score * 100);
      const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
      console.log(`${emoji} ${category.title}: ${score}/100`);
    });
    
    // Core Web Vitals
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('⚡ CORE WEB VITALS');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const lcp = audits['largest-contentful-paint'];
    const fid = audits['max-potential-fid'] || audits['first-input-delay'];
    const cls = audits['cumulative-layout-shift'];
    const fcp = audits['first-contentful-paint'];
    const tti = audits['interactive'];
    const tbt = audits['total-blocking-time'];
    const speedIndex = audits['speed-index'];
    
    if (lcp) {
      const value = lcp.numericValue;
      const score = lcp.score;
      const rating = score >= 0.75 ? '🟢 Good' : score >= 0.5 ? '🟡 Needs Improvement' : '🔴 Poor';
      console.log(`LCP (Largest Contentful Paint): ${(value / 1000).toFixed(2)}s ${rating}`);
    }
    
    if (fcp) {
      const value = fcp.numericValue;
      const score = fcp.score;
      const rating = score >= 0.75 ? '🟢 Good' : score >= 0.5 ? '🟡 Needs Improvement' : '🔴 Poor';
      console.log(`FCP (First Contentful Paint): ${(value / 1000).toFixed(2)}s ${rating}`);
    }
    
    if (cls) {
      const value = cls.numericValue;
      const score = cls.score;
      const rating = score >= 0.75 ? '🟢 Good' : score >= 0.5 ? '🟡 Needs Improvement' : '🔴 Poor';
      console.log(`CLS (Cumulative Layout Shift): ${value.toFixed(3)} ${rating}`);
    }
    
    if (fid) {
      const value = fid.numericValue;
      const score = fid.score;
      const rating = score >= 0.75 ? '🟢 Good' : score >= 0.5 ? '🟡 Needs Improvement' : '🔴 Poor';
      console.log(`FID (First Input Delay): ${(value / 1000).toFixed(2)}ms ${rating}`);
    }
    
    if (tti) {
      const value = tti.numericValue;
      console.log(`TTI (Time to Interactive): ${(value / 1000).toFixed(2)}s`);
    }
    
    if (tbt) {
      const value = tbt.numericValue;
      console.log(`TBT (Total Blocking Time): ${(value / 1000).toFixed(2)}ms`);
    }
    
    if (speedIndex) {
      const value = speedIndex.numericValue;
      console.log(`Speed Index: ${(value / 1000).toFixed(2)}s`);
    }
    
    // Opportunities (Top 5)
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('💡 TOP OPTIMIZATION OPPORTUNITIES');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const opportunities = Object.values(audits)
      .filter(audit => audit.details && audit.details.type === 'opportunity' && audit.numericValue)
      .sort((a, b) => b.numericValue - a.numericValue)
      .slice(0, 5);
    
    opportunities.forEach((opp, index) => {
      const savings = (opp.numericValue / 1000).toFixed(2);
      console.log(`${index + 1}. ${opp.title}`);
      console.log(`   Potential savings: ${savings}s`);
      if (opp.description) {
        console.log(`   ${opp.description.substring(0, 100)}...`);
      }
      console.log('');
    });
    
    // Diagnostics (Top 5)
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔍 TOP DIAGNOSTICS');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const diagnostics = Object.values(audits)
      .filter(audit => audit.details && audit.details.type === 'diagnostic' && audit.score !== null && audit.score < 0.9)
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);
    
    diagnostics.forEach((diag, index) => {
      const score = Math.round(diag.score * 100);
      console.log(`${index + 1}. ${diag.title} (Score: ${score}/100)`);
      if (diag.description) {
        console.log(`   ${diag.description.substring(0, 100)}...`);
      }
      console.log('');
    });
    
    // Full JSON output option
    if (process.argv.includes('--json')) {
      console.log('\n═══════════════════════════════════════════════════════');
      console.log('📄 FULL JSON OUTPUT');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log(JSON.stringify(data, null, 2));
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('429')) {
      console.error('\n⚠️  Rate limit exceeded. Please wait a few minutes or use an API key.');
    }
    process.exit(1);
  }
}

// Run tests for both mobile and desktop
async function runTests() {
  try {
    // Mobile test
    await testPageSpeed('MOBILE');
    
    // Desktop test
    console.log('\n\n');
    await testPageSpeed('DESKTOP');
    
  } catch (error) {
    console.error('Failed to run tests:', error);
    process.exit(1);
  }
}

runTests();

