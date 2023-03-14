import React from 'react';
import Papa, { ParseResult } from "papaparse";
import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';

type PieChartProps={
    chosenGene:string;
}

interface Data{
  "attributes":{
    "vals":{
      "gene gc":string
    }
  }
}

function PieChart({chosenGene}:PieChartProps) {

  const [geneData, setGeneData] = useState<Data|undefined>();

  function getData() {
    return fetch('https://rest.ensembl.org/ga4gh/features/' + chosenGene + '.1?content-type=application/json')
    .then(res=>res.json())
    .then(res=>{
      setGeneData(res);
    })
  }

  useEffect(()=>{
    getData();
  },[chosenGene])

  return (
    <div>
      {JSON.stringify(geneData)}
      {/* {JSON.stringify(geneData?.attributes.vals['gene gc'])} */}
    </div>
  )
}

export default PieChart;