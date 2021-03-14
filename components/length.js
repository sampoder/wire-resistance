const React = require("react");

function round2(data) {
    return Math.round(data * 1000) / 1000;
  }

let data = {"This Experiment's": 0.000001663280815, "Nichrome Alloy": 0.0000016, "Lead": 0.00000022, "Iron": 0.000000097, "Tungsten": 0.000000097, "Aluminium": 0.000000027, "Gold": 0.000000022, "Copper": 0.000000017, "Silver": 0.000000016}

export default ({value, label}) => (
    <div>
    <div style={{display: 'flex'}}>
        <div style={{ width: '45%', textAlign: 'center', backgroundColor: '#D8FFBF', borderRadius: '12px', marginRight: '24px'}}><h1>{value}cm</h1></div>
        <div style={{ width: '45%', textAlign: 'center', backgroundColor: '#FEDBDB', borderRadius: '12px', marginLeft: '24px'}}><h1>{round2(((value/100) * data[label]) / 0.0000002454220035)}Ω</h1></div>
    </div>
    </div>
)