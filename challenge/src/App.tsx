import React from 'react';
import logo from './logo.svg';
import './App.css';
import GeneTable from './Components/GeneTable';
import GeneDataTable from './Components/GeneDataTable';
import { Grid } from '@mantine/core';
import DataTableMant from './Components/Falli';


function App() {
  return (
    <Grid>
      {/* <Grid.Col span={8}><DataTableMant/></Grid.Col> */}
      <Grid.Col span={8}><GeneDataTable/></Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
}
export default App;