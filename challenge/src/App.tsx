import './App.css';
import GeneDataTable from './Components/GeneDataTable';
import { Grid } from '@mantine/core';
import { useState, useEffect } from 'react';
import PieChart from './Components/PieChart';



function App() {
  const [chosenGene, setChosenGene]=useState<string>("");

  return (
    <Grid>
      <Grid.Col span={8}><GeneDataTable setChosenGene={setChosenGene}/></Grid.Col>
      <Grid.Col span={4}><PieChart chosenGene={chosenGene}/></Grid.Col>
    </Grid>
  );
}
export default App;