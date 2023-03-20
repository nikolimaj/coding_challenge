import './App.css';
import GeneDataTable from './Components/GeneDataTable';
import { Grid } from '@mantine/core';
import { useState, useEffect } from 'react';
import PieChart from './Components/PieChart';
import Papa, { ParseResult } from "papaparse";

export interface Gene {
  ensembl: string;
  gene_symbol: string;
  name: string;
  biotype: string;
  chromosome: string;
  start: number;
  end: number;
  gc: number;
  strand: string;
}
export interface Data {
  data: Gene[];
}
const getCSV = () => new Promise<Data>((resolve) => {
  Papa.parse("/genes_human.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    delimiter: ";",
    complete: (results: Data) => {
      resolve(results)
    },
  })
});

function App() {
  const [geneData, setGeneData] = useState<Data>({ data: [] });
  const [chosenGene, setChosenGene] = useState<Gene>();

  useEffect(() => {
    getCSV()
      .then(val => {
        setGeneData(val)
      })
  }, [])

  return (
    <Grid>
      <Grid.Col span={8}><GeneDataTable setChosenGene={setChosenGene} geneData={geneData} /></Grid.Col>
      <Grid.Col span={4}><PieChart chosenGene={chosenGene} /></Grid.Col>
    </Grid>
  );
}
export default App;