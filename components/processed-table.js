import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import Chart from "react-google-charts";
import React from "react";
const Data = {
  first: [
    {
      length: 10,
      voltage: 1.5,
      current: 2.49,
    },
    {
      length: 20,
      voltage: 1.65,
      current: 1.0,
    },
    {
      length: 30,
      voltage: 1.8,
      current: 0.85,
    },
    {
      length: 40,
      voltage: 1.9,
      current: 0.8,
    },
    {
      length: 50,
      voltage: 1.95,
      current: 0.65,
    },
    {
      length: 60,
      voltage: 2,
      current: 0.55,
    },
    {
      length: 70,
      voltage: 2.1,
      current: 0.55,
    },
    {
      length: 80,
      voltage: 2.2,
      current: 0.40,
    },
    {
      length: 90,
      voltage: 2.2,
      current: 0.38,
    },
    {
      length: 100,
      voltage: 2.3,
      current: 0.36,
    },
  ],
  second: [
    {
      length: 10,
      voltage: 1.5,
      current: 2,
    },
    {
      length: 20,
      voltage: 1.6,
      current: 0.9,
    },
    {
      length: 30,
      voltage: 1.75,
      current: 0.86,
    },
    {
      length: 40,
      voltage: 1.8,
      current: 0.7,
    },
    {
      length: 50,
      voltage: 1.95,
      current: 0.62,
    },
    {
      length: 60,
      voltage: 2.05,
      current: 0.59,
    },
    {
      length: 70,
      voltage: 2.1,
      current: 0.5,
    },
    {
      length: 80,
      voltage: 2.1,
      current: 0.34,
    },
    {
      length: 90,
      voltage: 2.2,
      current: 0.36,
    },
    {
      length: 100,
      voltage: 2.28,
      current: 0.34,
    },
  ],
  third: [
    {
      length: 10,
      voltage: 1.4,
      current: 2,
    },
    {
      length: 20,
      voltage: 1.75,
      current: 0.91,
    },
    {
      length: 30,
      voltage: 1.79,
      current: 0.86,
    },
    {
      length: 40,
      voltage: 1.87,
      current: 0.73,
    },
    {
      length: 50,
      voltage: 1.95,
      current: 0.65,
    },
    {
      length: 60,
      voltage: 2.08,
      current: 0.6,
    },
    {
      length: 70,
      voltage: 2.1,
      current: 0.5,
    },
    {
      length: 80,
      voltage: 2.3,
      current: 0.37,
    },
    {
      length: 90,
      voltage: 2.32,
      current: 0.33,
    },
    {
      length: 100,
      voltage: 2.34,
      current: 0.32,
    },
  ],
};

function round2(data) {
  return Math.round(data * 100) / 100;
}

function aveVoltage(index) {
  let totalVoltage =
    Data.first[index].voltage +
    Data.second[index].voltage +
    Data.third[index].voltage;
  return totalVoltage / 3;
}

function aveCurrent(index) {
  let totalCurrent =
    Data.first[index].current +
    Data.second[index].current +
    Data.third[index].current;
  return totalCurrent / 3;
}

function getResistance(index) {
  return aveVoltage(index) / aveCurrent(index);
}

function getResistivity(index) {
  return (
    (getResistance(index) * (Math.PI * Math.pow(0.000559 / 2, 2))) /
    (Data.first[index].length / 100)
  );
}

function getResistanceAreaChange(index) {
  return (
    getResistance(index) * (Math.PI * Math.pow(0.000559 / 2, 2)) -
    (index - 1 >= 0 ? getResistance(index - 1) : 0) *
      (Math.PI * Math.pow(0.000559 / 2, 2))
  );
}

const processedDataGraph1 = Data.first.map((currElement, index) => [
  currElement.length,
  aveVoltage(index),
  aveCurrent(index),
]);

const processedDataGraph1alt = Data.first.map((currElement, index) => ({
  "length": currElement.length,
  "voltage": aveVoltage(index),
  "current": aveCurrent(index),
}));

const processedDataGraph2 = Data.first.map((currElement, index) => [
  currElement.length,
  getResistance(index),
]);

const processedDataGraph3 = Data.first.map((currElement, index) => [
  currElement.length / 100,
  getResistance(index) * (Math.PI * Math.pow(0.000559 / 2, 2)),
  (currElement.length / 100) * 0.000001663224917,
]);

function getAverageResistivity() {
  console.log(processedDataGraph1alt)
  var times = 10;
  let total = 0;
  for (var i = 0; i < times; i++) {
    total += getResistivity(i);
  }
  return total / times;
}

function getAverageGradient() {
  var times = 10;
  let total = 0;
  for (var i = 0; i < times; i++) {
    total += ((getResistanceAreaChange(i) / 0.10)* Math.pow(10, 6));
  }
  return total / times;
}

const ProcessedTable = ({ data }) => (
  <Table data={data}>
    <Column width={140} resizable>
      <HeaderCell>Length (cm)</HeaderCell>
      <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowData.length}</span>;
        }}
      </Cell>
    </Column>

    <Column width={140} resizable>
      <HeaderCell>Ave Voltage (volts)</HeaderCell>
      <Cell>
        {(rowData, rowIndex) => {
          return <span>{round2(aveVoltage(rowIndex, rowData))}</span>;
        }}
      </Cell>
    </Column>

    <Column width={150} resizable>
      <HeaderCell>Ave Current (amps)</HeaderCell>
      <Cell>
        {(rowData, rowIndex) => {
          return <span>{round2(aveCurrent(rowIndex, rowData))}</span>;
        }}
      </Cell>
    </Column>

    <Column width={170} resizable>
      <HeaderCell>Resistance (ohms)</HeaderCell>
      <Cell>
        {(rowData, rowIndex) => {
          return <span>{round2(getResistance(rowIndex, rowData))}</span>;
        }}
      </Cell>
    </Column>
    <Column width={230} resizable>
      <HeaderCell>Resistivity (ohms meters)</HeaderCell>
      <Cell>
        {(rowData, rowIndex) => {
          return (
            <span>
              {round2(getResistivity(rowIndex, rowData) * Math.pow(10, 6))}x10
              <sup>6</sup>
            </span>
          );
        }}
      </Cell>
    </Column>
  </Table>
);

const RawTable = ({ data }) => (
  <Table data={data}>
    <Column width={200} resizable>
      <HeaderCell>Length (cm)</HeaderCell>
      <Cell dataKey="length" />
    </Column>

    <Column width={200} resizable>
      <HeaderCell>Voltage (volts)</HeaderCell>
      <Cell dataKey="voltage" />
    </Column>

    <Column width={200} resizable>
      <HeaderCell>Current (amps)</HeaderCell>
      <Cell dataKey="current" />
    </Column>
  </Table>
);

const App = () => (
  <div>
    <div>
      <p>
        The following are tables containing raw data collected from the three
        trials performed.
      </p>
      <h3>First Trial</h3>
      <RawTable data={Data.first} />
      <h3>Second Trial</h3>
      <RawTable data={Data.second} />
      <h3>Third Trial</h3>
      <RawTable data={Data.third} />
    </div>
    <h2>Processed Data</h2>
    <ProcessedTable data={Data.first} />
    <h3></h3>
    <span>
      The average resistivity is{" "}
      {round2(getAverageResistivity() * Math.pow(10, 6))}
      x10
      <sup>6</sup>.
    </span>
    <br />
    <p>
      <i>Note: all data is rounded to two decimal places.</i>
    </p>
    <h2>Graphs</h2>
    <h4>Change in Voltage & Current Over Length (Figure 1)</h4>
    <Chart
      width={"600px"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["x", "Average Voltage in Volts", "Average Current in Amps"],
      ].concat(processedDataGraph1)}
      options={{
        hAxis: {
          title: "Length (cm)",
        },
        vAxis: {
          title: "Measured Value (Volts or Amps)",
        },
        trendlines: { 0: {}, 1: {} },
        chartArea: { width: "60%", height: "80%" },
        legend: { position: "right" },
      }}
      rootProps={{ "data-testid": "2" }}
    />
    <h4>Change in Resistance Over Length (Figure 2)</h4>
    <Chart
      width={"600px"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[["x", "Average Resistance in Ohms"]].concat(processedDataGraph2)}
      options={{
        hAxis: {
          title: "Length (cm)",
        },
        vAxis: {
          title: "Average Resistance in Ohms",
        },
        trendlines: {
          0: {
            type: "linear",
            showR2: true,
            visibleInLegend: true,
          },
          1: {},
        },
        chartArea: { width: "55%", height: "80%" },
        legend: { position: "right" },
      }}
      rootProps={{ "data-testid": "2" }}
    />
    <h4>Resistance time Area Over Length (Figure 3)</h4>
    <Chart
      width={"600px"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["x", "Average Resistance in Ohms", "Trendline = 1.66E-6 * X, r^2 = 0.9656"],
        [0, 0, 0],
      ].concat(processedDataGraph3)}
      options={{
        hAxis: {
          title: "Length (m)",
        },
        vAxis: {
          title: "Resistance (Ohms) time Area (Meters Squared)",
        },
        chartArea: { width: "55%", height: "80%" },
        legend: { position: "right" },
      }}
      rootProps={{ "data-testid": "2" }}
    />
  </div>
);

export default App;
