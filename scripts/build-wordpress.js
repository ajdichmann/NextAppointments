const fs = require('fs');
const path = require('path');

// Read the built HTML file
const htmlPath = path.join(__dirname, '../out/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract the necessary parts
const appContent = html.match(/<div id="appointment-scheduler-root">([\s\S]*?)<\/div>/)[1];
const styles = html.match(/<style>([\s\S]*?)<\/style>/)[1];

// Create the WordPress embed code
const embedCode = `
<!-- Appointment Scheduler -->
<div id="appointment-scheduler-root">
  ${appContent}
</div>
<style>
  ${styles}
</style>
<script>
  // Initialize the appointment scheduler
  window.addEventListener('load', function() {
    // Add any initialization code here
  });
</script>
`;

// Write the embed code to a file
fs.writeFileSync(
  path.join(__dirname, '../wordpress-embed.html'),
  embedCode,
  'utf8'
);

console.log('WordPress embed code generated successfully!'); 