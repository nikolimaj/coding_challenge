import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import Plot from 'react-plotly.js';
import { Gene } from '../App';


export interface props {
  chosenGene: Gene | undefined
}

function PieChart({ chosenGene }: props) {
  const [load, setLoad] = useState<boolean>(true)

  useEffect(() => {
    setLoad(false)
  }, []);


  var chart;
  if (chosenGene?.gc && chosenGene.gc && chosenGene.gc > 0) {
    chart =
      <Plot
        data={[{
          values: [chosenGene.gc, 100 - chosenGene.gc],
          labels: ['GC', 'AT'],
          type: 'pie'
        }]}
        layout={{ height: 400, width: 500, title: 'GC-Anteil' }} />
  }
  else {
    chart = <p>No data available for this Gene</p>
  }
  return (
    <div>
      {load ?
        <Loader />
        : ((chosenGene?.gc && chosenGene.gc && chosenGene.gc > 0) ? <h1> {JSON.stringify(chosenGene.gc)}</h1> : <h1>-</h1>)}
      {!load && chart}
    </div>
  )
}

export default PieChart;