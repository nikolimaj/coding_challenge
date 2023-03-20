import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import { Data, Gene } from "../App";
import GeneDetail from './GeneDetail';


type GeneProps = {
  setChosenGene: (chosenGene: Gene) => void;
  geneData: Data;
}

function GeneTable({ setChosenGene, geneData }: GeneProps) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(geneData?.data.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(geneData?.data.slice(from, to));

  }, [page, PAGE_SIZE, geneData]);
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
            { accessor: 'ensembl' },
            { accessor: 'gene_symbol' },
            { accessor: 'name' },
            { accessor: 'biotype' },
            { accessor: 'chromosome' },
            { accessor: 'start' },
            { accessor: 'end' },
          ]
        }
        totalRecords={geneData?.data.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        idAccessor='ensembl'
        rowExpansion={{
          content: ({ record }) => (<GeneDetail setChosenGene={setChosenGene} detail={record}></GeneDetail>),
           
        }}
      //minHeight={150}
      />
    </div>
  )
}

export default GeneTable;