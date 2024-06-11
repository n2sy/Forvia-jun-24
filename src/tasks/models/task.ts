export class Task {
  //   id: number;
  //   name: string;
  //   description: string;

  constructor(
    public id: string,
    public title: string,
    public year: number,
    public createdAt: Date,
    public statut: string,
    public description: string,
  ) {
    // this.id = id;
    // this.name = name;
    // this.description = description;
  }
}
