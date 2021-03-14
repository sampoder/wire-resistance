import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import React from 'react'
import Data from "../data/data";

const RawTable = ({data}) => (
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
        <p>The following are tables containing raw data collected from the three trials performed.</p>
        <h3>First Trial</h3>
        <RawTable data={Data.first} />
        <h3>Second Trial</h3>
        <RawTable data={Data.second} />
        <h3>Third Trial</h3>
        <RawTable data={Data.third} />
    </div>
)

export default App