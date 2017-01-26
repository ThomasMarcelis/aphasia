/**
 * Created by thomas on 26.01.17.
 */
export class Question {
  constructor(
    public id: number,
    public title: string,
    public type: string,
    public answer1: string,
    public answer2: string,
    public answer3: string,
  ) {}
}
