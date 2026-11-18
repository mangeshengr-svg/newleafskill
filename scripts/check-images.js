const https = require('https');
https.get('https://newleafskills.com/why-a-long-time-client-came-back-to-new-leaf-skills-after-years/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const m = d.match(/https:\/\/[^"'\s<>]+\.(jpg|jpeg|png|webp)/gi);
    console.log(Array.from(new Set(m)).slice(0, 10));
  });
});

