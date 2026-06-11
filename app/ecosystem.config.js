module.exports = {
  apps: [
    {
      name: "hair-salon-frontend",
      script: "index.js",
      cwd: "/var/www/hair_salon/app", 
      watch: false
    },
    {
      name: "hair-salon-api",
      script: "api.js",
      cwd: "/var/www/hair_salon/app", 
      watch: false
    }
  ]
};