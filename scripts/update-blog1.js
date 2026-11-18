import pool from '../lib/db.js';

async function updateBlog() {
  const newContent = [
    "In the contract embroidery industry, margins are tight and production schedules are relentless. Earlier this year, a commercial embroidery shop owner who had partnered with New Leaf Skills five years ago reconnected with our studio. Like many business owners navigating rising overhead costs, he had ventured out to test AI-driven auto-trace digitizing software and ultra-cheap freelance mills.",
    "At first glance, $4 flat-rate files seemed attractive on a spreadsheet. However, reality set in on the production floor. His 8-head Barudan machines were stalling repeatedly with birdnesting, thread snaps every 2,500 stitches, and distorted circle outlines on pique polos.",
    "### The Cost of Cheap Digitizing vs Precision Punching",
    "When you factor in operator downtime, ruined $35 premium Nike garments, and delayed shipments to angry corporate clients, the 'cheap' digitizing had cost him thousands of dollars.",
    "### Returning to New Leaf Skills for Precision & Reliability",
    "Upon returning to New Leaf Skills, our senior digitizers analyzed his troublesome artwork, re-engineered the underlay scaffolding, applied manual push-pull offsets specifically for 220 GSM polyester blends, and returned production-ready files within 4 hours. You can explore our [Embroidery Digitizing Services](https://newleafskills.com/embroidery-digitizing-services/) or check out our [Apparel Logo Digitizing](https://newleafskills.com/apparel-logo-digitizing-service/) to see how custom density calibration saves thousands in production costs. His machines ran at a clean 950 SPM with zero breaks throughout the entire 1,200 piece run."
  ];

  await pool.query('UPDATE blogs SET content = ? WHERE id = 1', [JSON.stringify(newContent)]);
  console.log('Successfully updated blog 1 content');
  process.exit(0);
}

updateBlog().catch(err => {
  console.error(err);
  process.exit(1);
});
