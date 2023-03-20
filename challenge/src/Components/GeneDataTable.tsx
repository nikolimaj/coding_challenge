import Papa, { ParseResult } from "papaparse";
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import { Data, Gene } from "../App";


type GeneProps={
  setChosenGene: (chosenGene:Gene) => void;
  geneData:Data;
}

function GeneTable({setChosenGene, geneData}:GeneProps) {
  const PAGE_SIZE = 10;
  
  const [values, setValues] = useState<Data | undefined>();
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(values?.data.slice(0, PAGE_SIZE));
  //const [chosenGene, setChosenGene]=useState<string>()


  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setValues(geneData);
  }, [page, PAGE_SIZE, values]);

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
        setChosenGene(gene);
       }}
       totalRecords={values?.data.length}
       recordsPerPage={PAGE_SIZE}
       page={page}
       onPageChange={(p) => setPage(p)}
       idAccessor='ensembl'
       //fetching={load}
       //minHeight={150}
      />
    </div>
  )
}

export default GeneTable;