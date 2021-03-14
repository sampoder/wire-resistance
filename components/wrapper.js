

const React = require("react");

function round2(data) {
    return Math.round(data * 1000) / 1000;
  }

let data = {"This Experiment's": 0.000001663280815, "Nichrome Alloy": 0.0000016, "Lead": 0.00000022, "Iron": 0.000000097, "Tungsten": 0.000000097, "Aluminium": 0.000000027, "Gold": 0.000000022, "Copper": 0.000000017, "Silver": 0.000000016}

export default (props) => (
    <div className="wrapper-labels">
    {props.children}
    </div>
)