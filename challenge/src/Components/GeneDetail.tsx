import { Center, Group, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Gene } from '../App';



type GeneProps = {
    setChosenGene: (chosenGene: Gene) => void;
    detail: Gene;
  }

function GeneDetail({ setChosenGene, detail }: GeneProps) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        if (detail.gc == undefined) {
            fetch('https://rest.ensembl.org/ga4gh/features/' + detail.ensembl + '.1?content-type=application/json')
                .then(respons => {
                    respons.json()
                        .then(res => {
                            if (res.error == undefined) {
                                // + to make it a number
                                detail.gc = +res.attributes.vals["gene gc"][0]
                                detail.strand = res.strand
                            }
                            setLoading(false)
                            setChosenGene(detail)
                        })
                })
        }
        else {
            setLoading(false)
            setChosenGene(detail)
        }
    }, [detail]);


    return (
        <Stack className={detail.ensembl} p="xs" spacing={6}>
            <LoadingOverlay visible={loading} />
            <Group spacing={6}>
                <Text className={"" + detail.gc + ""}>GC:</Text>
                <Text> {detail.gc ? detail.gc : '-'}</Text>
            </Group>
            <Group spacing={6}>
                <Text className={detail.strand}>Strand:</Text>
                <Text>{detail.strand ? detail.strand : '-'}</Text>
            </Group>
        </Stack>
    );
}
export default GeneDetail;