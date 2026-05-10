const fs = require('fs');

async function downloadFile() {
  try {
    const response = await fetch("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNmNDhhZDBhYTQ3MjQ0NmFiYWQyOTU0OTc1OWE2NWExEgsSBxD1mPjwmhEYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTc2NjAxODQyMDc2MDAxNjA3&filename=&opi=89354086");
    const text = await response.text();
    fs.writeFileSync('stitch_original.html', text);
    console.log("Downloaded successfully.");
  } catch (err) {
    console.error(err);
  }
}

downloadFile();
