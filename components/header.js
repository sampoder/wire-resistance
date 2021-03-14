const React = require("react");

export default () => (
  <div
    class="article-header"
    style={{ color: "#ffffff" }}
  >
    <div style={{ maxWidth: "800px", textAlign: "center", margin: "auto" }}>
      <h2 class="dek" style={{ fontWeight: "600", marginBlockEnd: "0.2em" }}>
        Investigating the
      </h2>
      <h1 class="hed" style={{ fontWeight: "800", marginBlockEnd: "0.2em" }}>
        Resistance of <span className="glow">Wire</span>
      </h1>
      <div class="byline" style={{ fontWeight: "400", display: 'none' }}>
        An interactive exploration by Sam Poder (G10.3)
      </div>
    </div>
  </div>
);
