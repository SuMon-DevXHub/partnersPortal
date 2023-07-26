module.exports = {
  apps: [
    {
      name: "SharpArchivePartner",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      port: "4000",
      autorestart: true,
    },
  ],
};
