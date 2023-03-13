const getCSV = async () => {
  const parseFile = () => {
    return new Promise(resolve => {
      Papa.parse("/genes.csv", {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ";",
        complete: (results: Data) => {
          resolve(results.data);
        }
      });
    });
  };
  let parsedData:Data=await parseFile();
  setValues(parsedData)
}