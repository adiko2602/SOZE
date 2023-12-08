import {
  ErrorServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../api/serverFunctionResponse";

export type TTest = {
  name: string;
  age: number;
};

export async function getTest() {
  try {
    const test: TTest = {
      name: "Adi",
      age: 28,
    };

    return new SuccessServerFunctionResponse("Test OK", test);
  } catch (err) {
    return new ErrorServerFunctionResponse("Test not ok");
  }
}
