import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import { rejects } from "assert";
import { GeneProps, Gene } from "../App";
import GeneDetail from "./GeneDetail";

type Props = {
  setChosenGene: React.Dispatch<React.SetStateAction<Gene | undefined>>;
}

const GeneTable: React.FC<GeneProps> = ({ data }: GeneProps) => {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data?.slice(0, PAGE_SIZE));
  const [load, setLoad] = useState<boolean>(true)


  useEffect(() => {
    setLoad(false);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data?.slice(from, to));

  }, [page, PAGE_SIZE, data]);
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
        // onRowClick={(gene: Gene) => {
        //   setChosenGene(gene);
        // }}
        totalRecords={data?.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        idAccessor='ensembl'
        fetching={load}
        rowExpansion={{
          content: ({ record }) => <GeneDetail detail={record}></GeneDetail>
        }}
      //minHeight={150}
      />
    </div>
  )
}

export default GeneTable;