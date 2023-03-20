import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import Plot from 'react-plotly.js';
import { Gene } from '../App';


type PieChartProps = {
  chosenGene: Gene;
}

type Data = {
  gc: number
}

function PieChart({ chosenGene }: PieChartProps) {
  const [load, setLoad] = useState<boolean>(true)
  const [gc, setGC] = useState<number>(0)

  const getData = () => new Promise<number>((resolve) => {
    setLoad(true);
    fetch('https://rest.ensembl.org/ga4gh/features/' + chosenGene + '.1?content-type=application/json')
      .then(res => res.json())
      .then(res => {
        resolve(+res.attributes.vals["gene gc"][0])
      })
      .catch(() => {
        resolve(-1)
      })
      .finally(() => {
        setLoad(false)
      })
  });

  useEffect(() => {
    getData()
      .then(gc => {
        setGC(gc)
      })
  }, [chosenGene])

  var chart;
  if (gc > 0) {
    chart =
      <Plot
        data={[{
          values: [gc, 100 - gc],
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
        : ((gc > 0) ? <h1> {JSON.stringify(gc)}</h1> : <h1>-</h1>)}
      {!load && chart}
    </div>
  )
}

export default PieChart;