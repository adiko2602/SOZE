export default function peselValidation(pesel: string): boolean {
  const peselWeight: number[] = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const peselWeightCalculate: string[] = [];
  let peselWeightSum: number = 0;
  let peselChecksum: string;

  for (let i = 0; i < peselWeight.length; i++) {
    peselWeightCalculate.push((parseInt(pesel[i]) * peselWeight[i]).toString());
    if (peselWeightCalculate[i].length > 1) {
      peselWeightCalculate[i] = peselWeightCalculate[i].charAt(
        peselWeightCalculate[i].length - 1
      );
    }
    peselWeightSum += parseInt(peselWeightCalculate[i]);
  }

  peselChecksum = (
    10 -
    parseInt(
      peselWeightSum.toString().charAt(peselWeightSum.toString().length - 1)
    )
  ).toString();

  return pesel.charAt(pesel.length - 1) === peselChecksum;
}
