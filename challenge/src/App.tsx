import './App.css';
import GeneDataTable from './Components/GeneDataTable';
import { Grid } from '@mantine/core';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

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

export interface GeneProps {
  data: Gene[];
}
const getCSV = () => new Promise<GeneProps>((resolve) => {
  Papa.parse("/genes_human.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    delimiter: ";",
    complete: (results: GeneProps) => {
      resolve(results)
    },
  })
});

function App() {
  const [chosenGene, setChosenGene] = useState<Gene>();
  const [values, setValues] = useState<GeneProps>({ data: [] });

  useEffect(() => {
    getCSV()
      .then(val => {
        setValues(val)
        setChosenGene(values.data[0])
      })
  }, [])


  return (
    // <Grid>
    //   <Grid.Col span={8}><GeneDataTable data= {values} setChosenGene = {setChosenGene} /></Grid.Col>
    //   <Grid.Col span={4}><PieChart chosenGene={chosenGene} /></Grid.Col>
    // </Grid>
    <Grid>
      <Grid.Col span={8}><GeneDataTable data={values?.data} /></Grid.Col>
    </Grid>
  );
}
export default App;