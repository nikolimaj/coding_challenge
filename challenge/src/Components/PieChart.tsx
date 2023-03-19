import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import Plot from 'react-plotly.js';


type PieChartProps={
    chosenGene:string;
}

type Data={
  gc:number
}

function PieChart({chosenGene}:PieChartProps) {

  const [geneData, setGeneData] = useState<Data>()
  const [load, setLoad] = useState<boolean>(true)
  const [gc, setGC] = useState<number>(geneData?geneData.gc:0)
  const [at, setAT] = useState<number>(geneData?(100-geneData.gc):0)

  function getData() {
    setLoad(true);
    return fetch('https://rest.ensembl.org/ga4gh/features/' + chosenGene + '.1?content-type=application/json')
    .then(res=>res.json())
    .then(res=>{
      setGeneData(res.attributes.vals["gene gc"])
    })
    .catch(()=>{
      setGeneData({gc:-1})
    })
    .finally(()=>{
      setLoad(false)
      setGC(geneData? geneData.gc:0);
      setAT(100-gc);
    })
  }

  useEffect(()=>{
    getData();
  },[chosenGene])

  return (
    <div>
      {load?<Loader/>:JSON.stringify(geneData)}
      {/* {JSON.stringify(geneData)} */}
      <h1>
      {JSON.stringify(geneData?.gc)}
      </h1>
      <Plot
      data = {[{
        values: [gc, at],
        //values: [41.85, (100-41.85)],
        labels: ['GC', 'AT'],
        type: 'pie'
      }]}
        layout={ {height: 400, width: 500, title: 'GC-Anteil'} }
      />
    </div>
  )
}

export default PieChart;