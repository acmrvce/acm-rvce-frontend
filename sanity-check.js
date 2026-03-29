const { createClient } = require('next-sanity');

const client = createClient({
  projectId: "o2t9z4s3", // Assuming we grab this from config
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false
});

(async () => {
    // wait I don't know the projectId. Instead I'll just write a script that imports from the project
})();
