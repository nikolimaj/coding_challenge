import React from 'react';
import Papa, { ParseResult } from "papaparse";
import { Table } from '@mantine/core';

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
  const [values, setValues] = React.useState<Data | undefined>()

  const getCSV = () => {
    Papa.parse("/genes.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results: Data) => {
        setValues(results)
      },
    })
  }

  const DisplayData = values?.data.map(
    (gene) => {
      return (
        <tr key={gene.ensembl}>
          <td>{gene.ensembl}</td>
          <td>{gene.gene_symbol}</td>
          <td>{gene.name}</td>
          <td>{gene.biotype}</td>
          <td>{gene.chromosome}</td>
          <td>{gene.start}</td>
          <td>{gene.end}</td>
        </tr>
      )
    }
  )

  React.useEffect(() => {
    getCSV()
  }, [])

  return (
    <div>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Ensembl</th>
            <th>Gene Symbol</th>
            <th>Name</th>
            <th>Biotype</th>
            <th>Chromosome</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {DisplayData}
        </tbody>
      </Table>
    </div>
  )
}

export default GeneTable;