import React from 'react';
import Papa, { ParseResult } from "papaparse";
import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';


type Gene = {
  ensembl: string
  gene_symbol: string
  name: string
  biotype: string
  chromosome: string
  start: number
  end: number
}

type Data = {
  data: Gene[]
}


function GeneTable() {
  const PAGE_SIZE = 10;
  
  const [values, setValues] = useState<Data | undefined>();
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(values?.data.slice(0, PAGE_SIZE));
  const [load, setLoad] = useState<boolean>(true)

  useEffect(() => {
    getCSV();
    setLoad(false);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(values?.data.slice(from, to));
  }, [page, PAGE_SIZE, values]);

  
  const getCSV = () => {
    Papa.parse("/genes_human.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results: Data) => {
        setValues(results)
      },
    })
  }

  return (
    <div>
      <DataTable
       withBorder
       borderRadius="sm"
       withColumnBorders
       striped
       highlightOnHover
       records={records}
       columns={
        [
            {accessor:'ensembl'},
            {accessor:'gene_symbol'},
            {accessor:'name'},
            {accessor:'biotype'},
            {accessor:'chromosome'},
            {accessor:'start'},
            {accessor:'end'},
        ]
       }
       onRowClick={(gene:Gene)=>{
        console.log(gene.name);
       }}
       totalRecords={values?.data.length}
       recordsPerPage={PAGE_SIZE}
       page={page}
       onPageChange={(p) => setPage(p)}
       idAccessor='ensembl'
       fetching={load}
       //minHeight={150}
      />
    </div>
  )
}

export default GeneTable;