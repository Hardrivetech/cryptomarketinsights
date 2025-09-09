/**
 * Eleventy configuration
 */
export default function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // Watch CSS for live reload
  eleventyConfig.addWatchTarget("public/css");

  // Nunjucks filters
  eleventyConfig.addFilter("round", function (value, digits = 2) {
    const n = Number(value);
    if (Number.isNaN(n)) return value;
    const factor = Math.pow(10, digits);
    return Math.round(n * factor) / factor;
  });

  eleventyConfig.addFilter("toLocaleString", function (value) {
    const n = Number(value);
    if (Number.isNaN(n)) return value;
    return n.toLocaleString();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
