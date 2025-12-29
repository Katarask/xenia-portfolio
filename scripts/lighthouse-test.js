#!/usr/bin/env node
/**
 * Lighthouse Local Test - Full Performance Analysis
 * Run: node scripts/lighthouse-test.js [url]
 * 
 * Runs Lighthouse locally (no API limits, full data)
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';

const URL = process.argv[2] || 'https://xenia-portfolio-ten.vercel.app/';
const STRATEGY = process.argv[3] || 'mobile'; // mobile or desktop

async function runLighthouse() {
  console.log(`\n🔍 Running Lighthouse test for: ${URL}`);
  console.log(`📱 Strategy: ${STRATEGY}\n`);

  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
  });

  try {
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
      strategy: STRATEGY,
    };

    console.log('⏳ Running Lighthouse audit...\n');
    const runnerResult = await lighthouse(URL, options);

    // Extract results
    const lhr = runnerResult.lhr;
    const categories = lhr.categories;
    const audits = lhr.audits;

    // Display scores
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 LIGHTHOUSE SCORES');
    console.log('═══════════════════════════════════════════════════════\n');

    Object.keys(categories).forEach(key => {
      const category = categories[key];
      const score = Math.round(category.score * 100);
      const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
      console.log(`${emoji} ${category.title}: ${score}/100`);
    });

    // Core Web Vitals
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('⚡ CORE WEB VITALS & PERFORMANCE METRICS');
    console.log('═══════════════════════════════════════════════════════\n');

    const metrics = {
      'LCP': audits['largest-contentful-paint'],
      'FCP': audits['first-contentful-paint'],
      'CLS': audits['cumulative-layout-shift'],
      'FID': audits['max-potential-fid'] || audits['first-input-delay'],
      'TTI': audits['interactive'],
      'TBT': audits['total-blocking-time'],
      'Speed Index': audits['speed-index'],
      'TBT': audits['total-blocking-time'],
    };

    Object.keys(metrics).forEach(name => {
      const audit = metrics[name];
      if (audit && audit.numericValue !== undefined) {
        const value = audit.numericValue;
        const score = audit.score !== null ? audit.score : 1;
        const rating = score >= 0.75 ? '🟢 Good' : score >= 0.5 ? '🟡 Needs Improvement' : '🔴 Poor';
        
        let displayValue;
        if (name === 'CLS') {
          displayValue = value.toFixed(3);
        } else if (name === 'FID' || name === 'TBT') {
          displayValue = `${(value / 1000).toFixed(0)}ms`;
        } else {
          displayValue = `${(value / 1000).toFixed(2)}s`;
        }
        
        console.log(`${name}: ${displayValue} ${rating}`);
      }
    });

    // Opportunities (Top 10)
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('💡 TOP OPTIMIZATION OPPORTUNITIES');
    console.log('═══════════════════════════════════════════════════════\n');

    const opportunities = Object.values(audits)
      .filter(audit => 
        audit.details && 
        audit.details.type === 'opportunity' && 
        audit.numericValue && 
        audit.score !== null &&
        audit.score < 0.9
      )
      .sort((a, b) => b.numericValue - a.numericValue)
      .slice(0, 10);

    if (opportunities.length === 0) {
      console.log('✅ No major opportunities found!\n');
    } else {
      opportunities.forEach((opp, index) => {
        const savings = opp.numericValue > 1000 
          ? `${(opp.numericValue / 1000).toFixed(2)}s` 
          : `${opp.numericValue.toFixed(0)}ms`;
        const score = Math.round(opp.score * 100);
        console.log(`${index + 1}. ${opp.title}`);
        console.log(`   Potential savings: ${savings} (Current score: ${score}/100)`);
        if (opp.description) {
          const desc = opp.description.replace(/\s+/g, ' ').substring(0, 120);
          console.log(`   ${desc}...`);
        }
        console.log('');
      });
    }

    // Diagnostics (Top 10)
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔍 TOP DIAGNOSTICS');
    console.log('═══════════════════════════════════════════════════════\n');

    const diagnostics = Object.values(audits)
      .filter(audit => 
        audit.details && 
        audit.details.type === 'diagnostic' && 
        audit.score !== null && 
        audit.score < 0.9
      )
      .sort((a, b) => a.score - b.score)
      .slice(0, 10);

    if (diagnostics.length === 0) {
      console.log('✅ No major diagnostics issues!\n');
    } else {
      diagnostics.forEach((diag, index) => {
        const score = Math.round(diag.score * 100);
        const emoji = score >= 75 ? '🟡' : '🔴';
        console.log(`${emoji} ${index + 1}. ${diag.title} (Score: ${score}/100)`);
        if (diag.description) {
          const desc = diag.description.replace(/\s+/g, ' ').substring(0, 120);
          console.log(`   ${desc}...`);
        }
        console.log('');
      });
    }

    // Save full report
    if (process.argv.includes('--save')) {
      const reportPath = `lighthouse-report-${STRATEGY}-${Date.now()}.json`;
      fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));
      console.log(`\n💾 Full report saved to: ${reportPath}`);
    }

    // Generate HTML report
    if (process.argv.includes('--html')) {
      const htmlReport = runnerResult.report;
      const htmlPath = `lighthouse-report-${STRATEGY}-${Date.now()}.html`;
      fs.writeFileSync(htmlPath, htmlReport);
      console.log(`📄 HTML report saved to: ${htmlPath}`);
    }

    return lhr;

  } finally {
    await chrome.kill();
  }
}

// Run tests
async function runTests() {
  try {
    // Mobile test
    await runLighthouse();
    
    // Ask if user wants desktop test too
    if (!process.argv.includes('--mobile-only')) {
      console.log('\n\n');
      // Change strategy for desktop
      process.argv[3] = 'desktop';
      await runLighthouse();
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runTests();

