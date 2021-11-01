import bingoContentJSON from "./bingoContents.json";

//get full bingoContents
export const getBingoContents = () => {
  return bingoContentJSON.content;
};

//get specify number of content based on the bingo map size
export const getBingoMap = (size: number) => {
  let bingoContents = bingoContentJSON.content;

  bingoContents = bingoContents.sort(() => Math.random() - 0.5);

  return bingoContents.slice(0, size * size);
};
