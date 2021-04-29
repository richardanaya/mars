module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: "/",
  },
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
